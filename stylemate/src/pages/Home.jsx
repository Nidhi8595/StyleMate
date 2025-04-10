import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClothesGallery from '../components/ClothesGallery';
import UploadForm from '../components/UploadForm';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clothes, setClothes] = useState([]);
  const [outfitSuggestion, setOutfitSuggestion] = useState('');
  const [refresh, setRefresh] = useState(false);

  const getWeather = async (city) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      const data = response.data;

      const weatherInfo = {
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main
      };

      setWeather(weatherInfo);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    }
  };

  const fetchClothes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clothes');
      setClothes(res.data);
    } catch (err) {
      console.error("Failed to fetch clothes:", err);
    }
  };

  const fetchAISuggestion = async (weatherData, clothesData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/ai-outfit', {
        weather: weatherData,
        clothes: clothesData
      });
      setOutfitSuggestion(res.data.suggestion);
    } catch (err) {
      console.error("Failed to fetch AI outfit:", err);
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    await getWeather('Delhi');
    await fetchClothes();
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, [refresh]);

  useEffect(() => {
    if (weather && clothes.length > 0) {
      fetchAISuggestion(weather, clothes);
    }
  }, [weather, clothes]);

  const handleUpload = () => {
    setRefresh((prev) => !prev); // trigger reload
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Good Morning! 🌞</h1>

      {loading ? (
        <p>Loading weather and wardrobe...</p>
      ) : (
        <>
          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">Weather in {weather.city}</h2>
            <p>🌡️ {weather.temperature}°C – {weather.condition}</p>
          </div>

          {outfitSuggestion && (
            <div className="bg-white p-4 rounded-xl shadow border">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">AI-Suggested Outfit</h2>
              <pre className="whitespace-pre-wrap text-gray-700">{outfitSuggestion}</pre>
            </div>
          )}
        </>
      )}

      <UploadForm onUpload={handleUpload} />
      <ClothesGallery key={refresh} />
    </div>
  );
};

export default Home;
