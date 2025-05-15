import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Incoming booking data:", req.body);

  const { customer_name, booking_date, booking_time, guests } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO bookings (customer_name,booking_date, booking_time, guests) VALUES ($1, $2, $3, $4) RETURNING *",
      [customer_name, booking_date, booking_time, guests]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/by-name/:customer_name", async (req, res) => {
  const { customer_name } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM bookings WHERE customer_name = $1",
      [customer_name]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/by-date/:booking_date", async (req, res) => {
  const { booking_date } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM bookings WHERE booking_date = $1",
      [booking_date]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
