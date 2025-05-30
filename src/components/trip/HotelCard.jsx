// src/components/trip/HotelCard.jsx

const HotelCard = ({ hotel, nights = 1, showTotalPrice = true }) => {
  const price = hotel.price ?? 0;
  const total = (price * nights).toFixed(2);

  const badges = [
    "🔥 Dispo limitée",
    "💎 Luxe accessible",
    "📍 Bien situé",
    "🏆 Très populaire",
    "🧹 Très propre",
  ].sort(() => 0.5 - Math.random()).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(hotel.booking_url);
    alert("📋 Lien copié !");
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white dark:bg-gray-800 transition-transform hover:scale-[1.015] flex flex-col">
      {/* Image */}
      <img
        src={hotel.photo}
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />

      {/* Infos */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2 text-sm">
          {/* Titre & Badges */}
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-slate-800 dark:text-white">{hotel.name}</h3>
            <div className="flex flex-wrap gap-1 justify-end">
              {badges.map((badge, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-[11px] px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Adresse & chambre */}
          <p className="text-gray-500 dark:text-gray-400">{hotel.address}</p>
          <p className="italic text-gray-600 dark:text-gray-300">{hotel.room}</p>

          {/* Note */}
          {hotel.rating && (
            <div className="inline-block px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs rounded-full">
              ⭐ {hotel.rating} / 10
            </div>
          )}

          {/* Prix */}
          <p className="font-semibold text-blue-800 dark:text-blue-300 pt-1">
            {showTotalPrice
              ? `Total : ${total} ${hotel.currency} (${nights} nuits)`
              : `Prix / nuit : ${price} ${hotel.currency}`}
          </p>
        </div>

        {/* Lien & copier */}
        <div className="pt-2 flex justify-between items-center">
          <a
            href={hotel.booking_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-300 text-sm hover:underline"
          >
            Réserver 🔗
          </a>
          <button
            onClick={handleCopyLink}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-sm"
            title="Copier le lien"
          >
            📋
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
