import { useState } from "react";
import { computeAqi, getAqiLevel, POLLUTANTS } from "../utils/airQuality";
import AirQualityInfo from "./AirQualityInfo";

const R = 52;
const C = 2 * Math.PI * R;

export default function AirQuality({ data }) {
  const [infoOpen, setInfoOpen] = useState(false);

  const result = computeAqi(data);
  const aqi = result?.value ?? 0;
  const level = getAqiLevel(aqi);
  const progress = Math.min(aqi / 200, 1);

  return (
    <section className="Astro AirQuality">
      <div className="aq-head">
        <h3 className="astro-title">Air Quality</h3>
        {result && (
          <button
            className="aq-info-btn"
            onClick={() => setInfoOpen(true)}
            aria-label="What do these numbers mean?"
            title="What do these numbers mean?"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="9.5" />
              <path d="M12 11v5.5" />
              <circle cx="12" cy="7.6" r="0.6" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>

      {!result ? (
        <p className="aq-empty">
          Air quality data isn't available for this location.
        </p>
      ) : (
        <div className="aq-body">
          <div className="aq-gauge">
            <svg
              viewBox="0 0 120 120"
              role="img"
              aria-label={`AQI ${aqi}, ${level.label}`}
            >
              <circle className="aq-track" cx="60" cy="60" r={R} />
              <circle
                className="aq-progress"
                cx="60"
                cy="60"
                r={R}
                stroke={level.color}
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
                transform="rotate(-90 60 60)"
              />
            </svg>
            <strong className="aq-value">{aqi}</strong>
            <span className="aq-level">{level.label}</span>
          </div>

          <div className="aq-details">
            <p className="aq-text">{level.text}</p>
            <p className="aq-primary">
              Main pollutant: <strong>{result.primary}</strong>
            </p>

            <ul className="aq-bars">
              {POLLUTANTS.map(({ key, label, limit }) => {
                const v = data[key];
                if (v == null) return null;
                const pct = Math.min((v / limit) * 100, 100);
                return (
                  <li key={key}>
                    <span className="aq-name">{label}</span>
                    <span className="aq-bar">
                      <span
                        style={{ width: `${pct}%`, background: level.color }}
                      />
                    </span>
                    <span className="aq-num">{Math.round(v * 10) / 10}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <AirQualityInfo
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        data={data}
        aqi={aqi}
        level={level}
      />
    </section>
  );
}
