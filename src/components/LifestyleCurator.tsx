import React from 'react';
import { Sparkles, Building2, Trees, Waves, ShieldCheck, ArrowRight } from 'lucide-react';
import { Property } from '../types';

interface LifestyleCuratorProps {
  onSelectLifestyle: (filterCategory: string) => void;
  onSelectProperty: (property: Property) => void;
  properties: Property[];
}

export const LifestyleCurator: React.FC<LifestyleCuratorProps> = ({
  onSelectLifestyle,
  onSelectProperty,
  properties
}) => {
  const lifestyles = [
    {
      id: 'coberturas',
      title: 'Penthouses & Coberturas',
      subtitle: 'Vistas panorâmicas ininterruptas, piscinas aquecidas suspensas e privacidade absoluta no skyline.',
      icon: Building2,
      categoryFilter: 'Cobertura',
      tag: '4 propriedades disponíveis'
    },
    {
      id: 'mar',
      title: 'Debruçados sobre o Oceano',
      subtitle: 'Residências e vilas incrustadas nas falésias e na orla mais nobre do Rio de Janeiro.',
      icon: Waves,
      categoryFilter: 'Joá',
      tag: 'Exclusividade litorânea'
    },
    {
      id: 'condominio',
      title: 'Refúgios & Condomínios Fechados',
      subtitle: 'Estruturas hípicas, campos de golfe e segurança armada com helisuporte privativo.',
      icon: ShieldCheck,
      categoryFilter: 'Fazenda Boa Vista',
      tag: 'Privacidade total'
    },
    {
      id: 'arquitetura',
      title: 'Design Autoral & Biofilia',
      subtitle: 'Projetos assinados pelos principais escritórios de arquitetura contemporânea brasileira.',
      icon: Trees,
      categoryFilter: 'Jardins',
      tag: 'Conceito premiado'
    }
  ];

  return (
    <section id="lifestyle" className="py-16 bg-[#F4F3EE] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curadoria Arquitetônica</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 font-display">
              Coleções Selecionadas por Estilo de Vida
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md font-normal">
            Mais do que metragem e localização, compreendemos como a arquitetura molda seus hábitos, sua tranquilidade e seu patrimônio.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {lifestyles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectLifestyle(item.categoryFilter)}
                className="group bg-white rounded-lg p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-stone-400 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 mb-4 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-1">
                    {item.tag}
                  </span>

                  <h3 className="text-base font-semibold text-stone-900 font-display mb-2 group-hover:text-amber-800 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-900 group-hover:text-amber-900">
                  <span>Filtrar Acervo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
