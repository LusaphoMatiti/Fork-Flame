const Contact = () => {
  return (
    <section
      className="flex items-center justify-center bg-[#F4EFEA] py-10 px-4 sm:px-6 lg:py-20"
      id="contact"
    >
      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-7xl gap-12 sm:mt-20">
        {/* Image Section */}
        <div className="w-full max-w-md lg:max-w-xl">
          <img
            src="/location.webp"
            alt="location"
            className="w-full h-auto max-h-[500px] lg:max-h-[600px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start justify-center space-y-6 text-center lg:text-left w-full max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-playfair">
            Fork&Flame
          </h1>
          <p className="text-lg lg:text-xl">
            123 Coastal Avenue, Cape Town, 8001
          </p>

          <div className="space-y-2 text-base lg:text-lg">
            <h3 className="font-semibold">Open hours</h3>
            <p>Mon - Fri: 08:00 - 00:00</p>
            <p>Sat - Sun: 08:00 - 21:00</p>
          </div>

          <div className="space-y-2 text-base lg:text-lg">
            <h3 className="font-semibold">Phone:</h3>
            <p>021-223-7867</p>

            <h3 className="font-semibold">Email:</h3>
            <p>Fork&Flame@service.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
