import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);
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
