const Experience = () => {
  return (
    <section className=" h-screen md:min-h-[90vh] relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/experience.mp4" type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-35 z-10"></div>
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold font-playfair mb-5">
          "Savour the Moment"
        </h1>
        <p className="text-base sm:text-lg md:text-2xl max-w-3xl">
          Experience the finest dining in town with our curated menu, warm
          hospitality, and elegant ambiance that celebrates South African
          culinary heritage.
        </p>
      </div>
    </section>
  );
};
export default Experience;
