import React from 'react';
import { FlightResponse } from '../types';
import { ExternalLink, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResultCardProps {
  data: FlightResponse;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  return (
    <div className="animate-[fadeIn_0.8s_ease-out] w-full max-w-5xl mx-auto space-y-8">
      
      {/* Main Analysis Card */}
      <div className="glass-card rounded-2xl shadow-[0_8px_32px_rgba(30,58,138,0.1)] overflow-hidden transition-all hover:shadow-[0_8px_40px_rgba(30,58,138,0.15)]">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 flex items-center gap-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <Sparkles className="w-6 h-6 text-amber-400 relative z-10 animate-pulse" />
            <h3 className="text-xl font-display font-medium text-white tracking-wide relative z-10">
              Inteligência de Voo Zupelli
            </h3>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-light">
             <ReactMarkdown 
               components={{
                 h1: ({node, ...props}) => <h1 className="text-2xl font-display font-bold text-blue-900 mb-6 border-b border-blue-100 pb-2" {...props} />,
                 h2: ({node, ...props}) => <h2 className="text-lg font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2" {...props} />,
                 strong: ({node, ...props}) => <span className="text-blue-700 font-bold bg-blue-50 px-1 rounded" {...props} />,
                 ul: ({node, ...props}) => <ul className="space-y-3 my-4 pl-0" {...props} />,
                 li: ({node, ...props}) => <li className="pl-4 border-l-2 border-amber-300 ml-2 hover:bg-slate-50 p-2 rounded-r transition-colors" {...props} />,
                 p: ({node, ...props}) => <p className="mb-4 text-justify" {...props} />
               }}
             >
               {data.text}
             </ReactMarkdown>
          </div>
        </div>
        
        <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-1 rounded-full uppercase tracking-wider">AI Powered</span>
            <p className="text-xs text-slate-400 italic">Preços sujeitos a alteração em tempo real.</p>
        </div>
      </div>

      {/* Grounding Sources Grid */}
      {data.sources.length > 0 && (
        <div className="animate-[fadeIn_1s_ease-out]">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5 px-2 flex items-center gap-2">
              <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
              Fontes Verificadas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.sources.map((source, index) => (
                source.web && (
                <a 
                    key={index}
                    href={source.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/60 backdrop-blur-sm border border-slate-200 hover:border-blue-400 rounded-xl p-4 transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col h-full relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 group-hover:bg-blue-100"></div>
                    
                    <div className="flex items-start justify-between gap-2 mb-3 relative z-10">
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        Fonte {index + 1}
                      </span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    <p className="text-sm font-serif font-bold text-slate-800 line-clamp-2 group-hover:text-blue-900 transition-colors relative z-10 mb-1">
                      {source.web.title}
                    </p>
                    
                    <div className="mt-auto pt-2 relative z-10">
                      <p className="text-[10px] text-slate-400 truncate group-hover:text-blue-500 font-mono">
                        {new URL(source.web.uri).hostname}
                      </p>
                    </div>
                </a>
                )
            ))}
            </div>
        </div>
      )}
    </div>
  );
};