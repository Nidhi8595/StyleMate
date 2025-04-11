// import { useState } from 'react';
// import axios from 'axios';

// function UploadForm({ onUpload }) {
//   const [image, setImage] = useState(null);
//   const [type, setType] = useState('');
//   const [color, setColor] = useState('');
//   const [season, setSeason] = useState('all');
//   const [occasion, setOccasion] = useState('casual');
//   const [uploading, setUploading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!image || !type || !color) return alert("Please fill all fields.");

//     setUploading(true);

//     try {
//       // Upload to Cloudinary
//       const formData = new FormData();
//       formData.append('file', image);
//       formData.append('upload_preset', 'stylemate_upload');
//       formData.append('cloud_name', 'dr2aobj1n');

//       const cloudRes = await axios.post(
//         'https://api.cloudinary.com/v1_1/dr2aobj1n/image/upload',
//         formData
//       );

//       const imageUrl = cloudRes.data.secure_url;

//       // Save to backend
//       const res = await axios.post('http://localhost:5000/api/upload-clothes', {
//         imageUrl,
//         type,
//         color,
//         season,
//         occasion,
//       });

//       onUpload?.(res.data.cloth);
//       alert('Upload successful!');
//     } catch (err) {
//       console.error('Upload failed:', err);
//       alert('Upload failed!');
//     } finally {
//       setUploading(false);
//       setImage(null);
//       setType('');
//       setColor('');
//       setSeason('all');
//       setOccasion('casual');
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-6 space-y-4 border border-gray-100"
//     >
//       <h2 className="text-xl font-bold text-gray-800">Upload New Clothing</h2>

//       <label className="block">
//         <span className="text-sm text-gray-600">Select Image</span>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="mt-1 block w-full border border-gray-300 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />
//       </label>

//       <label className="block">
//         <span className="text-sm text-gray-600">Type</span>
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//         >
//           <option value="">Select Type</option>
//           <option value="top">Top</option>
//           <option value="bottom">Bottom</option>
//           <option value="layer">Layer</option>
//           <option value="shoes">Shoes</option>
//           <option value="accessory">Accessory</option>
//         </select>
//       </label>

//       <label className="block">
//         <span className="text-sm text-gray-600">Color</span>
//         <input
//           type="text"
//           placeholder="e.g. blue, beige"
//           value={color}
//           onChange={(e) => setColor(e.target.value)}
//           className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />
//       </label>

//       <label className="block">
//         <span className="text-sm text-gray-600">Season</span>
//         <select
//           value={season}
//           onChange={(e) => setSeason(e.target.value)}
//           className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//         >
//           <option value="all">All Seasons</option>
//           <option value="summer">Summer</option>
//           <option value="winter">Winter</option>
//         </select>
//       </label>

//       <label className="block">
//         <span className="text-sm text-gray-600">Occasion</span>
//         <select
//           value={occasion}
//           onChange={(e) => setOccasion(e.target.value)}
//           className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//         >
//           <option value="casual">Casual</option>
//           <option value="formal">Formal</option>
//           <option value="party">Party</option>
//           <option value="sports">Sports</option>
//           <option value="ethnic">Ethnic</option>
//         </select>
//       </label>

//       <button
//         type="submit"
//         disabled={uploading}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
//       >
//         {uploading ? 'Uploading...' : 'Upload Clothing'}
//       </button>
//     </form>
//   );
// }

// export default UploadForm;


import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react'; // optional spinner icon

function UploadForm({ onUpload }) {
  const [image, setImage] = useState(null);
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [season, setSeason] = useState('all');
  const [occasion, setOccasion] = useState('casual');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !type || !color) return alert("Please fill all fields.");

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'stylemate_upload');
      formData.append('cloud_name', 'dr2aobj1n');

      const cloudRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dr2aobj1n/image/upload',
        formData
      );

      const imageUrl = cloudRes.data.secure_url;

      const res = await axios.post('http://localhost:5000/api/upload-clothes', {
        imageUrl,
        type,
        color,
        season,
        occasion,
      });

      onUpload?.(res.data.cloth);
      alert('Upload successful!');
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed!');
    } finally {
      setUploading(false);
      setImage(null);
      setType('');
      setColor('');
      setSeason('all');
      setOccasion('casual');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="upload bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] max-w-md mx-auto mt-6 space-y-4 border border-gray-100"
    >
      <h2 className="text-xl font-bold text-gray-800">Upload New Clothing</h2>

      <label className="block">
        <span className="text-sm text-gray-600">Select Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mt-1 block w-full border border-gray-300 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">Select Type</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="layer">Layer</option>
          <option value="shoes">Shoes</option>
          <option value="accessory">Accessory</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Color</span>
        <input
          type="text"
          placeholder="e.g. blue, beige"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Season</span>
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="all">All Seasons</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Occasion</span>
        <select
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
          <option value="party">Party</option>
          <option value="sports">Sports</option>
          <option value="ethnic">Ethnic</option>
        </select>
      </label>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
        {uploading ? 'Uploading...' : 'Upload Clothing'}
      </motion.button>
    </motion.form>
  );
}

export default UploadForm;
