import type { GeocodingResponse, WeatherResponse } from '../types/weather';

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// Função 1: Buscar cidade por nome
export async function searchCity(cityName: string): Promise<GeocodingResponse> {
  // encodeURIComponent garante que espaços e acentos não quebrem a URL
  const url = `${GEO_URL}?name=${encodeURIComponent(cityName)}&count=5&language=pt&format=json`;
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Falha ao buscar cidades');
  }

  // Dizemos ao TS: "Confie em mim, isso é um GeocodingResponse"
  return response.json() as Promise<GeocodingResponse>;
}

// Função 2: Buscar clima pelas coordenadas
export async function getWeather(lat: number, lon: number): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: 'temperature_2m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
  });

  const response = await fetch(`${WEATHER_URL}?${params}`);

  if (!response.ok) {
    throw new Error('Falha ao buscar previsão do tempo');
  }

  return response.json() as Promise<WeatherResponse>;
}