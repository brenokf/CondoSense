
import React, { useState, useMemo } from 'react';
import { RuleCategory, RegulationItem, AccessibilityConfig, ProcessingState, UserRole, Suggestion, ActiveView } from './types';
import { INITIAL_REGULATIONS } from './constants';
import { analyzeRegulations } from './services/geminiService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RuleCard from './components/RuleCard';
import ProcessingOverlay from './components/ProcessingOverlay';
import UploadModal from './components/UploadModal';
import LoginScreen from './components/LoginScreen';
import SuggestionsView from './components/SuggestionsView';

const INITIAL_SUGGESTIONS: Suggestion[] = [
  {
    id: 's1',
    title: 'Horta Comunitária no Terraço',
    description: 'Sugiro utilizarmos o espaço ocioso do terraço para criar uma horta orgânica comunitária. Isso promoveria interação entre moradores e sustentabilidade.',
    author: 'Ricardo (Apt 402)',
    votes: 24,
    category: 'Sustentabilidade',
    createdAt: '12/03/2024',
    status: 'Em Análise'
  },
  {
    id: 's2',
    title: 'Wi-Fi de Alta Velocidade no Coworking',
    description: 'A rede atual no espaço de coworking está instável. Como muitos trabalham remoto, um upgrade seria essencial para a produtividade.',
    author: 'Mariana (Apt 1105)',
    votes: 42,
    category: 'Tecnologia',
    createdAt: '10/03/2024',
    status: 'Planejado'
  },
  {
    id: 's3',
    title: 'Reformulação do Playground',
    description: 'Os brinquedos atuais são antigos e de ferro. Sugiro a troca por equipamentos de plástico rotomoldado ou madeira tratada, mais seguros para as crianças.',
    author: 'Carla (Apt 204)',
    votes: 15,
    category: 'Lazer',
    createdAt: '08/03/2024',
    status: 'Pendente'
  }
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('regulations');
  const [regulations, setRegulations] = useState<RegulationItem[]>(INITIAL_REGULATIONS);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);
  const [activeCategory, setActiveCategory] = useState<RuleCategory | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);
  
  const [accessibility, setAccessibility] = useState<AccessibilityConfig>({
    fontSize: 14,
    highContrast: false,
    darkMode: false
  });

  const [processing, setProcessing] = useState<ProcessingState>({
    isAnalyzing: false,
    progress: 0,
    message: ''
  });

  const filteredRegulations = useMemo(() => {
    return regulations.filter(reg => {
      const matchesCategory = activeCategory === 'Todos' || reg.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        reg.title.toLowerCase().includes(searchLower) ||
        reg.content.toLowerCase().includes(searchLower) ||
        reg.tags.some(t => t.toLowerCase().includes(searchLower)) ||
        reg.summary.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [regulations, activeCategory, searchQuery]);

  const handleVote = (id: string) => {
    setSuggestions(prev => prev.map(s => {
      if (s.id === id) {
        const isVoting = !s.votedByMe;
        return {
          ...s,
          votes: isVoting ? s.votes + 1 : s.votes - 1,
          votedByMe: isVoting
        };
      }
      return s;
    }));
  };

  const handleAddSuggestion = (title: string, description: string, category: string) => {
    const newSug: Suggestion = {
      id: `s-${Date.now()}`,
      title,
      description,
      category,
      author: role === 'admin' ? 'Administração' : 'Morador',
      votes: 1,
      votedByMe: true,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      status: 'Pendente'
    };
    setSuggestions([newSug, ...suggestions]);
  };

  const handleProcessPdf = async (base64: string) => {
    setProcessing({ isAnalyzing: true, progress: 10, message: 'Lendo arquivo PDF...' });
    setIsUploadModalOpen(false);

    try {
      setProcessing(prev => ({ ...prev, progress: 30, message: 'Enviando para o Gemini...' }));
      const newRegs = await analyzeRegulations(base64);
      
      setProcessing(prev => ({ ...prev, progress: 80, message: 'Estruturando hub de conhecimento...' }));
      await new Promise(r => setTimeout(r, 1000));
      
      setRegulations(newRegs);
      setProcessing({ isAnalyzing: false, progress: 0, message: '' });
      setActiveCategory('Todos');
      setActiveView('regulations');
    } catch (err) {
      alert("Erro ao processar o arquivo PDF. Verifique se o arquivo não está protegido por senha.");
      setProcessing({ isAnalyzing: false, progress: 0, message: '' });
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!role) {
    return <LoginScreen config={accessibility} onLogin={setRole} />;
  }

  return (
    <div className={`min-h-screen flex transition-colors duration-500 ease-in-out ${
      accessibility.darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    } ${accessibility.highContrast ? 'high-contrast' : ''}`}>
      <ProcessingOverlay {...processing} />
      
      <Sidebar 
        isOpen={isSidebarOpen}
        activeView={activeView}
        onViewChange={setActiveView}
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
        config={accessibility}
        onToggle={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          config={accessibility} 
          role={role}
          onConfigChange={setAccessibility}
          onLogout={() => setRole(null)}
          onUploadClick={() => setIsUploadModalOpen(true)}
          onToggleSidebar={toggleSidebar}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-10 py-10 max-w-7xl w-full mx-auto">
          <section className="animate-fadeIn">
            {activeView === 'regulations' ? (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className={`text-3xl sm:text-4xl font-black tracking-tighter ${accessibility.darkMode ? 'text-white' : 'text-slate-900'}`}>
                      Regulamentos
                    </h2>
                    <p className={`text-sm sm:text-base mt-2 font-medium ${accessibility.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      Explore as normas oficiais simplificadas por nossa Inteligência Artificial.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                      accessibility.darkMode ? 'bg-slate-900 text-slate-600' : 'bg-white text-slate-400 shadow-sm'
                    }`}>
                      {filteredRegulations.length} {filteredRegulations.length === 1 ? 'resultado' : 'resultados'}
                    </span>
                  </div>
                </div>

                <div className="relative group max-w-3xl">
                  <input 
                    type="text"
                    placeholder="Pesquisar por palavras, áreas ou regras..."
                    className={`w-full pl-14 pr-6 py-5 rounded-[1.5rem] border transition-all shadow-sm group-hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 ${
                      accessibility.darkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 placeholder-slate-400'
                    }`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className={`absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors ${
                    accessibility.darkMode ? 'text-slate-700 group-hover:text-indigo-500' : 'text-slate-300 group-hover:text-indigo-500'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="grid gap-6">
                  {filteredRegulations.length > 0 ? (
                    filteredRegulations.map(reg => (
                      <RuleCard 
                        key={reg.id} 
                        item={reg} 
                        fontSize={accessibility.fontSize} 
                        highContrast={accessibility.highContrast}
                        darkMode={accessibility.darkMode}
                      />
                    ))
                  ) : (
                    <div className={`text-center py-24 rounded-[3rem] border border-dashed transition-colors ${
                      accessibility.darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100'
                    }`}>
                      <div className="w-24 h-24 mx-auto mb-6 opacity-20 text-indigo-500">
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className={`text-2xl font-black ${accessibility.darkMode ? 'text-slate-700' : 'text-slate-300'}`}>
                        Nenhum regulamento encontrado.
                      </h3>
                      <p className={`${accessibility.darkMode ? 'text-slate-600' : 'text-slate-400'} mt-3 max-w-sm mx-auto`}>
                        Tente outros termos ou navegue pelas categorias no menu lateral.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <SuggestionsView 
                suggestions={suggestions} 
                onVote={handleVote} 
                onAdd={handleAddSuggestion}
                config={accessibility} 
                role={role || 'morador'}
              />
            )}
          </section>
        </main>

        <footer className={`py-8 border-t transition-colors ${
          accessibility.darkMode ? 'border-slate-900 bg-slate-950/30' : 'border-slate-50 bg-white/30'
        }`}>
          <div className="px-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <p className={`text-[10px] font-black tracking-widest uppercase ${accessibility.darkMode ? 'text-slate-800' : 'text-slate-300'}`}>
              CondoSense &copy; 2024 • Inteligência Artificial em Convivência
            </p>
            <div className="flex gap-4">
               <span className={`text-[9px] font-black px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-500 uppercase tracking-widest border border-indigo-500/10`}>Version 1.2.0-beta</span>
            </div>
          </div>
        </footer>
      </div>

      {isUploadModalOpen && (
        <UploadModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onProcess={handleProcessPdf}
          darkMode={accessibility.darkMode}
        />
      )}
    </div>
  );
};

export default App;
