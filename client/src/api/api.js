import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

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
    const mappedData = {
      customer_name: data.name,
      booking_date: data.date,
      booking_time: data.time,
      guests: data.guests,
    };

    const response = await api.post("/bookings", mappedData);
    return response.data;
  } catch (error) {
    console.error("Error creating bookings:", error);
    throw error;
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
