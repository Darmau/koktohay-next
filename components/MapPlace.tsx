import { MapPinIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

type Props = {
  latitude: number;
  longitude: number;
};

const NearestPlace: React.FC<Props> = ({ latitude, longitude }) => {
  const [placeName, setPlaceName] = useState("");

  useEffect(() => {
    const fetchPlaceName = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=locality&access_token=${apiKey}&language=zh`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.features.length > 0) {
          const nearestPlaceName = data.features[0].place_name;
          setPlaceName(nearestPlaceName);
        } else {
          setPlaceName("No place found");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaceName();
  }, [latitude, longitude]);

  return (
    <div className="text-sm text-gray-500 flex gap-1 items-center my-4">
      <span><MapPinIcon className="h-4 w-4 text-blue-600" /></span>
      {placeName}
    </div>
  );
};

export default NearestPlace;
