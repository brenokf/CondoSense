
import React, { useState, useMemo } from 'react';
import { RuleCategory, RegulationItem, AccessibilityConfig, ProcessingState, UserRole } from './types';
import { INITIAL_REGULATIONS } from './constants';
import { analyzeRegulations } from './services/geminiService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RuleCard from './components/RuleCard';
import ProcessingOverlay from './components/ProcessingOverlay';
import UploadModal from './components/UploadModal';
import LoginScreen from './components/LoginScreen';

const App: React.FC = () => {
  const [regulations, setRegulations] = useState<RegulationItem[]>(INITIAL_REGULATIONS);
  const [activeCategory, setActiveCategory] = useState<RuleCategory | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
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
    } catch (err) {
      alert("Erro ao processar o arquivo PDF. Verifique se o arquivo não está protegido por senha.");
      setProcessing({ isAnalyzing: false, progress: 0, message: '' });
    }
  };

  if (!role) {
    return <LoginScreen config={accessibility} onLogin={setRole} />;
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      accessibility.darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    } ${accessibility.highContrast ? 'high-contrast' : ''}`}>
      <ProcessingOverlay {...processing} />
      
      <Header 
        config={accessibility} 
        role={role}
        onConfigChange={setAccessibility}
        onLogout={() => setRole(null)}
        onUploadClick={() => setIsUploadModalOpen(true)}
      />

      <main className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <Sidebar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
            config={accessibility}
          />
        </aside>

        <section className="flex-1 space-y-6">
          <div className="relative group">
            <input 
              type="text"
              placeholder="Busque por palavras-chave, tags ou tópicos..."
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all shadow-sm group-hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                accessibility.darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200 placeholder-slate-400'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
              accessibility.darkMode ? 'text-slate-600 group-hover:text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center justify-between">
            <h2 className={`text-sm font-bold uppercase tracking-widest ${accessibility.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Encontrado(s) {filteredRegulations.length} {filteredRegulations.length === 1 ? 'Item' : 'Itens'}
            </h2>
          </div>

          <div className="grid gap-4">
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
              <div className={`text-center py-20 rounded-3xl border border-dashed ${
                accessibility.darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-300'
              }`}>
                <div className="text-4xl mb-4 opacity-30">🔍</div>
                <h3 className={`text-lg font-bold ${accessibility.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  Nenhuma regra encontrada para sua busca.
                </h3>
                <p className={`${accessibility.darkMode ? 'text-slate-600' : 'text-slate-400'} mt-1`}>
                  Tente outras palavras-chave ou navegue pelas categorias.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {isUploadModalOpen && (
        <UploadModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onProcess={handleProcessPdf}
          darkMode={accessibility.darkMode}
        />
      )}

      <footer className={`py-8 border-t mt-auto transition-colors ${
        accessibility.darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={`text-xs ${accessibility.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
            &copy; 2024 CondoLex Hub de Regras Inteligente. Promovendo transparência e harmonia comunitária.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
