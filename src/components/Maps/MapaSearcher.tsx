import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  Marker,
} from "@vis.gl/react-google-maps";
import { PlaceAutocompleteClassic } from "./AutoComplete";
import { useState } from "react";
import MapHandler from "./MapHandler";
import { PlacePicker as TPlacePicker } from "@googlemaps/extended-component-library/place_picker.js";
export function MapSercher() {
  const position = { lat: -34.603722, lng: -58.381592 };
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

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
          defaultCenter={position}
          defaultZoom={10}
          mapId="gmap"
          disableDefaultUI={true}
        >
          <MapControl position={ControlPosition.LEFT}>
            <PlaceAutocompleteClassic
              onPlaceSelect={setSelectedPlace}
            ></PlaceAutocompleteClassic>
          </MapControl>
          <MapHandler place={selectedPlace} />
          <AdvancedMarker position={position} />
        </Map>
      </APIProvider>
    </div>
  );
}
