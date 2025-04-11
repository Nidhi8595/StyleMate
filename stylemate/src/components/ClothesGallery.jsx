// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function ClothesGallery() {
//   const [clothes, setClothes] = useState([]);
//   const [deletingId, setDeletingId] = useState(null);
//   const [toast, setToast] = useState('');

//   const fetchClothes = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/clothes');
//       setClothes(res.data);
//     } catch (err) {
//       console.error('Error fetching clothes:', err);
//     }
//   };

//   useEffect(() => {
//     fetchClothes();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete this outfit?");
//     if (!confirm) return;

//     setDeletingId(id); // Start animation

//     setTimeout(async () => {
//       try {
//         await axios.delete(`http://localhost:5000/api/delete-cloth/${id}`);
//         setClothes((prev) => prev.filter((item) => item._id !== id));
//         setToast('🧼 Outfit deleted successfully!');
//         setTimeout(() => setToast(''), 3000); // Hide toast after 3s
//       } catch (err) {
//         console.error('Error deleting cloth:', err);
//       }
//     }, 300); // delay to allow fade out
//   };

//   return (
//     <div className="px-4 py-8 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">👚 My Wardrobe</h2>

//       {toast && (
//         <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
//           {toast}
//         </div>
//       )}

//       {clothes.length === 0 ? (
//         <p className="text-gray-500 text-center">No items yet. Upload your first outfit! ✨</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {clothes.map((item) => (
//             <div
//               key={item._id}
//               className={`bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden relative ${
//                 deletingId === item._id ? 'opacity-0 scale-95' : 'hover:shadow-xl'
//               }`}
//             >
//               <img
//                 src={item.imageUrl}
//                 alt="Clothing"
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-3 border-t">
//                 <p className="text-sm text-gray-700 capitalize">
//                   <span className="font-medium">Type:</span> {item.type}
//                 </p>
//                 <p className="text-sm text-gray-700 capitalize">
//                   <span className="font-medium">Color:</span> {item.color}
//                 </p>
//                 <button
//                   onClick={() => handleDelete(item._id)}
//                   className="mt-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200"
//                 >
//                   🗑️ Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ClothesGallery;


import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ClothesGallery() {
  const [clothes, setClothes] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const fetchClothes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clothes');
      setClothes(res.data);
    } catch (err) {
      console.error('Error fetching clothes:', err);
    }
  };

  useEffect(() => {
    fetchClothes();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this outfit!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      setDeletingId(id); // trigger animation
      setTimeout(async () => {
        try {
          await axios.delete(`http://localhost:5000/api/delete-cloth/${id}`);
          setClothes((prev) => prev.filter((item) => item._id !== id));
          toast.success('🧺 Outfit deleted successfully!');
        } catch (err) {
          console.error('Error deleting cloth:', err);
          toast.error('❌ Failed to delete outfit!');
        }
      }, 300); // time for fade animation
    }
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">👚 My Wardrobe</h2>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick />

      {clothes.length === 0 ? (
        <p className="text-gray-500 text-center">No items yet. Upload your first outfit! ✨</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {clothes.map((item) => (
            <div
              key={item._id}
              className={`card bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden relative ${
                deletingId === item._id ? 'opacity-0 scale-95' : 'hover:shadow-xl'
              }`}
            >
              <img
                src={item.imageUrl}
                alt="Clothing"
                className="w-full h-48 object-cover"
              />
              <div className="p-3 border-t">
                <p className="text-sm text-gray-700 capitalize">
                  <span className="font-medium">Type:</span> {item.type}
                </p>
                <p className="text-sm text-gray-700 capitalize">
                  <span className="font-medium">Color:</span> {item.color}
                </p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClothesGallery;
