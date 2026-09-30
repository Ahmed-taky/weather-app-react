import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { LEVELS, POLLUTANTS } from "../utils/airQuality";
import {
  SCALE,
  LEVEL_ADVICE,
  POLLUTANT_INFO,
  scalePosition,
  pollutantStatus,
} from "../utils/airQualityInfo";

export default function AirQualityInfo({ open, onClose, data, aqi, level }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  // Portal: the card uses backdrop-filter, which would trap a fixed overlay inside it
  return createPortal(
    <div className="aqi-overlay" onClick={onClose}>
      <div
        className="aqi-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="aqi-info-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="aqi-close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h3 id="aqi-info-title" className="aqi-info-title">
          Reading the air
        </h3>
        <p className="aqi-lead">
          Think of the AQI as a score for the air, like a fuel gauge for
          pollution. <strong>The lower the number, the cleaner the air.</strong>
        </p>

        {/* Scale strip */}
        <div className="aqi-scale" aria-hidden="true">
          <div className="aqi-strip">
            {SCALE.map((s, i) => (
              <span key={s.short} style={{ background: LEVELS[i].color }} />
            ))}
            <i className="aqi-pin" style={{ left: `${scalePosition(aqi)}%` }}>
              <b>{aqi}</b>
            </i>
          </div>
          <div className="aqi-labels">
            {SCALE.map((s) => (
              <span key={s.short}>
                {s.short}
                <small>{s.range}</small>
              </span>
            ))}
          </div>
        </div>

        <div className="aqi-advice" style={{ "--lvl": level.color }}>
          <strong>Right now: {level.label}</strong>
          <p>{LEVEL_ADVICE[level.label]}</p>
        </div>

        {/* Pollutants */}
        <h4 className="aqi-sub">What's in the air</h4>
        <p className="aqi-note">
          Amounts are in µg/m³ (micrograms in one cubic metre of air). The
          status chip compares each one to a typical safe-ish limit.
        </p>

        <ul className="aqi-grid">
          {POLLUTANTS.map(({ key, limit }) => {
            const info = POLLUTANT_INFO[key];
            const v = data?.[key];
            if (!info || v == null) return null;
            const st = pollutantStatus(v, limit);
            return (
              <li key={key} className="aqi-item">
                <div className="aqi-item-head">
                  <span className="aqi-emoji" aria-hidden="true">
                    {info.emoji}
                  </span>
                  <div>
                    <strong>{info.name}</strong>
                    <small>{POLLUTANTS.find((p) => p.key === key).label}</small>
                  </div>
                  <span className={`aqi-chip ${st.tone}`}>
                    {Math.round(v * 10) / 10} · {st.label}
                  </span>
                </div>
                <p>{info.what}</p>
                <p className="aqi-src">
                  <b>Comes from:</b> {info.source}
                </p>
              </li>
            );
          })}
        </ul>

        <p className="aqi-foot">
          The AQI is worked out from the dust particles (PM2.5 and PM10). The
          worst one sets the score.
        </p>
      </div>
    </div>,
    document.body,
  );
}
