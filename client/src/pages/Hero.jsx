import BookingForm from "./BookingForm";

const Hero = () => {
  return (
    <section className="h-screen relative overflow-hidden" id="home">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-6   text-center">
        <h1 className="text-4xl md:text-6xl pt-15   mb-4 font-playfair">
          "Savour the moment"
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-xl">
          Experience the finest dining in town with our curated menu and elegant
          ambiance.
        </p>

        <div>
          <BookingForm />
        </div>
      </div>
    </section>
  );
};
export default Hero;
