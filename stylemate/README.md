# StyleMate

Phase 1: Frontend UI Setup (React + Tailwind + Vite)
-Create a new React project with Vite      
--npm create vite@latest stylemate
--Framework: React
--Variant: JavaScript
--cd stylemate
--npm install

-Install Tailwind CSS
--npm install -D @tailwindcss/postcss autoprefixer
--export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
--index.css
--@tailwind base;
@tailwind components;
@tailwind utilities;


-Create Folder Structure

-Routing
--npm install react-router-dom

-npm run dev

src/
├── components/
│   ├── Header.jsx
│   └── OutfitCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Wardrobe.jsx
│   ├── Suggestions.jsx
│   ├── Calendar.jsx
│   └── Settings.jsx
├── App.jsx
├── index.css
└── main.jsx

-Create Pages
--Build the Home Page UI

-Add Route in App.jsx

-Home Page with Weather & Daily Outfit
--Add Live Weather to Home Page
1. 🔑 Get Your API Key
Go to OpenWeatherMap → Sign Up → Go to "API Keys" → Copy the default key.

--npm install axios
-- Update Home.jsx to fetch live weather

-Create the Wardrobe Upload UI
--Create the Wardrobe.jsx component
--Connect to Cloudinary (Image Upload)
--Create a Cloudinary Account
Go to: https://cloudinary.com/

--Sign up (free) or log in.
--In your dashboard, you'll find:
---Cloud name
---API Key

--Upload Images to Cloudinary from React
---Updated UploadForm with Cloudinary Integration








