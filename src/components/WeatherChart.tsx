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
  const chartData = daily.time.map((time, index) => {
    const date = new Date(time);
    const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });

    return {
      name: dayName.charAt(0).toUpperCase() + dayName.slice(1).replace('.', ''),
      max: Math.round(daily.temperature_2m_max[index]),
      min: Math.round(daily.temperature_2m_min[index]),
      rain: daily.precipitation_probability_max?.[index] ?? 0, // ← novo dado
    };
  });

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <h3 className="text-lg font-bold text-gray-700 mb-6 text-center sm:text-left">
        Previsão para os próximos dias
      </h3>
      
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
            
            {/* Eixo esquerdo: Temperatura (°C) */}
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            
            {/* Eixo direito: Chuva (%) */}
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
              formatter={(value) => [`${value ?? 0}°C`]}
            />
            
            <Legend verticalAlign="top" height={36} iconType="circle" />
            
            {/* Linhas de temperatura (eixo esquerdo) */}
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
            
            {/* Linha de chuva (eixo direito) */}
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
    </div>
  );
}
