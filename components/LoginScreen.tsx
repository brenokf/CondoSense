
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
    // Email: admin@condosense.com | Senha: admin ou 1234
    if (email.toLowerCase() === 'admin@condosense.com' && (password === 'admin' || password === '1234')) {
      onLogin('admin');
    } else {
      alert('Credenciais inválidas. Tente:\nE-mail: admin@condosense.com\nSenha: admin');
    }
  };

  return (
    <div className={`min-h-screen relative flex items-center justify-center p-4 overflow-hidden transition-colors duration-700 ${
      config.darkMode ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      
      {/* --- BACKGROUND ANIMATION --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Blobs */}
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-blob-slow ${
          config.darkMode ? 'bg-indigo-900' : 'bg-indigo-200'
        }`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-blob-slow animation-delay-2000 ${
          config.darkMode ? 'bg-purple-900' : 'bg-purple-200'
        }`}></div>
        <div className={`absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-30 mix-blend-multiply animate-blob-slow animation-delay-4000 ${
          config.darkMode ? 'bg-blue-900' : 'bg-blue-200'
        }`}></div>

        {/* Techno Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{ 
            backgroundImage: `radial-gradient(${config.darkMode ? '#6366f1' : '#4f46e5'} 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }}
        ></div>
        
        {/* Subtle radial center highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]"></div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob-slow {
          animation: blob 15s infinite alternate ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* --- LOGIN CARD --- */}
      <div className={`relative z-10 max-w-md w-full rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500 backdrop-blur-xl border ${
        config.darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-100'
      }`}>
        <div className="p-8 sm:p-10 text-center">
          <div className="group relative w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 mx-auto mb-8 transition-transform hover:scale-105 active:scale-95 duration-500">
            <svg className="w-11 h-11 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div className="absolute inset-0 rounded-3xl bg-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
          </div>
          
          <h1 className={`text-4xl font-black tracking-tighter mb-2 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent`}>
            CondoSense
          </h1>
          <p className={`text-sm mb-10 font-medium ${config.darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            Inteligência Artificial para uma <br/> convivência extraordinária.
          </p>

          {!showAdminLogin ? (
            <div className="space-y-4">
              <button 
                onClick={() => onLogin('morador')}
                className="w-full group flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/25 transition-all hover:-translate-y-1 active:scale-95 overflow-hidden relative"
              >
                <span className="relative z-10">Sou Morador</span>
                <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              
              <button 
                onClick={() => setShowAdminLogin(true)}
                className={`w-full py-5 rounded-2xl font-bold transition-all border-2 flex items-center justify-center gap-2 ${
                  config.darkMode 
                    ? 'border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white' 
                    : 'border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Sou Síndico
              </button>
            </div>
          ) : (
            <form onSubmit={handleAdminSubmit} className="space-y-6 animate-fadeIn">
              <div className="text-left space-y-4">
                <div className="space-y-2">
                  <label className={`block text-[10px] font-black uppercase tracking-widest ml-1 ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Acesso Administrativo
                  </label>
                  <input 
                    type="email"
                    required
                    autoFocus
                    className={`w-full p-4 rounded-2xl border transition-all focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 ${
                      config.darkMode ? 'bg-slate-950/50 border-slate-800 text-white placeholder-slate-700' : 'bg-slate-50 border-slate-100 placeholder-slate-400'
                    }`}
                    placeholder="admin@condosense.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`block text-[10px] font-black uppercase tracking-widest ml-1 ${config.darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Senha
                  </label>
                  <input 
                    type="password"
                    required
                    className={`w-full p-4 rounded-2xl border transition-all focus:ring-4 focus:ring-indigo-500/10 focus:outline-none focus:border-indigo-500 ${
                      config.darkMode ? 'bg-slate-950/50 border-slate-800 text-white placeholder-slate-700' : 'bg-slate-50 border-slate-100 placeholder-slate-400'
                    }`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/25 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Entrar no Hub
                </button>
                
                <button 
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className={`mt-6 text-xs font-black uppercase tracking-widest transition-colors ${config.darkMode ? 'text-slate-600 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Voltar para Início
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className={`p-6 text-center border-t ${config.darkMode ? 'bg-slate-950/30 border-slate-800/50 text-slate-700' : 'bg-slate-50/50 border-slate-50 text-slate-400'}`}>
          <div className="flex items-center justify-center gap-2">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
            <span className="text-[10px] font-black uppercase tracking-widest">Conexão Segura CondoSense</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
