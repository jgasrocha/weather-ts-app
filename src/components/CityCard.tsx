import type { GeocodingResult } from '../types/weather';

interface CityCardProps {
  city: GeocodingResult;
  onClick: (city: GeocodingResult) => void;
}

export function CityCard({ city, onClick }: CityCardProps) {
  return (
    <button
      onClick={() => onClick(city)}
      className="w-full text-left bg-white p-4 rounded-xl shadow-sm border border-gray-200
                 transition hover:border-blue-400 hover:shadow-md active:scale-[0.98]"
    >
      <p className="font-semibold text-gray-800 text-lg">
        {city.name}
        {city.admin1 && `, ${city.admin1}`}
      </p>
      <p className="text-sm text-gray-500">{city.country}</p>
    </button>
  );
}