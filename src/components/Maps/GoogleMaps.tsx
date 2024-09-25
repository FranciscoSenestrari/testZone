import {
  AdvancedMarker,
  APIProvider,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";

function GoogleMap() {
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
    <div className="w-full h-96">
      <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
        <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
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
  );
}

export default GoogleMap;
