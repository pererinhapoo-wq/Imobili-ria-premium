import { Property } from '../types';

// Verified local generated assets
import heroPenthouse from '../assets/images/hero_luxury_penthouse_1790834541629.jpg';
import villaJardins from '../assets/images/property_villa_jardins_1790834552384.jpg';
import penthouseTerrace from '../assets/images/property_penthouse_terrace_1790834563010.jpg';
import loftArchitectural from '../assets/images/property_loft_architectural_1790834573444.jpg';
import mansionGolf from '../assets/images/property_mansion_golf_1790834582867.jpg';

export { heroPenthouse };

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    code: 'VP-801',
    title: 'Penthouse Duplex Skyview Jardins',
    type: 'Penthouse Duplex',
    purpose: 'venda',
    price: 18900000,
    condoFee: 14200,
    iptu: 48000,
    area: 520,
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parkingSpots: 6,
    neighborhood: 'Jardins',
    city: 'São Paulo',
    addressSnippet: 'Alameda Gabriel Monteiro da Silva, Jardins',
    mainImage: penthouseTerrace,
    gallery: [
      penthouseTerrace,
      heroPenthouse,
      loftArchitectural
    ],
    featured: true,
    exclusive: true,
    highlightTag: 'Piscina aquecida privativa no rooftop',
    description: 'Espetacular cobertura duplex debruçada sobre a copa das árvores dos Jardins. Projeto luminotécnico assinado com pé-direito de 6 metros no living, revestimentos em mármore travertino navona e terraço gourmet com spa e piscina de borda infinita aquecida.',
    architecturalDetails: [
      'Pé-direito duplo de 6m no living social',
      'Piscina privativa em balanço com raia aquecida',
      'Suíte master com 85m², closet walk-in e hidromassagem',
      'Automação residencial completa Lutron com controle por voz'
    ],
    amenities: [
      'Piscina privativa no rooftop',
      'Espaço gourmet com churrasqueira a carvão e cooktop',
      'Adega climatizada para 400 rótulos',
      'Elevador privativo com biometria codificada',
      'Gerador full atendendo 100% da unidade'
    ],
    buildingStructure: [
      'Portaria blindada nível III-A com clausura dupla',
      'Academia com aparelhos Technogym de última geração',
      'Spa com sauna seca e úmida e sala de massagem',
      'Vagas para visitantes cobertas com manobrista',
      'Ponto de recarga rápida para veículos elétricos nas 6 vagas'
    ],
    yearBuilt: 2024,
    sunExposure: 'Face Norte — insolação plena pela manhã e tarde',
    energyEfficiency: 'Classificação A com painéis solares para áreas comuns'
  },
  {
    id: 'prop-2',
    code: 'VP-512',
    title: 'Villa Contemporânea Joá Panorâmica',
    type: 'Villa Contemporânea',
    purpose: 'venda',
    price: 24500000,
    condoFee: 8900,
    iptu: 62000,
    area: 780,
    bedrooms: 5,
    suites: 5,
    bathrooms: 7,
    parkingSpots: 8,
    neighborhood: 'Joá',
    city: 'Rio de Janeiro',
    addressSnippet: 'Estrada do Joá, Falésias do Mar',
    mainImage: villaJardins,
    gallery: [
      villaJardins,
      penthouseTerrace,
      mansionGolf
    ],
    featured: true,
    exclusive: true,
    highlightTag: 'Vista eterna para o Oceano e Falésia',
    description: 'Residência escultórica incrustada na encosta do Joá com integração total entre natureza e concreto pigmentado. Piscina em balanço sobre o mar, suítes com varandas suspensas e paisagismo tropical nativo exuberante.',
    architecturalDetails: [
      'Concreto aparente ripado com madeira Cumaru certificada',
      'Piscina com borda infinita de 18 metros voltada para o mar',
      'Caixilhos minimalistas piso-teto em vidro duplo acústico',
      'Adega subterrânea climatizada em rocha natural'
    ],
    amenities: [
      'Piscina infinita aquecida com borda de vidro',
      'Heliponto homologado a 3 minutos do helisuporte',
      'Adega para 900 garrafas escavada na rocha',
      'Cinema privativo com isolamento acústico para 12 lugares',
      'Área wellness com sauna a vapor integrada à piscina'
    ],
    buildingStructure: [
      'Condomínio fechado com guarita e segurança armada 24h',
      'Sistema de monitoramento perimetral termográfico',
      'Gerador de emergência trifásico dedicado',
      'Casa de apoio para equipe de caseiro e motorista independente'
    ],
    yearBuilt: 2023,
    sunExposure: 'Face Leste/Norte — vista panorâmica para o nascer do sol',
    energyEfficiency: 'Reúso de águas pluviais e sistema fotovoltaico de 15kWp'
  },
  {
    id: 'prop-3',
    code: 'VP-304',
    title: 'Residência Horizonte Verde Condomínio',
    type: 'Casa em Condomínio',
    purpose: 'venda',
    price: 16800000,
    condoFee: 5400,
    iptu: 38000,
    area: 650,
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parkingSpots: 6,
    neighborhood: 'Fazenda Boa Vista',
    city: 'Porto Feliz / SP',
    addressSnippet: 'Alameda dos Ipês, Alameda do Golfe',
    mainImage: mansionGolf,
    gallery: [
      mansionGolf,
      villaJardins,
      heroPenthouse
    ],
    featured: true,
    exclusive: false,
    highlightTag: 'Frente para o Campo de Golfe Arnold Palmer',
    description: 'Arquitetura biofílica térrea com ventilação cruzada e vãos livres imponentes. Jardim interno com espelho d’água, varanda com lareira ecológica suspensa e integração direta com o fairground do campo de golfe.',
    architecturalDetails: [
      'Planta linear 100% térrea com acessibilidade total',
      'Estrutura em madeira engenheirada MLC e vidro laminado',
      'Espelho d’água de 40m² integrado ao hall de entrada',
      'Banheiros das suítes com claraboias zenitais para o céu'
    ],
    amenities: [
      'Piscina aquecida com prainha para crianças',
      'Fire pit externo escavado no gramado',
      'Espaço gourmet com churrasqueira e forno de pizza iglu',
      'Quadra de beach tennis privativa',
      'Garagem com 2 pontos de recarga para buggy e elétrico'
    ],
    buildingStructure: [
      'Condomínio com centro hípico internacional',
      'Campo de golfe com 18 buracos assinado por Arnold Palmer',
      'Clube privativo com spa Fasano e quadras de saibro',
      'Segurança e ronda monitorada 24 horas por dia'
    ],
    yearBuilt: 2025,
    sunExposure: 'Face Norte — iluminação tênue sem aquecimento excessivo',
    energyEfficiency: 'Certificação Green Building Council Brasil Ouro'
  },
  {
    id: 'prop-4',
    code: 'VP-109',
    title: 'Loft Arquitetônico Faria Lima',
    type: 'Loft Arquitetônico',
    purpose: 'aluguel',
    price: 28000,
    condoFee: 3200,
    iptu: 1400,
    area: 210,
    bedrooms: 2,
    suites: 2,
    bathrooms: 3,
    parkingSpots: 3,
    neighborhood: 'Itaim Bibi',
    city: 'São Paulo',
    addressSnippet: 'Rua Pedroso Alvarenga, Itaim Bibi',
    mainImage: loftArchitectural,
    gallery: [
      loftArchitectural,
      heroPenthouse,
      penthouseTerrace
    ],
    featured: false,
    exclusive: true,
    highlightTag: 'Mobiliado com design assinado',
    description: 'Um loft cosmopolita inspirado nas melhores propostas de Tribeca e Berlim, reinterpretadas com a elegância do design modernista brasileiro. Pé-direito duplo, estante metálica de 5 metros e cozinha gourmet com bancada em Dekton.',
    architecturalDetails: [
      'Pé-direito de 5.8m com mezanino em aço carbono',
      'Piso em microcimento usinado com acabamento acetinado',
      'Mobiliário autoral Sérgio Rodrigues, Jader Almeida e Lina Bo Bardi',
      'Isolamento acústico de alta performance nos caixilhos'
    ],
    amenities: [
      'Varanda lounge integrada à sala por portas pivotantes',
      'Cozinha com eletrodomésticos embutidos Gorenje / Gaggenau',
      'Home theater com projetor laser 4K embutido no teto',
      'Fechadura digital com reconhecimento facial'
    ],
    buildingStructure: [
      'Rooftop com piscina de raia e vista 360° para São Paulo',
      'Concierge bilíngue 24 horas',
      'Academia com personal trainer residente',
      'Meeting room privativa para reuniões executivas'
    ],
    yearBuilt: 2022,
    sunExposure: 'Face Leste — sol suave da manhã',
    energyEfficiency: 'Sistema inverter VRF e iluminação 100% LED automatizada'
  },
  {
    id: 'prop-5',
    code: 'VP-403',
    title: 'Apartamento Garden Vila Nova Conceição',
    type: 'Apartamento',
    purpose: 'venda',
    price: 13500000,
    condoFee: 9800,
    iptu: 34000,
    area: 390,
    bedrooms: 3,
    suites: 3,
    bathrooms: 5,
    parkingSpots: 4,
    neighborhood: 'Vila Nova Conceição',
    city: 'São Paulo',
    addressSnippet: 'Praça Pereira Coutinho, Vila Nova Conceição',
    mainImage: heroPenthouse,
    gallery: [
      heroPenthouse,
      villaJardins,
      loftArchitectural
    ],
    featured: true,
    exclusive: true,
    highlightTag: 'A 200m da Praça Pereira Coutinho',
    description: 'Sensação de morar em uma casa térrea suspensa com o conforto e a segurança inabalável de um edifício de altíssimo padrão. Jardim privativo externo de 120m² assinado por Burle Marx e ampla varanda conectada ao living social.',
    architecturalDetails: [
      'Jardim privativo de 120m² com irrigação automatizada',
      'Living com 4 ambientes integrados e piso em assoalho de Cumaru',
      'Cozinha com ilha central e copa independente',
      'Suíte master com 2 closets Sr. e Sra. separados'
    ],
    amenities: [
      'Jacuzzi aquecida privativa no jardim externo',
      'Varanda gourmet com churrasqueira de inox embutida',
      'Persianas motorizadas integradas à automação',
      'Adega para 300 garrafas'
    ],
    buildingStructure: [
      'Edifício exclusivo com apenas 1 apartamento por andar',
      'Guarita blindada com monitoramento 24h',
      'Piscina aquecida coberta no térreo',
      'Depósito privativo de 15m² na garagem'
    ],
    yearBuilt: 2021,
    sunExposure: 'Face Norte/Oeste — sol radiante na área externa',
    energyEfficiency: 'Aquecimento central solar com apoio a gás'
  },
  {
    id: 'prop-6',
    code: 'VP-910',
    title: 'Cobertura Linear Atlântica Leblon',
    type: 'Cobertura',
    purpose: 'venda',
    price: 32000000,
    condoFee: 16500,
    iptu: 75000,
    area: 480,
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parkingSpots: 5,
    neighborhood: 'Leblon',
    city: 'Rio de Janeiro',
    addressSnippet: 'Avenida Delfim Moreira, Posto 12',
    mainImage: penthouseTerrace,
    gallery: [
      penthouseTerrace,
      villaJardins,
      heroPenthouse
    ],
    featured: true,
    exclusive: true,
    highlightTag: 'Frente mar com vista para o Morro Dois Irmãos',
    description: 'A quintessência do luxo carioca. Cobertura linear com planta circular perfeita debruçada sobre as areias do Leblon. Área externa generosa com deck de madeira naval, piscina com borda de vidro e vista panorâmica ininterrupta do oceano.',
    architecturalDetails: [
      'Planta linear contínua sem escadas internas',
      'Revestimentos nobres importados da Itália e Grécia',
      'Living frontal com 14 metros lineares de vidro panorâmico',
      'Banheiro master com vista para o mar e banheira de imersão esculpida'
    ],
    amenities: [
      'Piscina privativa aquecida com visor transparente',
      'Sauna úmida com vista para as ilhas Cagarras',
      'Espaço gourmet externo com balcão de chopp embutido',
      'Elevador exclusivo que chega diretamente no hall interno privativo'
    ],
    buildingStructure: [
      'Segurança armada de alto nível com reconhecimento facial',
      'Portaria 24 horas impecável',
      'Box náutico exclusivo para pranchas e equipamentos',
      '5 vagas de garagem demarcadas e soltas'
    ],
    yearBuilt: 2023,
    sunExposure: 'Face Leste — primeira luz da aurora sobre o mar',
    energyEfficiency: 'Sistema inteligente de gestão de energia e climatização sustentável'
  },
  {
    id: 'prop-7',
    code: 'VP-220',
    title: 'Residência Contemporânea Alphaville Tamboré',
    type: 'Casa em Condomínio',
    purpose: 'aluguel',
    price: 45000,
    condoFee: 4200,
    iptu: 1800,
    area: 720,
    bedrooms: 5,
    suites: 5,
    bathrooms: 7,
    parkingSpots: 6,
    neighborhood: 'Alphaville',
    city: 'Barueri / SP',
    addressSnippet: 'Residencial Tamboré 3, Alameda das Quaresmeiras',
    mainImage: mansionGolf,
    gallery: [
      mansionGolf,
      loftArchitectural,
      villaJardins
    ],
    featured: false,
    exclusive: false,
    highlightTag: 'Locação de alto padrão em condomínio fechado',
    description: 'Residência imponente com traços arquitetônicos contemporâneos, brises móveis de alumínio amadeirado e jardim com palmeiras imperiais. Completa infraestrutura de lazer privativo com piscina semiolímpica aquecida e cinema privativo.',
    architecturalDetails: [
      'Brises articulados de controle solar com alta durabilidade',
      'Piscina semiolímpica com raia de 20 metros e iluminação RGB',
      'Escada helicoidal escultural em concreto usinado',
      'Living integrado com pé-direito de 7 metros'
    ],
    amenities: [
      'Piscina aquecida com prainha molhada',
      'Cinema particular climatizado para 10 convidados',
      'Espaço gourmet com ilha central e bancadas em Silestone',
      'Academia privativa equipada'
    ],
    buildingStructure: [
      'Condomínio mais seguro e exclusivo de Tamboré',
      'Controle de acesso por biometria e reconhecimento de placas',
      'Quadras de tênis, pista de cooper e lagos ornamentais',
      'Vigilância motorizada 24h com centro de operações táticas'
    ],
    yearBuilt: 2024,
    sunExposure: 'Face Norte — luminosidade perfeita o dia inteiro',
    energyEfficiency: 'Painéis fotovoltaicos capazes de zerar a conta de luz'
  },
  {
    id: 'prop-8',
    code: 'VP-618',
    title: 'Apartamento Moema Pássaros Alto Padrão',
    type: 'Apartamento',
    purpose: 'venda',
    price: 7400000,
    condoFee: 4800,
    iptu: 19500,
    area: 285,
    bedrooms: 3,
    suites: 3,
    bathrooms: 5,
    parkingSpots: 4,
    neighborhood: 'Moema',
    city: 'São Paulo',
    addressSnippet: 'Rua Canário, Moema Pássaros',
    mainImage: loftArchitectural,
    gallery: [
      loftArchitectural,
      heroPenthouse,
      penthouseTerrace
    ],
    featured: false,
    exclusive: true,
    highlightTag: 'Totalmente reformado por escritório de renome',
    description: 'Localização privilegiada na parte plana e nobre de Moema Pássaros. Imóvel reformado integralmente com marcenaria sob medida em freijó natural, varanda gourmet integrada e vista livre para a copa das árvores.',
    architecturalDetails: [
      'Marcenaria arquitetônica completa em lâmina natural de freijó',
      'Varanda nivelada com o piso da sala em porcelanato de grande formato',
      'Isolamento acústico de piso entre os pavimentos',
      'Ar condicionado dutado invisível no living e suítes'
    ],
    amenities: [
      'Varanda gourmet envidraçada com churrasqueira a gás',
      'Suíte master com closet amplo e banheira freestanding',
      'Cozinha planejada com despensa ventilada',
      'Depósito privativo individual no subsolo'
    ],
    buildingStructure: [
      'Edifício neoclássico atualizado com lazer completo',
      'Piscina climatizada semiolímpica com solarium',
      'Salão de festas decorado e espaço gourmet para eventos',
      'Vagas demarcadas e livres com box privativo'
    ],
    yearBuilt: 2020,
    sunExposure: 'Face Oeste — belíssimo pôr do sol na varanda',
    energyEfficiency: 'Medição individualizada de água e gás'
  }
];

export const NEIGHBORHOODS = [
  'Todos os Bairros',
  'Jardins',
  'Itaim Bibi',
  'Vila Nova Conceição',
  'Leblon',
  'Joá',
  'Fazenda Boa Vista',
  'Alphaville',
  'Moema'
];

export const PROPERTY_TYPES = [
  'Todos os Tipos',
  'Penthouse Duplex',
  'Cobertura',
  'Apartamento',
  'Villa Contemporânea',
  'Casa em Condomínio',
  'Loft Arquitetônico'
];

export const AMENITIES_LIST = [
  'Piscina privativa',
  'Rooftop',
  'Adega climatizada',
  'Varanda gourmet',
  'Automação residencial',
  'Heliponto / Acesso náutico',
  'Cinema privativo',
  'Gerador full',
  'Academia privativa',
  'Mobiliado'
];
