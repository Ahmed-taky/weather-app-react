import humidityIcon from "../assets/icons/humidity.svg";
import windIcon from "../assets/icons/wind.svg";
import cloudsIcon from "../assets/icons/clouds.svg";
// للأن
import pressureIcon from "../assets/icons/temp-max.svg";
import visibilityIcon from "../assets/icons/sunrise.svg";

export default function weatherCardMatrix(data) {
  return [
    {
      id: "humidity",
      label: "Humidity",
      value: `${data?.humidity ?? 45}%`,
      icon: humidityIcon,
    },
    {
      id: "wind",
      label: "Wind",
      value: `${data?.windSpeed ?? 18} km/h`,
      badge: data?.windDirection ?? "NW",
      icon: windIcon,
    },
    {
      id: "clouds",
      label: "Clouds",
      value: `${data?.clouds ?? 25}%`,
      icon: cloudsIcon,
    },
    {
      id: "pressure",
      label: "Pressure",
      value: `${data?.pressure ?? 1012} hPa`,
      icon: pressureIcon,
    },
    {
      id: "visibility",
      label: "Visibility",
      value: `${data?.visibility ?? 10} km`,
      icon: visibilityIcon,
    },
  ];
}
