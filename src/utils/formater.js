export default function weatherCardMatrix(data) {
  return [
    {
      id: "humidity",
      label: "Humidity",
      value: `${data?.humidity ?? "N/A"}%`,
      iconName: "humidity",
    },
    {
      id: "wind",
      label: "Wind",
      value: `${data?.windSpeed ?? "N/A"} km/h`,
      badge: data?.windDirection ?? "N/A",
      iconName: "wind",
    },
    {
      id: "clouds",
      label: "Clouds",
      value: `${data?.clouds ?? "N/A"}%`,
      iconName: "clouds",
    },
    {
      id: "pressure",
      label: "Pressure",
      value: `${data?.pressure ?? "N/A"} hPa`,
      iconName: "temp-max",
    },
    {
      id: "visibility",
      label: "Visibility",
      value: `${data?.visibility ?? "N/A"} km`,
      iconName: "sunrise",
    },
  ];
}
