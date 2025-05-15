import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import MenuTeaser from "./pages/MenuTeaser";
import Experience from "./pages/Experience";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Hero />
        <MenuTeaser />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
