import React, { useState } from 'react';
import { Background } from './components/Background';
import { SearchForm } from './components/SearchForm';
import { ResultCard } from './components/ResultCard';
import { SearchParams, FlightResponse, SearchStatus } from './types';
import { searchFlights } from './services/geminiService';
import { Plane, AlertTriangle, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<SearchStatus>(SearchStatus.IDLE);
  const [results, setResults] = useState<FlightResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSearch = async (params: SearchParams) => {
    setStatus(SearchStatus.SEARCHING);
    setResults(null);
    setErrorMsg('');

    try {
      const data = await searchFlights(params);
      setResults(data);
      setStatus(SearchStatus.COMPLETE);
    } catch (error: any) {
      console.error(error);
      setStatus(SearchStatus.ERROR);
      // Exibe a mensagem de erro tratada no serviço
      setErrorMsg(error.message || "Não foi possível completar sua busca. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen text-slate-800 relative flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Background />
      
      {/* Header Glassmorphism */}
      <header className="fixed top-0 left-0 w-full z-[60] px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="p-2 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-lg group-hover:shadow-blue-900/40 transition-shadow duration-300">
              <Plane className="w-6 h-6 text-white transform -rotate-45 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
                <h1 className="text-2xl font-display font-bold text-blue-900 leading-none tracking-tight">
                Zupelli <span className="text-amber-500 font-normal italic">Turismo</span>
                </h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-0.5">Premium Travel AI</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
             <span className="hover:text-blue-900 cursor-pointer transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-900 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Destinos</span>
             <span className="hover:text-blue-900 cursor-pointer transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-900 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Exclusive</span>
             <button className="px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5 text-xs font-bold uppercase tracking-wide">
               Concierge
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start pt-36 pb-12 px-6 relative z-10 w-full max-w-7xl mx-auto">
        
        <div className={`w-full max-w-4xl text-center transition-all duration-1000 ease-out ${status === SearchStatus.IDLE ? 'mt-12 mb-16 opacity-100' : 'mt-0 mb-8 opacity-100'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider mb-6 animate-[fadeIn_0.5s_ease-out]">
            <ShieldCheck className="w-3 h-3" />
            Tecnologia Gemini 2.5 Flash
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-slate-900 leading-[1.1] tracking-tight">
            O futuro das viagens <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 animate-gradient-x">começa aqui.</span>
          </h2>
          {status === SearchStatus.IDLE && (
            <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed animate-[fadeIn_1s_ease-out_0.3s_both]">
                Nossa IA analisa milhares de rotas em segundos para encontrar a combinação perfeita de luxo, tempo e economia para você.
            </p>
          )}
        </div>

        {/* Search Interface */}
        <div className="w-full max-w-5xl animate-[fadeIn_0.8s_ease-out_0.5s_both]">
          <SearchForm onSearch={handleSearch} isLoading={status === SearchStatus.SEARCHING} />
        </div>

        {/* Loading State */}
        {status === SearchStatus.SEARCHING && (
          <div className="mt-20 flex flex-col items-center gap-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="relative w-24 h-24">
               <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                 <Plane className="w-8 h-8 text-blue-900" />
               </div>
            </div>
            <div className="text-center">
                <p className="text-lg font-display font-bold text-slate-800 tracking-wide">
                Consultando Rede Global
                </p>
                <p className="text-sm text-slate-500 mt-1">Analisando disponibilidade em tempo real...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {status === SearchStatus.ERROR && (
          <div className="mt-10 p-6 bg-red-50/90 backdrop-blur-md border border-red-200 rounded-2xl flex items-start gap-4 text-red-800 max-w-2xl shadow-xl animate-[fadeIn_0.3s_ease-out]">
            <div className="p-2 bg-red-100 rounded-full shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-1">Não foi possível concluir a busca</h3>
                <p className="text-sm opacity-90 leading-relaxed">{errorMsg}</p>
                {errorMsg.includes("API Key") && (
                    <div className="mt-4 p-3 bg-white/50 rounded-lg text-xs font-mono text-red-700 border border-red-100">
                        Dica: Adicione <code>API_KEY</code> nas Environment Variables do seu projeto na Vercel.
                    </div>
                )}
            </div>
          </div>
        )}

        {/* Results Display */}
        {status === SearchStatus.COMPLETE && results && (
          <div className="w-full mt-10 mb-20">
             <ResultCard data={results} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full bg-white/80 backdrop-blur-lg border-t border-slate-200 py-8 mt-auto relative z-20">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-slate-500 text-xs font-medium tracking-wide">
                 &copy; {new Date().getFullYear()} ZUPELLI TURISMO. EXCELLENCE IN TRAVEL.
             </div>
             <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-wider">
                 <a href="#" className="hover:text-blue-900 transition-colors">Privacidade</a>
                 <a href="#" className="hover:text-blue-900 transition-colors">Termos</a>
                 <a href="#" className="hover:text-blue-900 transition-colors">Suporte</a>
             </div>
         </div>
      </footer>
    </div>
  );
};

export default App;