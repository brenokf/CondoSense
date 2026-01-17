
import React from 'react';
import { AccessibilityConfig } from '../types';

interface Props {
  config: AccessibilityConfig;
  onChange: (config: AccessibilityConfig) => void;
}

const AccessibilityControls: React.FC<Props> = ({ config, onChange }) => {
  return (
    <div className={`flex items-center gap-4 p-2 rounded-full border shadow-sm transition-colors ${
      config.darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/80 border-slate-200'
    }`}>
      <div className={`flex items-center gap-1 border-r pr-3 ${config.darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
        <button 
          onClick={() => onChange({ ...config, fontSize: Math.max(12, config.fontSize - 2) })}
          className={`p-1 rounded text-xs font-bold w-8 h-8 flex items-center justify-center transition-colors ${
            config.darkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="Diminuir texto"
        >
          A-
        </button>
        <span className={`text-[10px] font-medium min-w-[3rem] text-center ${config.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Tamanho</span>
        <button 
          onClick={() => onChange({ ...config, fontSize: Math.min(24, config.fontSize + 2) })}
          className={`p-1 rounded text-base font-bold w-8 h-8 flex items-center justify-center transition-colors ${
            config.darkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
          }`}
          title="Aumentar texto"
        >
          A+
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onChange({ ...config, darkMode: !config.darkMode })}
          className={`p-2 rounded-full transition-all ${
            config.darkMode ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30' : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
          }`}
          title={config.darkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
        >
          {config.darkMode ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
          )}
        </button>

        <button 
          onClick={() => onChange({ ...config, highContrast: !config.highContrast })}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-colors ${
            config.highContrast 
              ? 'bg-slate-900 text-white' 
              : config.darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Alto Contraste
        </button>
      </div>
    </div>
  );
};

export default AccessibilityControls;
