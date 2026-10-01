import React from 'react';
import { X, Heart, Trash2, ArrowRight, Scale, Check } from 'lucide-react';
import { Property } from '../types';
import { formatCurrencyBRL } from '../utils/comparatorEngine';

interface FavoritesDrawerProps {
  favoriteProperties: Property[];
  onClose: () => void;
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onToggleComparison: (property: Property) => void;
  comparisonIds: string[];
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  favoriteProperties,
  onClose,
  onRemoveFavorite,
  onSelectProperty,
  onToggleComparison,
  comparisonIds
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-stone-200">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-current" />
            <h3 className="text-base font-semibold text-stone-900 font-display">
              Imóveis Salvos ({favoriteProperties.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {favoriteProperties.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <Heart className="w-10 h-10 text-stone-300 stroke-[1.5]" />
              <div className="text-sm font-semibold text-stone-800">
                Nenhum imóvel salvo ainda
              </div>
              <p className="text-xs text-stone-500">
                Clique no ícone de coração nos cards de imóveis para salvá-los e acessá-los com facilidade.
              </p>
            </div>
          ) : (
            favoriteProperties.map((prop) => {
              const inComp = comparisonIds.includes(prop.id);
              return (
                <div
                  key={prop.id}
                  className="bg-stone-50 rounded-lg p-3 border border-stone-200 flex gap-3 items-center justify-between"
                >
                  <img
                    src={prop.mainImage}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded object-cover cursor-pointer"
                    onClick={() => {
                      onSelectProperty(prop);
                      onClose();
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        onSelectProperty(prop);
                        onClose();
                      }}
                      className="text-xs font-semibold text-stone-900 truncate hover:text-amber-800 cursor-pointer"
                    >
                      {prop.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-mono">
                      {formatCurrencyBRL(prop.price)}
                    </p>
                    <p className="text-[10px] text-stone-400">
                      {prop.neighborhood} · {prop.area} m²
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleComparison(prop)}
                        className={`text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                          inComp ? 'text-amber-900' : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {inComp ? (
                          <>
                            <Check className="w-3 h-3 text-amber-800" />
                            <span>No comparador</span>
                          </>
                        ) : (
                          <>
                            <Scale className="w-3 h-3" />
                            <span>+ Comparador</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveFavorite(prop.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 rounded transition-colors"
                    title="Remover dos favoritos"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {favoriteProperties.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg text-center"
            >
              Fechar Lista
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
