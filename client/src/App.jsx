import { Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import MenuTeaser from "./pages/MenuTeaser";
import Experience from "./pages/Experience";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import CategoryPage from "./components/CategoryPage";

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
        <Route path="/menu/category/:name" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
