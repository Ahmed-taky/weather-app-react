import { LogoIcon, SunIcon, MoonIcon } from "./icons/UiIcons";

export default function Header({ toggleUnit, toggleTheme, theme, unit }) {
  return (
    <header>
      <div className="logo">
        <LogoIcon />
        <span>Weather App</span>
      </div>
      <div className="header-buttons">
        <button className="unit-toggle btn" onClick={toggleUnit}>
          {unit === "C" ? "F" : "C"}°
        </button>
        <button className="theme-toggle btn" onClick={toggleTheme}>
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
