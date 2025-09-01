import './App.css';
import { useState, useEffect } from "react";

const apiKey = "e1cab25a7fe1904b0e58d01ae824c640";  // <-- ADD THIS

function App() {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, []);

  async function fetchWeather(cityName) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
      setError("");
      localStorage.setItem("lastCity", cityName);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  }

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={() => fetchWeather(city)}>Search</button>

      {error && <p>❌ {error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <p>🌡️ {weather.main.temp} °C</p>
          <p>☁️ {weather.weather[0].description}</p>
          <p>💧 {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
