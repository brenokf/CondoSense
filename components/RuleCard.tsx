
import React, { useState } from 'react';
import { RegulationItem } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface Props {
  item: RegulationItem;
  fontSize: number;
  highContrast: boolean;
  darkMode: boolean;
}

const RuleCard: React.FC<Props> = ({ item, fontSize, highContrast, darkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`group rounded-2xl border transition-all duration-300 ${
        isExpanded 
          ? 'ring-2 ring-indigo-500 shadow-xl border-transparent' 
          : `${darkMode ? 'border-slate-700 hover:border-indigo-500 shadow-none' : 'border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-lg'}`
      } ${darkMode ? 'bg-slate-800' : 'bg-white'} ${highContrast ? 'border-2 border-black' : ''}`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={item.category}>
              {CATEGORY_ICONS[item.category] || '📋'}
            </span>
            <div>
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 ${
                darkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'
              }`}>
                {item.category}
              </span>
              <h3 className={`font-bold leading-tight ${darkMode ? 'text-white' : 'text-slate-900'}`} style={{ fontSize: `${fontSize + 2}px` }}>
                {item.title}
              </h3>
            </div>
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-full transition-transform duration-300 ${
              isExpanded 
                ? 'bg-indigo-500/10 text-indigo-500 rotate-180' 
                : darkMode ? 'bg-slate-700 text-slate-500' : 'bg-slate-50 text-slate-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <p className={`mt-4 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} style={{ fontSize: `${fontSize}px` }}>
          {item.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span key={tag} className={`px-2 py-1 text-[11px] font-medium rounded border italic transition-colors ${
              darkMode ? 'bg-slate-900/50 border-slate-700 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-400'
            }`}>
              #{tag}
            </span>
          ))}
        </div>

        {isExpanded && (
          <div className={`mt-6 pt-6 border-t space-y-6 animate-fadeIn ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
            <div>
              <h4 className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Texto Oficial
              </h4>
              <div className={`p-4 rounded-xl italic border-l-4 ${
                darkMode ? 'bg-slate-900 text-slate-400 border-indigo-900' : 'bg-slate-50 text-slate-700 border-indigo-200'
              }`} style={{ fontSize: `${fontSize - 1}px` }}>
                "{item.content}"
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-5 rounded-2xl border ${
                darkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50/50 border-emerald-100'
              }`}>
                <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${
                  darkMode ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                  Por que existe?
                </h4>
                <p className={`leading-relaxed ${darkMode ? 'text-emerald-300/80' : 'text-emerald-900'}`} style={{ fontSize: `${fontSize - 1}px` }}>
                  {item.explanation}
                </p>
              </div>

              <div className={`p-5 rounded-2xl border ${
                darkMode ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-50/50 border-amber-100'
              }`}>
                <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${
                  darkMode ? 'text-amber-400' : 'text-amber-700'
                }`}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" /></svg>
                  Impacto na Convivência
                </h4>
                <p className={`leading-relaxed ${darkMode ? 'text-amber-300/80' : 'text-amber-900'}`} style={{ fontSize: `${fontSize - 1}px` }}>
                  {item.importance}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RuleCard;
