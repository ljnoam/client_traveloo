// src/components/trip/ItineraryDay.jsx

const ItineraryDay = ({ day }) => {
  const { date, weather, activities = [], meals = [] } = day;

  const weatherIcons = {
    Ensoleillé: "☀️",
    "Pluie légère": "🌧️",
    Nuageux: "☁️",
    "Partiellement nuageux": "⛅",
  };

  return (
    <div className="p-6 bg-white/90 dark:bg-gray-800 rounded-2xl shadow-md space-y-6 border border-gray-200 dark:border-gray-700">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-gray-700 pb-4 gap-2">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200">
          📅 {date}
        </h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {weatherIcons[weather] || "🌤️"} {weather}
        </span>
      </div>

      {/* Activités */}
      <div>
        <h4 className="text-base font-semibold text-sky-800 dark:text-sky-300 mb-2">🎯 Activités</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((a, i) => (
            <div
              key={i}
              className="bg-blue-50 dark:bg-blue-900 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between mb-1">
                <h5 className="font-bold text-blue-900 dark:text-white">{a.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-300">{a.time}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{a.description}</p>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                📍 {a.location} · 💶 {a.price} €
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Repas */}
      <div>
        <h4 className="text-base font-semibold text-rose-800 dark:text-rose-300 mb-2">🍽️ Repas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meals.map((m, i) => (
            <div
              key={i}
              className="bg-rose-50 dark:bg-rose-900 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between mb-1">
                <h5 className="font-bold text-rose-900 dark:text-white">
                  {m.type} - {m.place}
                </h5>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  💶 {m.price} €
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{m.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDay;
