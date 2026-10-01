import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-lg shadow-xl border border-stone-700/80 flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
      <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
