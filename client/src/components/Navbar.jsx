import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithRedirect } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);

  const [user, setUser] = useState(null);

  const handleOAuthLogin = async () => {
    try {
      const result = await signInWithRedirect(auth, provider);
      setUser(result.user);
      console.log("User Info:", result.user);
    } catch (err) {
      console.error("OAuth Login Error:", err.message);
      alert("There was an issue with login. Please try again.");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setUser(result.user);
          console.log("User Info:", result.user);
        }
      } catch (err) {
        console.error("Redirect Result Error:", err.message);
      }
    };

    getUser();
  }, []);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 h-[80px] px-[2rem] sm:px-[1.25rem] flex justify-between items-center transition-all duration-300 border-b border-white
    ${
      isHomePage && !isScrolled
        ? "bg-transparent shadow-none text-white placeholder:text-white"
        : "bg-[#F4EFEA] shadow text-black  placeholder:text-black"
    }`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-[28px] font-bold font-playfair ">
          Fork&Flame
        </Link>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex space-x-[2rem] text-[16px] sm:text-[14px]  font-semibold md:text-md">
        <a href="/home" className="hover:text-[#8B5E3C] cursor-pointer">
          Home
        </a>

        <a href="/menu" className="hover:text-[#8B5E3C] cursor-pointer">
          Menu
        </a>

        <a className="hover:text-[#8B5E3C] cursor-pointer " href="/contact">
          Contact
        </a>
      </div>

      {/* Actions (Login / Signup) */}
      <div className="hidden md:flex space-x-[1.5rem] items-center ">
        {/* Search Input (Desktop Only) */}
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 pl-2 border border-gray-300 rounded-md text-sm focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        {user ? (
          <div className="flex items-center space-x-2">
            <img
              src={user.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{user.displayName}</span>
          </div>
        ) : (
          <>
            <button
              onClick={handleOAuthLogin}
              className="text-[16px] font-[500] cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={handleOAuthLogin}
              className="bg-[#D9A05B] hover:bg-[#e7be8c] text-[#1A1A1A] rounded-[8px] px-[1.25rem] py-[0.5rem] text-[16px] font-[500] cursor-pointer"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white dark:text-gray-200 hover:text-[#D9A05B] dark:hover:text-[#D9A05B] focus:outline-none cursor-pointer"
          aria-label="toggle menu"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 16h16"
              />
            </svg>
          )}
        </button>
      </div>
      {/* Menu Links */}
      <div
        className={`md:hidden absolute inset-x-0 z-20 w-full px-6 py-2 bg-white  dark:bg-gray-800 top-[80px] md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:items-center transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "opacity-0 -translate-x-full md:opacity-100 md:translate-x-0"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
          <button
            onClick={() => navigate("/home")}
            className="my-2 text-sm py-2 w-[15vh] leading-5 text-gray-700 transition duration-300 transform dark:text-gray-200 hover:text-[#D9A05B] cursor-pointer hover:bg-gray-300 rounded-lg md:my-0 "
          >
            Home
          </button>
          <button
            onClick={() => navigate("/menu")}
            className="my-2 text-sm py-2 w-[15vh] leading-5 text-gray-700 transition duration-300 transform dark:text-gray-200 hover:text-[#D9A05B] cursor-pointer hover:bg-gray-300 rounded-lg  md:my-0"
          >
            Menu
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="my-2 text-sm py-2 w-[15vh] leading-5 text-gray-700 transition duration-300 transform dark:text-gray-200 hover:text-[#D9A05B] cursor-pointer hover:bg-gray-300 rounded-lg  md:my-0"
          >
            Contact
          </button>

          <button
            onClick={handleLogin}
            className="my-2 text-sm  w-[15vh]   py-2 leading-5 text-gray-700 transition duration-300 transform dark:text-gray-200 hover:text-[#D9A05B]  md:my-0 cursor-pointer hover:bg-gray-300 rounded-lg"
          >
            Log In
          </button>
          <button
            onClick={handleLogin}
            className="my-2 w-[15vh] rounded-lg py-2 text-sm leading-5 text-white  transition duration-300 transform bg-[#D9A05B] hover:bg-[#e7be8c] text-[16px] font-[500]  md:my-0 cursor-pointer md:mr-5"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Search */}
        <div className="my-4 md:hidden">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.134 17 3 13.866 3 10C3 6.134 6.134 3 10 3C13.866 3 17 6.134 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
