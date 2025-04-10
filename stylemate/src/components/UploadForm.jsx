import { useState } from 'react';

function UploadForm({ onUpload }) {
  const [image, setImage] = useState(null);
  const [type, setType] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !type || !color) return;
  
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "stylemate_upload"); // your unsigned preset
    formData.append("cloud_name", "dr2aobj1n"); // 🔁 replace this
  
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dr2aobj1n/image/upload", // 🔁 replace this
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await res.json();
  
      const newItem = {
        id: Date.now(),
        image: data.secure_url, // use Cloudinary URL instead
        type,
        color,
      };
  
      onUpload(newItem); // 👕 send to wardrobe state
      setImage(null);
      setType('');
      setColor('');
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Upload failed. Check console.");
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Upload
      </button>
    </form>
  );
}

export default UploadForm;
