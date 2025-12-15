import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchTerm)}&count=1&language=en&format=json`
    );
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found. Please try again.");
      return;
    }
    
    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
    );
    const weatherData = await weatherResponse.json();

    setWeather({
        name,
        country,
        temp: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        weatherCode: weatherData.current.weather_code
    });

  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Failed to fetch weather. Please try again later.");
  }
};

  const getWeatherDescription = (code) => {
      if (code === 0) return 'Clear sky';
      if (code <= 3) return 'Partly cloudy';
      if (code <= 48) return 'Foggy';
      if (code <= 67) return 'Rainy';
      if (code <= 77) return 'Snowy';
      if (code <= 82) return 'Rain showers';
      if (code <= 86) return 'Snow showers';
      return 'Thunderstorm';
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    if (searchTerm) {
      fetchWeather();
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="weather-container">
        {weather === null ? (
          <p>No weather data. Try searching for a city!</p>
        ) : (
          <div className="weather-card">
            <h2>{weather.name}, {weather.country}</h2>
            <p className="description">{getWeatherDescription(weather.weatherCode)}</p>
            <div className="temperature">{Math.round(weather.temp)}°C</div>

            <div className="weather-details">
              <div className="detail-item">
                <p className="label">Humidity</p>
                <p className="value">{weather.humidity}%</p>
              </div>
              <div className="detail-item">
                <p className="label">Wind Speed</p>
                <p className="value">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
