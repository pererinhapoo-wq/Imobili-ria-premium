export type PropertyType = 
  | 'Apartamento' 
  | 'Cobertura' 
  | 'Casa em Condomínio' 
  | 'Villa Contemporânea' 
  | 'Loft Arquitetônico' 
  | 'Penthouse Duplex';

export type PropertyPurpose = 'venda' | 'aluguel';

export interface Property {
  id: string;
  code: string;
  title: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  price: number;
  condoFee: number;
  iptu: number;
  area: number; // in m²
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpots: number;
  neighborhood: string;
  city: string;
  addressSnippet: string;
  mainImage: string;
  gallery: string[];
  featured: boolean;
  exclusive: boolean;
  highlightTag: string;
  description: string;
  architecturalDetails: string[];
  amenities: string[];
  buildingStructure: string[];
  yearBuilt: number;
  sunExposure: string;
  energyEfficiency: string;
}

export interface FilterState {
  purpose: 'all' | 'venda' | 'aluguel';
  type: string;
  neighborhood: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  bedrooms: number | 'all';
  parkingSpots: number | 'all';
  selectedAmenities: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'price-per-m2';
}

export interface DifferenceInsight {
  category: 'area' | 'price' | 'value-per-m2' | 'bedrooms' | 'parking' | 'exclusive' | 'location' | 'monthly-cost';
  title: string;
  summary: string;
  leaderId?: string;
  leaderName?: string;
}
