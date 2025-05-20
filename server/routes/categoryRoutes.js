import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY category_name"
    );
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("GET /categories error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// GET category by name
router.get("/by-name/:category_name", async (req, res) => {
  const { category_name } = req.params;

  if (!category_name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM categories WHERE LOWER(category_name) = LOWER($1)",
      [category_name.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error(
      `GET /categories/by-name/${category_name} error:`,
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// POST new category
router.post("/", async (req, res) => {
  const { category_name } = req.body;

  if (
    !category_name ||
    typeof category_name !== "string" ||
    category_name.trim().length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Valid category name is required",
    });
  }

  try {
    // Check if category already exists
    const existingCategory = await pool.query(
      "SELECT * FROM categories WHERE LOWER(category_name) = LOWER($1)",
      [category_name.trim()]
    );

    if (existingCategory.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const result = await pool.query(
      "INSERT INTO categories (category_name) VALUES ($1) RETURNING *",
      [category_name.trim()]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("POST /categories error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
