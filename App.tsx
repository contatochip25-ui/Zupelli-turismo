import React, { useState } from 'react';
import { Background } from './components/Background';
import { SearchForm } from './components/SearchForm';
import { ResultCard } from './components/ResultCard';
import { SearchParams, FlightResponse, SearchStatus } from './types';
import { searchFlights } from './services/geminiService';
import { Plane, AlertCircle } from 'lucide-react';

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
    } catch (error) {
      console.error(error);
      setStatus(SearchStatus.ERROR);
      setErrorMsg("Não foi possível completar sua busca no momento. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen text-slate-800 relative flex flex-col">
      <Background />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900 rounded-lg shadow-lg">
              <Plane className="w-6 h-6 text-white transform -rotate-45" />
            </div>
            <div>
                <h1 className="text-2xl font-display font-bold text-blue-900 leading-none">
                Zupelli <span className="text-amber-500 font-normal italic">Turismo</span>
                </h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Desde 2024</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
             <span className="hover:text-blue-900 cursor-pointer transition-colors">Destinos</span>
             <span className="hover:text-blue-900 cursor-pointer transition-colors">Ofertas</span>
             <span className="hover:text-blue-900 cursor-pointer transition-colors">Sobre Nós</span>
             <button className="px-4 py-2 bg-blue-50 text-blue-900 rounded-full hover:bg-blue-100 transition-colors">Contato</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start pt-32 pb-12 px-6 relative z-10 w-full max-w-7xl mx-auto">
        
        <div className="w-full max-w-4xl mb-12 text-center animate-float">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-slate-900 leading-tight">
            Descubra o mundo com <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">elegância e economia</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto">
            Utilizamos inteligência artificial avançada para curar as melhores experiências de voo com os preços mais exclusivos do mercado.
          </p>
        </div>

        {/* Search Interface */}
        <div className={`w-full max-w-4xl transition-all duration-700 ${status === SearchStatus.COMPLETE ? 'translate-y-0' : 'translate-y-0'}`}>
          <SearchForm onSearch={handleSearch} isLoading={status === SearchStatus.SEARCHING} />
        </div>

        {/* Loading State */}
        {status === SearchStatus.SEARCHING && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="relative w-20 h-20">
               <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-blue-900 rounded-full border-t-transparent animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <Plane className="w-6 h-6 text-amber-500" />
               </div>
            </div>
            <p className="font-display font-medium text-slate-500 tracking-wide animate-pulse">
              Consultando companhias aéreas...
            </p>
          </div>
        )}

        {/* Error State */}
        {status === SearchStatus.ERROR && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 max-w-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{errorMsg}</span>
          </div>
        )}

        {/* Results Display */}
        {status === SearchStatus.COMPLETE && results && (
          <div className="w-full mt-12 mb-20">
             <ResultCard data={results} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-8 mt-auto">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-slate-500 text-sm">
                 &copy; {new Date().getFullYear()} Zupelli Turismo. Todos os direitos reservados.
             </div>
             <div className="flex gap-6 text-sm font-medium text-slate-400">
                 <a href="#" className="hover:text-blue-900 transition-colors">Política de Privacidade</a>
                 <a href="#" className="hover:text-blue-900 transition-colors">Termos de Uso</a>
             </div>
         </div>
      </footer>
    </div>
  );
};

export default App;