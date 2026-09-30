# Weather App

A responsive React weather dashboard that shows the current temperature, daily and hourly forecasts, sunrise/sunset info, air quality, and saved favorite cities. The app is built for Vercel deployment and uses WeatherAPI for live data.

Live preview: https://weather-app-react-rho-ten.vercel.app/

## What this project does

- Search for any city and get matching results
- View current weather details such as temperature, humidity, pressure, visibility, and wind direction
- Switch between Celsius and Fahrenheit
- Show hourly and 3-day forecast cards
- Save favorite cities in browser local storage
- Show air quality and astronomy data for the selected city
- Support light/dark theme toggling

## Tech stack

- React
- Vite
- JavaScript
- WeatherAPI
- Vercel serverless API routes

## Project structure

- `src/` — frontend app and UI components
- `src/Components/` — header, search, weather cards, forecasts, favorites, air quality, footer
- `src/api/` — frontend fetch wrappers for `/api/weather` and `/api/search`
- `api/` — serverless API handlers that call WeatherAPI
- `src/utils/` — icon mapping and formatting helpers
- `public/` — static files

## Local setup

### 1) Install dependencies

```bash
npm install
```

### 2) Add your WeatherAPI key

Create a `.env` file in the project root with:

```bash
WEATHER_API_KEY=your_api_key_here
```

You can get a free key from: https://www.weatherapi.com/

### 3) Run the app locally

Because the app uses Vercel-style serverless routes under the `api/` folder, the safest way to run it locally is with Vercel CLI:

```bash
npx vercel dev
```

Then open the local URL it prints in the terminal, usually:

```text
http://localhost:3000
```

If you only run `npm run dev`, the React frontend will start, but the `/api/weather` and `/api/search` endpoints may not work unless the Vercel runtime is active.

## Available scripts

```bash
npm run dev
npm run build
npm run preview
```

## Production build

```bash
npm run build
```

## Notes

- The app depends on internet access for live weather data.
- The backend endpoints are implemented in the root `api/` directory and require the `WEATHER_API_KEY` environment variable.
- The app is designed to be deployed on Vercel, matching the live preview URL.

## License

This project is intended for learning and demo purposes.
