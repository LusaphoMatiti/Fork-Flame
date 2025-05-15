const MenuTeaser = () => {
  return (
    <section className="py-10 px-4 sm:px-6 bg-[#F4EFEA]">
      <div className="rounded-lg bg-[#D9A05B] max-w-7xl mx-auto shadow-lg">
        <h1 className="text-center font-playfair p-8 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Our Signature Dishes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 p-6">
          {[
            { name: "Peri Peri Prawns", img: "/cuisine-1.jpg" },
            { name: "Peri Peri Prawns", img: "/cuisine-5.jpg" },
            { name: "Braaied Snoek", img: "/cuisine-2.jpg" },
            { name: "Roasted Salmon", img: "/cuisine-3.jpg" },
            { name: "Seared Tuna Steaks", img: "/cuisine-4.jpg" },
          ].map((dish, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={dish.img}
                alt={dish.name}
                className="w-full h-48 object-cover rounded-lg mb-3 shadow-md"
              />
              <div className="w-full bg-white rounded-lg p-3 text-center shadow-sm">
                <h3 className="font-semibold text-gray-800">{dish.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuTeaser;
