export function WeatherCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-6 mx-auto sm:mx-0"></div>
      
      <div className="flex flex-col items-center justify-center mb-8 sm:flex-row sm:justify-start sm:gap-6">
        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
        <div className="mt-4 sm:mt-0 text-center sm:text-left">
          <div className="h-12 w-24 bg-gray-200 rounded mb-2 mx-auto sm:mx-0"></div>
          <div className="h-4 w-16 bg-gray-200 rounded mx-auto sm:mx-0"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3">
            <div className="h-4 w-12 bg-gray-200 rounded mx-auto mb-2"></div>
            <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}