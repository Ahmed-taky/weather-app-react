import { LogoIcon, SunIcon, MoonIcon } from "./icons/UiIcons";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <LogoIcon />
        <span>Vanilla Weather App</span>
      </div>
      <div className="header-buttons">
        <button className="unit-toggle btn">
          <SunIcon />
          C°/F°
        </button>
        <button className="theme-toggle btn">
          <MoonIcon />
          Dark
        </button>
      </div>
    </header>
  );
}
