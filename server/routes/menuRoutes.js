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

router.get("/category/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("category_id")
      .eq("category_name", name)
      .single();

    if (categoryError || !categoryData) {
      return res.status(404).json({ message: "Category not found." });
    }

    const { data: menuItems, error: menuError } = await supabase
      .from("menu_items")
      .select("*")
      .eq("category_id", categoryData.category_id);

    if (menuError) {
      return res.status(500).json({ message: "Error fetching menu items." });
    }

    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: "Unexpected server error." });
  }
});

export default router;
