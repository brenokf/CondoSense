
import React from 'react';
import AccessibilityControls from './AccessibilityControls';
import { AccessibilityConfig, UserRole } from '../types';

interface Props {
  config: AccessibilityConfig;
  role: UserRole;
  onConfigChange: (config: AccessibilityConfig) => void;
  onLogout: () => void;
  onUploadClick: () => void;
}

const Header: React.FC<Props> = ({ config, role, onConfigChange, onLogout, onUploadClick }) => {
  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md py-4 transition-colors ${
      config.darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="text-left">
            <h1 className={`text-xl font-bold tracking-tight ${config.darkMode ? 'text-white' : 'text-slate-900'}`}>CondoLex</h1>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Hub de Regras Inteligente</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${
            config.darkMode ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${role === 'admin' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
            {role === 'admin' ? 'Síndico' : 'Morador'}
          </div>

          <AccessibilityControls config={config} onChange={onConfigChange} />
          
          <div className="flex items-center gap-2">
            {role === 'admin' && (
              <button 
                onClick={onUploadClick}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Analisar PDF
              </button>
            )}
            
            <button 
              onClick={onLogout}
              className={`p-2.5 rounded-full transition-colors ${
                config.darkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-red-400' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-red-600'
              }`}
              title="Sair da conta"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
