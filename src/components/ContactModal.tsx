import React, { useState } from 'react';
import { X, PhoneCall, Mail, MapPin, CheckCircle2, Shield, Clock } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose, onShowToast }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Comprar imóvel de alto padrão');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      onShowToast('Por favor, informe seu nome e telefone.');
      return;
    }
    setSubmitted(true);
    onShowToast('Contato enviado ao Concierge Vértice com sucesso!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl border border-stone-200 relative">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-stone-900 text-amber-300 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-stone-900 font-display">
                Concierge Privativo Vértice Prime
              </h3>
              <p className="text-xs text-stone-500">
                Atendimento sob medida com total discrição e sigilo.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-base font-semibold text-emerald-950 font-display">
                Solicitação Recebida
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                Seus dados foram encaminhados com prioridade para um de nossos sócios-diretores. Entraremos em contato via WhatsApp/telefone em breve.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg"
              >
                Concluir
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-stone-700">
              <div>
                <label className="block font-medium text-stone-800 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Beatriz Albuquerque"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-800 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99876-5432"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-800 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="beatriz@holding.com.br"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-800 mb-1">Objetivo da Assessoria</label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  <option>Comprar imóvel de alto padrão</option>
                  <option>Alugar residência corporativa ou de temporada</option>
                  <option>Anunciar imóvel no acervo fechado (Off-market)</option>
                  <option>Avaliação patrimonial técnica</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-stone-800 mb-1">Mensagem ou Preferências Específicas</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Conte-nos sobre os bairros de interesse, faixa de investimento ou características desejadas..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg shadow-sm transition-colors text-xs"
                >
                  Solicitar Contato do Concierge
                </button>
              </div>

              <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <Shield className="w-3.5 h-3.5 text-stone-400" />
                <span>Sigilo contratual garantido nos termos da LGPD</span>
              </div>
            </form>
          )}

          {/* Quick Contacts Bar */}
          <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Jardins (SP) & Leblon (RJ)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Seg - Sáb · 08h às 20h</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
