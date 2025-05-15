import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM menu_items");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/:category_id", async (req, res) => {
  const { category_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM menu_items WHERE category_id = $1",
      [category_id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found for this category" });
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
