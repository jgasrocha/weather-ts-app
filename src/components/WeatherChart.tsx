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
import type { DailyForecast } from '../types/weather';

interface WeatherChartProps {
  daily: DailyForecast;
}

export function WeatherChart({ daily }: WeatherChartProps) {
  // 1. Transformando os dados da API para o formato que o Recharts entende
  const chartData = daily.time.map((time, index) => {
    // Converte "2026-10-17" em "sáb"
    const date = new Date(time);
    const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });

    return {
      name: dayName.charAt(0).toUpperCase() + dayName.slice(1).replace('.', ''), // Ex: "Sáb"
      max: Math.round(daily.temperature_2m_max[index]),
      min: Math.round(daily.temperature_2m_min[index]),
    };
  });

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <h3 className="text-lg font-bold text-gray-700 mb-6 text-center sm:text-left">
        Previsão para os próximos dias
      </h3>
      
      {/* O ResponsiveContainer garante que o gráfico se ajuste ao tamanho da tela */}
      <div className="h-64 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: number) => [`${value}°C`]}
            />
            
            <Legend verticalAlign="top" height={36} iconType="circle" />
            
            <Line 
              type="monotone" 
              dataKey="max" 
              name="Máxima" 
              stroke="#ef4444" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
              activeDot={{ r: 6 }} 
            />
            
            <Line 
              type="monotone" 
              dataKey="min" 
              name="Mínima" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}