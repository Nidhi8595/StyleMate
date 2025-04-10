import React, { useState } from 'react';

const Wardrobe = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState('top');
  const [color, setColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedFile) return alert("Please select a file!");
  
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "stylemate_upload");
  
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dr2aobj1n/image/upload",
        formData
      );
      const imageUrl = res.data.secure_url;
      console.log("Uploaded to Cloudinary:", imageUrl);
  
      // Save imageUrl + type + color to MongoDB later
  
    } catch (err) {
      console.error("Upload error", err);
      alert("Image upload failed!");
    }
  };
  

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload a Clothing Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />

        <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded px-2 py-1">
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="layer">Layer</option>
        </select>

        <input
          type="text"
          placeholder="Color (e.g. blue, red)"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border rounded px-2 py-1"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Wardrobe;
