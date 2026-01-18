
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
      className={`group rounded-3xl border transition-all duration-300 overflow-hidden ${
        isExpanded 
          ? `ring-1 ring-indigo-500/50 shadow-2xl ${darkMode ? 'bg-slate-900' : 'bg-white shadow-indigo-500/5'}` 
          : `${darkMode ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/30' : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/50'}`
      } ${highContrast ? 'border-2 border-black' : ''}`}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className={`w-14 h-14 p-3.5 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 ${
              darkMode ? 'bg-slate-800 text-indigo-400' : 'bg-slate-50 text-indigo-600'
            }`}>
              {CATEGORY_ICONS[item.category] || (
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {item.category}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-tighter ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Norma Ativa
                </span>
              </div>
              <h3 className={`font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`} style={{ fontSize: `${fontSize + 3}px` }}>
                {item.title}
              </h3>
            </div>
          </div>
          <div className={`p-2 rounded-xl transition-all ${
            isExpanded ? 'bg-indigo-500 text-white' : darkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-300'
          }`}>
            <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <p className={`mt-4 leading-relaxed font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} style={{ fontSize: `${fontSize}px` }}>
          {item.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span key={tag} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-colors ${
              darkMode ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-white border-slate-100 text-slate-400'
            }`}>
              #{tag.toUpperCase()}
            </span>
          ))}
        </div>

        {isExpanded && (
          <div className={`mt-8 pt-8 border-t space-y-8 animate-fadeIn ${darkMode ? 'border-slate-800' : 'border-slate-100'}`} onClick={(e) => e.stopPropagation()}>
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] flex items-center gap-3">
                <div className="flex-1 h-px bg-indigo-500/20"></div>
                Redação Original do Regimento
                <div className="flex-1 h-px bg-indigo-500/20"></div>
              </h4>
              <div className={`p-6 rounded-3xl relative border shadow-inner ${
                darkMode ? 'bg-slate-950/50 border-slate-800 text-slate-400' : 'bg-slate-50/50 border-slate-100 text-slate-700'
              }`} style={{ fontSize: `${fontSize}px` }}>
                <svg className="absolute top-4 left-4 w-10 h-10 text-indigo-500/5 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 11L14.017 8C14.017 6.89543 14.9124 6 16.017 6H19.017C20.1216 6 21.017 6.89543 21.017 8V11C21.017 12.1046 20.1216 13 19.017 13H16.017C14.9124 13 14.017 12.1046 14.017 11ZM3.01704 21L3.01704 18C3.01704 16.8954 3.91247 16 5.01704 16H8.01704C9.12161 16 10.017 16.8954 10.017 18V21C10.017 22.1046 9.12161 23 8.01704 23H5.01704C3.91247 23 3.01704 22.1046 3.01704 21ZM3.01704 11L3.01704 8C3.01704 6.89543 3.91247 6 5.01704 6H8.01704C9.12161 6 10.017 6.89543 10.017 8V11C10.017 12.1046 9.12161 13 8.01704 13H5.01704C3.91247 13 3.01704 12.1046 3.01704 11Z" /></svg>
                <p className="relative z-10 italic leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-3xl border ${
                darkMode ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50/30 border-emerald-100/50'
              }`}>
                <div className="flex items-center gap-2 mb-3 text-emerald-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h4 className="text-[10px] font-black uppercase tracking-widest">O Propósito</h4>
                </div>
                <p className={`leading-relaxed font-medium ${darkMode ? 'text-emerald-200/60' : 'text-emerald-900/70'}`} style={{ fontSize: `${fontSize}px` }}>
                  {item.explanation}
                </p>
              </div>

              <div className={`p-6 rounded-3xl border ${
                darkMode ? 'bg-indigo-500/5 border-indigo-500/10' : 'bg-indigo-50/30 border-indigo-100/50'
              }`}>
                <div className="flex items-center gap-2 mb-3 text-indigo-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <h4 className="text-[10px] font-black uppercase tracking-widest">Bem-estar Coletivo</h4>
                </div>
                <p className={`leading-relaxed font-medium ${darkMode ? 'text-indigo-200/60' : 'text-indigo-900/70'}`} style={{ fontSize: `${fontSize}px` }}>
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
