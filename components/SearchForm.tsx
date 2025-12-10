import React, { useState, useEffect, useRef } from 'react';
import { Plane, Calendar, MapPin, Search, ArrowRightLeft } from 'lucide-react';
import { SearchParams } from '../types';
import { airports, Airport } from '../data/airports';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

type TripType = 'one-way' | 'round-trip';

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState<TripType>('one-way');

  // Autocomplete States
  const [originSuggestions, setOriginSuggestions] = useState<Airport[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<Airport[]>([]);
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  // Refs for click outside detection
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // Date validation
  const today = new Date().toISOString().split('T')[0];

  // Filter logic
  const filterAirports = (query: string) => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return airports.filter(a => 
      a.city.toLowerCase().includes(lowerQuery) || 
      a.code.toLowerCase().includes(lowerQuery) || 
      a.country.toLowerCase().includes(lowerQuery) ||
      a.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 5); 
  };

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setOrigin(val);
    if (val.length > 1) {
      setOriginSuggestions(filterAirports(val));
      setShowOriginDropdown(true);
    } else {
      setShowOriginDropdown(false);
    }
  };

  const handleDestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDestination(val);
    if (val.length > 1) {
      setDestSuggestions(filterAirports(val));
      setShowDestDropdown(true);
    } else {
      setShowDestDropdown(false);
    }
  };

  const selectOrigin = (airport: Airport) => {
    setOrigin(`${airport.city} (${airport.code})`);
    setShowOriginDropdown(false);
  };

  const selectDestination = (airport: Airport) => {
    setDestination(`${airport.city} (${airport.code})`);
    setShowDestDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination && date) {
      if (tripType === 'round-trip' && !returnDate) return;
      
      onSearch({ 
        origin, 
        destination, 
        date,
        returnDate: tripType === 'round-trip' ? returnDate : undefined
      });
      setShowOriginDropdown(false);
      setShowDestDropdown(false);
    }
  };

  // Robust click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginDropdown(false);
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full relative">
      <div className="relative bg-white rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-blue-50">
        
        <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-semibold text-slate-800 mb-2">
            Planeje sua próxima jornada
            </h2>
            <p className="text-slate-500 text-sm">Preencha os dados abaixo para buscarmos as melhores tarifas</p>
        </div>

        {/* Trip Type Toggles */}
        <div className="flex justify-center gap-2 mb-8 bg-slate-100 p-1 rounded-lg w-fit mx-auto">
          <button
            type="button"
            onClick={() => setTripType('one-way')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-300 ${
              tripType === 'one-way' 
                ? 'bg-white text-blue-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Só Ida
          </button>
          <button
            type="button"
            onClick={() => setTripType('round-trip')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
              tripType === 'round-trip' 
                ? 'bg-white text-blue-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ArrowRightLeft className="w-3 h-3" />
            Ida e Volta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`grid grid-cols-1 ${tripType === 'round-trip' ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
            
            {/* Origin Input */}
            <div className="relative group" ref={originRef}>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Origem</label>
              <div className="relative">
                <div className="flex items-center">
                    <MapPin className="absolute left-3 w-5 h-5 text-blue-400" />
                    <input
                    type="text"
                    value={origin}
                    onChange={handleOriginChange}
                    onFocus={() => origin.length > 1 && setShowOriginDropdown(true)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all font-medium"
                    placeholder="De onde você sai?"
                    required
                    autoComplete="off"
                    />
                </div>
                
                {/* Origin Dropdown */}
                {showOriginDropdown && originSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-lg shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                        {originSuggestions.map((airport) => (
                            <div
                                key={airport.code}
                                onMouseDown={() => selectOrigin(airport)}
                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-sm text-slate-800">{airport.city}</span>
                                    <span className="font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{airport.code}</span>
                                </div>
                                <div className="text-xs text-slate-500 mt-1">{airport.name}, {airport.country}</div>
                            </div>
                        ))}
                    </div>
                )}
              </div>
            </div>

            {/* Destination Input */}
            <div className="relative group" ref={destRef}>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Destino</label>
              <div className="relative">
                <div className="flex items-center">
                    <Plane className="absolute left-3 w-5 h-5 text-blue-400" />
                    <input
                    type="text"
                    value={destination}
                    onChange={handleDestChange}
                    onFocus={() => destination.length > 1 && setShowDestDropdown(true)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all font-medium"
                    placeholder="Para onde vamos?"
                    required
                    autoComplete="off"
                    />
                </div>

                {/* Destination Dropdown */}
                {showDestDropdown && destSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-lg shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                        {destSuggestions.map((airport) => (
                            <div
                                key={airport.code}
                                onMouseDown={() => selectDestination(airport)}
                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-sm text-slate-800">{airport.city}</span>
                                    <span className="font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{airport.code}</span>
                                </div>
                                <div className="text-xs text-slate-500 mt-1">{airport.name}, {airport.country}</div>
                            </div>
                        ))}
                    </div>
                )}
              </div>
            </div>

            {/* Departure Date Input */}
            <div className="relative group">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {tripType === 'round-trip' ? 'Data de Ida' : 'Data da Viagem'}
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-3 w-5 h-5 text-blue-400" />
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Return Date Input (Conditional) */}
            {tripType === 'round-trip' && (
              <div className="relative group animate-[fadeIn_0.3s_ease-out]">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data de Volta</label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3 w-5 h-5 text-blue-400" />
                  <input
                    type="date"
                    value={returnDate}
                    min={date || today} 
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all font-medium"
                    required={tripType === 'round-trip'}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            {isLoading ? (
                <>
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 <span className="tracking-wide text-sm">BUSCANDO MELHORES TARIFAS...</span>
                </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span className="tracking-wide text-sm">PESQUISAR VOOS</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};