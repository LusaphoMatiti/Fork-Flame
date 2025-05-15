const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container px-6 py-12 mx-auto">
        {/* Grid Layout for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Branding Section */}
          <div>
            <h1 className="font-bold font-playfair text-4xl">Fork & Flame</h1>
            <p className=" font-playfair text-xl">"Savour the Moment"</p>
            <button className="mt-4 bg-amber-500 hover:bg-amber-700 text-white px-4 py-2 rounded-full cursor-pointer">
              Reserve Now
            </button>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Menu</h3>
            <a href="/menu" className="block text-gray-400 hover:text-white">
              About us
            </a>
            <a
              href="/book-a-table"
              className="block text-gray-400 hover:text-white"
            >
              Book A Table
            </a>
            <a href="/contact" className="block text-gray-400 hover:text-white">
              Contact us
            </a>
          </div>

          {/* Social Media Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Socials</h3>
            <div className="flex space-x-4 mt-5 mb-5">
              <a
                href="https://www.twitter.com "
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.86 9.86 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.944 13.944 0 0 1 1.671 3.15 4.915 4.915 0 0 0 3.18 9.723a4.902 4.902 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.902 4.902 0 0 1-2.224.085 4.918 4.918 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.213c9.058 0 14.01-7.506 14.01-14.01 0-.213-.005-.426-.014-.637A10.012 10.012 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com "
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.876v-6.987h-2.54v-2.889h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.26c-1.243 0-1.63.772-1.63 1.562v1.879h2.773l-.443 2.889h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com "
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM12 7.25a4.75 4.75 0 1 1 0 9.5a4.75 4.75 0 0 1 0-9.5zM18.5 6.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0zM12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>
            <p className="text-gray-400 mt-2">+27 77768 473 4978</p>
            <a
              href="mailto:info@forkandflame.com"
              className="text-gray-400 hover:text-white"
            >
              info@forkandflame.com
            </a>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-6 border-gray-600" />

        {/* Copyright Section */}
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <a href="/" className="flex items-center">
            <span className=" font-semibold font-playfair text-xl">
              Fork & Flame
            </span>
          </a>
          <p className="mt-4 text-sm text-gray-400 sm:mt-0">
            © 2025 Fork & Flame. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
