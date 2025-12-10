export interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

export const airports: Airport[] = [
  // Brasil
  { code: "GRU", city: "São Paulo", country: "Brasil", name: "Guarulhos" },
  { code: "CGH", city: "São Paulo", country: "Brasil", name: "Congonhas" },
  { code: "VCP", city: "Campinas", country: "Brasil", name: "Viracopos" },
  { code: "GIG", city: "Rio de Janeiro", country: "Brasil", name: "Galeão" },
  { code: "SDU", city: "Rio de Janeiro", country: "Brasil", name: "Santos Dumont" },
  { code: "BSB", city: "Brasília", country: "Brasil", name: "Pres. Juscelino Kubitschek" },
  { code: "CNF", city: "Belo Horizonte", country: "Brasil", name: "Confins" },
  { code: "SSA", city: "Salvador", country: "Brasil", name: "Dep. Luís Eduardo Magalhães" },
  { code: "REC", city: "Recife", country: "Brasil", name: "Guararapes" },
  { code: "FOR", city: "Fortaleza", country: "Brasil", name: "Pinto Martins" },
  { code: "CWB", city: "Curitiba", country: "Brasil", name: "Afonso Pena" },
  { code: "FLN", city: "Florianópolis", country: "Brasil", name: "Hercílio Luz" },
  { code: "POA", city: "Porto Alegre", country: "Brasil", name: "Salgado Filho" },
  { code: "GYN", city: "Goiânia", country: "Brasil", name: "Santa Genoveva" },
  { code: "VIX", city: "Vitória", country: "Brasil", name: "Eurico de Aguiar Salles" },
  { code: "MAO", city: "Manaus", country: "Brasil", name: "Eduardo Gomes" },
  { code: "NAT", city: "Natal", country: "Brasil", name: "Gov. Aluízio Alves" },
  { code: "BEL", city: "Belém", country: "Brasil", name: "Val-de-Cans" },
  
  // América do Sul
  { code: "EZE", city: "Buenos Aires", country: "Argentina", name: "Ezeiza" },
  { code: "AEP", city: "Buenos Aires", country: "Argentina", name: "Jorge Newbery" },
  { code: "SCL", city: "Santiago", country: "Chile", name: "Arturo Merino Benítez" },
  { code: "BOG", city: "Bogotá", country: "Colômbia", name: "El Dorado" },
  { code: "LIM", city: "Lima", country: "Peru", name: "Jorge Chávez" },
  { code: "MVD", city: "Montevidéu", country: "Uruguai", name: "Carrasco" },

  // América do Norte
  { code: "JFK", city: "Nova York", country: "EUA", name: "John F. Kennedy" },
  { code: "EWR", city: "Nova York", country: "EUA", name: "Newark Liberty" },
  { code: "LGA", city: "Nova York", country: "EUA", name: "LaGuardia" },
  { code: "MIA", city: "Miami", country: "EUA", name: "Miami International" },
  { code: "MCO", city: "Orlando", country: "EUA", name: "Orlando International" },
  { code: "LAX", city: "Los Angeles", country: "EUA", name: "Los Angeles International" },
  { code: "SFO", city: "San Francisco", country: "EUA", name: "San Francisco International" },
  { code: "LAS", city: "Las Vegas", country: "EUA", name: "Harry Reid" },
  { code: "ORD", city: "Chicago", country: "EUA", name: "O'Hare" },
  { code: "ATL", city: "Atlanta", country: "EUA", name: "Hartsfield-Jackson" },
  { code: "YYZ", city: "Toronto", country: "Canadá", name: "Pearson" },
  { code: "YVR", city: "Vancouver", country: "Canadá", name: "Vancouver International" },
  { code: "MEX", city: "Cidade do México", country: "México", name: "Benito Juárez" },

  // Europa
  { code: "LHR", city: "Londres", country: "Reino Unido", name: "Heathrow" },
  { code: "CDG", city: "Paris", country: "França", name: "Charles de Gaulle" },
  { code: "ORY", city: "Paris", country: "França", name: "Orly" },
  { code: "AMS", city: "Amsterdã", country: "Holanda", name: "Schiphol" },
  { code: "FRA", city: "Frankfurt", country: "Alemanha", name: "Frankfurt Airport" },
  { code: "MAD", city: "Madri", country: "Espanha", name: "Barajas" },
  { code: "BCN", city: "Barcelona", country: "Espanha", name: "El Prat" },
  { code: "LIS", city: "Lisboa", country: "Portugal", name: "Humberto Delgado" },
  { code: "OPO", city: "Porto", country: "Portugal", name: "Francisco Sá Carneiro" },
  { code: "FCO", city: "Roma", country: "Itália", name: "Fiumicino" },
  { code: "MXP", city: "Milão", country: "Itália", name: "Malpensa" },
  { code: "ZRH", city: "Zurique", country: "Suíça", name: "Zurich Airport" },

  // Ásia e Oriente Médio
  { code: "DXB", city: "Dubai", country: "Emirados Árabes", name: "Dubai International" },
  { code: "DOH", city: "Doha", country: "Catar", name: "Hamad International" },
  { code: "IST", city: "Istambul", country: "Turquia", name: "Istanbul Airport" },
  { code: "HND", city: "Tóquio", country: "Japão", name: "Haneda" },
  { code: "NRT", city: "Tóquio", country: "Japão", name: "Narita" },
  { code: "SIN", city: "Singapura", country: "Singapura", name: "Changi" },
  { code: "BKK", city: "Bangkok", country: "Tailândia", name: "Suvarnabhumi" },
  { code: "HKG", city: "Hong Kong", country: "China", name: "Hong Kong International" },
  { code: "ICN", city: "Seul", country: "Coreia do Sul", name: "Incheon" },
  { code: "SYD", city: "Sydney", country: "Austrália", name: "Kingsford Smith" }
];