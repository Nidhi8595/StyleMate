function OutfitCard({ outfit }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 transition-transform hover:scale-[1.015] hover:shadow-lg duration-300 max-w-sm mx-auto">
      <img
        src={outfit.image}
        alt="Outfit"
        className="rounded-lg mb-3 h-64 w-full object-cover"
      />

      <h2 className="text-xl font-bold text-gray-800 font-[League Spartan] mb-1 tracking-tight">
        {outfit.title}
      </h2>

      <p className="text-sm text-gray-600 leading-relaxed">
        {outfit.description}
      </p>
    </div>
  );
}

export default OutfitCard;
