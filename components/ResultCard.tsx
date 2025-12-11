import React from 'react';
import { FlightResponse } from '../types';
import { ExternalLink, Sparkles, Plane } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResultCardProps {
  data: FlightResponse;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  return (
    <div className="animate-[fadeIn_0.6s_cubic-bezier(0.2,0.8,0.2,1)] w-full max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Main Analysis Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-3xl shadow-[0_20px_60px_-15px_rgba(30,58,138,0.2)] border border-white/50 ring-1 ring-white/60">
        
        {/* Futurisic Header */}
        <div className="relative px-8 py-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 flex items-center justify-between overflow-hidden">
            {/* Animated Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute w-32 h-32 bg-blue-500/30 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
                <div className="absolute w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -bottom-32 right-0"></div>
            </div>

            <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                    <h3 className="text-xl font-display font-semibold text-white tracking-wide">
                        Análise Zupelli AI
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                        <span className="text-[10px] text-blue-200 uppercase tracking-widest font-medium">Live Search</span>
                    </div>
                </div>
            </div>
            
            <Plane className="w-24 h-24 text-white/5 absolute -right-4 -bottom-8 rotate-[-15deg]" />
        </div>
        
        {/* Content Body */}
        <div className="p-8 md:p-10 text-slate-700">
          <div className="prose prose-slate max-w-none 
            prose-headings:font-display prose-headings:text-slate-800 
            prose-h1:text-2xl prose-h1:font-bold prose-h1:text-transparent prose-h1:bg-clip-text prose-h1:bg-gradient-to-r prose-h1:from-blue-900 prose-h1:to-blue-600
            prose-h2:text-lg prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:flex prose-h2:items-center prose-h2:gap-2
            prose-p:leading-relaxed prose-p:text-slate-600 prose-p:mb-4
            prose-strong:text-blue-900 prose-strong:font-bold prose-strong:bg-blue-50 prose-strong:px-1 prose-strong:rounded
            prose-li:marker:text-blue-400
            ">
             <ReactMarkdown>
               {data.text}
             </ReactMarkdown>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                Powered by Gemini 2.5 Flash
            </p>
        </div>
      </div>

      {/* Sources Grid */}
      {data.sources.length > 0 && (
        <div className="animate-[fadeIn_0.5s_ease-out_0.2s_both]">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 pl-2 opacity-80">
              Fontes de Referência
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.sources.map((source, index) => (
                source.web && (
                <a 
                    key={index}
                    href={source.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col p-4 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
                >
                    <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50 transition-opacity group-hover:opacity-100"></div>
                    
                    <div className="flex items-center justify-between mb-2 relative z-10">
                        <span className="text-[9px] font-bold text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded uppercase group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                           Fonte {index + 1}
                        </span>
                        <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    
                    <span className="text-sm font-semibold text-slate-800 line-clamp-2 mb-2 group-hover:text-blue-900 transition-colors z-10">
                        {source.web.title}
                    </span>
                    
                    <span className="text-[10px] text-slate-400 font-mono truncate mt-auto">
                        {new URL(source.web.uri).hostname}
                    </span>
                </a>
                )
            ))}
            </div>
        </div>
      )}
    </div>
  );
};