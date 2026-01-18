
import React from 'react';
import { RuleCategory, AccessibilityConfig, ActiveView } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface Props {
  isOpen: boolean;
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  activeCategory: RuleCategory | 'Todos';
  onCategoryChange: (cat: RuleCategory | 'Todos') => void;
  config: AccessibilityConfig;
  onToggle: () => void;
}

const Sidebar: React.FC<Props> = ({ isOpen, activeView, onViewChange, activeCategory, onCategoryChange, config, onToggle }) => {
  const categories: (RuleCategory | 'Todos')[] = [
    'Todos',
    ...Object.values(RuleCategory)
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'w-72 translate-x-0' : 'w-24 -translate-x-full lg:translate-x-0'
        } ${
          config.darkMode 
            ? 'bg-slate-950 border-r border-slate-800' 
            : 'bg-white border-r border-slate-100 shadow-2xl lg:shadow-none'
        }`}
      >
        {/* Toggle Button for Desktop */}
        <button 
          onClick={onToggle}
          className={`absolute -right-3 top-8 z-10 w-6 h-6 rounded-full border bg-white flex items-center justify-center text-slate-400 shadow-md transition-all hover:text-indigo-600 hover:border-indigo-600 hidden lg:flex ${
            isOpen ? 'rotate-0' : 'rotate-180'
          } ${config.darkMode ? 'bg-slate-900 border-slate-700' : ''}`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo Section */}
        <div className={`p-6 flex items-center transition-all ${isOpen ? 'gap-3' : 'justify-center'}`}>
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/30 shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          {isOpen && (
            <div className="flex-1 overflow-hidden animate-fadeIn">
              <h1 className={`text-xl font-black tracking-tighter truncate ${config.darkMode ? 'text-white' : 'text-slate-900'}`}>
                CondoSense
              </h1>
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] leading-none mt-1">
                Ecosystem
              </p>
            </div>
          )}
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar overflow-x-hidden">
          {/* Main Tabs */}
          <div className="mb-8">
            {isOpen && (
              <h3 className={`px-4 text-[10px] font-black uppercase tracking-[0.2em] mb-4 animate-fadeIn ${config.darkMode ? 'text-slate-700' : 'text-slate-400'}`}>
                Menu
              </h3>
            )}
            <div className="space-y-2">
              <SidebarItem 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                label="Regulamentos"
                isActive={activeView === 'regulations'}
                onClick={() => onViewChange('regulations')}
                darkMode={config.darkMode}
                isOpen={isOpen}
              />
              <SidebarItem 
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                label="Ideias"
                isActive={activeView === 'suggestions'}
                onClick={() => onViewChange('suggestions')}
                darkMode={config.darkMode}
                isOpen={isOpen}
              />
            </div>
          </div>

          {/* Categories Filter - Only shown for regulations and when open */}
          {activeView === 'regulations' && (
            <div className="animate-fadeIn">
              {isOpen ? (
                <h3 className={`px-4 text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${config.darkMode ? 'text-slate-700' : 'text-slate-400'}`}>
                  Categorias
                </h3>
              ) : (
                <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4 my-6" />
              )}
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`w-full group flex items-center rounded-2xl transition-all duration-300 ${
                      activeCategory === cat 
                        ? `${config.darkMode ? 'bg-indigo-600/10 text-indigo-400' : 'bg-indigo-50 text-indigo-700'} font-bold` 
                        : `${config.darkMode ? 'text-slate-500 hover:bg-slate-900 hover:text-slate-300' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`
                    } ${isOpen ? 'px-4 py-3 justify-between' : 'p-3 justify-center'}`}
                    title={!isOpen ? cat : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xl transition-transform duration-300 ${activeCategory === cat ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {cat === 'Todos' ? '🌐' : CATEGORY_ICONS[cat as RuleCategory]}
                      </span>
                      {isOpen && <span className="text-sm tracking-tight">{cat}</span>}
                    </div>
                    {activeCategory === cat && isOpen && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom space */}
        <div className={`p-4 mt-auto border-t ${config.darkMode ? 'border-slate-900' : 'border-slate-50'}`}>
          <div className="text-center opacity-40">
             <span className="text-[8px] font-black uppercase tracking-widest text-indigo-500">CondoSense Hub</span>
          </div>
        </div>
      </aside>
    </>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  darkMode: boolean;
  isOpen: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, onClick, darkMode, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center rounded-2xl transition-all duration-300 relative group ${
        isActive 
          ? `${darkMode ? 'bg-indigo-600/20 text-indigo-400' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30'} font-black` 
          : `${darkMode ? 'text-slate-500 hover:bg-slate-900 hover:text-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`
      } ${isOpen ? 'px-4 py-3.5 gap-4' : 'p-4 justify-center'}`}
      title={!isOpen ? label : undefined}
    >
      <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </span>
      {isOpen && <span className="text-sm tracking-tight">{label}</span>}
      {isActive && !darkMode && isOpen && (
         <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white/40" />
      )}
    </button>
  );
};

export default Sidebar;
