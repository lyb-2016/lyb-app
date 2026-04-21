import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/Varianten";
import { BiSolidLeaf } from "react-icons/bi";
import smear from "../assets/lybMenu/smear.webp";
import fruitrow from "../assets/benefits/papaja.webp";
import SectionWrapper from "../animations/SectionWrapper";

export default function Benefits() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // We houden rekening met de sticky navbar hoogte
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  }, [hash]);

  const benefitItems = [
    {
      title: "Elektrolyten – Hydratatie & herstel",
      content: "Elektrolyten helpen je lichaam vocht vast te houden, spieren te laten werken en vermoeidheid te verminderen. Ze zijn essentieel bij warmte, beweging en lange dagen.",
      ingredients: [
        "Ananas, lemmetje, komkommer → rijk aan water en mineralen",
        "Zuurzak, bacove → natuurlijke kaliumbron",
        "Chia → houdt vocht vast en geeft langdurige hydratatie"
      ],
      effect: "Fruit + chia + citrus = snelle én langdurige hydratatie"
    },
    {
      title: "Antioxidanten – Bescherming & herstel",
      content: "Antioxidanten beschermen je cellen tegen stress (zoals vermoeidheid, drukte, slechte voeding) en ondersteunen herstel van binnenuit.",
      ingredients: [
        "Podosiri, kers, framboos, aardbei, mango",
        "Hibiscus, kaneel, kruidnagel",
        "Zuurzak, markoesa"
      ],
      effect: "Donker fruit + kruiden = bredere bescherming (synergie)"
    },
    {
      title: "Herstel – Spieren & lichaam",
      content: "Herstel gaat over ontspanning, doorbloeding en het verminderen van spanning in je lichaam na inspanning.",
      ingredients: [
        "Gember, kurkuma, cayennepeper",
        "Zwarte peper (activeert kurkuma)",
        "Ananas (enzymen)",
        "Avocado (gezonde vetten voor opname)"
      ],
      effect: "Kurkuma + zwarte peper + vet (avocado) = veel betere opname"
    },
    {
      title: "Spijsvertering – Rust in je buik",
      content: "Een goede spijsvertering zorgt voor meer energie, betere opname van voedingsstoffen en minder opgeblazen gevoel.",
      ingredients: [
        "Papaja (enzymen), ananas",
        "Bitter melon (sopropo)",
        "Appelazijn",
        "Citroengras, basilicum, komkommer"
      ],
      effect: "Enzymen + bitter + fris = activerend maar zacht voor de maag"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Gezondheidsvoordelen & Ingrediënten | De Kracht van Natuur | LYB</title>
        <meta name="description" content="Wat maakt onze sappen zo krachtig? Leer over de voordelen van gember, moringa, kurkuma en andere Surinaamse superfoods." />
        <link rel="canonical" href="https://drinklyb.com/benefits" />

        {/* Social Media Preview */}
        <meta property="og:title" content="De Kracht van onze Ingrediënten | LYB Benefits" />
        <meta property="og:description" content="Van een betere weerstand tot meer energie: ontdek wat onze ingrediënten voor jou doen." />
        <meta property="og:image" content="https://drinklyb.com/benefits-preview.jpg" />
        <meta property="og:url" content="https://drinklyb.com/benefits" />
        <meta property="og:type" content="article" />
      </Helmet>
      <main className="relative w-full bg-neutral-50 overflow-x-hidden">

        {/* 1. HERO IMAGE: Consistent met About pagina */}
        <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px] overflow-hidden">
          <img
            src={fruitrow}
            fetchPriority="high"
            alt="Verse papaja in de boom - De basis van onze natuurlijke ingrediënten"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* 2. CONTENT SECTIE */}
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <SectionWrapper>
            <motion.h1
              variants={fadeInUp}
              className="text-center text-3xl md:text-4xl font-bold pb-4 border-b-2 border-gray-200"
            >
              Health Benefits
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="body-text text-center max-w-2xl mx-auto mt-6"
            >
              Ontdek hoe onze zorgvuldig gekozen ingrediënten bijdragen aan jouw vitaliteit en welzijn.
            </motion.p>
          </SectionWrapper>

          {/* Benefits Grid/List */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {benefitItems.map((benefit, index) => (
              <SectionWrapper key={index} className="flex flex-col">
                <div className="relative mb-6">
                  <motion.h2
                    variants={fadeInUp}
                    className="text-xl md:text-2xl font-bold text-gray-500 relative z-10"
                  >
                    {benefit.title}
                  </motion.h2>
                  <motion.img
                    variants={fadeInUp}
                    src={smear}
                    alt=""
                    className="absolute -bottom-4 left-0 w-full h-auto opacity-60 z-0 pointer-events-none"
                  />
                </div>

                <div className="space-y-6 mt-4">
                  <motion.p variants={fadeInUp} className="body-text italic text-gray-700">
                    {benefit.content}
                  </motion.p>

                  <div>
                    <motion.p variants={fadeInUp} className="body-text font-bold text-bioGreen mb-3 uppercase tracking-wider text-xs">
                      Key Ingrediënten
                    </motion.p>
                    <ul className="space-y-2">
                      {benefit.ingredients.map((ing, i) => (
                        <motion.li key={i} variants={fadeInUp} className="flex items-start gap-3">
                          <BiSolidLeaf className="text-bioGreen text-xl shrink-0 mt-1" />
                          <span className="body-text text-sm md:text-base">{ing}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.div
                    variants={fadeInUp}
                    className="p-4 bg-white rounded-xl border-l-4 border-bioGreen shadow-sm"
                  >
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Combinatie-effect</p>
                    <p className="body-text font-medium text-gray-800">{benefit.effect}</p>
                  </motion.div>
                </div>
              </SectionWrapper>
            ))}
          </div>

          {/* 3. DISCLAIMER SECTIE */}
          <div id="disclaimer" className="mt-20 scroll-mt-32">
            <SectionWrapper>
              <motion.div
                variants={fadeInUp}
                className="bg-darkYellow/10 border-2 border-darkYellow/20 rounded-2xl p-6 md:p-10"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>⚠️</span> Disclaimer
                </h3>
                <p className="body-text leading-relaxed">
                  Bij LYB geloven we in de kracht van pure ingrediënten en krachtige combinaties. Veel van onze klanten ervaren positieve effecten, maar ieder lichaam is anders. De manier waarop smoothies worden ervaren kan per persoon verschillen. Onze producten zijn bedoeld als ondersteuning van een gezonde levensstijl en vervangen geen medisch advies.
                </p>
              </motion.div>
            </SectionWrapper>
          </div>
        </div>
      </main>
    </>
  );
}