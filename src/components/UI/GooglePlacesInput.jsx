import usePlacesAutocomplete from "use-places-autocomplete";

const GooglePlacesInput = ({ field, onSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { types: ["(cities)"] },
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
    onSelect(field, e.target.value);
  };

  const handleSelect = (desc) => {
    const city = desc.split(",")[0].trim();
    setValue(city, false);
    clearSuggestions();
    onSelect(field, city);
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Ex : Paris, Tokyo..."
        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />
      {status === "OK" && (
        <ul className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-auto">
          {data.map(({ description, place_id }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="px-4 py-2 text-sm text-black dark:text-white cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 transition"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GooglePlacesInput;
