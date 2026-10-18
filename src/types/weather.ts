// 1. O que a API de busca de cidades retorna para UMA cidade
export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string; // O "?" significa opcional (a API pode não retornar o estado)
}

// 2. O que a API retorna na busca geral
export interface GeocodingResponse {
  results?: GeocodingResult[]; // Pode ser undefined se não achar nenhuma cidade
}

// 3. Dados do clima atual
export interface CurrentWeather {
  temperature_2m: number;
  weather_code: number;
  time: string;
}

// 4. Previsão diária
export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

// 5. O pacote completo que a API de clima retorna
export interface WeatherResponse {
  current: CurrentWeather;
  daily: DailyForecast;
  timezone: string;
}