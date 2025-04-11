function WardrobeGrid({ items }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 p-3"
        >
          <img
            src={item.image}
            alt="Clothing"
            className="h-44 w-full object-cover rounded-lg"
          />
          <div className="mt-3 text-center text-gray-700 text-sm font-[Lato]">
            <span className="capitalize font-semibold text-blue-800">{item.type}</span>
            <span className="mx-1 text-gray-400">•</span>
            <span className="capitalize">{item.color}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WardrobeGrid;
