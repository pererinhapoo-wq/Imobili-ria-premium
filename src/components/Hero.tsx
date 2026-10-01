import React from 'react';
import { Search, SlidersHorizontal, MapPin, Building2, DollarSign, ArrowRight } from 'lucide-react';
import { Property, FilterState } from '../types';
import { NEIGHBORHOODS, PROPERTY_TYPES } from '../data/properties';
import heroPenthouse from '../assets/images/hero_luxury_penthouse_1790834541629.jpg';

interface HeroProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onSearchSubmit: () => void;
  onSelectProperty: (property: Property) => void;
  spotlightProperty: Property;
  totalPropertiesCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
  onSelectProperty,
  spotlightProperty,
  totalPropertiesCount
}) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/70 overflow-hidden bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Grid: Editorial Architecture + Spotlight Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Vision & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
              <span className="w-1.5 h-1.5 bg-amber-700 rounded-full" />
              <span>Curadoria de Alto Padrão · Brasil</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-[1.15] font-display text-balance">
              Imóveis de exceção para quem valoriza arquitetura autoral e segurança perene.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed font-normal">
              Uma seleção rigorosa de coberturas, residências de autor e villas contemporâneas nos endereços mais prestigiados do país. Encontre seu próximo refúgio ou compare investimentos com precisão técnica.
            </p>

            {/* Quick Metrics of Trust */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-600 border-t border-stone-200/80">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="font-semibold text-stone-900 font-mono text-sm">R$ 520M+</span>
                <span>em acervo exclusivo</span>
              </div>
              <span className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="font-semibold text-stone-900 font-mono text-sm">100%</span>
                <span>documentação auditada</span>
              </div>
              <span className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <span className="font-semibold text-stone-900 font-mono text-sm">Concierge VIP</span>
                <span>dedicado por cliente</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Visual Spotlight Card */}
          <div className="lg:col-span-5">
            <div 
              onClick={() => onSelectProperty(spotlightProperty)}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-stone-900 shadow-md border border-stone-200/60 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                <img
                  src={heroPenthouse}
                  alt={spotlightProperty.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Measured Scrim for Media Overlays (Anti-Slop rule: contrast 4.5:1) */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-stone-900/90 text-stone-50 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded backdrop-blur-sm border border-stone-700/50">
                    Oportunidade Singular
                  </span>
                  <span className="bg-amber-900/80 text-amber-100 text-[11px] font-medium px-2 py-1 rounded backdrop-blur-sm">
                    {spotlightProperty.neighborhood}
                  </span>
                </div>

                {/* Bottom Card Information */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs text-stone-300 flex items-center gap-2 mb-1">
                    <span>{spotlightProperty.type}</span>
                    <span>·</span>
                    <span className="font-mono">{spotlightProperty.area} m²</span>
                    <span>·</span>
                    <span>{spotlightProperty.suites} suítes</span>
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight text-white group-hover:text-amber-200 transition-colors font-display line-clamp-1">
                    {spotlightProperty.title}
                  </h2>
                  <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/15">
                    <span className="font-mono font-semibold text-base text-amber-100">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(spotlightProperty.price)}
                    </span>
                    <span className="text-xs text-white/90 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Ver detalhes <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Intelligent Search Console */}
        <div className="mt-12 bg-white rounded-xl shadow-lg shadow-stone-200/50 border border-stone-200 p-4 sm:p-6 transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-3">
            
            {/* Segmented controls for Purpose (Buttons with functional click handlers) */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg w-fit">
              <button
                type="button"
                onClick={() => onFilterChange({ purpose: 'all' })}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  filters.purpose === 'all'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Todos ({totalPropertiesCount})
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ purpose: 'venda' })}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  filters.purpose === 'venda'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Comprar
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ purpose: 'aluguel' })}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  filters.purpose === 'aluguel'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Alugar
              </button>
            </div>

            <div className="text-xs text-stone-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Acervo atualizado em tempo real</span>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            {/* Location Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                Localização / Bairro
              </label>
              <select
                value={filters.neighborhood}
                onChange={(e) => onFilterChange({ neighborhood: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-stone-800 transition-colors"
              >
                {NEIGHBORHOODS.map((n) => (
                  <option key={n} value={n === 'Todos os Bairros' ? '' : n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400" />
                Tipologia do Imóvel
              </label>
              <select
                value={filters.type}
                onChange={(e) => onFilterChange({ type: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-stone-800 transition-colors"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t === 'Todos os Tipos' ? '' : t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-stone-400" />
                Faixa de Investimento
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
                className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-stone-800 transition-colors"
              >
                <option value={999999999}>Qualquer Valor</option>
                <option value={50000}>Locações até R$ 50 mil/mês</option>
                <option value={10000000}>Venda até R$ 10 Milhões</option>
                <option value={20000000}>Venda até R$ 20 Milhões</option>
                <option value={35000000}>Venda até R$ 35 Milhões</option>
              </select>
            </div>

            {/* Search Action CTA */}
            <div>
              <button
                type="button"
                onClick={onSearchSubmit}
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Search className="w-4 h-4 text-stone-300" />
                <span>Explorar Imóveis</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
