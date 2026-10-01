import React, { useState } from 'react';
import { Filter, X, SlidersHorizontal, RotateCcw, Check, Sparkles } from 'lucide-react';
import { FilterState } from '../types';
import { NEIGHBORHOODS, PROPERTY_TYPES, AMENITIES_LIST } from '../data/properties';
import { formatCurrencyBRL } from '../utils/comparatorEngine';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const activeFilterCount = [
    filters.purpose !== 'all',
    filters.type !== '',
    filters.neighborhood !== '',
    filters.minPrice > 0,
    filters.maxPrice < 999999999,
    filters.minArea > 0,
    filters.bedrooms !== 'all',
    filters.parkingSpots !== 'all',
    filters.selectedAmenities.length > 0
  ].filter(Boolean).length;

  const toggleAmenity = (amenity: string) => {
    const next = filters.selectedAmenities.includes(amenity)
      ? filters.selectedAmenities.filter(a => a !== amenity)
      : [...filters.selectedAmenities, amenity];
    onFilterChange({ selectedAmenities: next });
  };

  return (
    <div className="space-y-4">
      {/* Primary Clean Control Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-stone-200">
        
        {/* Left: Quick Pills / Tabs for purpose */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => onFilterChange({ purpose: 'all' })}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              filters.purpose === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Todos os Imóveis
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ purpose: 'venda' })}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              filters.purpose === 'venda'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Comprar
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ purpose: 'aluguel' })}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              filters.purpose === 'aluguel'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Alugar
          </button>
        </div>

        {/* Center / Right: Result count, Sort selector & Filter trigger */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <div className="text-xs text-stone-500 font-medium">
            <span className="font-semibold text-stone-900 font-mono">{totalFilteredCount}</span>{' '}
            {totalFilteredCount === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}
          </div>

          <div className="flex items-center gap-2">
            {/* Sorting */}
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-stone-50 border border-stone-200 text-xs text-stone-800 rounded px-2.5 py-1.5 font-medium focus:outline-none focus:ring-1 focus:ring-stone-800"
            >
              <option value="featured">Em Destaque</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="area-desc">Maior Metragem (m²)</option>
              <option value="price-per-m2">Menor R$/m²</option>
            </select>

            {/* Advanced Filters Button */}
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(true)}
              className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors ${
                activeFilterCount > 0
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros</span>
              {activeFilterCount > 0 && (
                <span className="bg-amber-800 text-white px-1.5 py-0.2 rounded-full text-[10px] font-mono">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={onResetFilters}
                className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded"
                title="Limpar todos os filtros"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters Modal / Drawer */}
      {isAdvancedOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-900 font-display">
                  Filtros Avançados de Busca
                </h3>
                <p className="text-xs text-stone-500">
                  Refine sua procura por localização, dimensões e comodidades
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAdvancedOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-stone-800">
              
              {/* Row 1: Neighborhood and Property Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Bairro / Região
                  </label>
                  <select
                    value={filters.neighborhood}
                    onChange={(e) => onFilterChange({ neighborhood: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-lg px-3 py-2"
                  >
                    {NEIGHBORHOODS.map((n) => (
                      <option key={n} value={n === 'Todos os Bairros' ? '' : n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Tipologia
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => onFilterChange({ type: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-900 text-sm rounded-lg px-3 py-2"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t === 'Todos os Tipos' ? '' : t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Bedrooms and Parking Spots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Quartos / Suítes Mínimas
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(['all', 2, 3, 4, 5] as const).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => onFilterChange({ bedrooms: num })}
                        className={`py-2 text-xs font-semibold rounded border transition-colors ${
                          filters.bedrooms === num
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {num === 'all' ? 'Todos' : `${num}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Vagas de Garagem Mínimas
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(['all', 3, 4, 5, 6] as const).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => onFilterChange({ parkingSpots: num })}
                        className={`py-2 text-xs font-semibold rounded border transition-colors ${
                          filters.parkingSpots === num
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {num === 'all' ? 'Todas' : `${num}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: Minimum Area */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1.5">
                  <span>Área Mínima Privativa</span>
                  <span className="font-mono text-stone-900">
                    {filters.minArea > 0 ? `${filters.minArea} m²` : 'Sem restrição'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="800"
                  step="50"
                  value={filters.minArea}
                  onChange={(e) => onFilterChange({ minArea: Number(e.target.value) })}
                  className="w-full accent-stone-900 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-1">
                  <span>0 m²</span>
                  <span>250 m²</span>
                  <span>500 m²</span>
                  <span>800 m²</span>
                </div>
              </div>

              {/* Row 4: Amenities Multi-select */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Diferenciais e Comodidades Exclusivas
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {AMENITIES_LIST.map((amenity) => {
                    const selected = filters.selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-2 rounded border text-left text-xs font-medium flex items-center justify-between transition-colors ${
                          selected
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <span>{amenity}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-amber-300" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onResetFilters}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline underline-offset-2"
              >
                Limpar todos os filtros
              </button>

              <button
                type="button"
                onClick={() => setIsAdvancedOpen(false)}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                Ver {totalFilteredCount} Imóveis Filtrados
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
