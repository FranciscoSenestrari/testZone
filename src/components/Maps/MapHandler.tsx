import { useMap } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";

interface Props {
  place: google.maps.places.PlaceResult | null;
}

const MapHandler = ({ place }: any) => {
  console.log(place);
  const map = useMap();

  useEffect(() => {
    if (!map || !place) return;
    {
      map.setCenter({ lat: place.lat, lng: place.lng });
      map.setZoom(15);
    }
  }, [map, place]);

  return null;
};

export default React.memo(MapHandler);
