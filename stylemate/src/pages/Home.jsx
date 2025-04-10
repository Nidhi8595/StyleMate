import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeather = async (city) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await axios.get(url);
      const data = response.data;

      setWeather({
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main
      });

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather("Delhi"); // you can make this dynamic later
  }, []);

  const outfit = {
    top: "Pastel Blue Shirt",
    bottom: "White Linen Pants",
    accessories: "Minimal Watch",
    shoes: "White Sneakers"
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Good Morning! 🌞</h1>

      {loading ? (
        <p>Loading weather...</p>
      ) : (
        <div className="bg-blue-100 p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Weather in {weather.city}</h2>
          <p>🌡️ {weather.temperature}°C – {weather.condition}</p>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Your Outfit Suggestion</h2>
        <ul className="space-y-1 text-gray-600">
          <li>👕 Top: {outfit.top}</li>
          <li>👖 Bottom: {outfit.bottom}</li>
          <li>⌚ Accessories: {outfit.accessories}</li>
          <li>👟 Shoes: {outfit.shoes}</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
