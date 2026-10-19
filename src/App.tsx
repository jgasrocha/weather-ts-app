import { useState, useEffect } from 'react';
import { SearchForm } from './components/SearchForm';
import { CityCard } from './components/CityCard';
import { WeatherCard } from './components/WeatherCard';
import { WeatherChart } from './components/WeatherChart';
import { searchCity, getWeather, getCityNameFromCoords } from './services/weather';
import { Logo } from './components/Logo';
import { WeatherCardSkeleton } from './components/Skeleton';
import type { GeocodingResult, WeatherResponse } from './types/weather';

function App() {
  const [cities, setCities] = useState<GeocodingResult[]>([]);
  const [selectedCity, setSelectedCity] = useState<GeocodingResult | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isLocating, setIsLocating] = useState(false);

  async function loadWeatherForCity(city: GeocodingResult) {
    setSelectedCity(city);
    setCities([]);
    setLoading(true);
    setError(null);
    setWeather(null);
    setIsLocating(false); 

    try {
      const data = await getWeather(city.latitude, city.longitude);
      setWeather(data);
    } catch {
      setError('Erro ao carregar previsão.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) return;

    setIsLocating(true); 
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const cityName = await getCityNameFromCoords(latitude, longitude);
          
          if (cityName) {
            const geoData = await searchCity(cityName);
            
            if (geoData.results && geoData.results.length > 0) {
              await loadWeatherForCity(geoData.results[0]);
            } else {
              setLoading(false);
              setIsLocating(false);
            }
          } else {
            setLoading(false);
            setIsLocating(false);
          }
        } catch {
          setLoading(false);
          setIsLocating(false);
        }
      },
      () => {
        setLoading(false);
        setIsLocating(false); 
      },
      { timeout: 10000 }
    );
  }, []);

  async function handleSearch(cityName: string) {
    setLoading(true);
    setError(null);
    setCities([]);
    setWeather(null);
    setSelectedCity(null);
    setIsLocating(false); 

    try {
      const data = await searchCity(cityName);
      if (data.results && data.results.length > 0) {
        setCities(data.results);
      } else {
        setError('Nenhuma cidade encontrada.');
      }
    } catch {
      setError('Erro ao buscar. Verifique a conexão.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectCity(city: GeocodingResult) {
    await loadWeatherForCity(city);
  }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="mx-auto max-w-lg sm:max-w-2xl">

        <header className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10 sm:w-12 sm:h-12" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
                AeroCast
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Previsão do tempo precisa e sem complicação
              </p>
            </div>
          </div>
        </header>

        <SearchForm onSearch={handleSearch} isLoading={loading && !isLocating} />

        {error && (
          <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-700 text-center">
            {error}
          </div>
        )}

        {cities.length > 0 && (
          <div className="mt-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">Selecione a cidade:</h2>
            {cities.map((city) => (
              <CityCard key={city.id} city={city} onClick={handleSelectCity} />
            ))}
          </div>
        )}

        {isLocating && (
          <div className="mt-8 flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg border border-blue-100 animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 font-medium text-center">
              Reconhecendo sua localização atual...
            </p>
            <p className="text-gray-500 text-sm text-center mt-1">
              Isso ajuda a trazer a previsão exata para você.
            </p>
          </div>
        )}

        {loading && !weather && !isLocating && <WeatherCardSkeleton />}

        {weather && selectedCity && !loading && (
          <>
            <WeatherCard data={weather} cityName={selectedCity.name} />
            <WeatherChart daily={weather.daily} hourly={weather.hourly} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;