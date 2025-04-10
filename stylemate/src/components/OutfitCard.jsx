function OutfitCard({ outfit }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mt-4 max-w-sm">
        <img
          src={outfit.image}
          alt="Outfit"
          className="rounded-lg mb-4 h-64 object-cover w-full"
        />
        <h2 className="text-lg font-semibold">{outfit.title}</h2>
        <p className="text-sm text-gray-500">{outfit.description}</p>
      </div>
    );
  }
  
  export default OutfitCard;
  