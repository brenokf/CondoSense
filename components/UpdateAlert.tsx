
import React from 'react';
import { RegulationUpdate, AccessibilityConfig } from '../types';

interface Props {
  update: RegulationUpdate;
  onAcknowledge: () => void;
  config: AccessibilityConfig;
}

const UpdateAlert: React.FC<Props> = ({ update, onAcknowledge, config }) => {
  return (
    <div className="mb-10 animate-slideDown">
      <div className={`relative overflow-hidden rounded-[2.5rem] border-2 transition-all shadow-2xl ${
        config.darkMode 
          ? 'bg-slate-900 border-indigo-500/30 shadow-indigo-500/10' 
          : 'bg-white border-indigo-100 shadow-indigo-100/50'
      }`}>
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        
        <div className="p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-600/30 shrink-0 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Novo</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${config.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    Atualização do Regimento • {update.date}
                  </span>
                </div>
                <h2 className={`text-2xl font-black tracking-tighter ${config.darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Alterações Detectadas pela IA
                </h2>
              </div>
            </div>
            
            <button 
              onClick={onAcknowledge}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black shadow-lg transition-all active:scale-95"
            >
              Entendi e estou ciente
            </button>
          </div>

          <div className={`p-6 rounded-3xl border ${config.darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
            <h3 className={`text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 ${config.darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Motivo da Mudança
            </h3>
            <p className={`text-sm font-medium leading-relaxed mb-8 ${config.darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {update.reason}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {update.changes.map((change, i) => (
                <div key={i} className={`p-4 rounded-2xl border transition-all ${
                  config.darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200/60 hover:shadow-md'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded ${
                      change.type === 'added' ? 'bg-emerald-500/10 text-emerald-500' : 
                      change.type === 'removed' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {change.type === 'added' ? 'Nova Regra' : change.type === 'removed' ? 'Removida' : 'Alterada'}
                    </span>
                  </div>
                  <h4 className={`text-xs font-black mb-1 ${config.darkMode ? 'text-slate-200' : 'text-slate-900'}`}>{change.itemTitle}</h4>
                  <p className={`text-[10px] leading-relaxed font-medium ${config.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{change.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAlert;
