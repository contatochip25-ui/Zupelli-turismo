import React from 'react';
import { FlightResponse } from '../types';
import { ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResultCardProps {
  data: FlightResponse;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  return (
    <div className="animate-[fadeIn_0.8s_ease-out] w-full max-w-5xl mx-auto space-y-8">
      
      {/* Main Analysis Card */}
      <div className="glass-card rounded-3xl shadow-[0_15px_40px_rgba(30,58,138,0.15)] overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(30,58,138,0.2)] border border-white/60 bg-white/80 backdrop-blur-2xl ring-1 ring-white/50">
        
        {/* Header Gradient */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 p-8 flex items-center justify-between relative overflow-hidden">
            {/* Abstract Background Patterns */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500 rounded-full blur-[60px] opacity-20"></div>
            
            <div className="flex items-center gap-4 relative z-10">
                <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 shadow-inner">
                    <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
                </div>
                <div>
                    <h3 className="text-2xl font-display font-semibold text-white tracking-wide">
                    Inteligência de Voo
                    </h3>
                    <p className="text-blue-200 text-xs font-medium tracking-wider uppercase opacity-80">Análise Zupelli AI</p>
                </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full border border-emerald-500/30 backdrop-blur-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-emerald-100 text-[10px] font-bold uppercase tracking-wider">Busca Concluída</span>
            </div>
        </div>
        
        {/* Content Area */}
        <div className="p-8 md:p-12 bg-gradient-to-b from-white to-blue-50/30">
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-light prose-headings:font-display prose-headings:text-slate-800 prose-strong:font-bold prose-strong:text-blue-900 prose-a:text-blue-600 hover:prose-a:text-blue-800">
             <ReactMarkdown 
               components={{
                 h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700" {...props} />,
                 h2: ({node, ...props}) => (
                    <div className="flex items-center gap-3 mt-10 mb-6 pb-2 border-b border-slate-100">
                        <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                        <h2 className="text-xl font-bold text-slate-800 m-0" {...props} />
                    </div>
                 ),
                 strong: ({node, ...props}) => <span className="font-bold text-slate-900 bg-blue-50/50 px-1 py-0.5 rounded box-decoration-clone" {...props} />,
                 ul: ({node, ...props}) => <ul className="space-y-4 my-6 pl-0 grid grid-cols-1 gap-2" {...props} />,
                 li: ({node, ...props}) => (
                    <li className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow" {...props}>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 shrink-0"></div>
                        <span className="flex-1">{props.children}</span>
                    </li>
                 ),
                 p: ({node, ...props}) => <p className="mb-4 text-justify leading-7" {...props} />,
                 blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-amber-400 pl-6 py-2 my-6 bg-amber-50/50 rounded-r-lg italic text-slate-700" {...props} />
               }}
             >
               {data.text}
             </ReactMarkdown>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
            <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Dados processados em tempo real via Google Search Grounding
            </p>
            <p>Zupelli Turismo &copy; AI Travel Solutions</p>
        </div>
      </div>

      {/* Grounding Sources Grid */}
      {data.sources.length > 0 && (
        <div className="animate-[fadeIn_1s_ease-out_0.3s_both]">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 px-4 flex items-center gap-4">
              <span className="h-px bg-slate-200 flex-1"></span>
              Fontes Verificadas
              <span className="h-px bg-slate-200 flex-1"></span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.sources.map((source, index) => (
                source.web && (
                <a 
                    key={index}
                    href={source.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:bg-white flex flex-col h-full relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[100px] -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-start justify-between gap-2 mb-4 relative z-10">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        FONTE {index + 1}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    <h5 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-800 transition-colors relative z-10 mb-2">
                      {source.web.title}
                    </h5>
                    
                    <div className="mt-auto pt-3 relative z-10 flex items-center gap-2 border-t border-slate-100/50">
                      <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">W</div>
                      <p className="text-[10px] text-slate-400 truncate font-mono">
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