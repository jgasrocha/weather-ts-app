import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { HourlyChart } from './HourlyChart';
import type { DailyForecast, HourlyForecast } from '../types/weather';

interface WeatherChartProps {
  daily: DailyForecast;
  hourly: HourlyForecast;
}

export function WeatherChart({ daily, hourly}: WeatherChartProps) {
  // Guarda o index do dia que foi clicado (null = nenhum)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  const chartData = daily.time.map((time, index) => {
    const date = new Date(time);
    const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });

    return {
      name: dayName.charAt(0).toUpperCase() + dayName.slice(1).replace('.', ''),
      max: Math.round(daily.temperature_2m_max[index]),
      min: Math.round(daily.temperature_2m_min[index]),
      rain: daily.precipitation_probability_max?.[index] ?? 0,
      originalIndex: index, // Salva o index original para referência
    };
  });

  // Função chamada quando o usuário clica no gráfico
  const handleChartClick = (state: any) => {
    if (state && typeof state.activeTooltipIndex === 'number') {
      setSelectedDayIndex(state.activeTooltipIndex);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <h3 className="text-lg font-bold text-gray-700 mb-6 text-center sm:text-left">
        Previsão para os próximos dias
      </h3>

      <p className="text-sm text-gray-500 mb-4 text-center sm:text-left">
        💡 Clique em um ponto do gráfico para ver os detalhes e a previsão hora a hora daquele dia.
      </p>

      <div className="h-64 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {/* Adicionamos o onClick aqui */}
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            onClick={handleChartClick}
            style={{ cursor: 'pointer' }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={10}
            />

            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={['dataMin - 2', 'dataMax + 2']}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value, name) => {
                if (name === 'Chuva') return [`${value}%`, name];
                return [`${value}°C`, name];
              }}
            />

            <Legend verticalAlign="top" height={36} iconType="circle" />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="max"
              name="Máxima"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="min"
              name="Mínima"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rain"
              name="Chuva"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Card que aparece quando um dia é clicado */}
      {selectedDayIndex !== null && hourly && (
        <HourlyChart
          dateString={daily.time[selectedDayIndex]}
          hourly={hourly}
        />
      )}
    </div>
  );
}