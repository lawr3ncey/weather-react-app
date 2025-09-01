import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Forecast from "./components/ForeCast";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const API_KEY = "e1cab25a7fe1904b0e58d01ae824c640";

function App() {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "Manila");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Fetch current weather
  useEffect(() => {
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setError(null);
        localStorage.setItem("lastCity", city);
      })
      .catch((err) => setError(err.message));
  }, [city]);

    // Decide background class based on weather condition
  const getBackground = () => {
    if (!weather || !weather.weather) return "default-bg.jpg";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("clear")) return "clear-weather.jpg";
    if (main.includes("cloud")) return "cloud-weather.jpg";
    if (main.includes("rain")) return "rain-weather.jpg";
    if (main.includes("snow")) return "snow-weather.jpg";
    if (main.includes("drizzle")) return "drizzle-weather.jpg";
    if (main.includes("thunderstorm")) return "thunderstorm-weather.jpg";
    if (main.includes("mist")) return "mist-weather.jpg";
    if (main.includes("fog")) return "fog-weather.jpg";
    return "default-bg.jpg";
  };

  
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(/images/${getBackground()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <h1>🌦 Weather App</h1>
      <SearchBar onSearch={setCity} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <>
          <WeatherCard data={weather} />
          <Forecast city={city} />
        </>
      )}
    </div>
  );
}

export default App;
