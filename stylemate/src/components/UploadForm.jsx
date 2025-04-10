import { useState } from 'react';
import axios from 'axios';

function UploadForm({ onUpload }) {
  const [image, setImage] = useState(null);
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !type || !color) return;
  
    setUploading(true);
    try {
      // 1. Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', image);
    formData.append("upload_preset", "stylemate_upload"); // your unsigned preset
    formData.append("cloud_name", "dr2aobj1n"); // 🔁 replace this
  
    const cloudRes = await axios.post(
      'https://api.cloudinary.com/v1_1/dr2aobj1n/image/upload', // Replace this
      formData
    );

    const imageUrl = cloudRes.data.secure_url;

    const res = await axios.post('http://localhost:5000/api/upload-clothes', {
      imageUrl,
      type,
      color,
    });

    onUpload?.(res.data.cloth); // Optional callback
    alert('Upload successful!');
  } catch (err) {
    console.error('Upload failed:', err);
    alert('Upload failed!');
  } finally {
    setUploading(false);
    setImage(null);
    setType('');
    setColor('');
  }
};

return (
  <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded max-w-md">
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
      className="mb-2"
    />
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="w-full mb-2 p-2 border"
    >
      <option value="">Select Type</option>
      <option value="top">Top</option>
      <option value="bottom">Bottom</option>
      <option value="layer">Layer</option>
    </select>
    <input
      type="text"
      placeholder="Color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
      className="w-full mb-2 p-2 border"
    />
    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded"
      disabled={uploading}
    >
      {uploading ? 'Uploading...' : 'Upload'}
    </button>
  </form>
);
}

export default UploadForm;