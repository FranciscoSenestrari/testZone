import { useEffect, useState, useCallback, FormEvent } from "react";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const AutocompleteNewSDK = ({ onPlaceSelect }: Props) => {
  const [sessionToken, setSessionToken] = useState<
    google.maps.places.AutocompleteSessionToken | undefined
  >(undefined);
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [predictionResults, setPredictionResults] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const initGoogleServices = async () => {
      const { AutocompleteService, PlacesService, AutocompleteSessionToken } =
        (await google.maps.importLibrary(
          "places"
        )) as google.maps.PlacesLibrary;

      setAutocompleteService(new AutocompleteService());
      setPlacesService(new PlacesService(document.createElement("div")));
      setSessionToken(new AutocompleteSessionToken());
    };

    initGoogleServices();
  }, []);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      autocompleteService.getPlacePredictions(
        { input: inputValue, sessionToken },
        (predictions) => {
          setPredictionResults(predictions ?? []); // ← Solución aquí
        }
      );
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;
      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!placesService) return;

      placesService.getDetails(
        {
          placeId,
          fields: ["geometry", "name", "formatted_address"],
          sessionToken,
        },
        (placeDetails) => {
          onPlaceSelect(placeDetails);
          setPredictionResults([]);
          setInputValue(placeDetails?.formatted_address ?? "");
          setSessionToken(new google.maps.places.AutocompleteSessionToken());
        }
      );
    },
    [onPlaceSelect, placesService, sessionToken]
  );

  return (
    <div className="autocomplete-container">
      <input
        value={inputValue}
        onInput={(event: FormEvent<HTMLInputElement>) => onInputChange(event)}
        placeholder="Search for a place"
      />
      {predictionResults.length > 0 && (
        <ul className="custom-list">
          {predictionResults.map(({ place_id, description }) => (
            <li
              key={place_id}
              className="custom-list-item"
              onClick={() => handleSuggestionClick(place_id)}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
