"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { IoCartOutline } from "react-icons/io5";
import logo from "../assets/logo2.webp";
import { TiSocialFacebook, TiSocialInstagram } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { cart, setIsCartOpen } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Voorkom scrollen wanneer mobiel menu open is
  useEffect(() => {
    if (!menuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  // Scroll tracking voor actieve secties
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToHome = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const navLinks = [
    { id: "home", label: "Home", path: "/" },
    { id: "bestellen", label: "Bestellen", path: "/bestellen" },
    { id: "detoxen", label: "Detoxen", path: "/detoxen" },
    { id: "benefits", label: "Benefits", path: "/benefits" },
    { id: "faq", label: "FAQ", path: "/faq" },
    { id: "about", label: "Over ons", path: "/about" },
  ];

  return (
    // Veranderd naar sticky zodat de HeroSection eronder begint
    <nav
      className={`sticky top-0 left-0 right-0 z-[60] bg-neutral-50 transition-all duration-300 border-b-2 shadow-xs`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 xl:px-10 2xl:px-0 py-3 flex items-center justify-between lg:justify-start lg:gap-16">

        {/* 1. LINKERKANT: Hamburger knop (Mobile) 
            We zetten dit in een container met flex-1 op mobiel om ruimte in te nemen */}
        <div className="flex-1 lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[90] text-gray-700 focus:outline-none p-2 -ml-2"
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={menuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* 2. MIDDEN: Logo & Slogan 
            Op mobiel staat dit nu gecentreerd door de flex-1 containers aan beide kanten */}
        <div
          className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-105 shrink-0"
          onClick={goToHome}
        >
          <img src={logo} alt="Love Your Body Logo" className="h-9 w-auto" />
          <div className="flex flex-col items-center leading-tight">
            <span
              className="font-bold text-[8px] tracking-widest text-[#02888d]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              LOVE YOUR BODY
            </span>
            <span
              className="text-[9px] text-[#02888d]"
              style={{ fontFamily: "'Atma', cursive" }}
            >
              juices & smoothies
            </span>
          </div>
        </div>

        {/* 3. RECHTERKANT: Onzichtbare spacer op mobiel / Menu & Socials op desktop 
            De flex-1 zorgt ervoor dat het logo in het midden blijft staan op mobiel */}
        <div className="flex-1 lg:flex-none flex justify-end lg:ml-auto">
          {/* Desktop Menu (Verborgen op mobiel) */}
          <ul className="nav-text hidden lg:flex gap-8 items-center list-none mr-16">
            {navLinks.map(({ id, label, path }) => (
              <li key={id}>
                <Link
                  to={path}
                  onClick={() => id === "home" ? goToHome() : setMenuOpen(false)}
                  className={`text-md transition-all pb-1 border-b-2 ${location.pathname === path
                    ? "border-bioGreen text-bioGreen"
                    : "border-transparent text-gray-700 hover:text-bioGreen"
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-bioGreen transition-colors"
          >
            <IoCartOutline size={28} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* WhatsApp Icon (Zichtbaar op desktop) */}
          <div className="hidden lg:flex items-center">
            <a href="https://wa.me/5978531071" target="_blank" rel="noopener noreferrer" className="text-bioGreen hover:scale-110 transition-transform">
              <IoLogoWhatsapp className="w-6 h-6" />
            </a>
          </div>
        </div>

      </div>

      {/* Mobiel Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop om focus op menu te leggen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[70] lg:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              // GEBRUIK h-[100dvh] ipv h-screen en voeg overflow-hidden toe
              className="lg:hidden fixed z-[80] top-0 left-0 h-[100dvh] w-[75%] bg-neutral-50 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Wrap de links in een scrollbare div zodat ze de socials niet wegduwen op kleine schermen */}
              <div className="flex-1 overflow-y-auto">
                <ul className="flex flex-col px-8 gap-6 pt-24 pb-8">
                  {navLinks.map(({ id, label, path }) => (
                    <li key={id}>
                      <Link
                        to={path}
                        onClick={() => {
                          setMenuOpen(false);
                          if (id === "home") goToHome();
                        }}
                        className={`text-md nav-text block pb-2 border-b-2 transition-colors ${location.pathname === path ? "border-b-2 border-bioGreen text-bioGreen font-black" : "border-gray-300 text-gray-700"
                          }`}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Socials Footer - Nu altijd onderaan zichtbaar door h-[100dvh] en flex-col */}
              <div className="mt-auto p-8 border-t border-gray-100 flex gap-6 bg-neutral-50 pb-12">
                <a href="https://facebook.com/lybjuicesandsmoothies" target="_blank" rel="noopener noreferrer"><TiSocialFacebook className="w-7 h-7 text-gray-500 hover:text-bioGreen" /></a>
                <a href="https://instagram.com/lybjuicesandsmoothies" target="_blank" rel="noopener noreferrer"><TiSocialInstagram className="w-7 h-7 text-gray-500 hover:text-bioGreen" /></a>
                <a href="https://wa.me/5978531071" target="_blank" rel="noopener noreferrer"><IoLogoWhatsapp className="w-7 h-7 text-gray-500 hover:text-bioGreen" /></a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}