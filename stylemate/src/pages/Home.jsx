import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClothesGallery from '../components/ClothesGallery';
import UploadForm from '../components/UploadForm';
import Header from '../components/Header';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clothes, setClothes] = useState([]);
  const [outfitSuggestion, setOutfitSuggestion] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [error, setError] = useState(null); // Error state

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Snow':
        return '❄️';
      default:
        return '🌈';
    }
  };

  const getWeather = async (city) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      const data = response.data;

      const weatherInfo = {
        city: data.name,
        temperature: data.main.temp,
        condition: data.weather[0].main,
      };

      setWeather(weatherInfo);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Failed to fetch weather:', error);
      setError('Unable to fetch weather data. Please try again later.');
    }
  };

  const fetchClothes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clothes');
      setClothes(res.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Failed to fetch clothes:', err);
      setError('Unable to fetch clothes data. Please try again later.');
    }
  };

  const fetchAISuggestion = async (weatherData, clothesData) => {
    try {
      setSuggesting(true);
      const res = await axios.post('http://localhost:5000/api/ai-outfit', {
        weather: weatherData,
        clothes: clothesData,
      });
      setOutfitSuggestion(res.data.suggestion);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Failed to fetch AI outfit:', err);
      setError('Unable to fetch outfit suggestion. Please try again later.');
    } finally {
      setSuggesting(false);
    }
  };

  const fetchAll = async () => {
    setLoading(true);
    await getWeather('Noida'); // Hardcoded city for now
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
    setRefresh((prev) => !prev); // Trigger reload
  };

  return (
    <div className="w-full mx-auto px-1 pb-2 space-y-8">
      {/* Header */}
      {/* <div className=" flex items-center justify-between">
        
        <h1 className="text-3xl font-semibold text-gray-800">StyleMate </h1>
        
        <div
          className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white"
          aria-label="User Profile"
        >
          👤
        </div>
      </div> */}
      <Header/>
      {/* Weather & Suggestion */}
      {loading ? (
        <div className="text-center text-gray-500">
          <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 mx-auto animate-spin"></div>
          Loading weather and wardrobe...
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {/* Weather Info */}
          <div className="bg-blue-50 p-4 rounded-xl shadow-md flex items-center gap-4">
            <span className="text-2xl">{getWeatherIcon(weather.condition)}</span>
            <div>
              <h2 className="text-lg font-medium text-gray-700">
                {weather.city}'s Weather
              </h2>
              <p className="text-sm text-gray-600">
                {weather.temperature}°C – {weather.condition}
              </p>
            </div>
          </div>

          {/* Suggest Button */}
          <button
            onClick={() => fetchAISuggestion(weather, clothes)}
            disabled={suggesting}
            className={`py-2 px-4 rounded transition mt-4 ${
              suggesting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            aria-label="Get Outfit Suggestion"
          >
            {suggesting ? 'Suggesting Outfit...' : 'Get Today’s Outfit Suggestion'}
          </button>

          {/* AI Outfit Suggestion */}
          {outfitSuggestion && (
            <div className="bg-white border p-5 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Outfit Recommendation
              </h2>
              <div className="text-gray-700 whitespace-pre-line">
                {outfitSuggestion}
              </div>
            </div>
          )}
        </>
      )}

      {/* Upload Section */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <UploadForm onUpload={handleUpload} />
      </div>

      {/* Clothes Gallery */}
      <div className="wardrobe bg-white p-5 rounded-xl shadow-sm">
        <ClothesGallery key={refresh} />
      </div>
    </div>
  );
};

export default Home;