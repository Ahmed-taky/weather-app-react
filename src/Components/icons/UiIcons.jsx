import { useId } from "react";

export function LogoIcon({ size = 24, className }) {
  const id = `logo${useId().replace(/:/g, "")}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="logo"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8EC5FF" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path
        d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}

export function SunIcon({ size = 18, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="sun"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export function MoonIcon({ size = 18, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="moon"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* Idle color comes from --fav-idle so it stays readable in dark mode */
export function FavStarIcon({ size = 40, active = false, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={active ? "favorited" : "not favorited"}
    >
      <circle cx="20" cy="20" r="20" className="fav-bg" />
      <circle cx="20" cy="20" r="19.5" className="fav-border" />
      <path
        d="M20 10L22.9389 15.9549L29.5106 16.9098L24.7553 21.5451L25.8779 28.0902L20 25L14.1221 28.0902L15.2447 21.5451L10.4894 16.9098L17.0611 15.9549L20 10Z"
        style={{ fill: active ? "#FBBF24" : "var(--fav-idle, #5A6172)" }}
      />
    </svg>
  );
}

export function RefreshIcon({ size = 24, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="refresh"
    >
      <path
        d="M20 11A8.1 8.1 0 0 0 5.3 6.3L3 9M3 9V4M3 9H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 13A8.1 8.1 0 0 0 18.7 17.7L21 15M21 15V20M21 15H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DropIcon({ size = 24, color = "#5DA9F0", className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="precipitation"
    >
      <path
        d="M12 2.69L17.66 8.35C20.78 11.47 20.78 16.53 17.66 19.65C14.54 22.77 9.48 22.77 6.36 19.65C3.24 16.53 3.24 11.47 6.36 8.35L12 2.69Z"
        fill={color}
      />
    </svg>
  );
}

export function PinIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "search-pin-icon"}
      role="img"
      aria-label="location pin"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
        fill="#3B82F6"
      />
      <circle cx="12" cy="9" r="3" fill="white" />
    </svg>
  );
}

export function ErrorIcon({ size = 40, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="error"
    >
      <circle cx="20" cy="20" r="20" fill="currentColor" />
      <path
        d="M20 11V22"
        stroke="#fff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="29" r="2.2" fill="#fff" />
    </svg>
  );
}

export function SearchIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="search"
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16.5 16.5L21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
