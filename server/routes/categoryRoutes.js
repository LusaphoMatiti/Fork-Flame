import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/by-name/:category_name", async (req, res) => {
  const { category_name } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM categories WHERE category_name = $1",
      [category_name]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Category not found");
    }
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  const { category_name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO categories (category_name) VALUES ($1) RETURNING *",
      [category_name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("DB Error:", error.message);
    res.status(500).send("Server error");
  }
});

export default router;
