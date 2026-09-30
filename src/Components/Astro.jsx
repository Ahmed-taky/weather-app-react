export default function Astro({
  data: { sunrise, sunset, currentTime, tz_id },
}) {
  const getMinutes = (time) => {
    const [hours, minutes, period] = time.split(/[: ]/);

    let h = Number(hours);
    const m = Number(minutes);

    if (period === "AM" && h === 12) h = 0;
    if (period === "PM" && h !== 12) h += 12;

    return h * 60 + m;
  };

  const getLocalMinutes = (timestamp, timeZone) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(new Date(timestamp));

    const hour = Number(parts.find((p) => p.type === "hour").value);

    const minute = Number(parts.find((p) => p.type === "minute").value);

    return hour * 60 + minute;
  };

  const sunriseMinutes = getMinutes(sunrise);
  const sunsetMinutes = getMinutes(sunset);

  const currentMinutes = getLocalMinutes(currentTime, tz_id);

  let ratio =
    (currentMinutes - sunriseMinutes) / (sunsetMinutes - sunriseMinutes);

  if (ratio > 1) ratio = 1;
  else if (ratio < 0 || Number.isNaN(ratio)) ratio = 0;

  const centerX = 150;
  const centerY = 150;

  const radius = 100;

  const angle = Math.PI - ratio * Math.PI;

  const sunX = centerX + radius * Math.cos(angle);
  const sunY = centerY - radius * Math.sin(angle);

  return (
    <div className="Astro">
      <div className="astro-title">Sunrise & Sunset</div>

      <div className="astro-graph">
        <svg
          className="astro-arc"
          viewBox="0 0 300 170"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Arc */}
          <path
            d="
              M 50 150
              A 100 100 0 0 1 250 150
            "
            strokeWidth="3"
            strokeDasharray="3 7"
            strokeLinecap="round"
          />

          {/* Sun */}
          <g transform={`translate(${sunX} ${sunY})`}>
            {/* rays */}
            <circle
              r="13"
              fill="none"
              stroke="#FDB813"
              strokeWidth="3"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />

            {/* sun body */}
            <circle r="10" fill="#FDB813" />
          </g>
        </svg>
      </div>

      <div className="astro-footer">
        <div className="astro-info">
          <strong>{sunrise}</strong>
          <p>Sunrise</p>
        </div>

        <div className="astro-info">
          <strong>{sunset}</strong>
          <p>Sunset</p>
        </div>
      </div>
    </div>
  );
}
