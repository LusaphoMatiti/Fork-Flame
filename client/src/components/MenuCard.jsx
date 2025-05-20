const MenuCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="h-48 overflow-hidden">
        <img
          src={
            item.image_url ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
          }
          alt={item.item_name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {item.item_name || "Delicious Dish"}
          </h3>
          {item.price && (
            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-semibold">
              ${item.price.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {item.description ||
            "A flavorful dish prepared with fresh ingredients and chef's special recipe."}
        </p>

        {/* Dietary Tags */}
        <div className="flex flex-wrap gap-2">
          {["Vegetarian", "Gluten-Free"].map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
