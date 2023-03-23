import { MapPinIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Map, {
  AttributionControl,
  Marker,
  NavigationControl
} from "react-map-gl";
import NearestPlace from "./MapPlace";

type Props = {
  src: string;
};

const MapWithExif: React.FC<Props> = ({ src }) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 6,
  });
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(true);

  // 获取图片GPS信息
  useEffect(() => {
    const loadGPS = async () => {
      try {
        const gpsRes = await fetch(`https://exif.darmau.design/gps?url=${src}`);
        const gpsData = await gpsRes.json();
        const { latitude, longitude } = gpsData;

        setViewport((viewport) => ({
          ...viewport,
          latitude,
          longitude,
        }));
        setLocation({ lat: latitude, lng: longitude });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadGPS();
  }, [src]);

  if (loading) {
    return <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
      <ArrowPathIcon className="h-5 w-5 animate-spin text-blue-600" />
    </div>;
  }

  return (
    <>
      <NearestPlace latitude={location.lat} longitude={location.lng} />
      <Map
        {...viewport}
        style={{ width: "100%", height: "320px", marginBottom: "24px" }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
        attributionControl={false}
      >
        <Marker latitude={location.lat} longitude={location.lng}>
          <MapPinIcon className="h-5 w-5 text-blue-500" />
        </Marker>
        <NavigationControl />
        <AttributionControl customAttribution="可可托海没有海" />
      </Map>
    </>
  );
};

export default MapWithExif;
