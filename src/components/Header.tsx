import React, { useState } from 'react';
import { Compass, Heart, Scale, Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  favoritesCount: number;
  comparisonCount: number;
  onOpenComparator: () => void;
  onOpenFavorites: () => void;
  onOpenContact: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  favoritesCount,
  comparisonCount,
  onOpenComparator,
  onOpenFavorites,
  onOpenContact,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
          className="group flex items-center gap-2.5 text-stone-900 transition-colors"
        >
          <span className="w-8 h-8 rounded-none border border-stone-900 flex items-center justify-center text-xs font-semibold tracking-widest bg-stone-900 text-stone-50 group-hover:bg-stone-800 transition-colors">
            VP
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight font-display text-stone-950">
              VÉRTICE PRIME
            </span>
            <span className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">
              Curadoria Imobiliária
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button 
            onClick={() => handleNavClick('imoveis')} 
            className="hover:text-stone-950 transition-colors cursor-pointer"
          >
            Imóveis Exclusivos
          </button>
          <button 
            onClick={() => handleNavClick('comparador')} 
            className="hover:text-stone-950 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            Comparador
            {comparisonCount > 0 && (
              <span className="text-xs font-semibold text-stone-900 bg-stone-200 px-1.5 py-0.5 rounded">
                {comparisonCount}/3
              </span>
            )}
          </button>
          <button 
            onClick={() => handleNavClick('lifestyle')} 
            className="hover:text-stone-950 transition-colors cursor-pointer"
          >
            Estilo de Vida
          </button>
          <button 
            onClick={() => handleNavClick('diferenciais')} 
            className="hover:text-stone-950 transition-colors cursor-pointer"
          >
            Nossa Assessoria
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-md transition-colors"
            title="Imóveis Salvos"
            aria-label="Ver Imóveis Salvos"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Quick Comparator Trigger (Desktop) */}
          <button
            onClick={onOpenComparator}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded transition-colors"
            title="Comparador Inteligente"
          >
            <Scale className="w-4 h-4 text-stone-700" />
            <span>Comparar</span>
            <span className="text-stone-500 font-mono text-[11px]">({comparisonCount})</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenContact}
            className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors whitespace-nowrap shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-stone-300" />
            <span>Falar com Concierge</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-800 hover:bg-stone-100 rounded"
            aria-label="Menu de Navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FBFBFA] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-stone-800">
            <button 
              onClick={() => handleNavClick('imoveis')} 
              className="text-left py-2 border-b border-stone-100 hover:text-stone-950"
            >
              Imóveis Exclusivos
            </button>
            <button 
              onClick={() => { handleNavClick('comparador'); onOpenComparator(); }} 
              className="text-left py-2 border-b border-stone-100 flex items-center justify-between"
            >
              <span>Comparador Inteligente</span>
              <span className="text-xs font-semibold bg-stone-200 px-2 py-0.5 rounded text-stone-800">
                {comparisonCount} selecionado(s)
              </span>
            </button>
            <button 
              onClick={() => handleNavClick('lifestyle')} 
              className="text-left py-2 border-b border-stone-100 hover:text-stone-950"
            >
              Curadoria por Estilo de Vida
            </button>
            <button 
              onClick={() => handleNavClick('diferenciais')} 
              className="text-left py-2 border-b border-stone-100 hover:text-stone-950"
            >
              Nossa Assessoria & Confiança
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-stone-900 rounded hover:bg-stone-800 transition-colors"
            >
              Falar com Concierge VIP
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenFavorites(); }}
              className="w-full py-2.5 text-center text-sm font-medium text-stone-700 bg-stone-100 border border-stone-200 rounded"
            >
              Imóveis Salvos ({favoritesCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
