import React from 'react';
import { Heart, Scale, Check, BedDouble, Bath, Car, Maximize2, MapPin, ArrowUpRight } from 'lucide-react';
import { Property } from '../types';
import { formatCurrencyBRL, calculatePricePerM2 } from '../utils/comparatorEngine';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  isInComparison: boolean;
  canAddToComparison: boolean;
  onToggleFavorite: (propertyId: string) => void;
  onToggleComparison: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  isInComparison,
  canAddToComparison,
  onToggleFavorite,
  onToggleComparison,
  onSelectProperty,
}) => {
  const pricePerM2 = calculatePricePerM2(property);

  return (
    <article className="group bg-white rounded-lg border border-stone-200/90 overflow-hidden transition-all duration-300 hover:border-stone-400 hover:shadow-md flex flex-col justify-between">
      
      {/* Image Container with high-fidelity visual presentation */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={property.mainImage}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Purpose & Type badge overlay (Clean minimal tag) */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-900/90 text-stone-100 backdrop-blur-sm">
            {property.purpose === 'venda' ? 'Venda' : 'Locação'}
          </span>
          {property.exclusive && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-900/85 text-amber-100 backdrop-blur-sm">
              Exclusividade
            </span>
          )}
        </div>

        {/* Favorite & Comparison Quick Floating Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
              isFavorite
                ? 'bg-red-50 text-red-600 shadow-sm'
                : 'bg-stone-900/60 text-white hover:bg-stone-900/90'
            }`}
            title={isFavorite ? 'Remover dos favoritos' : 'Salvar imóvel'}
            aria-label="Favoritar Imóvel"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-red-600' : ''}`} />
          </button>
        </div>

        {/* Image Scrim & Hover hint */}
        <div 
          onClick={() => onSelectProperty(property)} 
          className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
        >
          <span className="px-3 py-1.5 bg-stone-900/90 text-white text-xs font-semibold rounded backdrop-blur-sm flex items-center gap-1 shadow">
            Visualizar detalhes <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Property Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Top: Location & Code */}
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="flex items-center gap-1 font-medium text-stone-700">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {property.neighborhood}, {property.city}
            </span>
            <span className="font-mono text-stone-400 text-[11px]">
              {property.code}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProperty(property)}
            className="text-base font-semibold text-stone-900 font-display line-clamp-1 hover:text-amber-800 cursor-pointer transition-colors"
          >
            {property.title}
          </h3>

          {/* Architectural Highlight Kicker */}
          <p className="mt-1 text-xs text-stone-500 line-clamp-1 italic">
            "{property.highlightTag}"
          </p>
        </div>

        {/* Metrics Grid: Area, Suites, Bath, Parking (Tabular numerals, anti-slop) */}
        <div className="grid grid-cols-4 py-3 border-y border-stone-100 text-stone-700 text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider">Área</span>
            <span className="font-mono font-semibold text-stone-900">{property.area} m²</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider">Suítes</span>
            <span className="font-mono font-semibold text-stone-900">{property.suites}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider">Banh.</span>
            <span className="font-mono font-semibold text-stone-900">{property.bathrooms}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider">Vagas</span>
            <span className="font-mono font-semibold text-stone-900">{property.parkingSpots}</span>
          </div>
        </div>

        {/* Pricing & Comparison Action Footer */}
        <div className="pt-1 flex items-end justify-between gap-2">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-medium">
              {property.purpose === 'venda' ? 'Valor de Venda' : 'Aluguel Mensal'}
            </span>
            <div className="font-mono font-bold text-lg text-stone-950 leading-tight">
              {formatCurrencyBRL(property.price)}
            </div>
            <span className="text-[11px] font-mono text-stone-400">
              {formatCurrencyBRL(pricePerM2)}/m²
            </span>
          </div>

          {/* Compare Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComparison(property);
            }}
            disabled={!isInComparison && !canAddToComparison}
            className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-all ${
              isInComparison
                ? 'bg-amber-900 text-white shadow-sm ring-1 ring-amber-900'
                : canAddToComparison
                ? 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
            }`}
            title={
              isInComparison
                ? 'Remover do comparador'
                : canAddToComparison
                ? 'Adicionar ao comparador inteligente'
                : 'Limite de 3 imóveis no comparador atingido'
            }
          >
            {isInComparison ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Comparando</span>
              </>
            ) : (
              <>
                <Scale className="w-3.5 h-3.5 text-stone-600" />
                <span>Comparar</span>
              </>
            )}
          </button>
        </div>

      </div>
    </article>
  );
};
