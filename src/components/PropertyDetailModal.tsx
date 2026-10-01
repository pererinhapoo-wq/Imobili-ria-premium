import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Scale, 
  Check, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  Shield, 
  Maximize2, 
  BedDouble, 
  Bath, 
  Car, 
  Sun, 
  Compass, 
  Calculator,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { Property } from '../types';
import { formatCurrencyBRL, calculatePricePerM2 } from '../utils/comparatorEngine';

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
  isFavorite: boolean;
  isInComparison: boolean;
  canAddToComparison: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleComparison: (property: Property) => void;
  onOpenComparator: () => void;
  onShowToast: (msg: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isFavorite,
  isInComparison,
  canAddToComparison,
  onToggleFavorite,
  onToggleComparison,
  onOpenComparator,
  onShowToast
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mortgage Calculator State - Pre-defined rates for Premium Real Estate Market
  const PREMIUM_RATES = [
    {
      id: 'private',
      label: 'Private Banking Prime',
      rate: 9.49,
      description: 'Taxa especial para clientes com relacionamento alta renda / Private'
    },
    {
      id: 'sfh-premium',
      label: 'SFI / SFH Premium',
      rate: 9.95,
      description: 'Condição padrão de mercado para unidades acima de R$ 1,5M'
    },
    {
      id: 'mercado',
      label: 'Mercado Convencional',
      rate: 10.45,
      description: 'Taxa média de mercado sem exigência de reciprocidade bancária'
    }
  ];

  const [selectedRateId, setSelectedRateId] = useState<string>('private');
  const [amortizationSystem, setAmortizationSystem] = useState<'SAC' | 'PRICE'>('SAC');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 30%
  const [financingYears, setFinancingYears] = useState<number>(25); // 25 years

  // VIP Visit Scheduling Form State
  const [visitType, setVisitType] = useState<'presencial' | 'virtual'>('presencial');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredPeriod, setPreferredPeriod] = useState('Manhã (09h - 12h)');
  const [scheduleNotes, setScheduleNotes] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);

  // Effective calculation values
  const effectivePropertyPrice = property.purpose === 'venda' 
    ? property.price 
    : property.price * 200; // estimated market asset value for rental

  const selectedRateObj = PREMIUM_RATES.find(r => r.id === selectedRateId) || PREMIUM_RATES[0];
  const yearlyRatePercent = selectedRateObj.rate;
  const downPaymentValue = Math.round((effectivePropertyPrice * downPaymentPercent) / 100);
  const loanAmount = effectivePropertyPrice - downPaymentValue;
  const totalMonths = financingYears * 12;
  const monthlyRate = (yearlyRatePercent / 100) / 12;

  // SAC Calculations
  const monthlyAmortization = loanAmount / totalMonths;
  const firstInstallmentSAC = Math.round(monthlyAmortization + (loanAmount * monthlyRate));
  const lastInstallmentSAC = Math.round(monthlyAmortization + (monthlyAmortization * monthlyRate));

  // PRICE Calculations
  const fixedInstallmentPRICE = Math.round(
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const currentDisplayInstallment = amortizationSystem === 'SAC' ? firstInstallmentSAC : fixedInstallmentPRICE;
  const recommendedGrossIncome = Math.round(currentDisplayInstallment / 0.30); // 30% threshold

  const handleAttachSimulationToVIP = () => {
    const text = `Simulação realizada no portal: Entrada de ${formatCurrencyBRL(downPaymentValue)} (${downPaymentPercent}%), saldo de ${formatCurrencyBRL(loanAmount)} em ${financingYears} anos via ${amortizationSystem} com taxa de ${yearlyRatePercent}% a.a. (${selectedRateObj.label}).`;
    setScheduleNotes(text);
    onShowToast('Simulação vinculada ao agendamento de visita VIP abaixo!');
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      onShowToast('Por favor, informe ao menos seu nome e telefone.');
      return;
    }
    setIsScheduled(true);
    onShowToast(`Visita ${visitType === 'presencial' ? 'presencial' : 'virtual'} solicitada com sucesso!`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('Link do imóvel copiado para a área de transferência!');
  };

  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.mainImage];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="bg-[#FAF9F6] rounded-xl max-w-5xl w-full h-[95vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
              {property.code}
            </span>
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              {property.type} · {property.purpose === 'venda' ? 'Venda' : 'Locação'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              title="Compartilhar Imóvel"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Favorite */}
            <button
              type="button"
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-red-50 text-red-600'
                  : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title={isFavorite ? 'Remover dos favoritos' : 'Favoritar Imóvel'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-red-600' : ''}`} />
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          
          {/* Gallery Showcase */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-stone-900 shadow-sm">
              <img
                src={images[activeImageIndex]}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Prev / Next buttons */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-stone-900/60 hover:bg-stone-900/90 text-white rounded-full backdrop-blur-xs transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-stone-900/60 hover:bg-stone-900/90 text-white rounded-full backdrop-blur-xs transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Tag and Image Counter */}
              <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs px-3 py-1 rounded text-xs text-white">
                Foto {activeImageIndex + 1} de {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-amber-800 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Location & Price Banner */}
          <div className="bg-white rounded-xl p-6 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
                <MapPin className="w-4 h-4 text-amber-800" />
                <span>{property.addressSnippet}, {property.city}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-stone-950 font-display">
                {property.title}
              </h2>
              <p className="text-xs text-stone-500 italic">
                "{property.highlightTag}"
              </p>
            </div>

            <div className="flex flex-col md:items-end">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                {property.purpose === 'venda' ? 'Valor de Venda' : 'Aluguel Mensal'}
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-950">
                {formatCurrencyBRL(property.price)}
              </div>
              <div className="text-xs text-stone-500 font-mono flex items-center gap-2 mt-0.5">
                <span>{formatCurrencyBRL(calculatePricePerM2(property))}/m²</span>
                <span>·</span>
                <span>Cond: {formatCurrencyBRL(property.condoFee)}/mês</span>
              </div>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <div className="text-xs text-stone-500 mb-1 flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-stone-400" />
                <span>Área Privativa</span>
              </div>
              <div className="text-lg font-bold font-mono text-stone-900">{property.area} m²</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <div className="text-xs text-stone-500 mb-1 flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-stone-400" />
                <span>Dormitórios</span>
              </div>
              <div className="text-lg font-bold font-mono text-stone-900">
                {property.suites} suítes ({property.bedrooms} qtos)
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <div className="text-xs text-stone-500 mb-1 flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-stone-400" />
                <span>Banheiros</span>
              </div>
              <div className="text-lg font-bold font-mono text-stone-900">{property.bathrooms} banheiros</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <div className="text-xs text-stone-500 mb-1 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-stone-400" />
                <span>Vagas de Garagem</span>
              </div>
              <div className="text-lg font-bold font-mono text-stone-900">{property.parkingSpots} vagas cobertas</div>
            </div>
          </div>

          {/* Description & Architectural Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Description & Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-3">
                <h3 className="text-base font-semibold text-stone-900 font-display">
                  Conceito Arquitetônico & Descrição
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {property.description}
                </p>
                <div className="pt-2 text-xs text-stone-500 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-700" />
                  <span>{property.sunExposure}</span>
                </div>
              </div>

              {/* Architectural Details */}
              <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-3">
                <h3 className="text-base font-semibold text-stone-900 font-display">
                  Diferenciais Construtivos de Autor
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {property.architecturalDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities & Leisure */}
              <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-3">
                <h3 className="text-base font-semibold text-stone-900 font-display">
                  Comodidades e Lazer Privativo
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Building Structure & Security */}
              <div className="bg-white rounded-xl p-6 border border-stone-200 space-y-3">
                <h3 className="text-base font-semibold text-stone-900 font-display">
                  Estrutura do Condomínio & Blindagem
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                  {property.buildingStructure.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Shield className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Mortgage Financing Simulator */}
              <div id="simulador-financiamento" className="bg-white rounded-xl p-6 border border-stone-200 space-y-6 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-stone-100 text-stone-900 rounded-lg">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-stone-900 font-display">
                        Simulador de Financiamento Imobiliário
                      </h3>
                      <p className="text-xs text-stone-500">
                        Cálculo estimativo com base nas taxas pré-definidas para o mercado de alto padrão
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded w-fit">
                    Mercado Premium
                  </span>
                </div>

                {/* Pre-defined Premium Interest Rates Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-stone-700">
                    Taxa de Juros Pré-Definida (Mercado de Alta Renda):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {PREMIUM_RATES.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedRateId(item.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedRateId === item.id
                            ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                            : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold">{item.label}</span>
                          <span className={`font-mono text-xs font-bold ${selectedRateId === item.id ? 'text-amber-300' : 'text-stone-900'}`}>
                            {item.rate.toFixed(2)}% a.a.
                          </span>
                        </div>
                        <p className={`text-[10px] leading-tight ${selectedRateId === item.id ? 'text-stone-300' : 'text-stone-500'}`}>
                          {item.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amortization System Toggle: SAC vs PRICE */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-700">
                      Sistema de Amortização:
                    </label>
                    <span className="text-[11px] text-stone-500">
                      {amortizationSystem === 'SAC' ? 'Parcelas decrescentes (amortização fixa)' : 'Parcelas fixas mensais'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setAmortizationSystem('SAC')}
                      className={`py-2 text-xs font-semibold rounded transition-colors ${
                        amortizationSystem === 'SAC'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Tabela SAC (Decrescente)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAmortizationSystem('PRICE')}
                      className={`py-2 text-xs font-semibold rounded transition-colors ${
                        amortizationSystem === 'PRICE'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Tabela PRICE (Fixa)
                    </button>
                  </div>
                </div>

                {/* Input Sliders: Down payment & Term */}
                <div className="space-y-5 text-xs">
                  {/* Down Payment */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-700">Valor da Entrada ({downPaymentPercent}%):</span>
                      <span className="font-mono font-bold text-stone-900 text-sm">
                        {formatCurrencyBRL(downPaymentValue)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="80"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-stone-900 cursor-pointer"
                    />
                    <div className="flex items-center justify-between gap-1 pt-1">
                      {[20, 30, 40, 50, 60].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setDownPaymentPercent(pct)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded border transition-colors ${
                            downPaymentPercent === pct
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Financing Term */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-700">Prazo de Pagamento:</span>
                      <span className="font-mono font-bold text-stone-900 text-sm">
                        {financingYears} anos ({totalMonths} meses)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="35"
                      step="5"
                      value={financingYears}
                      onChange={(e) => setFinancingYears(Number(e.target.value))}
                      className="w-full accent-stone-900 cursor-pointer"
                    />
                    <div className="flex items-center justify-between gap-1 pt-1">
                      {[15, 20, 25, 30, 35].map((yrs) => (
                        <button
                          key={yrs}
                          type="button"
                          onClick={() => setFinancingYears(yrs)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded border transition-colors ${
                            financingYears === yrs
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {yrs} anos
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Proportional Asset Breakdown Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] text-stone-500 font-medium">
                    <span>Entrada: {downPaymentPercent}%</span>
                    <span>Financiamento: {100 - downPaymentPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden flex">
                    <div 
                      className="bg-amber-700 h-full transition-all duration-300" 
                      style={{ width: `${downPaymentPercent}%` }} 
                    />
                    <div 
                      className="bg-stone-800 h-full transition-all duration-300" 
                      style={{ width: `${100 - downPaymentPercent}%` }} 
                    />
                  </div>
                </div>

                {/* Result Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Main Installment Card */}
                  <div className="bg-stone-900 text-white p-4 rounded-xl flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold block mb-0.5">
                        {amortizationSystem === 'SAC' ? '1ª Parcela Estimada (SAC)' : 'Parcela Fixa Mensal (PRICE)'}
                      </span>
                      <div className="text-2xl font-bold font-mono text-white">
                        {formatCurrencyBRL(currentDisplayInstallment)}
                        <span className="text-xs font-normal text-stone-300"> /mês</span>
                      </div>
                    </div>

                    {amortizationSystem === 'SAC' ? (
                      <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300 flex justify-between">
                        <span>Última Parcela projetada:</span>
                        <span className="font-mono font-semibold text-white">
                          {formatCurrencyBRL(lastInstallmentSAC)}/mês
                        </span>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-300">
                        Parcelas lineares constantes até o fim do contrato.
                      </div>
                    )}
                  </div>

                  {/* Summary & Recommended Income Card */}
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex flex-col justify-between space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-1">
                        Saldo a Financiar
                      </span>
                      <div className="text-lg font-bold font-mono text-stone-900">
                        {formatCurrencyBRL(loanAmount)}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-200">
                      <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-0.5">
                        Renda Familiar Sugerida (~30%):
                      </span>
                      <div className="font-mono font-semibold text-stone-900 text-sm">
                        {formatCurrencyBRL(recommendedGrossIncome)}/mês
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions & Integration with Concierge */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-50/70 p-3.5 rounded-lg border border-stone-200 text-xs">
                  <div className="text-stone-600 text-[11px] leading-relaxed">
                    * Simulação estimativa baseada na taxa pré-definida de <strong className="text-stone-900">{yearlyRatePercent}% a.a.</strong> Sujeita à análise de crédito e comprovação cadastral junto às instituições financeiras parceiras.
                  </div>
                  <button
                    type="button"
                    onClick={handleAttachSimulationToVIP}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg shrink-0 whitespace-nowrap transition-colors shadow-xs"
                  >
                    Vincular à Visita VIP
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Comparison CTA & VIP Visit Scheduling Form */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Add to Comparator Action Card */}
              <div className="bg-stone-900 text-white rounded-xl p-5 border border-stone-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Scale className="w-4 h-4" />
                  <span>Dúvida entre este e outros imóveis?</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Adicione ao Comparador Inteligente para verificar as diferenças de área, preço por m² e lazer exclusivo lado a lado.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleComparison(property)}
                    disabled={!isInComparison && !canAddToComparison}
                    className={`flex-1 py-2 text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors ${
                      isInComparison
                        ? 'bg-amber-600 text-white'
                        : canAddToComparison
                        ? 'bg-white text-stone-900 hover:bg-stone-100'
                        : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    {isInComparison ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>No Comparador</span>
                      </>
                    ) : (
                      <>
                        <Scale className="w-3.5 h-3.5" />
                        <span>Adicionar ao Comparador</span>
                      </>
                    )}
                  </button>
                  {isInComparison && (
                    <button
                      type="button"
                      onClick={onOpenComparator}
                      className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-white rounded border border-stone-700"
                    >
                      Abrir Comparador
                    </button>
                  )}
                </div>
              </div>

              {/* VIP Visit Form */}
              <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-stone-900 font-display">
                    Agendamento de Visita VIP
                  </h3>
                  <p className="text-xs text-stone-500">
                    Atendimento discreto e privativo conduzido por consultor sênior.
                  </p>
                </div>

                {isScheduled ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <div className="text-sm font-semibold text-emerald-950">
                      Solicitação Registrada
                    </div>
                    <p className="text-xs text-emerald-800">
                      Nosso concierge entrará em contato em até 15 minutos via WhatsApp para confirmar a visita.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsScheduled(false)}
                      className="text-xs text-stone-600 underline pt-1"
                    >
                      Realizar outro agendamento
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs">
                    {/* Presencial vs Tour Virtual */}
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setVisitType('presencial')}
                        className={`py-1.5 font-semibold rounded text-center transition-colors ${
                          visitType === 'presencial' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                        }`}
                      >
                        Visita Presencial
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisitType('virtual')}
                        className={`py-1.5 font-semibold rounded text-center transition-colors ${
                          visitType === 'virtual' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                        }`}
                      >
                        Tour Virtual Guiado 3D
                      </button>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Seu Nome Completo</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Carlos Eduardo de Oliveira"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Telefone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 98765-4321"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">E-mail Profissional</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="carlos@empresa.com.br"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-stone-700 font-medium mb-1">Data Desejada</label>
                        <input
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-700 font-medium mb-1">Horário</label>
                        <select
                          value={preferredPeriod}
                          onChange={(e) => setPreferredPeriod(e.target.value)}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                        >
                          <option>Manhã (09h - 12h)</option>
                          <option>Tarde (14h - 18h)</option>
                          <option>Sábado Manhã</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Observações ou Condição de Financiamento
                      </label>
                      <textarea
                        rows={2}
                        value={scheduleNotes}
                        onChange={(e) => setScheduleNotes(e.target.value)}
                        placeholder="Informe suas preferências ou dados da simulação de financiamento..."
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 resize-none text-[11px]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg shadow-sm transition-colors mt-2"
                    >
                      Confirmar Solicitação de Visita
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
