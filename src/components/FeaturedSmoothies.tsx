import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import { useState } from "react";
import { fadeInUp } from "../animations/Varianten";
import podosiri from "../assets/featuredSmoothies/acai.webp";
import chiaZuurzak from "../assets/featuredSmoothies/soursop.webp";
import cleanseHeal from "../assets/featuredSmoothies/greenReset.webp";
import fruitBg from "../assets/fluidButton.webp";
import SectionWrapper from "../animations/SectionWrapper";
import WipeButton from "./tools/Button";
import { IoCartOutline } from "react-icons/io5";

export default function FeaturedSmoothies() {
  const { addItem } = useCartStore(); // Haal addItem uit de store
  const [showToast, setShowToast] = useState(false); // State voor de melding

  const smoothies = [
    {
      id: 1,
      name: "Açaí Royale",
      alt: "Verse podosiri sap met bacove en kers - Love Your Body Suriname",
      tag: "podosiri - bacove - kers",
      description:
        "Ondersteunt het lichaam bij spierwerking en het vasthouden van een stabiel energieniveau.",
      tags: ["Weerstand", "Energie", "Spijsvertering"],
      image: podosiri,
      i: "350 ml",
      price: "SRD 115",
    },
    {
      id: 2,
      name: "Soursop Breeze",
      alt: "Verse zuurzak sap met chiazaadjes - Love Your Body Suriname",
      tag: "zuurzak - chiazaadjes",
      description:
        "Ondersteunt hydratatie en een verzadigd gevoel dankzij vezels en natuurlijke mineralen.",
      tags: ["Weerstand", "Antioxidant", "Energie"],
      image: chiaZuurzak,
      i: "350 ml",
      price: "SRD 115",
    },
    {
      id: 3,
      name: "Green Reset",
      alt: "Groene smoothie met zuurzak, sopropo en moringa - Love Your Body Suriname",
      tag: "sopropo - zuurzak - moringa",
      description:
        "Rijk aan antioxidanten en perfect voor een natuurlijke energieboost.",
      tags: ["Reiniging", "Weerstand", "Energie"],
      image: cleanseHeal,
      i: "350 ml",
      price: "SRD 115",
    },
  ];

  // Helper om prijs om te zetten naar getal
  const parsePrice = (priceString: string) => {
    const priceMatch = priceString.match(/SRD\s*(\d+)/);
    return priceMatch ? parseInt(priceMatch[1], 10) : 0;
  };

  const handleAddToCart = (pkg: any) => {
    addItem({
      // Gebruik pkg.id om te zorgen dat detox-1 en detox-3 verschillend zijn
      id: pkg.id,
      // Geef de volledige naam mee zodat je het onderscheid ziet in de lijst
      name: pkg.name,
      price: parsePrice(pkg.price),
      quantity: 1,
      img: pkg.image
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };


  return (
    <section id="menu" className="bg-bgColor max-w-screen-3xl mx-auto lg:px-8 xl:px-10 py-10 md:py-16 pb-8 sm:pb-10 md:pb-6 xl:pb-8 text-center">
      {/* Titel & SEO intro */}
      <SectionWrapper className="pb-4">
        <motion.h2 variants={fadeInUp} className="text-md mb-4 lg:pb-0 px-6 sm:px-8">
          Onze Signature Blends
        </motion.h2>
        <motion.p variants={fadeInUp} className="body-text px-6 sm:px-20 md:px-44 max-w-4xl mx-auto">
          Onze <span className="exceptionText font-semibold">meest gekozen</span> smoothies in Paramaribo. Vers, voedzaam en geliefd door onze klanten.
        </motion.p>
      </SectionWrapper>

      {/* Cards Grid: Verbeterde responsiviteit */}
      <div className="relative mx-auto max-w-screen-2xl grid grid-cols-1 lg:grid-cols-3 gap-y-6 gap-x-6 lg:gap-4 2xl:gap-6 lg:pt-6 xl:pt-0 px-6 sm:px-24 md:px-44 lg:px-8 xl:px-12 2xl:px-20">
        {smoothies.map((smoothie) => (
          <SectionWrapper
            key={smoothie.id}
            className="relative flex flex-col items-center"
          >
            {/* Header met Curve */}

            {/* Product Image */}
            <motion.img
              variants={fadeInUp}
              src={smoothie.image}
              loading="lazy"
              alt={smoothie.alt}
              className="w-full h-auto object-contain scale-110 rounded-t-xl"
            />

            {/* Content Card: Hoogte-optimalisatie voor grid-alignment */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col flex-1 w-full px-4 md:px-6 py-6 space-y-1 text-left shadow-sm border-x-2 border border-gray-100 rounded-b-xl bg-transparent"
            >
              <div className="flex-1 flex flex-col space-y-1">
                <p className="body-text italic capitalize">
                  <b>{smoothie.tag}</b>
                </p>
                <p className="body-text text-left leading-relaxed">
                  {smoothie.description}
                </p>
              </div>

              {/* Tags: Semantisch verbeterd */}
              <div className="flex flex-wrap justify-left gap-2 py-2">
                {smoothie.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-gray-500 text-[10px] tracking-widest uppercase font-semibold rounded-full bg-transparant border-1 border-darkYellow"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="w-full flex justify-between gap-4">
                <div className="flex flex-col">
                  <p className="body-text text-gray-300 tracking-tighter">
                    {smoothie.i}
                  </p>
                  <p className="flex items-center text-gray-700 text-nowrap font-black">
                    {smoothie.price}
                  </p>
                </div>
                <WipeButton
                  onClick={() => handleAddToCart(smoothie)}
                  style={{ backgroundImage: `url(${fruitBg})` }}
                  className="body w-full max-w-[240px] mx-auto bg-cover bg-center text-white"
                >
                  In mandje
                </WipeButton>
              </div>
            </motion.div>
          </SectionWrapper>
        ))}

         {/* DE TOAST NOTIFICATIE (Hetzelfde als op de OrderPage) */}
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            className="fixed top-24 right-4 z-[200] bg-white border-l-4 border-bioGreen shadow-2xl rounded-2xl p-4 flex items-center gap-3 min-w-[220px]"
                        >
                            <div className="bg-bioGreen/10 p-2 rounded-full">
                                <IoCartOutline className="text-bioGreen text-xl" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-800 uppercase tracking-tight">Gelukt!</p>
                                <p className="text-[10px] text-gray-500 font-medium">Toegevoegd aan mandje</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
      </div>
    </section>
  );
}