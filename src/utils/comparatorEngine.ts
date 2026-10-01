import { Property, DifferenceInsight } from '../types';

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumberBR(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function calculatePricePerM2(property: Property): number {
  if (!property.area || property.area <= 0) return 0;
  return Math.round(property.price / property.area);
}

export function generateSmartDifferences(properties: Property[]): DifferenceInsight[] {
  if (properties.length < 2) return [];

  const insights: DifferenceInsight[] = [];

  // 1. ANÁLISE DE ÁREA PRIVATIVA
  const sortedByArea = [...properties].sort((a, b) => b.area - a.area);
  const largest = sortedByArea[0];
  const smallest = sortedByArea[sortedByArea.length - 1];
  const areaDiff = largest.area - smallest.area;
  const areaPercent = Math.round((areaDiff / smallest.area) * 100);

  insights.push({
    category: 'area',
    title: 'Diferença Expressiva de Área Útil',
    summary: `${largest.title} lidera com ${largest.area} m² de área privativa — ${areaDiff} m² (${areaPercent}%) a mais que ${smallest.title} (${smallest.area} m²).`,
    leaderId: largest.id,
    leaderName: largest.title
  });

  // 2. ANÁLISE DE PREÇO E VALOR POR M²
  // If all are the same purpose (e.g. all 'venda' or all 'aluguel')
  const allVenda = properties.every(p => p.purpose === 'venda');
  const allAluguel = properties.every(p => p.purpose === 'aluguel');

  if (allVenda || allAluguel) {
    const withM2 = properties.map(p => ({
      ...p,
      m2Value: calculatePricePerM2(p)
    }));
    const sortedByM2 = [...withM2].sort((a, b) => a.m2Value - b.m2Value);
    const bestM2 = sortedByM2[0];
    const highestM2 = sortedByM2[sortedByM2.length - 1];

    if (bestM2.id !== highestM2.id) {
      insights.push({
        category: 'value-per-m2',
        title: 'Métrica de Valor por Metro Quadrado',
        summary: `${bestM2.title} apresenta o valor por metro quadrado mais competitivo da comparação (${formatCurrencyBRL(bestM2.m2Value)}/m²), contra ${formatCurrencyBRL(highestM2.m2Value)}/m² de ${highestM2.title}.`,
        leaderId: bestM2.id,
        leaderName: bestM2.title
      });
    }
  } else {
    insights.push({
      category: 'price',
      title: 'Finalidades Distintas no Comparador',
      summary: `Você está comparando imóveis de Venda com opções de Locação mensal. Observe os custos mensais globais na tabela abaixo.`,
    });
  }

  // 3. ANÁLISE DE DORMITÓRIOS & SUÍTES
  const suitesCount = properties.map(p => p.suites);
  const maxSuites = Math.max(...suitesCount);
  const minSuites = Math.min(...suitesCount);
  if (maxSuites !== minSuites) {
    const moreSuites = properties.filter(p => p.suites === maxSuites).map(p => p.title).join(', ');
    const lessSuites = properties.filter(p => p.suites === minSuites).map(p => p.title).join(', ');
    insights.push({
      category: 'bedrooms',
      title: 'Configuração de Suítes e Dormitórios',
      summary: `${moreSuites} entrega(m) ${maxSuites} suítes privativas completas, enquanto ${lessSuites} conta com ${minSuites} suíte(s).`,
      leaderName: moreSuites
    });
  }

  // 4. ANÁLISE DE VAGAS DE GARAGEM
  const parkingCounts = properties.map(p => p.parkingSpots);
  const maxParking = Math.max(...parkingCounts);
  const minParking = Math.min(...parkingCounts);
  if (maxParking !== minParking) {
    const topParkingProp = properties.find(p => p.parkingSpots === maxParking)!;
    insights.push({
      category: 'parking',
      title: 'Capacidade de Garagem e Veículos',
      summary: `${topParkingProp.title} oferece ${maxParking} vagas privativas, superior às demais opções (que dispõem de ${minParking} a ${properties.find(p => p.parkingSpots !== maxParking && p.parkingSpots !== minParking)?.parkingSpots || minParking} vagas).`,
      leaderId: topParkingProp.id,
      leaderName: topParkingProp.title
    });
  }

  // 5. LOCALIZAÇÃO E TIPOLOGIA
  const neighborhoods = Array.from(new Set(properties.map(p => `${p.neighborhood} (${p.city})`)));
  if (neighborhoods.length > 1) {
    insights.push({
      category: 'location',
      title: 'Localizações e Perfis Urbanos',
      summary: `A seleção abrange estilos de vida distintos: ${neighborhoods.join(' vs ')}. Cada um possui características de privacidade, mobilidade e valorização específicas.`,
    });
  }

  // 6. DIFERENCIAIS EXCLUSIVOS ÚNICOS
  properties.forEach(prop => {
    // Find amenities or architectural highlights that only THIS property possesses
    const uniqueTraits: string[] = [];

    prop.amenities.forEach(a => {
      const isUnique = properties.every(other => other.id === prop.id || !other.amenities.some(oa => oa.toLowerCase().includes(a.toLowerCase().slice(0, 8))));
      if (isUnique && uniqueTraits.length < 2) {
        uniqueTraits.push(a);
      }
    });

    prop.architecturalDetails.forEach(ad => {
      const isUnique = properties.every(other => other.id === prop.id || !other.architecturalDetails.some(oad => oad.toLowerCase().includes(ad.toLowerCase().slice(0, 10))));
      if (isUnique && uniqueTraits.length < 2) {
        uniqueTraits.push(ad);
      }
    });

    if (uniqueTraits.length > 0) {
      insights.push({
        category: 'exclusive',
        title: `Diferencial Exclusivo: ${prop.type}`,
        summary: `Somente ${prop.title} conta com ${uniqueTraits.join(' e ')}.`,
        leaderId: prop.id,
        leaderName: prop.title
      });
    }
  });

  // 7. CUSTO MENSAL FIXO (Condomínio + IPTU/mês)
  const monthlyCosts = properties.map(p => ({
    id: p.id,
    title: p.title,
    monthlyTotal: p.condoFee + Math.round(p.iptu / 12)
  })).sort((a, b) => a.monthlyTotal - b.monthlyTotal);

  if (monthlyCosts.length > 1 && monthlyCosts[0].monthlyTotal !== monthlyCosts[monthlyCosts.length - 1].monthlyTotal) {
    const lowestCost = monthlyCosts[0];
    const highestCost = monthlyCosts[monthlyCosts.length - 1];
    insights.push({
      category: 'monthly-cost',
      title: 'Custos Fixos de Manutenção (Condomínio + IPTU/mês)',
      summary: `${lowestCost.title} tem a menor taxa fixa mensal estimada (${formatCurrencyBRL(lowestCost.monthlyTotal)}/mês), contra ${formatCurrencyBRL(highestCost.monthlyTotal)}/mês de ${highestCost.title}.`,
      leaderId: lowestCost.id,
      leaderName: lowestCost.title
    });
  }

  return insights;
}
