import { useState } from 'react';
import { SearchForm } from './components/SearchForm';
import { CityCard } from './components/CityCard';
import { WeatherCard } from './components/WeatherCard';
import { WeatherChart } from './components/WeatherChart';
import { searchCity, getWeather } from './services/weather';
import type { GeocodingResult, WeatherResponse } from './types/weather';

function App() {
  const [cities, setCities] = useState<GeocodingResult[]>([]);
  const [selectedCity, setSelectedCity] = useState<GeocodingResult | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(cityName: string) {
    setLoading(true);
    setError(null);
    setCities([]);
    setWeather(null);
    setSelectedCity(null);

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
    setSelectedCity(city);
    setCities([]); // Esconde a lista
    setLoading(true);
    setError(null);

    try {
      const data = await getWeather(city.latitude, city.longitude);
      setWeather(data);
    } catch {
      setError('Erro ao carregar previsão.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="mx-auto max-w-lg sm:max-w-2xl">
        
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Previsão do Tempo
          </h1>
          <p className="text-gray-600 mt-1">Busque qualquer cidade do mundo</p>
        </header>

        <SearchForm onSearch={handleSearch} isLoading={loading} />

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

        {weather && selectedCity && (
          <>
            <WeatherCard data={weather} cityName={selectedCity.name} />
            <WeatherChart daily={weather.daily} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;