import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import MapHandler from "./MapHandler";
import { PlaceSearch } from "./PlacesAutocomplete";
export function MapSercher() {
  const position = { lat: -34.603722, lng: -58.381592 };
  const [selectedPosition, setSelectedPosition] = useState(position);

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
