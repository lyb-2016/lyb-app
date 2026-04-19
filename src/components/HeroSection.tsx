import { motion } from "framer-motion";
import { fadeInUp } from "../animations/Varianten";
import hero from "../assets/heroSection/heroW.webp";
// import fruitBg from "../assets/fluidButton.webp";
import { BiSolidLeaf } from "react-icons/bi";
import SectionWrapper from "../animations/SectionWrapper";
// import WipeButton from "./tools/Button";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full bg-bgColor overflow-hidden flex flex-col"
    >
      {/* 1. AFBEELDING: Bovenkant van de sectie */}
      <div className="relative w-full flex items-center h-[36vh] sm:h-[46vh] md:h-[60vh] lg:h-[74vh] xl:h-[70vh] 2xl:min-h-screen overflow-hidden">
        <img
          src={hero}
          alt="Verse sap en smoothies"
          fetchPriority="high"
          className="w-full h-full object-cover scale-100 " 
          // object-bottom zorgt dat het fruit onderaan de foto altijd zichtbaar is
        />
      </div>

      {/* 2. CONTENT: Onder de afbeelding */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-12 py-14">
        <div className="flex flex-col items-center">
          
          <SectionWrapper
            className="
              w-full
              lg:w-[76%]
              flex
              flex-col
              items-center
              text-center"
          >
            <motion.h1 variants={fadeInUp}>
              <span className="text-bioGreen">100% Natuurlijke</span> Juices & Smoothies in Suriname
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-screen-lg body-text mt-4"
            >
              De verste juices van Paramaribo, bij jou thuis geleverd.
              Dagelijks vers bereid met fruit, kruiden en superfoods.
              Vrij van kunstmatige stoffen. Pure energie voor
              <span className="exceptionText font-semibold"> jouw dag.</span>
            </motion.p>

            <motion.ul
              variants={fadeInUp}
              className="flex gap-4 mt-2"
            >
              <li className="flex items-center gap-1">
                <BiSolidLeaf className="text-bioGreen text-xl" />
                <span className="body-text">Detoxen</span>
              </li>

              <li className="flex items-center gap-1">
                <BiSolidLeaf className="text-bioGreen text-xl" />
                <span className="body-text">Weightloss</span>
              </li>

              <li className="flex items-center gap-1">
                <BiSolidLeaf className="text-bioGreen text-xl" />
                <span className="body-text">Balans</span>
              </li>
            </motion.ul>

            {/* <motion.div variants={fadeInUp} className="mt-6">
              <WipeButton
                to="/menu"
                style={{ backgroundImage: `url(${fruitBg})` }}
                className="w-full sm:w-60 text-white bg-cover bg-center"
              >
                Bekijk ons menu
              </WipeButton>
            </motion.div> */}

          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}