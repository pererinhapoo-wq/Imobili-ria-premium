import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { PropertyCard } from './components/PropertyCard';
import { ComparatorDrawer } from './components/ComparatorDrawer';
import { ComparatorModal } from './components/ComparatorModal';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { LifestyleCurator } from './components/LifestyleCurator';
import { WhyVertice } from './components/WhyVertice';
import { Footer } from './components/Footer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';
import { PROPERTIES } from './data/properties';
import { Property, FilterState } from './types';
import { calculatePricePerM2 } from './utils/comparatorEngine';
import { Scale, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  purpose: 'all',
  type: '',
  neighborhood: '',
  minPrice: 0,
  maxPrice: 999999999,
  minArea: 0,
  bedrooms: 'all',
  parkingSpots: 'all',
  selectedAmenities: [],
  sortBy: 'featured',
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [comparisonIds, setComparisonIds] = useState<string[]>(['prop-1', 'prop-2']); // Initial 2 items ready for comparison!
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['prop-1', 'prop-6']);
  const [selectedPropertyForDetail, setSelectedPropertyForDetail] = useState<Property | null>(null);
  const [isComparatorModalOpen, setIsComparatorModalOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger toast with auto-dismiss
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Filter properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      // Purpose
      if (filters.purpose !== 'all' && prop.purpose !== filters.purpose) {
        return false;
      }
      // Type
      if (filters.type && filters.type !== 'Todos os Tipos' && prop.type !== filters.type) {
        return false;
      }
      // Neighborhood
      if (filters.neighborhood && filters.neighborhood !== 'Todos os Bairros' && prop.neighborhood !== filters.neighborhood) {
        return false;
      }
      // Price
      if (prop.price > filters.maxPrice || prop.price < filters.minPrice) {
        return false;
      }
      // Area
      if (filters.minArea > 0 && prop.area < filters.minArea) {
        return false;
      }
      // Bedrooms
      if (filters.bedrooms !== 'all' && prop.bedrooms < filters.bedrooms) {
        return false;
      }
      // Parking spots
      if (filters.parkingSpots !== 'all' && prop.parkingSpots < filters.parkingSpots) {
        return false;
      }
      // Amenities
      if (filters.selectedAmenities.length > 0) {
        const matchesAmenities = filters.selectedAmenities.every((amenity) =>
          prop.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase().slice(0, 7)))
        );
        if (!matchesAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'area-desc':
          return b.area - a.area;
        case 'price-per-m2':
          return calculatePricePerM2(a) - calculatePricePerM2(b);
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }, [filters]);

  // Selected properties for comparison
  const selectedComparisonProperties = useMemo(() => {
    return PROPERTIES.filter((p) => comparisonIds.includes(p.id));
  }, [comparisonIds]);

  // Selected favorites
  const favoriteProperties = useMemo(() => {
    return PROPERTIES.filter((p) => favoriteIds.includes(p.id));
  }, [favoriteIds]);

  // Comparison toggle handler
  const handleToggleComparison = (property: Property) => {
    if (comparisonIds.includes(property.id)) {
      setComparisonIds((prev) => prev.filter((id) => id !== property.id));
      showToast(`Removido do comparador: ${property.title}`);
    } else {
      if (comparisonIds.length >= 3) {
        showToast('Máximo de 3 imóveis no comparador. Remova um para adicionar outro.');
        return;
      }
      setComparisonIds((prev) => [...prev, property.id]);
      showToast(`Adicionado ao comparador (${comparisonIds.length + 1}/3): ${property.title}`);
    }
  };

  // Remove single property from comparison
  const handleRemoveFromComparison = (propertyId: string) => {
    setComparisonIds((prev) => prev.filter((id) => id !== propertyId));
  };

  // Clear all in comparison
  const handleClearComparison = () => {
    setComparisonIds([]);
    showToast('Comparador limpo.');
  };

  // Favorite toggle handler
  const handleToggleFavorite = (propertyId: string) => {
    if (favoriteIds.includes(propertyId)) {
      setFavoriteIds((prev) => prev.filter((id) => id !== propertyId));
      showToast('Imóvel removido dos favoritos.');
    } else {
      setFavoriteIds((prev) => [...prev, propertyId]);
      showToast('Imóvel salvo nos seus favoritos!');
    }
  };

  // Filter updates
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    showToast('Filtros redefinidos.');
  };

  // Smooth scroll
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'comparador') {
      setIsComparatorModalOpen(true);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const spotlightProperty = PROPERTIES[0]; // Penthouse Duplex Skyview Jardins

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-stone-900 selection:bg-amber-900/20">
      
      {/* Universal Top Bar Contract */}
      <Header
        favoritesCount={favoriteIds.length}
        comparisonCount={comparisonIds.length}
        onOpenComparator={() => setIsComparatorModalOpen(true)}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero Section */}
      <Hero
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearchSubmit={() => handleNavigateSection('imoveis')}
        onSelectProperty={(prop) => setSelectedPropertyForDetail(prop)}
        spotlightProperty={spotlightProperty}
        totalPropertiesCount={PROPERTIES.length}
      />

      {/* Main Properties Exploration Section */}
      <main id="imoveis" className="flex-1 py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Acervo de Propriedades
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 font-display">
              Residências Selecionadas
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-normal">
              Utilize os filtros para encontrar a configuração ideal e compare até 3 opções simultaneamente.
            </p>
          </div>

          {/* Quick comparator status pill */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsComparatorModalOpen(true)}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-900 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
            >
              <Scale className="w-4 h-4 text-stone-700" />
              <span>Ver Comparador Inteligente</span>
              <span className="bg-stone-900 text-white px-1.5 py-0.2 rounded text-[11px] font-mono">
                {comparisonIds.length}/3
              </span>
            </button>
          </div>
        </div>

        {/* Filter Bar with Segmented Controls & Drawer */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalFilteredCount={filteredProperties.length}
        />

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-xl border border-stone-200 p-8 space-y-4">
            <SlidersHorizontal className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-base font-semibold text-stone-900 font-display">
              Nenhuma propriedade encontrada com os filtros selecionados
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Experimente ajustar o limite de valor, remover filtros de comodidades ou buscar em outros bairros.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
            >
              Redefinir Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isFavorite={favoriteIds.includes(prop.id)}
                isInComparison={comparisonIds.includes(prop.id)}
                canAddToComparison={comparisonIds.length < 3}
                onToggleFavorite={handleToggleFavorite}
                onToggleComparison={handleToggleComparison}
                onSelectProperty={(property) => setSelectedPropertyForDetail(property)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Interactive Lifestyle Curator */}
      <LifestyleCurator
        properties={PROPERTIES}
        onSelectLifestyle={(category) => {
          handleFilterChange({
            type: category === 'Cobertura' ? 'Cobertura' : '',
            neighborhood: category === 'Joá' || category === 'Fazenda Boa Vista' || category === 'Jardins' ? category : ''
          });
          handleNavigateSection('imoveis');
          showToast(`Filtro de estilo de vida aplicado: ${category}`);
        }}
        onSelectProperty={(property) => setSelectedPropertyForDetail(property)}
      />

      {/* Advisory & Credentials Section */}
      <WhyVertice onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Quiet Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Floating Comparator Dock at Bottom */}
      <ComparatorDrawer
        selectedProperties={selectedComparisonProperties}
        onRemoveProperty={handleRemoveFromComparison}
        onClearAll={handleClearComparison}
        onOpenModal={() => setIsComparatorModalOpen(true)}
      />

      {/* Full Comparator Modal with "O QUE MUDA ENTRE ELES?" */}
      {isComparatorModalOpen && (
        <ComparatorModal
          selectedProperties={selectedComparisonProperties}
          onClose={() => setIsComparatorModalOpen(false)}
          onRemoveProperty={handleRemoveFromComparison}
          onSelectProperty={(property) => {
            setIsComparatorModalOpen(false);
            setSelectedPropertyForDetail(property);
          }}
          onOpenSchedule={(property) => {
            setIsComparatorModalOpen(false);
            setSelectedPropertyForDetail(property);
          }}
        />
      )}

      {/* Full Property Detail Modal */}
      {selectedPropertyForDetail && (
        <PropertyDetailModal
          property={selectedPropertyForDetail}
          onClose={() => setSelectedPropertyForDetail(null)}
          isFavorite={favoriteIds.includes(selectedPropertyForDetail.id)}
          isInComparison={comparisonIds.includes(selectedPropertyForDetail.id)}
          canAddToComparison={comparisonIds.length < 3}
          onToggleFavorite={handleToggleFavorite}
          onToggleComparison={handleToggleComparison}
          onOpenComparator={() => {
            setSelectedPropertyForDetail(null);
            setIsComparatorModalOpen(true);
          }}
          onShowToast={showToast}
        />
      )}

      {/* Favorites Drawer */}
      {isFavoritesDrawerOpen && (
        <FavoritesDrawer
          favoriteProperties={favoriteProperties}
          onClose={() => setIsFavoritesDrawerOpen(false)}
          onRemoveFavorite={handleToggleFavorite}
          onSelectProperty={(property) => setSelectedPropertyForDetail(property)}
          onToggleComparison={handleToggleComparison}
          comparisonIds={comparisonIds}
        />
      )}

      {/* Contact / Concierge Modal */}
      {isContactModalOpen && (
        <ContactModal
          onClose={() => setIsContactModalOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notification */}
      <Toast message={toastMessage} />

    </div>
  );
}
