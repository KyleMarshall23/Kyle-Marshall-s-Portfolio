import { useEffect } from "react";
import mapboxgl, { LngLatLike, Map, Marker } from 'mapbox-gl';

mapboxgl.accessToken = String(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

const RenderMap = (longitude: number, latitude: number, zoom = 14, containerId = 'map', style = 'mapbox://styles/mapbox/streets-v12') => {
  useEffect(() => {
    //set max bounds to lock the map to South Africa
    const boundsSA: [LngLatLike, LngLatLike] = [
      [16.0, -35.0], // Southwest coordinates (lng, lat)
      [33.0, -22.0]  // Northeast coordinates (lng, lat)
    ];

    const map = new mapboxgl.Map({
      container: containerId, // container ID
      style: style, // style URL
      center: [Number(longitude), Number(latitude)], // starting position [lng, lat]
      zoom: zoom, // starting zoom,
      maxBounds: boundsSA
    });

    new mapboxgl.Marker()
      .setLngLat([Number(longitude), Number(latitude)])
      .addTo(map);

    return () => map.remove();
  }, [longitude, latitude, zoom, containerId, style]);
};

export default RenderMap;