import { Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Hero from "./pages/Hero.jsx";
import MenuTeaser from "./pages/MenuTeaser.jsx";
import Experience from "./pages/Experience.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import Menu from "./pages/Menu.jsx";
import CategoryPage from "./components/CategoryPage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <MenuTeaser />
              <Experience />
              <Contact />
            </>
          }
        />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/menu/category/:categoryId" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
