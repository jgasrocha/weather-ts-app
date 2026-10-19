import type { WeatherResponse } from '../types/weather';

interface WeatherCardProps {
  data: WeatherResponse;
  cityName: string;
}

export function WeatherCard({ data, cityName }: WeatherCardProps) {
  const currentTemp = Math.round(data.current.temperature_2m);
  const isDay = data.current.is_day === 1;

  const getWeatherEmoji = (code: number, isDayTime: boolean) => {
    if (code === 0) return isDayTime ? '☀️' : '🌙';
    if (code <= 3) return isDayTime ? '⛅' : '☁️';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    return '🌩️';
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 mt-6 animate-fade-in transition-colors duration-500 ${isDay ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-gradient-to-br from-slate-800 to-slate-900 text-white'}`}>
      <h2 className={`text-xl font-bold mb-4 text-center sm:text-left ${isDay ? 'text-gray-700' : 'text-gray-100'}`}>
        {cityName}
      </h2>

      <div className="flex flex-col items-center justify-center mb-8 sm:flex-row sm:justify-start sm:gap-6">
        <span className="text-6xl drop-shadow-md">{getWeatherEmoji(data.current.weather_code, isDay)}</span>
        <div className="text-center sm:text-left">
          <p className={`text-5xl font-bold ${isDay ? 'text-gray-800' : 'text-white'}`}>{currentTemp}°C</p>
          <p className={`mt-1 ${isDay ? 'text-gray-500' : 'text-gray-400'}`}>Agora</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.daily.time.slice(0, 4).map((day, index) => {
          const date = new Date(day);
          const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
          
          return (
            <div key={day} className={`rounded-lg p-3 text-center transition-colors ${isDay ? 'bg-gray-50' : 'bg-slate-700/50'}`}>
              <p className={`text-sm font-medium capitalize ${isDay ? 'text-gray-600' : 'text-gray-300'}`}>{dayName}</p>
              <div className="flex justify-center gap-2 mt-1 text-sm">
                <span className={`font-semibold ${isDay ? 'text-red-500' : 'text-red-400'}`}>
                  {Math.round(data.daily.temperature_2m_max[index])}°
                </span>
                <span className={`font-semibold ${isDay ? 'text-blue-500' : 'text-blue-400'}`}>
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