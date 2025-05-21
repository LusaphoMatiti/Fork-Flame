import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { menuApi } from "../api/api";
import MenuCard from "../components/MenuCard";
import LoadingSpinner from "../components/LoadSpinner";

const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "starters", name: "Starters" },
  { id: "seafood", name: "Seafood" },
  { id: "meat-and-game", name: "Meat & Game" },
  { id: "vegetarian-and-vegan", name: "Vegetarian & Vegan" },
  { id: "desserts", name: "Desserts" },
];

const MenuPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTags, setActiveTags] = useState([]);

  const activeCategory = categoryId || "all";

  // Process menu items and extract unique dietary tags
  const processMenuItems = (items) => {
    const allTags = new Set();
    const processedItems = items.map((item) => {
      // Ensure dietary_tags is always an array
      const tags = Array.isArray(item.dietary_tags)
        ? item.dietary_tags
        : item.dietary_tags
        ? [item.dietary_tags]
        : [];

      // Add tags to the set
      tags.forEach((tag) => allTags.add(tag));

      return {
        ...item,
        dietary_tags: tags,
      };
    });

    // Convert Set to array and sort alphabetically
    const uniqueTags = Array.from(allTags).sort();
    setActiveTags(uniqueTags);

    return processedItems;
  };

  const fetchItems = async (category) => {
    setLoading(true);
    setError(null);

    try {
      const items =
        category === "all"
          ? await menuApi.getAll()
          : await menuApi.getByCategory(category);

      const processedItems = processMenuItems(items);
      setMenuItems(processedItems);
    } catch (err) {
      console.error("Error fetching menu items:", err);
      setError("Failed to load menu items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === "all") {
      navigate("/menu");
    } else {
      navigate(`/menu/category/${categoryId}`);
    }
  };

  return (
    <div className="bg-[#f6ad55]/30 min-h-screen pb-20 ">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-10">
          <h1 className="text-4xl font-playfair font-bold mb-2 text-gray-900 mt-20">
            Our Menu
          </h1>
          <p className="text-gray-700 text-lg">
            "See what's cooking. Explore our freshly made dishes before your
            visit."
          </p>
        </header>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full border-2 font-medium transition-colors duration-200 ${
                activeCategory === category.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-50"
              }`}
              aria-current={activeCategory === category.id ? "page" : undefined}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <section aria-live="polite" aria-busy={loading}>
          {loading ? (
            <div className="flex justify-center py-10">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => fetchItems(activeCategory)}
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Retry
              </button>
            </div>
          ) : menuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <MenuCard key={item.item_id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              No menu items found in this category.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default MenuPage;
