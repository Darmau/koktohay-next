import { MapPinIcon } from "@heroicons/react/20/solid";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import exifr from "exifr";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Map, {
  AttributionControl,
  Marker,
  NavigationControl,
  useControl
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
    const loadExif = async () => {
      try {
        const exifData = await exifr.parse(src);
        const { latitude, longitude } = exifData;

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
    loadExif();
  }, [src]);

  if (loading) {
    return <div>Loading map...</div>;
  }

  return (
    <>
      <NearestPlace latitude={location.lat} longitude={location.lng} />
      <Map
        {...viewport}
        style={{ width: "100%", height: "300px" }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
        attributionControl={false}
      >
        <Marker latitude={location.lat} longitude={location.lng}>
          <MapPinIcon className="h-5 w-5 text-indigo-500" />
        </Marker>
        <NavigationControl />
        <AttributionControl customAttribution="可可托海没有海" />
      </Map>
    </>
  );
};

export default MapWithExif;