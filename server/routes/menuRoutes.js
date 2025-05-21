import express from "express";
import supabase from "../lib/supaClient.js";

const router = express.Router();

// Helper function to ensure value is an array
function ensureArray(value) {
  if (Array.isArray(value)) return value;
  if (value) return [value];
  return [];
}

// GET all menu items
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("menu_items").select(`
        *,
        categories (
          id,
          category_name
        )
      `);

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Error fetching menu items." });
    }

    // Transform dietary_tags to ensure it's always an array
    const transformedData = data.map((item) => ({
      ...item,
      dietary_tags: ensureArray(item.dietary_tags),
      // Flatten the category relationship
      category_id: item.categories.id,
      category_name: item.categories.category_name,
    }));

    res.json(transformedData);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Unexpected server error." });
  }
});

// GET items by category name
router.get("/category/:category_name", async (req, res) => {
  const { category_name } = req.params;

  try {
    // Decode URI component (handles spaces encoded as %20)
    const decodedName = decodeURIComponent(category_name);

    const { data: menuItems, error } = await supabase
      .from("menu_items")
      .select(
        `
        *,
        categories!inner (
          id,
          category_name
        )
      `
      )
      .ilike("categories.category_name", decodedName);

    if (error) throw error;

    // Transform dietary_tags and flatten category
    const transformedItems = menuItems.map((item) => ({
      ...item,
      dietary_tags: ensureArray(item.dietary_tags),
      category_id: item.categories.id,
      category_name: item.categories.category_name,
    }));

    res.json(transformedItems);
  } catch (err) {
    console.error("Category items error:", err);
    res.status(500).json({ message: "Error fetching category items" });
  }
});

export default router;
