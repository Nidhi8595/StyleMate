import { useEffect, useState } from 'react';
import axios from 'axios';

function ClothesGallery() {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clothes');
        setClothes(res.data);
      } catch (err) {
        console.error('Error fetching clothes:', err);
      }
    };

    fetchClothes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Wardrobe</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {clothes.map((item) => (
          <div key={item._id} className="bg-white p-2 shadow rounded">
            <img src={item.imageUrl} alt="Clothing" className="w-full h-40 object-cover rounded" />
            <div className="mt-2 text-center">
              <p className="text-sm">Type: {item.type}</p>
              <p className="text-sm">Color: {item.color}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClothesGallery;
