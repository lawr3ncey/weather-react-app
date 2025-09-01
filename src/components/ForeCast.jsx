import React, { useEffect, useState } from "react";

const API_KEY = "e1cab25a7fe1904b0e58d01ae824c640";

function Forecast({ city }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.list) return;
        // one forecast per day (every 8th item ≈ 24h)
        const daily = data.list.filter((_, index) => index % 8 === 0);
        setForecast(daily);
      });
  }, [city]);

  return (
    <div className="forecast">
      <h3>📅 5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, idx) => (
          <div key={idx} className="forecast-card">
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>{day.main.temp}°C</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
