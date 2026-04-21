import logo from "../assets/logo2.webp";
import fbIcon from "../assets/contactSection/fbIcon.webp";
import iGIcon from "../assets/contactSection/igIcon.webp";
import wAIcon from "../assets/contactSection/wAIcon.webp";
import contactBg from "../assets/contactSection/contactSectionBg.webp"; // Import voor Vite optimalisatie
import { Link } from "react-router-dom";

export default function FooterSection() {
  return (
    <footer
      id="contact"
      className="relative bg-cover bg-bottom text-white overflow-hidden"
      style={{
        backgroundImage: `url(${contactBg})`,
      }}
    >
      {/* Overlay kleur - Ongewijzigd */}
      <div className="absolute inset-0 bg-black/80" aria-hidden="true"></div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-8 pt-10 md:pt-14 pb-6 ">
        <div className="flex flex-col gap-8 md:gap-10 text-center">
          
          {/* --- LOGO SECTIE --- */}
          <div className="flex mx-auto">
            <Link to="/" className="flex flex-col items-center gap-1 cursor-pointer group">
              <img 
                src={logo} 
                alt="Love Your Body Juices & Smoothies Logo" 
                className="h-12 w-auto transition-transform group-hover:scale-105" 
              />
              <div className="flex flex-col items-center leading-tight">
                <span
                  className="font-bold text-[10px] tracking-widest"
                  style={{
                    color: "#02888d",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  LOVE YOUR BODY
                </span>
                <span
                  className="text-[10px]"
                  style={{ color: "#02888d", fontFamily: "'Atma', cursive" }}
                >
                  juices & smoothies
                </span>
              </div>
            </Link>
          </div>

          <div className="flex flex-col mx-auto gap-8 w-full max-w-3xl">

            {/* QUICK LINKS: Gecentreerd met 4+2 logica op mobiel */}
            <nav aria-label="Footer navigatie">
              <ul className="flex flex-wrap justify-center items-center gap-y-4 text-gray-200 text-xs md:text-sm font-medium">
                {/* Door basis-1/4 te gebruiken op mobiel, passen er precies 4 op een rij. 
                   De overgebleven 2 worden door 'justify-center' netjes in het midden geplaatst.
                */}
                <li className="basis-1/4 sm:basis-auto sm:px-4">
                  <Link to="/" className="footer-text hover:text-darkYellow transition px-2">Home</Link>
                </li>
                <li className="basis-1/4 sm:basis-auto sm:px-4">
                  <Link to="/detoxen" className="footer-text hover:text-darkYellow transition px-2">Detoxen</Link>
                </li>
                <li className="basis-1/4 sm:basis-auto sm:px-4">
                  <Link to="/benefits" className="footer-text hover:text-darkYellow transition px-2">Benefits</Link>
                </li>
                <li className="basis-1/4 sm:basis-auto sm:px-4">
                  <Link to="/benefits#disclaimer" className="footer-text hover:text-darkYellow transition px-2">Disclaimer</Link>
                </li>
                <li className="basis-1/4 sm:basis-auto sm:px-4">
                  <Link to="/faq" className="footer-text hover:text-darkYellow transition px-2">FAQ</Link>
                </li>
                <li className="basis-1/4 sm:basis-auto sm:px-4">
                  <Link to="/about" className="footer-text hover:text-darkYellow transition px-2">Over ons</Link>
                </li>
              </ul>
            </nav>

            {/* SOCIALS */}
            <div className="flex flex-row justify-center items-center gap-6">
              <a
                href="https://www.facebook.com/lybjuicesandsmoothies/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Volg Love Your Body op Facebook"
              >
                <img
                  src={fbIcon}
                  alt=""
                  className="w-7 h-7 hover:scale-110 transition-transform opacity-90 hover:opacity-100"
                />
              </a>
              <a
                href="https://www.instagram.com/lybjuicesandsmoothies/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Volg Love Your Body op Instagram"
              >
                <img
                  src={iGIcon}
                  alt=""
                  className="w-7 h-7 hover:scale-110 transition-transform opacity-90 hover:opacity-100"
                />
              </a>
              <a
                href="https://wa.me/5978531071"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contacteer ons via WhatsApp"
              >
                <img
                  src={wAIcon}
                  alt=""
                  className="w-7 h-7 hover:scale-110 transition-transform opacity-90 hover:opacity-100"
                />
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT SECTIE */}
        <div className="border-t border-white/20 pt-6 text-center text-[13px] md:text-sm text-gray-400 mt-10">
          <p>
            © {new Date().getFullYear()} LYB. Website door{" "}
            <a
              href="https://www.instagram.com/sarbandigital.social/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition"
            >
              Sarban Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}