
import React from 'react';
import { Suggestion } from '../types';

interface Props {
  suggestion: Suggestion;
  onVote: (id: string) => void;
  darkMode: boolean;
  isAdmin?: boolean;
}

const SuggestionCard: React.FC<Props> = ({ suggestion, onVote, darkMode, isAdmin = false }) => {
  const statusColors = {
    'Pendente': darkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-400',
    'Em Análise': 'bg-blue-500/10 text-blue-500',
    'Planejado': 'bg-indigo-500/10 text-indigo-500',
    'Concluído': 'bg-emerald-500/10 text-emerald-500',
  };

  return (
    <div className={`group relative p-5 sm:p-7 rounded-[2rem] border transition-all duration-300 ${
      darkMode 
        ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/30' 
        : 'bg-white border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50'
    }`}>
      <div className="flex items-start gap-5 sm:gap-8">
        {/* Modern Interactive Vote Component */}
        <div className="flex flex-col items-center gap-2">
          <button 
            onClick={() => !isAdmin && onVote(suggestion.id)}
            disabled={isAdmin}
            className={`w-14 h-16 rounded-[1.25rem] flex flex-col items-center justify-center transition-all duration-300 ${
              isAdmin 
                ? `${darkMode ? 'bg-slate-800 text-slate-600' : 'bg-slate-50 text-slate-300'} cursor-default`
                : suggestion.votedByMe 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 ring-4 ring-indigo-500/10' 
                  : darkMode 
                    ? 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-indigo-400' 
                    : 'bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            <svg className={`w-6 h-6 transition-transform duration-500 ${suggestion.votedByMe ? 'scale-110' : 'group-hover/btn:translate-y-[-2px]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
            </svg>
            <span className="text-sm font-black mt-0.5 leading-none">{suggestion.votes}</span>
          </button>
          <span className={`text-[8px] font-black uppercase tracking-[0.15em] ${darkMode ? 'text-slate-700' : 'text-slate-300'}`}>Apoios</span>
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${statusColors[suggestion.status]}`}>
              {suggestion.status}
            </span>
            <span className={`text-[10px] font-bold ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
              {suggestion.category} • {suggestion.createdAt}
            </span>
            {isAdmin && (
              <span className={`ml-auto text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500`}>
                ADM MODE
              </span>
            )}
          </div>

          <h3 className={`text-xl font-black tracking-tight mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {suggestion.title}
          </h3>
          
          <p className={`text-sm leading-relaxed mb-6 font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {suggestion.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${
                darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
              }`}>
                {suggestion.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className={`text-[10px] font-bold ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>Sugerido por</span>
                <span className={`text-xs font-black ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{suggestion.author}</span>
              </div>
            </div>
            
            <div className={`flex items-center gap-2 ${isAdmin ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
               {isAdmin ? (
                 <div className="flex gap-2">
                    <button className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      darkMode ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-indigo-600 text-white hover:shadow-lg'
                    }`}>
                      Mudar Status
                    </button>
                    <button className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-slate-600 hover:text-red-400 hover:bg-slate-800' : 'text-slate-300 hover:text-red-600 hover:bg-red-50'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                 </div>
               ) : (
                 <button className={`p-2 rounded-xl transition-colors ${darkMode ? 'text-slate-600 hover:text-indigo-400 hover:bg-slate-800' : 'text-slate-300 hover:text-indigo-600 hover:bg-slate-50'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                 </button>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
