
import React, { useState, useRef } from 'react';

interface Props {
  onClose: () => void;
  onProcess: (base64: string) => void;
  darkMode: boolean;
}

const UploadModal: React.FC<Props> = ({ onClose, onProcess, darkMode }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
    } else if (selected) {
      alert("Por favor, selecione apenas arquivos PDF.");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && dropped.type === 'application/pdf') {
      setFile(dropped);
    } else if (dropped) {
      alert("Por favor, solte apenas arquivos PDF.");
    }
  };

  const handleSubmit = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      onProcess(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-scaleIn transition-colors ${
        darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white'
      }`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Importar PDF</h2>
            <button onClick={onClose} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className={`mb-6 text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Selecione o arquivo do Regimento Interno. Nossa IA lerá o documento completo para criar o guia interativo.
          </p>

          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
              isDragging 
                ? 'border-indigo-500 bg-indigo-500/10' 
                : darkMode ? 'border-slate-700 hover:border-slate-500 bg-slate-900/50' : 'border-slate-200 hover:border-indigo-300 bg-slate-50'
            }`}
          >
            <input 
              type="file" 
              className="hidden" 
              accept="application/pdf" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
            
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              file ? 'bg-emerald-500/20 text-emerald-500' : 'bg-indigo-500/20 text-indigo-500'
            }`}>
              {file ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )}
            </div>

            <p className={`text-sm font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {file ? file.name : "Clique ou arraste o PDF aqui"}
            </p>
            {!file && <p className="text-xs text-slate-500 mt-1">Apenas arquivos .pdf</p>}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 py-3 text-sm font-bold transition-colors rounded-xl ${
                darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Cancelar
            </button>
            <button
              disabled={!file}
              onClick={handleSubmit}
              className={`flex-[2] py-3 rounded-xl text-sm font-bold transition-all shadow-lg ${
                file 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20' 
                  : `${darkMode ? 'bg-slate-700 text-slate-500' : 'bg-slate-100 text-slate-400'} cursor-not-allowed shadow-none`
              }`}
            >
              Processar Documento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
