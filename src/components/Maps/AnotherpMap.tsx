import React, { useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const centerArgentina = { lat: -38.4161, lng: -63.6167 };

// Coordenadas de algunas provincias argentinas
const provincias = {
  "Buenos Aires": { lat: -34.6037, lng: -58.3816 },
  "Córdoba": { lat: -31.4201, lng: -64.1888 },
  "Santa Fe": { lat: -31.6333, lng: -60.7 },
  "Mendoza": { lat: -32.8908, lng: -68.8272 },
};

export const MapaProvincias: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState(centerArgentina);

  const position = { lat: -34.603722, lng: -58.381592 };
  const bancoMacroLocations = [
    {
      id: 1,
      name: "Banco Macro - Sucursal 1",
      position: { lat: -34.603722, lng: -58.381592 },
    },
    {
      id: 2,
      name: "Banco Macro - Sucursal 2",
      position: { lat: -32.89084, lng: -68.82717 },
    },
    {
      id: 3,
      name: "Banco Macro - Sucursal 3",
      position: { lat: -31.420083, lng: -64.188776 },
    },
    {
      id: 4,
      name: "Banco Macro - Sucursal 4",
      position: { lat: -24.782127, lng: -65.423198 },
    },
    {
      id: 5,
      name: "Banco Macro - Sucursal 5",
      position: { lat: -27.469982, lng: -58.830046 },
    },
  ];

  return (
    <div>
      <select
      //@ts-ignore
        onChange={(e) => setSelectedProvince(provincias[e.target.value])}
        className="my-4 border p-2"
      >
        <option value="">Selecciona una provincia</option>
        {Object.keys(provincias).map((provincia) => (
          <option key={provincia} value={provincia}>
            {provincia}
          </option>
        ))}
      </select>

      <div className="w-full h-96">
        <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
          <Map
            center={selectedProvince} // Cambiado de defaultCenter a center
            defaultZoom={6}
            mapId="DEMO_MAP_ID"
            style={mapContainerStyle}
          >
            {bancoMacroLocations.map((locationMarker) => (
              <Marker
                position={locationMarker.position}
                key={locationMarker.id}
                title={locationMarker.name}
                onClick={() => console.log(locationMarker.name)}
              />
            ))}
            <AdvancedMarker position={position} />
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default MapaProvincias;
