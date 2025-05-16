import axios from "axios";

const API_BASE_URL = "https://fork-and-flame-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// BOOKINGS

export const getBookings = async () => {
  try {
    const response = await api.get("/bookings");
    return response.data;
  } catch (error) {
    console.error("Error getting bookings:", error);
  }
};

export const createBooking = async (data) => {
  try {
    // Format date to YYYY-MM-DD
    const formattedDate = new Date(data.date).toISOString().split("T")[0];

    const response = await api.post("/bookings", {
      customer_name: data.name,
      booking_date: formattedDate,
      booking_time: data.time,
      guests: Number(data.guests),
    });

    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    console.error("Booking failed:", errorMsg);
    throw new Error(errorMsg);
  }
};

export const getBookingsByName = async (name) => {
  try {
    const response = await api.get(`/bookings/by-name/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error getting bookings by name:", error);
  }
};

export const getBookingsByDate = async (date) => {
  try {
    const response = await api.get(`/bookings/by-date/${date}`);
    return response.data;
  } catch (error) {
    console.error("Error getting booking by date:", error);
  }
};

// CATEGORIES

export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error getting categories:", error);
  }
};

export const createCategory = async (data) => {
  try {
    const response = await api.post("/categories", data);
    return response.data;
  } catch (error) {
    console.error("Error creating category data:", error);
  }
};

// MENU ITEMS

export const getMenuItems = async () => {
  try {
    const response = await api.get("/menu");
    return response.data;
  } catch (error) {
    console.error("Error getting menu:", error);
  }
};

export const getMenuByCategory = async (id) => {
  try {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting customer by id: ", error);
  }
};

export default api;
