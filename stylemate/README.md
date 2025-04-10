# StyleMate

## Phase 1: Frontend UI Setup (React + Tailwind + Vite)
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


## Create Folder Structure

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

## Create Pages
  --Build the Home Page UI

  -Add Route in App.jsx

  -Home Page with Weather & Daily Outfit
  --Add Live Weather to Home Page
     🔑 Get Your API Key
      Go to OpenWeatherMap → Sign Up → Go to "API Keys" → Copy the default key.

  --npm install axios
  -- Update Home.jsx to fetch live weather

## Create the Wardrobe Upload UI
  --Create the Wardrobe.jsx component
  --Connect to Cloudinary (Image Upload)
  --Create a Cloudinary Account
    Go to: https://cloudinary.com/

    --Sign up (free) or log in.
    --In your dashboard, you'll find:
      ---Cloud name
      ---API Key

## Upload Images to Cloudinary from React
 ---Updated UploadForm with Cloudinary Integration


# Phase2 : Backend Phase begins
## mkdir backend
  cd backend
  npm init -y

## Install backend dependencies
   express: to create the server and routes
   mongoose: to interact with MongoDB
   cors: to allow frontend to access backend
   dotenv: to manage environment variables (e.g., DB URI
 
## backend/
├── models/
│   └── Cloth.js
├── routes/
│   └── wardrobe.js
├── .env
├── server.js
 
## Create MongoDB Atlas Cluster and Get Connection String
   Visit: https://www.mongodb.com/cloud/atlas/register

   Sign up with your email or GitHub/Google.
   Choose the free tier (Shared — M0).
   Pick a cloud provider and region (e.g., AWS - Mumbai or anything close to you).

  Create a Cluster
  Create a Database User
   Allow Access from Anywhere
  Get Your Connection URI

   Create a Database stylemateDB with collection: clothes

## Set Up Mongoose in Your Express Backend
   npm install mongoose dotenv
   Create db.js to connect MongoDB

## Create Cloth Model
   Create Upload Route
   Hook Route in server.js

## Connect Frontend UploadForm to Backend
  We'll send the Cloudinary image URL, type, and color from the form.   

### Fetch and Display Clothes (Outfit Dashboard)
  We’ll create a new component (e.g., ClothesGallery.jsx) that:
  -Fetches the clothes from  backend (GET /api/clothes)
  -Displays the images along with their type and color
  -Update Home.jsx to use this component
  -add the UploadForm component just above the wardrobe section (ClothesGallery) so users can upload clothes directly to their wardrobe.

###  implement auto outfit generation based on your uploaded wardrobe
