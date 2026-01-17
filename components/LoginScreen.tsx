
import React, { useState } from 'react';
import { UserRole, AccessibilityConfig } from '../types';

interface Props {
  onLogin: (role: UserRole) => void;
  config: AccessibilityConfig;
}

const LoginScreen: React.FC<Props> = ({ onLogin, config }) => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de credenciais para demonstração
    // Email: admin@condolex.com | Senha: admin ou 1234
    if (email.toLowerCase() === 'admin@condolex.com' && (password === 'admin' || password === '1234')) {
      onLogin('admin');
    } else {
      alert('Credenciais inválidas. Tente:\nE-mail: admin@condolex.com\nSenha: admin');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      config.darkMode ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      <div className={`max-w-md w-full rounded-3xl shadow-2xl overflow-hidden transition-colors ${
        config.darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'
      }`}>
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          <h1 className={`text-3xl font-bold tracking-tight mb-2 ${config.darkMode ? 'text-white' : 'text-slate-900'}`}>
            CondoLex
          </h1>
          <p className={`text-sm mb-8 ${config.darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            O hub inteligente de regulamentos do seu condomínio.
          </p>

          {!showAdminLogin ? (
            <div className="space-y-4">
              <button 
                onClick={() => onLogin('morador')}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
              >
                Sou Morador / Acessar App
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${config.darkMode ? 'border-slate-800' : 'border-slate-100'}`}></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className={`px-2 transition-colors ${config.darkMode ? 'bg-slate-900 text-slate-600' : 'bg-white text-slate-400'}`}>OU</span>
                </div>
              </div>
              <button 
                onClick={() => setShowAdminLogin(true)}
                className={`w-full py-3 rounded-2xl font-bold transition-all ${
                  config.darkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Login como Síndico (ADM)
              </button>
            </div>
          ) : (
            <form onSubmit={handleAdminSubmit} className="space-y-4 animate-fadeIn">
              <div className="text-left">
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${config.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  E-mail Administrativo
                </label>
                <input 
                  type="email"
                  required
                  autoFocus
                  className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors mb-4 ${
                    config.darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                  placeholder="admin@condolex.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${config.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  Senha
                </label>
                <input 
                  type="password"
                  required
                  className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors ${
                    config.darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
              >
                Entrar como ADM
              </button>
              
              <button 
                type="button"
                onClick={() => setShowAdminLogin(false)}
                className={`text-sm font-medium ${config.darkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Voltar
              </button>
            </form>
          )}
        </div>
        
        <div className={`p-4 text-center text-[10px] ${config.darkMode ? 'bg-slate-950/50 text-slate-600' : 'bg-slate-50 text-slate-400'}`}>
          Acesso seguro e simplificado via CondoLex AI
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
