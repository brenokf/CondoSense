
import React, { useState, useMemo, useEffect } from 'react';
import { RuleCategory, RegulationItem, AccessibilityConfig, ProcessingState, UserRole, Suggestion, ActiveView, RegulationUpdate } from './types';
import { analyzeAndCompareRegulations } from './services/geminiService';
import { database } from './services/databaseService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RuleCard from './components/RuleCard';
import ProcessingOverlay from './components/ProcessingOverlay';
import UploadModal from './components/UploadModal';
import LoginScreen from './components/LoginScreen';
import SuggestionsView from './components/SuggestionsView';
import UpdateAlert from './components/UpdateAlert';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('regulations');
  const [regulations, setRegulations] = useState<RegulationItem[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [latestUpdate, setLatestUpdate] = useState<RegulationUpdate | null>(null);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  
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

  // Carregar dados iniciais do "DB"
  useEffect(() => {
    const loadData = async () => {
      const regs = await database.getRegulations();
      const sugs = await database.getSuggestions();
      const update = await database.getLatestUpdate();
      
      setRegulations(regs);
      setSuggestions(sugs);
      setLatestUpdate(update);

      if (update && role === 'morador') {
        const isAck = await database.isVersionAcknowledged(update.versionId);
        setShowUpdateAlert(!isAck);
      }
    };
    loadData();
  }, [role]);

  const filteredRegulations = useMemo(() => {
    return regulations.filter(reg => {
      const matchesCategory = activeCategory === 'Todos' || reg.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      return matchesCategory && (
        reg.title.toLowerCase().includes(searchLower) ||
        reg.content.toLowerCase().includes(searchLower) ||
        reg.summary.toLowerCase().includes(searchLower)
      );
    });
  }, [regulations, activeCategory, searchQuery]);

  const handleVote = async (id: string) => {
    const updated = suggestions.map(s => {
      if (s.id === id) {
        const isVoting = !s.votedByMe;
        return { ...s, votes: isVoting ? s.votes + 1 : s.votes - 1, votedByMe: isVoting };
      }
      return s;
    });
    setSuggestions(updated);
    await database.saveSuggestions(updated);
  };

  const handleAddSuggestion = async (title: string, description: string, category: string) => {
    const newSug: Suggestion = {
      id: `s-${Date.now()}`,
      title, description, category,
      author: role === 'admin' ? 'Administração' : 'Morador',
      votes: 1,
      votedByMe: true,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      status: 'Pendente'
    };
    const updated = [newSug, ...suggestions];
    setSuggestions(updated);
    await database.saveSuggestions(updated);
  };

  const handleAcknowledgeUpdate = async () => {
    if (latestUpdate) {
      await database.acknowledgeVersion(latestUpdate.versionId);
      setShowUpdateAlert(false);
    }
  };

  const handleProcessPdf = async (base64: string) => {
    setProcessing({ isAnalyzing: true, progress: 10, message: 'Lendo novo PDF...' });
    setIsUploadModalOpen(false);

    try {
      setProcessing(prev => ({ ...prev, progress: 30, message: 'IA analisando alterações...' }));
      const { items, update } = await analyzeAndCompareRegulations(base64, regulations);
      
      setProcessing(prev => ({ ...prev, progress: 80, message: 'Sincronizando banco de dados...' }));
      
      await database.saveRegulations(items, update || undefined);
      
      setRegulations(items);
      if (update) {
        setLatestUpdate(update);
        // Admin não vê alerta de ciência para si mesmo, mas preparamos para o morador
      }

      setProcessing({ isAnalyzing: false, progress: 0, message: '' });
      setActiveCategory('Todos');
      setActiveView('regulations');
    } catch (err) {
      alert("Falha técnica no processamento. Tente novamente.");
      setProcessing({ isAnalyzing: false, progress: 0, message: '' });
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!role) return <LoginScreen config={accessibility} onLogin={setRole} />;

  return (
    <div className={`min-h-screen flex transition-colors duration-500 ${
      accessibility.darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    } ${accessibility.highContrast ? 'high-contrast' : ''}`}>
      <ProcessingOverlay {...processing} />
      
      <Sidebar 
        isOpen={isSidebarOpen} activeView={activeView} onViewChange={setActiveView}
        activeCategory={activeCategory} onCategoryChange={setActiveCategory} 
        config={accessibility} onToggle={toggleSidebar}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          config={accessibility} role={role} onConfigChange={setAccessibility}
          onLogout={() => setRole(null)} onUploadClick={() => setIsUploadModalOpen(true)}
          onToggleSidebar={toggleSidebar}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-10 py-10 max-w-7xl w-full mx-auto">
          {showUpdateAlert && latestUpdate && (
            <UpdateAlert update={latestUpdate} onAcknowledge={handleAcknowledgeUpdate} config={accessibility} />
          )}

          <section className="animate-fadeIn">
            {activeView === 'regulations' ? (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className={`text-3xl sm:text-4xl font-black tracking-tighter ${accessibility.darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {role === 'admin' ? 'Gestão de Normas' : 'Guia do Morador'}
                    </h2>
                    <p className={`text-sm sm:text-base mt-2 font-medium ${accessibility.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {regulations.length > 0 ? 'Documentação atualizada e categorizada.' : 'Nenhum regimento importado ainda.'}
                    </p>
                  </div>
                </div>

                {regulations.length > 0 && (
                  <>
                    <div className="relative group max-w-3xl">
                      <input 
                        type="text" placeholder="Pesquisar regra ou tópico..."
                        className={`w-full pl-14 pr-6 py-5 rounded-[1.5rem] border transition-all shadow-sm focus:ring-4 focus:ring-indigo-500/10 ${
                          accessibility.darkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 placeholder-slate-400'
                        }`}
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <div className="grid gap-6">
                      {filteredRegulations.map(reg => (
                        <RuleCard key={reg.id} item={reg} fontSize={accessibility.fontSize} highContrast={accessibility.highContrast} darkMode={accessibility.darkMode} />
                      ))}
                    </div>
                  </>
                )}

                {regulations.length === 0 && role === 'admin' && (
                  <div className="text-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
                    <div className="w-20 h-20 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Aguardando Importação</h3>
                    <p className="text-slate-400 max-w-xs mx-auto text-sm">Use o botão "Analisar PDF" acima para carregar o regimento do condomínio.</p>
                  </div>
                )}
              </div>
            ) : (
              <SuggestionsView suggestions={suggestions} onVote={handleVote} onAdd={handleAddSuggestion} config={accessibility} role={role || 'morador'} />
            )}
          </section>
        </main>
      </div>

      {isUploadModalOpen && <UploadModal onClose={() => setIsUploadModalOpen(false)} onProcess={handleProcessPdf} darkMode={accessibility.darkMode} />}
    </div>
  );
};

export default App;
