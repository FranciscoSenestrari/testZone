import { useMap } from "@vis.gl/react-google-maps"
import React, { useEffect } from "react"

const MapHandler = ({ place }: { place: { lat: number; lng: number } }) => {
  const map = useMap()

  useEffect(() => {
    if (!map || !place) return

    map.setCenter({ lat: place.lat, lng: place.lng })
    map.setZoom(15)
  }, [map, place])

  return null
}

export default React.memo(MapHandler)
