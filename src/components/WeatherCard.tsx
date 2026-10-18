import type { WeatherResponse } from '../types/weather';

interface WeatherCardProps {
  data: WeatherResponse;
  cityName: string;
}

export function WeatherCard({ data, cityName }: WeatherCardProps) {
  const currentTemp = Math.round(data.current.temperature_2m);
  
  // Mapeia o código do clima para um emoji (simplificado)
  const getWeatherEmoji = (code: number) => {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    return '🌩️';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center sm:text-left">
        {cityName}
      </h2>

      <div className="flex flex-col items-center justify-center mb-8 sm:flex-row sm:justify-start sm:gap-6">
        <span className="text-6xl">{getWeatherEmoji(data.current.weather_code)}</span>
        <div className="text-center sm:text-left">
          <p className="text-5xl font-bold text-gray-800">{currentTemp}°C</p>
          <p className="text-gray-500 mt-1">Agora</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.daily.time.slice(0, 4).map((day, index) => {
          const date = new Date(day);
          const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
          
          return (
            <div key={day} className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-sm font-medium text-gray-600 capitalize">{dayName}</p>
              <div className="flex justify-center gap-2 mt-1 text-sm">
                <span className="text-red-500 font-semibold">
                  {Math.round(data.daily.temperature_2m_max[index])}°
                </span>
                <span className="text-blue-500 font-semibold">
                  {Math.round(data.daily.temperature_2m_min[index])}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}