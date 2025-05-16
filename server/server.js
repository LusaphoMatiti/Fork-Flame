import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

//Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/categories", categoryRoutes);

//Health check
app.get("/api/health", (req, res) => {
  res.send("API is running");
});

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
