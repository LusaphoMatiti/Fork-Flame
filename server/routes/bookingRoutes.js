import express from "express";
import supabase from "../lib/supabaseClient.js";

const router = express.Router();

// Create a booking
router.post("/", async (req, res) => {
  console.log("Incoming booking data:", req.body);
  const { customer_name, booking_date, booking_time, guests } = req.body;

  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          customer_name,
          booking_date,
          booking_time,
          guests: parseInt(guests),
        },
      ])
      .select(); // returns inserted row(s)

    if (error) {
      console.error("Booking creation error:", error);
      return res.status(500).json({ message: "Failed to create booking." });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Unexpected server error." });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("bookings").select("*");

    if (error) {
      return res.status(500).json({ message: "Error fetching bookings." });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Unexpected server error." });
  }
});

// Get bookings by customer name
router.get("/by-name/:customer_name", async (req, res) => {
  const { customer_name } = req.params;

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("customer_name", customer_name);

    if (error) {
      return res.status(500).json({ message: "Error fetching bookings." });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Unexpected server error." });
  }
});

// Get bookings by date
router.get("/by-date/:booking_date", async (req, res) => {
  const { booking_date } = req.params;

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("booking_date", booking_date);

    if (error) {
      return res.status(500).json({ message: "Error fetching bookings." });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Unexpected server error." });
  }
});

export default router;
