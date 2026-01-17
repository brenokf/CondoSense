
import React from 'react';
import { ProcessingState } from '../types';

const ProcessingOverlay: React.FC<ProcessingState> = ({ isAnalyzing, progress, message }) => {
  if (!isAnalyzing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md transition-opacity animate-fadeIn">
      <div className="max-w-md w-full mx-4 bg-white rounded-3xl p-8 shadow-2xl text-center">
        <div className="mb-6 relative inline-block">
          <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
          <div 
            className="absolute inset-0 w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"
          ></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-indigo-600">
            {progress}%
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Analisando Regulamento</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          {message}
        </p>
        
        <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
          Processado por Gemini 3 Flash
        </p>
      </div>
    </div>
  );
};

export default ProcessingOverlay;
