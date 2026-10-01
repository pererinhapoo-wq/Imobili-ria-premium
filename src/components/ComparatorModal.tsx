import React, { useState } from 'react';
import { 
  X, 
  Scale, 
  Sparkles, 
  Check, 
  Minus, 
  Maximize2, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Sun, 
  ArrowRight, 
  PhoneCall, 
  Layers,
  TrendingDown,
  Info
} from 'lucide-react';
import { Property } from '../types';
import { 
  formatCurrencyBRL, 
  calculatePricePerM2, 
  generateSmartDifferences 
} from '../utils/comparatorEngine';

interface ComparatorModalProps {
  selectedProperties: Property[];
  onClose: () => void;
  onRemoveProperty: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenSchedule: (property: Property) => void;
}

export const ComparatorModal: React.FC<ComparatorModalProps> = ({
  selectedProperties,
  onClose,
  onRemoveProperty,
  onSelectProperty,
  onOpenSchedule
}) => {
  const [activeMobileTab, setActiveMobileTab] = useState(0);

  if (selectedProperties.length < 2) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 text-center space-y-4 shadow-xl border border-stone-200">
          <div className="w-12 h-12 mx-auto bg-stone-100 rounded-full flex items-center justify-center text-stone-700">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-stone-900 font-display">
            Selecione ao menos 2 imóveis
          </h3>
          <p className="text-sm text-stone-600">
            Para utilizar o Comparador Inteligente e conferir as diferenças entre os imóveis, selecione 2 ou 3 opções no acervo.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors"
          >
            Voltar ao Acervo
          </button>
        </div>
      </div>
    );
  }

  const smartDifferences = generateSmartDifferences(selectedProperties);

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="bg-[#FAF9F6] rounded-xl max-w-6xl w-full h-[95vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Top Header */}
        <div className="px-5 py-4 bg-white border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-100 rounded-lg text-stone-900">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-stone-950 font-display">
                Comparador Inteligente de Imóveis
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                Análise técnica e métricas comparativas entre {selectedProperties.length} opções selecionadas
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            title="Fechar Comparador"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Comparison Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          
          {/* SPECIAL MANDATORY SECTION: "O QUE MUDA ENTRE ELES?" */}
          <section className="bg-white rounded-xl p-5 sm:p-6 border border-amber-900/20 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1.5 bg-amber-100 text-amber-900 rounded-md">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-stone-900 font-display">
                O que muda entre eles?
              </h3>
              <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Análise Automática
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 mb-4 max-w-3xl">
              Nossa inteligência de curadoria sintetizou as diferenças mais decisivas entre as propriedades para auxiliar sua escolha:
            </p>

            {/* Differences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {smartDifferences.map((diff, index) => (
                <div 
                  key={index}
                  className="bg-stone-50/80 rounded-lg p-3.5 border border-stone-200/80 flex flex-col justify-between space-y-2 hover:border-amber-700/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-amber-950 mb-1">
                      <span>{diff.title}</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {diff.summary}
                    </p>
                  </div>
                  {diff.leaderName && (
                    <div className="pt-2 border-t border-stone-200/60 text-[11px] font-medium text-amber-900 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span className="truncate">Destaque: {diff.leaderName}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* MOBILE EXPERIENCE: Tab Selector for properties */}
          <div className="md:hidden space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Visualizar Especificações por Imóvel
            </div>
            
            {/* Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-stone-200 p-1 rounded-lg">
              {selectedProperties.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveMobileTab(idx)}
                  className={`py-2 px-1 text-xs font-semibold rounded truncate transition-colors ${
                    activeMobileTab === idx
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {p.title.split(' ')[0]} {p.title.split(' ')[1] || ''}
                </button>
              ))}
            </div>

            {/* Active Property Card on Mobile */}
            {selectedProperties[activeMobileTab] && (
              <div className="bg-white rounded-xl p-5 border border-stone-200 space-y-4">
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                  <img
                    src={selectedProperties[activeMobileTab].mainImage}
                    alt={selectedProperties[activeMobileTab].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-stone-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {selectedProperties[activeMobileTab].type}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-stone-900 font-display">
                    {selectedProperties[activeMobileTab].title}
                  </h4>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedProperties[activeMobileTab].neighborhood}, {selectedProperties[activeMobileTab].city}
                  </p>
                </div>

                {/* Mobile Metrics List */}
                <div className="divide-y divide-stone-100 text-xs text-stone-700">
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-500">Valor</span>
                    <span className="font-mono font-bold text-stone-900">
                      {formatCurrencyBRL(selectedProperties[activeMobileTab].price)}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-500">Valor / m²</span>
                    <span className="font-mono font-medium text-stone-900">
                      {formatCurrencyBRL(calculatePricePerM2(selectedProperties[activeMobileTab]))}/m²
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-500">Área Útil</span>
                    <span className="font-mono font-semibold text-stone-900">
                      {selectedProperties[activeMobileTab].area} m²
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-500">Suítes / Quartos</span>
                    <span className="font-mono font-semibold text-stone-900">
                      {selectedProperties[activeMobileTab].suites} suítes ({selectedProperties[activeMobileTab].bedrooms} qtos)
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-500">Vagas de Garagem</span>
                    <span className="font-mono font-semibold text-stone-900">
                      {selectedProperties[activeMobileTab].parkingSpots} vagas
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-500">Condomínio Mensal</span>
                    <span className="font-mono text-stone-900">
                      {formatCurrencyBRL(selectedProperties[activeMobileTab].condoFee)}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-500">IPTU Anual</span>
                    <span className="font-mono text-stone-900">
                      {formatCurrencyBRL(selectedProperties[activeMobileTab].iptu)}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-stone-500">Orientação Solar</span>
                    <span className="text-stone-900 text-right max-w-[200px]">
                      {selectedProperties[activeMobileTab].sunExposure}
                    </span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <div className="text-xs font-semibold text-stone-800">Diferenciais Chave:</div>
                  <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                    {selectedProperties[activeMobileTab].amenities.slice(0, 4).map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectProperty(selectedProperties[activeMobileTab])}
                    className="flex-1 py-2 text-center text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded border border-stone-200"
                  >
                    Ver Página Completa
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenSchedule(selectedProperties[activeMobileTab])}
                    className="flex-1 py-2 text-center text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded shadow"
                  >
                    Agendar Visita
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* DESKTOP SIDE-BY-SIDE MATRICES */}
          <div className="hidden md:block bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
            
            {/* Header Sticky Columns */}
            <div className="grid grid-cols-4 border-b border-stone-200 bg-stone-50/70 p-4 items-end">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Propriedade
              </div>

              {selectedProperties.map((prop) => (
                <div key={prop.id} className="px-3 space-y-2">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-stone-100">
                    <img
                      src={prop.mainImage}
                      alt={prop.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveProperty(prop.id)}
                      className="absolute top-2 right-2 p-1 bg-stone-900/80 text-white rounded hover:bg-stone-900 transition-colors"
                      title="Remover do comparador"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase">
                      {prop.code} · {prop.type}
                    </span>
                    <h4 
                      onClick={() => onSelectProperty(prop)}
                      className="text-sm font-semibold text-stone-900 font-display line-clamp-1 hover:text-amber-800 cursor-pointer"
                    >
                      {prop.title}
                    </h4>
                    <p className="text-xs text-stone-500 font-mono font-medium">
                      {formatCurrencyBRL(prop.price)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenSchedule(prop)}
                    className="w-full py-1.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded flex items-center justify-center gap-1 transition-colors"
                  >
                    <PhoneCall className="w-3 h-3 text-stone-500" />
                    <span>Agendar Visita</span>
                  </button>
                </div>
              ))}

              {/* In case only 2 properties are selected */}
              {selectedProperties.length === 2 && (
                <div className="px-3 flex flex-col items-center justify-center h-full min-h-[160px] border border-dashed border-stone-200 rounded-lg text-center p-4">
                  <span className="text-xs text-stone-400 mb-2">3º espaço disponível</span>
                  <span className="text-[11px] text-stone-500">
                    Você pode adicionar mais 1 imóvel do acervo para comparar
                  </span>
                </div>
              )}
            </div>

            {/* Matrix Section 1: Financial & Valuation */}
            <div className="divide-y divide-stone-100 text-xs">
              <div className="bg-stone-100/60 px-4 py-2 font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
                Valores e Custos Recorrentes
              </div>

              {/* Price */}
              <div className="grid grid-cols-4 px-4 py-3 items-center">
                <div className="font-medium text-stone-600">Investimento / Preço</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 font-mono font-bold text-stone-900 text-sm">
                    {formatCurrencyBRL(p.price)}
                  </div>
                ))}
              </div>

              {/* Price per m² */}
              <div className="grid grid-cols-4 px-4 py-3 items-center">
                <div className="font-medium text-stone-600">Valor do m² Privativo</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 font-mono text-stone-800">
                    {formatCurrencyBRL(calculatePricePerM2(p))}/m²
                  </div>
                ))}
              </div>

              {/* Condomínio */}
              <div className="grid grid-cols-4 px-4 py-3 items-center">
                <div className="font-medium text-stone-600">Condomínio Mensal</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 font-mono text-stone-700">
                    {formatCurrencyBRL(p.condoFee)}
                  </div>
                ))}
              </div>

              {/* IPTU */}
              <div className="grid grid-cols-4 px-4 py-3 items-center">
                <div className="font-medium text-stone-600">IPTU Anual</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 font-mono text-stone-700">
                    {formatCurrencyBRL(p.iptu)}
                  </div>
                ))}
              </div>
            </div>

            {/* Matrix Section 2: Dimensions & Spaces */}
            <div className="divide-y divide-stone-100 text-xs">
              <div className="bg-stone-100/60 px-4 py-2 font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
                Dimensões e Capacidade
              </div>

              {/* Area */}
              <div className="grid grid-cols-4 px-4 py-3 items-center">
                <div className="font-medium text-stone-600">Área Útil Privativa</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 font-mono font-semibold text-stone-900">
                    {p.area} m²
                  </div>
                ))}
              </div>

              {/* Suites */}
              <div className="grid grid-cols-4 px-4 py-3 items-center">
                <div className="font-medium text-stone-600">Suítes Privativas</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 font-mono font-semibold text-stone-900">
                    {p.suites} suítes
                  </div>
                ))}
              </div>

              {/* Bedrooms total */}
              <div className="grid grid-cols-4 px-4 py-3 items-center">
                <div className="font-medium text-stone-600">Quartos Totais</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 font-mono text-stone-700">
                    {p.bedrooms} dormitórios
                  </div>
                ))}
              </div>

              {/* Bathrooms */}
              <div className="grid grid-cols-4 px-4 py-3 items-center">
                <div className="font-medium text-stone-600">Banheiros</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 font-mono text-stone-700">
                    {p.bathrooms} banheiros
                  </div>
                ))}
              </div>

              {/* Parking spots */}
              <div className="grid grid-cols-4 px-4 py-3 items-center">
                <div className="font-medium text-stone-600">Vagas de Garagem</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 font-mono font-semibold text-stone-900">
                    {p.parkingSpots} vagas cobertas
                  </div>
                ))}
              </div>
            </div>

            {/* Matrix Section 3: Architecture & Comfort */}
            <div className="divide-y divide-stone-100 text-xs">
              <div className="bg-stone-100/60 px-4 py-2 font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
                Arquitetura e Comodidades
              </div>

              {/* Destaque Principal */}
              <div className="grid grid-cols-4 px-4 py-3 items-start">
                <div className="font-medium text-stone-600">Conceito Arquitetônico</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 text-stone-800 leading-relaxed italic">
                    "{p.highlightTag}"
                  </div>
                ))}
              </div>

              {/* Sol */}
              <div className="grid grid-cols-4 px-4 py-3 items-center">
                <div className="font-medium text-stone-600">Orientação Solar</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 text-stone-700">
                    {p.sunExposure}
                  </div>
                ))}
              </div>

              {/* Comodidades list */}
              <div className="grid grid-cols-4 px-4 py-3 items-start">
                <div className="font-medium text-stone-600">Diferenciais e Lazer</div>
                {selectedProperties.map(p => (
                  <div key={p.id} className="px-3 space-y-1">
                    {p.amenities.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-stone-700">
                        <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-stone-500 hidden sm:block">
            * Simulação e valores de condomínio/IPTU fornecidos pelos proprietários e sujeitos a alteração.
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors"
            >
              Continuar Navegando
            </button>
            <button
              type="button"
              onClick={() => {
                if (selectedProperties[0]) {
                  onOpenSchedule(selectedProperties[0]);
                }
              }}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              Agendar Consultoria Comparativa
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
