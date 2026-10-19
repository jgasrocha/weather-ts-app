import type { GeocodingResponse, WeatherResponse } from '../types/weather';

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export async function searchCity(cityName: string): Promise<GeocodingResponse> {
  const url = `${GEO_URL}?name=${encodeURIComponent(cityName)}&count=5&language=pt&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Falha ao buscar cidades');
  return response.json() as Promise<GeocodingResponse>;
}

export async function getWeather(lat: number, lon: number): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: 'temperature_2m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    hourly: 'precipitation_probability', // Garante que o dado venha
    timezone: 'auto',
  });

  const response = await fetch(`${WEATHER_URL}?${params}`);
  if (!response.ok) throw new Error('Falha ao buscar previsão do tempo');

  return response.json() as Promise<WeatherResponse>;
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeocodingResponse> {
  const url = `${GEO_URL}?latitude=${lat}&longitude=${lon}&count=1&language=pt&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Falha ao buscar nome da cidade');
  return response.json() as Promise<GeocodingResponse>;
}

export async function getCityNameFromCoords(lat: number, lon: number): Promise<string | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'AeroCast/1.0 (https://github.com/jgasrocha/weather-ts-app)'
    }
  });

  if (!response.ok) return null;

  const data = await response.json();
  return data.address?.city || data.address?.town || data.address?.village || data.address?.municipality || null;
}