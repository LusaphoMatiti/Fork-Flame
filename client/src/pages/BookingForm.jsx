import { useState, useEffect } from "react";
import { createBooking } from "../api/api.js";

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
      const result = await createBooking(formData);
      setStatus("Booking Successful");
      console.log("Booking result:", result);
      setFormData({
        guests: 1,
        name: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error("Booking error:", error);
      setStatus("Booking failed. Try again.");
    }
  };

  // Mobile Form Layout
  if (isMobile) {
    return (
      <form
        className="flex flex-col gap-4 px-4 py-3 bg-white rounded-lg shadow-md max-w-xs mx-auto w-full"
        onSubmit={handleSubmit}
      >
        {/* Guests Input */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">People</label>
          <input
            type="number"
            name="guests"
            min="1"
            placeholder=""
            value={formData.guests}
            onChange={handleChange}
            className=" border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-400 w-16"
          />
        </div>

        {/* Customer Name */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 w-16"
          />
        </div>

        {/* Booking Date */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 w-16"
          />
        </div>

        {/* Booking Time */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-1">Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 w-16"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded text-lg font-semibold transition duration-300 mt-2"
        >
          Book a Table
        </button>
        {status && (
          <p className="text-center text-sm mt-2 text-gray-600">{status}</p>
        )}
      </form>
    );
  }

  // Desktop Form Layout
  return (
    <form
      className="flex flex-row flex-wrap items-center justify-center gap-6 px-6 py-3 bg-white rounded-full shadow-md max-w-5xl mx-auto"
      onSubmit={handleSubmit}
    >
      {/* Guests Input */}
      <div className="flex items-center w-auto border-r border-gray-300 pr-4">
        <span className="text-gray-500 mr-2 whitespace-nowrap">People</span>
        <input
          type="number"
          name="guests"
          min="1"
          placeholder="2"
          className="w-24 text-center border-none focus:ring-0 p-0 text-lg border border-red-500 placeholder:text-gray-600 bg-black"
          value={formData.guests}
          onChange={handleChange}
        />
      </div>

      {/* Customer Name */}
      <div className="flex items-center w-auto border-r border-gray-300 pr-4">
        <span className="text-gray-500 mr-2 whitespace-nowrap">Name</span>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-24 border-none focus:ring-0 p-0 text-lg placeholder:text-gray-600 bg-black"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {/* Booking Date */}
      <div className="flex items-center w-auto border-r border-gray-300 pr-4">
        <span className="text-gray-500 mr-2 whitespace-nowrap">Date</span>
        <input
          type="date"
          name="date"
          className="w-24 border-none focus:ring-0 p-0 text-lg placeholder:text-gray-600 bg-black"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      {/* Booking Time */}
      <div className="flex items-center w-auto pr-4">
        <span className="text-gray-500 mr-2 whitespace-nowrap">Time</span>
        <input
          type="time"
          name="time"
          className="w-24 border-none focus:ring-0 p-0 text-lg placeholder:text-gray-600 bg-black"
          value={formData.time}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-amber-600 hover:bg-amber-700 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full text-lg font-semibold transition duration-300 self-center whitespace-nowrap"
      >
        Book a Table
      </button>
      {status && (
        <p className="text-center text-sm mt-2 text-gray-600">{status}</p>
      )}
    </form>
  );
};

export default BookingForm;
