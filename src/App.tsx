import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import HomePage from "./page";
import Footer from "./components/Footer";
import About from "./pages/AboutUs";
import WhatsApp from "./components/WhatsApp";
import Benefits from "./pages/Benefits";
import FaqPage from "./pages/FaqPage";
import DetoxPage from "./pages/DetoxPage";
import NotFound from "./pages/NotFound";
import OrderPage from "./pages/OrderPage";
import CartSidebar from "./components/CartSidebar";

export default function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <Router>
        <ScrollToTop />
        <Navbar />
        <CartSidebar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bestellen" element={<OrderPage />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/detoxen" element={<DetoxPage />} />

            {/* DE 404 ROUTE (altijd als LAATSTE plaatsen) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <WhatsApp />
        <Footer />
      </Router>
    </HelmetProvider>
  );
}
