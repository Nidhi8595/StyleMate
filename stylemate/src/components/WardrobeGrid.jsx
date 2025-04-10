function WardrobeGrid({ items }) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow rounded p-2">
            <img src={item.image} alt="Clothing" className="h-40 w-full object-cover rounded" />
            <div className="text-sm text-gray-600 mt-1">
              {item.type} – {item.color}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default WardrobeGrid;
  