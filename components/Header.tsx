
import React from 'react';
import AccessibilityControls from './AccessibilityControls';
import { AccessibilityConfig, UserRole } from '../types';

interface Props {
  config: AccessibilityConfig;
  role: UserRole;
  onConfigChange: (config: AccessibilityConfig) => void;
  onLogout: () => void;
  onUploadClick: () => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<Props> = ({ config, role, onConfigChange, onLogout, onUploadClick, onToggleSidebar }) => {
  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl px-4 sm:px-8 py-4 flex items-center justify-between transition-colors border-b ${
      config.darkMode ? 'bg-slate-950/80 border-slate-900' : 'bg-white/80 border-slate-100'
    }`}>
      <div className="flex items-center gap-4">
        {/* Mobile Toggle Button */}
        <button 
          onClick={onToggleSidebar}
          className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl transition-all ${
            config.darkMode ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden md:block">
          <AccessibilityControls config={config} onChange={onConfigChange} />
        </div>
        
        <div className="flex items-center gap-2">
          {role === 'admin' && (
            <button 
              onClick={onUploadClick}
              className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              <svg className="w-4.5 h-4.5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="hidden sm:inline">Analisar PDF</span>
            </button>
          )}
          
          <button 
            onClick={onLogout}
            className={`flex items-center justify-center w-11 h-11 rounded-2xl transition-all border ${
              config.darkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20' 
                : 'bg-white border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100'
            }`}
            title="Sair"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
