
import React, { useState } from 'react';
import { AccessibilityConfig } from '../types';

interface Props {
  onClose: () => void;
  onAdd: (title: string, desc: string, category: string) => void;
  config: AccessibilityConfig;
}

const SuggestionModal: React.FC<Props> = ({ onClose, onAdd, config }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState('Infraestrutura');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() && newDesc.trim()) {
      onAdd(newTitle, newDesc, newCat);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fadeIn" 
        onClick={onClose}
      ></div>
      
      <div className={`relative w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-scaleIn transition-colors ${
        config.darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'
      }`}>
        <div className="p-8 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={`text-2xl font-black tracking-tight ${config.darkMode ? 'text-white' : 'text-slate-900'}`}>
                Nova Sugestão
              </h2>
              <p className={`text-sm mt-1 ${config.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Compartilhe sua ideia com a comunidade
              </p>
            </div>
            <button 
              onClick={onClose} 
              className={`p-3 rounded-2xl transition-all ${
                config.darkMode ? 'hover:bg-slate-800 text-slate-500 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-900'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className={`block text-[10px] font-black uppercase tracking-widest ml-1 ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Título da Ideia
              </label>
              <input 
                autoFocus
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Ex: Novos carregadores para carros elétricos"
                className={`w-full p-4 rounded-2xl border transition-all focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 ${
                  config.darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className={`block text-[10px] font-black uppercase tracking-widest ml-1 ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Categoria
              </label>
              <select 
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                className={`w-full p-4 rounded-2xl border transition-all focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer ${
                  config.darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <option>Infraestrutura</option>
                <option>Lazer</option>
                <option>Segurança</option>
                <option>Tecnologia</option>
                <option>Sustentabilidade</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={`block text-[10px] font-black uppercase tracking-widest ml-1 ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Descrição Detalhada
              </label>
              <textarea 
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={4}
                placeholder="Explique detalhadamente como essa melhoria ajudaria os moradores..."
                className={`w-full p-4 rounded-2xl border transition-all focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 resize-none ${
                  config.darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className={`flex-1 py-4 font-bold rounded-2xl transition-colors ${
                  config.darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Cancelar
              </button>
              <button 
                type="submit"
                disabled={!newTitle.trim() || !newDesc.trim()}
                className={`flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Publicar Sugestão
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuggestionModal;
