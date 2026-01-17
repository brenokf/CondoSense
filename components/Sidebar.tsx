
import React from 'react';
import { RuleCategory, AccessibilityConfig } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface Props {
  activeCategory: RuleCategory | 'Todos';
  onCategoryChange: (cat: RuleCategory | 'Todos') => void;
  config: AccessibilityConfig;
}

const Sidebar: React.FC<Props> = ({ activeCategory, onCategoryChange, config }) => {
  const categories: (RuleCategory | 'Todos')[] = [
    'Todos',
    ...Object.values(RuleCategory)
  ];

  return (
    <div className="space-y-8 sticky top-24">
      <div>
        <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${config.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Categorias</h3>
        <nav className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeCategory === cat 
                  ? `${config.darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-700'} font-semibold` 
                  : `${config.darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {cat === 'Todos' ? '🌐' : CATEGORY_ICONS[cat as RuleCategory]}
                </span>
                <span className="text-sm">{cat}</span>
              </div>
              {activeCategory === cat && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className={`p-6 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl text-white shadow-xl shadow-indigo-500/10`}>
        <h4 className="font-bold text-base mb-2">Precisa de ajuda?</h4>
        <p className="text-indigo-100 text-xs leading-relaxed mb-4 opacity-80">
          Nossa IA explica qualquer regra. Clique em um item para ver o propósito e impacto da norma.
        </p>
        <div className="h-0.5 w-12 bg-white/20 rounded-full mb-4"></div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Suporte ao Morador</p>
      </div>
    </div>
  );
};

export default Sidebar;
