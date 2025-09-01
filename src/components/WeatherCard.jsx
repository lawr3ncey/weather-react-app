import React from "react";

function WeatherCard({ data }) {
  return (
    <div className="weather-card">
      <h2>
        {data.name}, {data.sys.country}{" "}
        <img
          src={`https://flagsapi.com/${data.sys.country}/shiny/24.png`}
          alt="flag"
        />
      </h2>
      <p>🌡 Temp: {data.main.temp}°C</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
      <p>☁ Condition: {data.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="icon"
      />
    </div>
  );
}

export default WeatherCard;
