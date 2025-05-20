import axios from "axios";

const API_BASE_URL = "https://fork-and-flame-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg =
      error.response?.data?.message || error.message || "Request failed";

    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      console.error("Authentication error:", errorMsg);
      // Redirect to login here
    }

    return Promise.reject(errorMsg);
  }
);

/**
 * BOOKINGS API
 */
export const bookingsApi = {
  getAll: async () => {
    try {
      const { data } = await api.get("/bookings");
      return data;
    } catch (error) {
      console.error("Error getting bookings:", error);
      throw error;
    }
  },

  create: async (bookingData) => {
    try {
      // Validate required fields
      if (
        !bookingData?.name ||
        !bookingData?.date ||
        !bookingData?.time ||
        !bookingData?.guests
      ) {
        throw new Error("Missing required booking fields");
      }

      const formattedDate = new Date(bookingData.date)
        .toISOString()
        .split("T")[0];

      const { data } = await api.post("/bookings", {
        customer_name: bookingData.name,
        booking_date: formattedDate,
        booking_time: bookingData.time,
        guests: Number(bookingData.guests),
        contact_number: bookingData.contactNumber,
        special_requests: bookingData.specialRequests,
      });

      return data;
    } catch (error) {
      console.error("Booking creation failed:", error);
      throw error;
    }
  },

  getByName: async (name) => {
    if (!name) throw new Error("Name is required");

    try {
      const { data } = await api.get(
        `/bookings/by-name/${encodeURIComponent(name)}`
      );
      return data;
    } catch (error) {
      console.error("Error getting bookings by name:", error);
      throw error;
    }
  },

  getByDate: async (date) => {
    if (!date) throw new Error("Date is required");

    try {
      const { data } = await api.get(`/bookings/by-date/${date}`);
      return data;
    } catch (error) {
      console.error("Error getting bookings by date:", error);
      throw error;
    }
  },
};

/**
 * CATEGORIES API
 */
export const categoriesApi = {
  getAll: async () => {
    try {
      const { data } = await api.get("/categories");
      return data;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  },

  create: async (categoryData) => {
    if (!categoryData?.category_name) {
      throw new Error("Category name is required");
    }

    try {
      const { data } = await api.post("/categories", {
        category_name: categoryData.category_name.trim(),
      });
      return data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },
};

/**
 * MENU API
 */
export const menuApi = {
  getAll: async () => {
    try {
      const { data } = await api.get("/menu");
      return data;
    } catch (error) {
      console.error("Error getting menu items:", error);
      throw error;
    }
  },

  getByCategory: async (categoryName) => {
    try {
      const { data } = await api.get(
        `/menu/category/${encodeURIComponent(categoryName.toLowerCase())}`
      );
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};

export default api;
