import React from 'react';
import { ShieldCheck, FileCheck2, UserCheck, EyeOff, Award, ArrowUpRight } from 'lucide-react';

interface WhyVerticeProps {
  onOpenContact: () => void;
}

export const WhyVertice: React.FC<WhyVerticeProps> = ({ onOpenContact }) => {
  const credentials = [
    {
      title: 'Due Diligence & Auditoria Rigorosa',
      description: 'Análise minuciosa de certidões cíveis, fiscais e dominiais antes da disponibilização de qualquer imóvel no acervo.',
      icon: FileCheck2
    },
    {
      title: 'Privacidade & Sigilo Absoluto',
      description: 'Proteção irrestrita da identidade dos compradores e vendedores, com protocolos de Non-Disclosure Agreement (NDA).',
      icon: EyeOff
    },
    {
      title: 'Assessoria Jurídica e Tributária Integrada',
      description: 'Estruturação imobiliária para pessoas físicas e holdings patrimoniais, otimizando impostos e garantindo solidez contratual.',
      icon: ShieldCheck
    },
    {
      title: 'Avaliação Mercadológica Técnica',
      description: 'Precificação baseada em metros quadrados reais transacionados, liquidez de bairro e custo de reposição arquitetônica.',
      icon: Award
    }
  ];

  return (
    <section id="diferenciais" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Segurança Patrimonial & Excelência
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 font-display">
              A curadoria imobiliária que protege e multiplica o seu legado.
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Diferente de marketplaces genéricos com centenas de anúncios desatualizados, a Vértice Prime atua como uma boutique de assessoria patrimonial. Cada propriedade é visitada, precificada com rigor técnico e aprovada por nosso comitê de engenharia e direito imobiliário.
            </p>

            <div className="flex items-center gap-6 pt-2 text-xs font-medium text-stone-800">
              <div>
                <span className="block font-mono text-xl font-bold text-stone-900">R$ 1.8B+</span>
                <span className="text-stone-500">em negociações conduzidas</span>
              </div>
              <div className="w-px h-8 bg-stone-200" />
              <div>
                <span className="block font-mono text-xl font-bold text-stone-900">99.4%</span>
                <span className="text-stone-500">índice de conformidade jurídica</span>
              </div>
              <div className="w-px h-8 bg-stone-200" />
              <div>
                <span className="block font-mono text-xl font-bold text-stone-900">18 anos</span>
                <span className="text-stone-500">de reputação inabalável</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="bg-stone-50 rounded-xl p-6 border border-stone-200/80 flex flex-col justify-between space-y-4"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 font-display mb-2">
                    {cred.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {cred.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Consultation Banner */}
        <div className="mt-12 bg-stone-900 text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-semibold font-display text-white">
              Deseja negociar ou anunciar um imóvel de alto padrão?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              Converse diretamente com nosso comitê de curadoria. Atendimento presencial em nossos escritórios nos Jardins (SP) e Leblon (RJ).
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="px-6 py-3 bg-white hover:bg-stone-100 text-stone-900 text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap shadow transition-colors"
          >
            <span>Agendar Reunião Privativa</span>
            <ArrowUpRight className="w-4 h-4 text-stone-900" />
          </button>
        </div>

      </div>
    </section>
  );
};
