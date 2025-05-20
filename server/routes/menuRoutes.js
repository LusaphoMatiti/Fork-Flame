import express from "express";
import supabase from "../lib/supaClient.js";

const router = express.Router();

// GET all menu items
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("menu_items").select("*");

    if (error) {
      return res.status(500).json({ message: "Error fetching menu items." });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Unexpected server error." });
  }
});

// In your menuRoutes.js
router.get("/category/:name", async (req, res) => {
  const { name } = req.params;

  try {
    // Decode URI component and replace special encoding
    const decodedName = decodeURIComponent(name.replace(/\+/g, " "));

    const { data: menuItems, error } = await supabase
      .from("menu_items")
      .select("*, categories!inner(*)")
      .ilike("categories.category_name", decodedName);

    if (error) throw error;
    res.json(menuItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching category items" });
  }
});

export default router;
