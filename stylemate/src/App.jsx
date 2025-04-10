import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import Wardrobe from './pages/Wardrobe';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
      </Routes>
    
  );
}

export default App;
