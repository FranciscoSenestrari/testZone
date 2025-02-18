import { useState } from "react";
import axios from "axios";

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_API_KEY;

const getPlaceSuggestions = async (input: string) => {
  const url = "https://places.googleapis.com/v1/places:autocomplete";
  const body = JSON.stringify({
    input,
    languageCode: "es",
    regionCode: "AR",
    includedRegionCodes: ["AR"],
    includedPrimaryTypes: ["geocode"],
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
      },
      body,
    });
    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error("Error en autocompletar:", error);
    return [];
  }
};

const getPlaceDetails = async (placeId: string) => {
  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=location&key=${GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await axios.get(url, {
      headers: { "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo detalles del lugar:", error);
    return null;
  }
};

export const PlaceSearch = ({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      const results = await getPlaceSuggestions(value);
      console.log(results);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = async (placeId: string, description: string) => {
    console.log(placeId);
    const place = await getPlaceDetails(placeId);

    console.log(place.location);
    if (place?.location) {
      const { latitude, longitude } = place.location;
      onSelect(latitude, longitude);
    }
    setQuery(description);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar ubicación..."
        className="border p-2 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 top-full w-full border bg-black shadow-md">
          {suggestions.map((sug) => (
            <li
              key={sug.placeId}
              className="p-4 cursor-pointer hover:bg-gray-100 text-cyan-950"
              onClick={() =>
                handleSelect(
                  sug.placePrediction.placeId,
                  sug.placePrediction.text.text
                )
              }
            >
              {sug.placePrediction.text.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
