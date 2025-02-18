import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  Marker,
} from "@vis.gl/react-google-maps";
import { AutocompleteNewSDK } from "./AutoComplete";
import { useState } from "react";
import MapHandler from "./MapHandler";
import { PlacePicker as TPlacePicker } from "@googlemaps/extended-component-library/place_picker.js";
import { PlaceSearch } from "./PlacesAutocomplete";
export function MapSercher() {
  const position = { lat: -34.603722, lng: -58.381592 };
  const [selectedPosition, setSelectedPosition] = useState(position);

  const bancoMacroLocations = [
    {
      id: 1,
      name: "Banco Macro - Sucursal 1",
      position: { lat: -34.603722, lng: -58.381592 },
    },
    // Add more locations here
  ];
  return (
    <div className="w-full h-96">
      <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
        <Map
          defaultCenter={selectedPosition}
          defaultZoom={12}
          mapId="gmap"
          disableDefaultUI
        >
          <MapControl position={ControlPosition.TOP_LEFT}>
            <PlaceSearch
              onSelect={(lat, lng) => setSelectedPosition({ lat, lng })}
            />
          </MapControl>
          <MapHandler place={selectedPosition} />
          <AdvancedMarker position={selectedPosition} />
        </Map>
      </APIProvider>
    </div>
  );
}
