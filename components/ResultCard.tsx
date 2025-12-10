import React from 'react';
import { FlightResponse } from '../types';
import { ExternalLink, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResultCardProps {
  data: FlightResponse;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data }) => {
  return (
    <div className="animate-[fadeIn_0.8s_ease-out] w-full max-w-4xl mx-auto space-y-6">
      
      {/* Main Analysis Card */}
      <div className="bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="bg-blue-900 p-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-display font-medium text-white tracking-wide">
              Itinerários Recomendados
            </h3>
        </div>
        
        <div className="p-8 md:p-10">
          <div className="prose prose-slate max-w-none text-slate-600 font-light leading-relaxed">
             <ReactMarkdown 
               components={{
                 strong: ({node, ...props}) => <span className="text-blue-900 font-bold" {...props} />,
                 ul: ({node, ...props}) => <ul className="space-y-3 my-6 pl-4 border-l-2 border-amber-200" {...props} />,
                 li: ({node, ...props}) => <li className="pl-2" {...props} />,
                 p: ({node, ...props}) => <p className="mb-4 text-justify" {...props} />
               }}
             >
               {data.text}
             </ReactMarkdown>
          </div>
        </div>
        
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-end">
            <p className="text-xs text-slate-400 italic">Preços sujeitos a alteração e disponibilidade.</p>
        </div>
      </div>

      {/* Grounding Sources Grid */}
      {data.sources.length > 0 && (
        <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Fontes Verificadas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.sources.map((source, index) => (
                source.web && (
                <a 
                    key={index}
                    href={source.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white border border-slate-200 hover:border-blue-300 rounded-lg p-5 transition-all hover:shadow-md flex flex-col justify-between h-full"
                >
                    <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full group-hover:bg-amber-100 transition-colors">Opção {index + 1}</span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <p className="text-sm font-serif font-medium text-slate-800 line-clamp-2 group-hover:text-blue-900 transition-colors">
                    {source.web.title}
                    </p>
                    <div className="mt-2 text-xs text-slate-400 truncate group-hover:text-blue-500">
                    {source.web.uri}
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