import React from 'react';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';
import { Property } from '../types';
import { formatCurrencyBRL } from '../utils/comparatorEngine';

interface ComparatorDrawerProps {
  selectedProperties: Property[];
  onRemoveProperty: (propertyId: string) => void;
  onClearAll: () => void;
  onOpenModal: () => void;
}

export const ComparatorDrawer: React.FC<ComparatorDrawerProps> = ({
  selectedProperties,
  onRemoveProperty,
  onClearAll,
  onOpenModal
}) => {
  if (selectedProperties.length === 0) return null;

  const canCompare = selectedProperties.length >= 2;

  return (
    <aside 
      aria-label="Barra do Comparador Inteligente"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl bg-stone-900 text-white rounded-xl shadow-2xl border border-stone-700/60 p-3 sm:p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Summary & Thumbnails */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-stone-800 rounded-lg text-amber-300">
              <Scale className="w-5 h-5" />
            </span>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-200">
                Comparador Inteligente
              </div>
              <div className="text-xs text-stone-400">
                {selectedProperties.length} de 3 imóveis selecionados
              </div>
            </div>
          </div>

          {/* Thumbnails row */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 flex-1 sm:flex-initial">
            {selectedProperties.map((prop) => (
              <div
                key={prop.id}
                className="group relative flex items-center gap-2 bg-stone-800/90 rounded-md p-1.5 pr-2.5 border border-stone-700 text-xs shrink-0"
              >
                <img
                  src={prop.mainImage}
                  alt={prop.title}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded object-cover"
                />
                <div className="max-w-[110px] sm:max-w-[130px] truncate">
                  <div className="font-medium text-stone-200 truncate">{prop.title}</div>
                  <div className="text-[10px] font-mono text-stone-400">{formatCurrencyBRL(prop.price)}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveProperty(prop.id)}
                  className="text-stone-400 hover:text-white p-0.5 rounded transition-colors ml-1"
                  title="Remover do comparador"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Empty slots placeholders */}
            {Array.from({ length: 3 - selectedProperties.length }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="hidden md:flex items-center justify-center w-24 h-11 border border-dashed border-stone-700 rounded-md text-[11px] text-stone-500 text-center px-1"
              >
                + Espaço {selectedProperties.length + idx + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onClearAll}
            className="p-2 text-stone-400 hover:text-stone-200 text-xs transition-colors flex items-center gap-1"
            title="Limpar seleção"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Limpar</span>
          </button>

          <button
            type="button"
            onClick={onOpenModal}
            disabled={!canCompare}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow ${
              canCompare
                ? 'bg-amber-600 hover:bg-amber-500 text-white cursor-pointer'
                : 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
            }`}
          >
            <span>{canCompare ? 'Comparar Opções' : 'Selecione 2+'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
