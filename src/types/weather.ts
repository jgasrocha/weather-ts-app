export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string; 
}

export interface GeocodingResponse {
  results?: GeocodingResult[]; 
}

export interface CurrentWeather {
  temperature_2m: number;
  weather_code: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  daily: DailyForecast;
  timezone: string;
}

export interface HourlyForecast {
  time: string[];
  precipitation_probability: number[];
}