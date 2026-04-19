import { Link } from "react-router-dom";
import fruitBg from "../assets/fluidButton.webp";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInUp } from "../animations/Varianten";
import juices from "../assets/aanbod/juicesN.webp";
import smoothies from "../assets/aanbod/smoothiesN.webp";
import shots from "../assets/aanbod/shotsN.webp";
import vitawater from "../assets/aanbod/vitawaterN.webp";
import cleanse from "../assets/aanbod/cleanse&healN.webp";
import sappenkuur from "../assets/aanbod/sappenkuurN.webp";
import SectionWrapper from "../animations/SectionWrapper";
import { HiArrowUpRight } from "react-icons/hi2";
import WipeButton from "./tools/Button";

type Category = {
    title: string;
    id: string;
    img: string;
    alt: string;
};

export default function Aanbod() {
    const categories: Category[] = [
        { title: "Juices", id: "juices", img: juices, alt: "Verse koudgeperste juices in Suriname" },
        { title: "Smoothies", id: "smoothies", img: smoothies, alt: "Gezonde fruit smoothies Paramaribo" },
        { title: "Wellness shots", id: "shots", img: shots, alt: "Gember en kurkuma wellness shots voor weerstand" },
        { title: "Vitamine water", id: "vitawater", img: vitawater, alt: "Verfrissend vitamine water met fruit" },
        { title: "Cleanse & heal", id: "cleanse", img: cleanse, alt: "Detox sappen voor reiniging" },
        { title: "Detoxen", id: "detoxen", img: sappenkuur, alt: "Complete sappenkuur voor gewichtsverlies" },
    ];

    return (
        <section
            id="aanbod"
            className="relative z-20 max-w-screen-3xl bg-stone-50 from-orange-100 via-orange-100 to-white mx-auto pb-12 py-6 md:py-16 px-6 sm:px-20 md:px-12 text-center overflow-hidden"
        >
            {/* Wave Top - Decoratief */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
                <svg
                    viewBox="0 0 1440 120"
                    className="relative block w-full h-[60px] md:h-[90px]"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,64L80,74.7C160,85,320,107,480,101.3C640,96,800,64,960,58.7C1120,53,1280,75,1360,85.3L1440,96L1440,0L0,0Z"
                        className="fill-bgColor"
                    />
                </svg>
            </div>

            {/* Titel Sectie */}
            <SectionWrapper className="mb-12 text-left">
                <motion.h2
                    variants={fadeInUp}
                    className="max-w-screen-lg mx-auto text-md mb-4 lg:pb-6 pt-20 sm:pt-28 md:pt-16 xl:pt-24 font-bold"
                >
                    Ontdek ons <span className="text-bioGreen">gezonde</span> aanbod
                </motion.h2>
                <motion.p
                    variants={fadeInUp}
                    className="max-w-screen-lg mx-auto body-text font-bold text-xl"
                >
                    Alles voor een Gezonde Boost!
                </motion.p>
                <motion.p
                    variants={fadeInUp}
                    className="body-text max-w-screen-lg mx-auto pt-4"
                >
                    Ontdek onze gezonde smoothies, verse juices, wellness shots en
                    detox kuur; <span className="exceptionText font-semibold">vers bereid</span>{" "}
                    met natuurlijke ingrediënten voor energie, weerstand en balans.
                </motion.p>
            </SectionWrapper>

            {/* Categorieën Grid */}
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 xl:px-10 2xl:px-16">
                {categories.map((c) => (
                    <SectionWrapper key={c.id}>
                        <div className="group">
                            <motion.h3 variants={fadeInLeft} className="categoryText italic mb-2">
                                {c.title}
                            </motion.h3>

                            <motion.div initial="rest" animate="rest" whileHover="hover" className="relative">
                                <Link
                                    to={`/menu#${c.id}`}
                                    className="block relative rounded-xl overflow-hidden shadow-md"
                                    aria-label={`Bekijk ons aanbod ${c.title}`}
                                >
                                    {/* Wipe overlay */}
                                    <motion.span
                                        variants={{
                                            rest: { scaleX: 0, transformOrigin: "0% 50%" },
                                            hover: { scaleX: 1, transformOrigin: "0% 50%" },
                                        }}
                                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                                        className="absolute inset-0 z-[60] bg-black/55 pointer-events-none"
                                    />

                                    {/* Arrow icon */}
                                    <div className="absolute top-4 right-4 z-[90] flex items-center justify-center w-[60px] h-[40px] bg-white/10 border border-white/30 rounded-3xl backdrop-blur-sm">
                                        <motion.span
                                            variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                            className="inline-flex"
                                        >
                                            <HiArrowUpRight className="text-white text-2xl" />
                                        </motion.span>
                                    </div>

                                    <motion.img
                                        variants={fadeInLeft}
                                        src={c.img}
                                        alt={c.alt}
                                        loading="lazy"
                                        className="relative mx-auto w-full h-auto aspect-[3/2] object-cover pointer-events-none select-none rounded-xl"
                                    />
                                </Link>
                            </motion.div>
                        </div>
                    </SectionWrapper>
                ))}
            </div>

            {/* NIEUWE DUO-CTA SECTIE */}
            <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

                {/* Kaart 1: Het Menu */}
                <SectionWrapper className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between text-center lg:text-left">
                    <div>
                        <motion.h3 variants={fadeInUp} className="text-xl font-bold mb-3 italic">Volledig aanbod bekijken?</motion.h3>
                        <motion.p variants={fadeInUp} className="body-text text-sm mb-6">
                            Bekijk onze uitgebreide aanbod met smoothies, juices en wellness drinks. <span className="font-semibold text-bioGreen italic">Altijd vers geblend</span> voor jouw dagelijkse vitamineboost.
                        </motion.p>
                    </div>
                    <motion.div variants={fadeInUp}>
                        <WipeButton
                            to="/bestellen"
                            style={{ backgroundImage: `url(${fruitBg})` }}
                            className="w-full text-white shadow-sm"
                        >
                            Bekijk het LYB Aanbod
                        </WipeButton>
                    </motion.div>
                </SectionWrapper>

                {/* Kaart 2: De Detox (Nieuw!) */}
                <SectionWrapper className="max-w-screen-lg bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between text-center lg:text-left">
                    <div>
                        <motion.h3 variants={fadeInUp} className="text-xl font-bold mb-3 italic">Tijd voor een reset?</motion.h3>
                        <motion.p variants={fadeInUp} className="body-text text-sm mb-6 text-gray-700">
                            Geef je lichaam een frisse start met onze 1, 3, 5 of 7-daagse <span className="font-bold text-darkYellow italic">detox kuren</span>. Speciaal samengesteld voor maximale reiniging en energie.
                        </motion.p>
                    </div>
                    <motion.div variants={fadeInUp}>
                        <WipeButton
                            to="/detoxen"
                            overlayClassName="bg-bioGreen"
                            className="w-full bg-darkYellow text-white shadow-sm"
                        >
                            Ontdek Detox Kuren
                        </WipeButton>
                    </motion.div>
                </SectionWrapper>

            </div>
        </section>
    );
}