import React from 'react';
import { MapPin, Phone, Mail, Shield, Building } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenContact }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 border border-stone-700 bg-stone-900 text-stone-100 flex items-center justify-center text-xs font-semibold tracking-widest font-mono">
                VP
              </span>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight text-white font-display">
                  VÉRTICE PRIME
                </span>
                <span className="text-[10px] uppercase tracking-widest text-stone-400">
                  Curadoria Imobiliária de Alto Padrão
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Assessoria patrimonial especializada na curadoria de residências icônicas, coberturas e villas autorais nos endereços mais exclusivos do Brasil.
            </p>

            <div className="text-xs text-stone-400 space-y-1 pt-1">
              <div>CRECI-SP: 039821-J · CRECI-RJ: 009214-J</div>
              <div>Membro da Associação Brasileira de Imobiliárias de Prestígio</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Navegação
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => onNavigateSection('imoveis')} 
                  className="hover:text-white transition-colors"
                >
                  Imóveis Exclusivos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('comparador')} 
                  className="hover:text-white transition-colors"
                >
                  Comparador Inteligente
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('lifestyle')} 
                  className="hover:text-white transition-colors"
                >
                  Coleções por Estilo de Vida
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('diferenciais')} 
                  className="hover:text-white transition-colors"
                >
                  Auditoria & Due Diligence
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Offices */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Unidades Privativas
            </div>
            <div className="space-y-2 text-xs text-stone-400">
              <div>
                <span className="font-semibold text-stone-200 block">São Paulo · Jardins</span>
                <span>Alameda Gabriel Monteiro da Silva, 1850</span>
              </div>
              <div className="pt-1">
                <span className="font-semibold text-stone-200 block">Rio de Janeiro · Leblon</span>
                <span>Avenida Ataulfo de Paiva, 1250 - Cobertura</span>
              </div>
            </div>
          </div>

          {/* Direct Concierge Contact */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Atendimento VIP
            </div>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                <span className="font-mono text-stone-200">+55 (11) 3090-4800</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-500" />
                <span>concierge@verticeprime.com.br</span>
              </div>
              <button
                type="button"
                onClick={onOpenContact}
                className="mt-2 w-full py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-800 rounded text-xs font-semibold text-center transition-colors"
              >
                Falar com Sócio-Diretor
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Vértice Prime Empreendimentos e Participações Ltda. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Privacidade & LGPD</span>
            <span>·</span>
            <span>Termos de Uso</span>
            <span>·</span>
            <span>Código de Ética Imobiliária</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
