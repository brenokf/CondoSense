
import React, { useState, useMemo } from 'react';
import { Suggestion, AccessibilityConfig, UserRole } from '../types';
import SuggestionCard from './SuggestionCard';
import SuggestionModal from './SuggestionModal';

interface Props {
  suggestions: Suggestion[];
  onVote: (id: string) => void;
  onAdd: (title: string, desc: string, category: string) => void;
  config: AccessibilityConfig;
  role: UserRole;
}

const SuggestionsView: React.FC<Props> = ({ suggestions, onVote, onAdd, config, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedSuggestions = useMemo(() => 
    [...suggestions].sort((a, b) => b.votes - a.votes), 
  [suggestions]);

  const categoryRanking = useMemo(() => {
    const counts: Record<string, number> = {};
    suggestions.forEach(s => {
      counts[s.category] = (counts[s.category] || 0) + s.votes;
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [suggestions]);

  const totalVotes = useMemo(() => 
    suggestions.reduce((acc, s) => acc + s.votes, 0), 
  [suggestions]);

  const isAdmin = role === 'admin';

  return (
    <div className="space-y-8 animate-fadeIn">
      {isAdmin ? (
        /* Admin Insights Dashboard */
        <div className="space-y-6">
          <div className={`p-8 rounded-[2rem] border transition-all duration-500 ${
            config.darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'
          }`}>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h2 className={`text-2xl font-black tracking-tight mb-2 ${config.darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Painel de Prioridades
                </h2>
                <p className={`text-sm font-medium mb-6 ${config.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  Visão analítica das demandas dos moradores baseada em votação popular.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-2xl ${config.darkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>Total de Ideias</p>
                    <p className={`text-2xl font-black mt-1 ${config.darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{suggestions.length}</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${config.darkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>Votos Ativos</p>
                    <p className={`text-2xl font-black mt-1 ${config.darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{totalVotes}</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${config.darkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>Taxa de Engajamento</p>
                    <p className={`text-2xl font-black mt-1 ${config.darkMode ? 'text-amber-400' : 'text-amber-600'}`}>Alta</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-80 space-y-4">
                <h3 className={`text-[10px] font-black uppercase tracking-widest ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Áreas Mais Prioritárias
                </h3>
                <div className="space-y-3">
                  {categoryRanking.map(([cat, votes], idx) => {
                    const percentage = Math.round((votes / (totalVotes || 1)) * 100);
                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className={config.darkMode ? 'text-slate-400' : 'text-slate-700'}>{cat}</span>
                          <span className="text-indigo-500">{votes} votos</span>
                        </div>
                        <div className={`h-2 w-full rounded-full overflow-hidden ${config.darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              idx === 0 ? 'bg-indigo-500' : idx === 1 ? 'bg-indigo-400' : 'bg-indigo-300'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Resident Banner Section */
        <div className={`relative px-6 py-8 sm:px-10 sm:py-10 rounded-[2rem] overflow-hidden transition-all duration-500 ${
          config.darkMode 
            ? 'bg-slate-900 border border-slate-800' 
            : 'bg-indigo-600 shadow-xl shadow-indigo-200'
        }`}>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 ${
                config.darkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/20 text-indigo-50'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-300"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest">Voz do Morador</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-tight">
                Central de Melhorias
              </h2>
              <p className={`mt-2 text-sm sm:text-base leading-relaxed ${
                config.darkMode ? 'text-slate-400' : 'text-indigo-100'
              }`}>
                Compartilhe suas ideias para transformar nossa convivência. As sugestões mais votadas ganham prioridade na gestão.
              </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`group relative overflow-hidden px-8 py-4 rounded-2xl font-black transition-all active:scale-95 shrink-0 shadow-lg ${
                config.darkMode 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900/40' 
                  : 'bg-white text-indigo-600 hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Sugerir Ideia
              </span>
            </button>
          </div>
          
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] opacity-30 ${
            config.darkMode ? 'bg-indigo-500' : 'bg-indigo-400'
          }`}></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        </div>
      )}

      {isModalOpen && (
        <SuggestionModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={onAdd} 
          config={config} 
        />
      )}

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
            {isAdmin ? 'Gerenciamento de Ideias' : 'Mais Apoiadas'}
          </h3>
          <div className={`h-px w-8 ${config.darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
          <span className={`text-[10px] font-bold ${config.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {suggestions.length} Sugestões Ativas
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {sortedSuggestions.length > 0 ? (
          sortedSuggestions.map(s => (
            <SuggestionCard 
              key={s.id} 
              suggestion={s} 
              onVote={onVote} 
              darkMode={config.darkMode}
              isAdmin={isAdmin}
            />
          ))
        ) : (
          <div className={`text-center py-20 rounded-[2.5rem] border border-dashed transition-all ${
            config.darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <div className="w-20 h-20 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className={`text-xl font-black ${config.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Inicie um Diálogo
            </h3>
            <p className={`mt-2 max-w-xs mx-auto text-sm ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Não há sugestões no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestionsView;
