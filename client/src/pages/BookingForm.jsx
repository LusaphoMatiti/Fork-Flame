import { useState, useEffect } from "react";
import { bookingsApi } from "../api/api.js";

const BookingForm = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    guests: 1,
    name: "",
    date: "",
    time: "",
  });

  const [status, setStatus] = useState("");

  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Adjust breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await bookingsApi.create(formData);
      setStatus("Booking Successful");
      console.log("Booking result:", result);
      setFormData({
        guests: 1,
        name: "",
        date: "",
        time: "",
      });
      setTimeout(() => {
        setStatus("");
      }, 5000);
    } catch (error) {
      console.error("Booking error:", error);
      setStatus("Booking failed. Try again.");

      setTimeout(() => {
        setStatus("");
      }, 5000);
    }
  };

  // Mobile Form Layout
  if (isMobile) {
    return (
      <form
        className="flex flex-col gap-5 px-5 py-4 bg-white rounded-xl shadow-lg max-w-md mx-auto w-full"
        onSubmit={handleSubmit}
      >
        {/* Guests Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Number of Guests
          </label>
          <input
            type="number"
            name="guests"
            min="1"
            placeholder="2"
            value={formData.guests}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-300 placeholder:text-gray-400 bg-gray-50 text-gray-800 w-full"
          />
        </div>

        {/* Customer Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-300 placeholder:text-gray-400 bg-gray-50 text-gray-800 w-full"
          />
        </div>

        {/* Date & Time Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Booking Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-300 bg-gray-50 text-gray-800 w-full"
            />
          </div>

          {/* Booking Time */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-300 bg-gray-50 text-gray-800 w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 mt-4 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Book a Table
        </button>

        {status && (
          <p className="text-center text-sm mt-3 text-gray-600 font-medium">
            {status}
          </p>
        )}
      </form>
    );
  }

  // Desktop Form Layout
  return (
    <div className="relative">
      <form
        className="flex flex-row items-center justify-center bg-white rounded-full shadow-lg max-w-5xl mx-auto px-8 py-3"
        onSubmit={handleSubmit}
      >
        {/* Guests Input */}
        <div className="flex items-center border-r border-gray-200 pr-6 h-12">
          <span className="text-gray-600 mr-3 whitespace-nowrap font-medium">
            Guests
          </span>
          <input
            type="number"
            name="guests"
            min="1"
            placeholder="2"
            className="w-20 text-center border-none focus:ring-2 focus:ring-amber-300 p-0 text-lg placeholder:text-gray-400 bg-gray-50 text-gray-800 rounded-lg px-3 py-2 h-full"
            value={formData.guests}
            onChange={handleChange}
          />
        </div>

        {/* Customer Name */}
        <div className="flex items-center border-r border-gray-200 pr-6 h-12 ml-2">
          <span className="text-gray-600 mr-3 whitespace-nowrap font-medium">
            Name
          </span>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-32 border-none focus:ring-2 focus:ring-amber-300 p-0 text-lg placeholder:text-gray-400 bg-gray-50 text-gray-800 rounded-lg px-3 py-2 h-full"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Booking Date */}
        <div className="flex items-center border-r border-gray-200 pr-6 h-12 ml-2">
          <span className="text-gray-600 mr-3 whitespace-nowrap font-medium">
            Date
          </span>
          <input
            type="date"
            name="date"
            className="w-28 border-none focus:ring-2 focus:ring-amber-300 p-0 text-lg placeholder:text-gray-400 bg-gray-50 text-gray-800 rounded-lg px-3 py-2 h-full"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* Booking Time */}
        <div className="flex items-center h-12 ml-2">
          <span className="text-gray-600 mr-3 whitespace-nowrap font-medium">
            Time
          </span>
          <input
            type="time"
            name="time"
            className="w-24 border-none focus:ring-2 focus:ring-amber-300 p-0 text-lg placeholder:text-gray-400 bg-gray-50 text-gray-800 rounded-lg px-3 py-2 h-full"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button - Now perfectly aligned */}
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-white text-lg font-semibold transition-colors duration-300 whitespace-nowrap shadow-md hover:shadow-lg rounded-full h-12 px-8 ml-6"
        >
          Book a Table
        </button>

        {status && (
          <div
            className={`
    fixed bottom-6 left-1/2 transform -translate-x-1/2
    px-6 py-3 rounded-lg shadow-lg z-50
    ${
      status.includes("Successful")
        ? "bg-green-100 text-green-800 border border-green-300"
        : "bg-red-100 text-red-800 border border-red-300"
    }
  `}
          >
            <p className="font-medium text-center">{status}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
