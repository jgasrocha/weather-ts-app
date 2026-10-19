import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { HourlyForecast } from '../types/weather';

interface HourlyChartProps {
  dateString: string; 
  hourly: HourlyForecast;
}

export function HourlyChart({ dateString, hourly }: HourlyChartProps) {

  const dayHours = hourly.time
    .map((time, index) => ({ time, index }))
    .filter((item) => item.time.startsWith(dateString))
    .map((item) => {
      const hour = item.time.split('T')[1].substring(0, 5);
      return {
        hour,
        rain: hourly.precipitation_probability[item.index] ?? 0,
      };
    });

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 sm:p-6 border-2 border-purple-100">
      <h3 className="text-md font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-purple-500"></span>
        Chance de chuva hora a hora ({new Date(dateString).toLocaleDateString('pt-BR')})
      </h3>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dayHours} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            
            <XAxis 
              dataKey="hour" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 10 }}
              interval={3}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 10 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            
            <Tooltip 
              cursor={{ fill: '#f3f4f6' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${value}%`, 'Chuva']}
            />
            
            <Bar dataKey="rain" radius={[4, 4, 0, 0]}>
              {dayHours.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.rain > 50 ? '#8b5cf6' : entry.rain > 20 ? '#a78bfa' : '#ddd6fe'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}