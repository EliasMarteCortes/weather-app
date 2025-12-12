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
    console.log('Found city:', name, country, latitude, longitude);
    
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Failed to fetch weather. Please try again later.");
  }
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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
