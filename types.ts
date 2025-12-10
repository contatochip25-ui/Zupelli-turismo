export interface SearchParams {
  origin: string;
  destination: string;
  date: string;
  returnDate?: string;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export interface FlightResponse {
  text: string;
  sources: GroundingSource[];
}

export enum SearchStatus {
  IDLE = 'IDLE',
  SEARCHING = 'SEARCHING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}