import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fadeInUp } from "../animations/Varianten";
import SectionWrapper from "../animations/SectionWrapper";
import detoxHero from "../assets/detox/detoxen.webp";
import fruitBg from "../assets/fluidButton.webp";
import WipeButton from "../components/tools/Button";
import { BiCheckCircle, BiTimeFive, BiWater, BiCoffeeTogo } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { getFullMenu } from "../api/products";
import ProductSkeleton from "../components/ProductSkeleton";

export default function DetoxPage() {
    const { addItem } = useCartStore(); // Haal addItem uit de store
    const [showToast, setShowToast] = useState(false); // State voor de melding

    const benefits = [
        "Gewichtsverlies & Minder opgeblazen gevoel",
        "Meer energie & Betere focus",
        "Stralende huid & Sterke nagels",
        "Betere weerstand & Nachtrust",
        "Gezonde cholesterol & Bloeddruk",
        "Reiniging van maag, lever en darmen"
    ];

    const { data: menuData, isLoading, isError } = useQuery({
        queryKey: ['menu'],
        queryFn: getFullMenu,
        staleTime: 1000 * 60 * 5, // Data blijft 5 minuten "vers" in de cache
    });

    const triggerToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500); // Verdwijnt na 2.5 sec
    };

    useEffect(() => {
            if (!isLoading && menuData && window.location.hash) {
                const id = window.location.hash.substring(1);
                const element = document.getElementById(id);
                if (element) {
                    // Kleine timeout om browser rendering tijd te geven
                    const timer = setTimeout(() => {
                        const yOffset = -100;
                        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }, 150);
                    return () => clearTimeout(timer);
                }
            }
        }, [isLoading, menuData]);
    
        // 3. LOADING STATE: Gebruik de Skeletons
        if (isLoading) {
            return (
                <main className="bg-neutral-50 min-h-screen">
                    <section className="relative w-full h-[300px] md:h-[400px] bg-gray-200 animate-pulse" />
                    <div className="max-w-screen-xl mx-auto px-6 py-12">
                        <div className="h-8 bg-gray-200 rounded-full w-48 mb-8 animate-pulse" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
                        </div>
                    </div>
                </main>
            );
        }
    
        // 4. ERROR STATE: Gebruikersvriendelijke melding
        if (isError || !menuData) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Menu niet bereikbaar</h2>
                    <p className="text-gray-500 mb-6 max-w-sm">
                        Het lijkt erop dat we onze sapjes-database even niet kunnen bereiken.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-bioGreen text-white px-8 py-3 rounded-full font-bold shadow-lg"
                    >
                        Probeer het opnieuw
                    </button>
                </div>
            );
        }

    const handleAddToCart = (pkg: any) => {
        addItem({
            // Gebruik pkg.id om te zorgen dat detox-1 en detox-3 verschillend zijn
            id: pkg.id,
            // Geef de volledige naam mee zodat je het onderscheid ziet in de lijst
            name: `${pkg.name} Detox Kuur (${pkg.options?.[0]?.label})`,
            price: pkg.options?.[0]?.price,
            quantity: 1,
            img: detoxHero
        });
triggerToast()
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    return (
        <>
            <Helmet>
                <title>Detox Sappenkuur Paramaribo | 1, 3, 5 of 7 Dagen | LYB</title>
                <meta name="description" content="Reset je lichaam met de natuurlijke detox kuren van LYB in Suriname. Vers bereid en vol vitaminen." />
                <link rel="canonical" href="https://drinklyb.com/detoxen" />
                {/* Social Media Previews voor Detox */}
                <meta property="og:title" content="Start jouw Detox bij LYB Suriname" />
                <meta property="og:description" content="Kies voor een 1, 3, 5 of 7-daagse sapkuur en voel je herboren." />
                <meta property="og:image" content="https://drinklyb.com/detox-preview.jpg" /> {/* Een specifieke detox foto in je public map */}
                <meta property="og:url" content="https://drinklyb.com/detoxen" />
                <meta property="og:type" content="article" />
            </Helmet>

            <main className="relative w-full bg-neutral-50 overflow-x-hidden">
                {/* 1. HERO SECTION */}
                <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px] overflow-hidden">
                    <img
                        src={detoxHero}
                        alt="LYB Detox kuur Paramaribo"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 md:py-20">
                    <SectionWrapper>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-center text-3xl md:text-4xl font-bold mb-6 pb-4 border-b-2 border-gray-200"
                        >
                            Detoxen
                        </motion.h1>
                    </SectionWrapper>

                    {/* 2. INTRO: WAT & WAAROM */}
                    <SectionWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
                        <div>
                            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-bioGreen mb-6">
                                Wat is een Detox?
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="body-text mb-6">
                                Detox is een lichamelijk reinigingsproces waarbij uitsluitend <strong>alkalische (rauwe), vloeibare voeding</strong> wordt gebruikt. Hierdoor wordt de zuurgraad in je lichaam weer in balans gebracht, zodat de ideale pH-waarde kan worden gerealiseerd.
                            </motion.p>
                            <motion.blockquote variants={fadeInUp} className="border-l-4 border-darkYellow pl-4 italic text-gray-600">
                                "Wees lief voor je lichaam, het is de enige plek waar je altijd in woont."
                            </motion.blockquote>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-4">Waarom detoxen?</motion.h2>
                            <motion.p variants={fadeInUp} className="body-text text-sm">
                                Onze dagelijkse voeding bestaat vaak uit gekookt en bewerkt voedsel, waarbij veel nutriënten verloren gaan. Je lichaam raakt hierdoor "verzuurd", wat kan leiden tot vermoeidheid, slapeloosheid en een gebrek aan energie. Een sapvastenkuur geeft je systeem de rust die het verdient.
                            </motion.p>
                        </div>
                    </SectionWrapper>

                    {/* 3. VOORDELEN GRID */}
                    <SectionWrapper className="mb-20 text-center">
                        <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-10">De voordelen na een detox</motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {benefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="flex items-center gap-3 bg-bioGreen/5 p-4 rounded-xl border border-bioGreen/10"
                                >
                                    <BiCheckCircle className="text-bioGreen text-2xl shrink-0" />
                                    <span className="body-text text-sm font-medium">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </SectionWrapper>

                    {/* 4. PACKAGES SECTION */}
                    <div id="pakketten">
                        <SectionWrapper className="mb-20">
                            <div className="text-center mb-12">
                                <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">Kies jouw Sappenkuur</motion.h2>
                                <motion.p variants={fadeInUp} className="body-text">Elke set bevat een mix van vitamine water (1), greens (3) en fruits (4).</motion.p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                {menuData.sappenkuur.map((pkg: any, i: any) => (
                                    <motion.div
                                        key={i}
                                        variants={fadeInUp}
                                        className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-bioGreen flex flex-col items-center text-center"
                                    >
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{pkg.category}</span>
                                        <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                                        <p className="text-sm text-gray-600 mb-6 flex-1">{pkg.description}</p>
                                        <div className="text-xl font-black text-bioGreen mb-6">SRD {pkg.options?.[0]?.price}</div>
                                        <WipeButton
                                            onClick={() => handleAddToCart(pkg)}
                                            style={{ backgroundImage: `url(${fruitBg})` }}
                                            className="w-full text-white text-xs py-3 border-none cursor-pointer"
                                        >
                                            Voeg toe aan mandje
                                        </WipeButton>
                                    </motion.div>
                                ))}
                            </div>
                        </SectionWrapper>
                    </div>

                    {/* 5. DOS & DONTS + SCHEDULE */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <SectionWrapper className="bg-darkYellow/10 p-8 rounded-3xl shadow-md">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <BiWater className="text-2xl text-bioGreen" /> Do's & Dont's
                            </h3>
                            <ul className="space-y-4 text-sm body-text">
                                <li className="flex gap-2"><strong>7:00 AM:</strong> Begin fris met je Vitamine Water.</li>
                                <li className="flex gap-2"><strong>Interval:</strong> Drink daarna elke 2 uur een fles. De volgorde staat op de fles.</li>
                                <li className="flex gap-2"><strong>Cravings:</strong> Honger? Neem wat komkommer of een klein stukje fruit.</li>
                                <li className="flex gap-2"><strong>Dag&nbsp;3:</strong> Vanaf de derde dag mag het programma worden aangevuld met een gekookt eitje.</li>
                                <li className="flex gap-2 items-center text-red-600 font-semibold italic">
                                    <BiCoffeeTogo className="text-xl" /> Zeg even bye-bye tegen koffie!
                                </li>
                            </ul>
                        </SectionWrapper>

                        <SectionWrapper className="bg-neutral-100 p-8 rounded-3xl flex flex-col justify-center shadow-md">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <BiTimeFive className="text-2xl text-bioGreen" /> Drinktijden
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {["07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"].map(time => (
                                    <span key={time} className="bg-white px-4 py-2 rounded-lg font-bold shadow-sm text-bioGreen">
                                        {time}
                                    </span>
                                ))}
                            </div>
                            <p className="mt-6 text-xs italic text-gray-500">
                                Tip: Zet een reminder in je telefoon voor elke drinkbeurt!
                            </p>

                            <div className="mt-4 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-left">
                                    <h4 className="body-text font-bold">Download de Detox Gids</h4>
                                    {/* <p className="text-sm body-text">Alles wat je moet weten over je kuur, handig bij de hand op je telefoon.</p> */}
                                </div>

                                {/* We gebruiken een gewone 'a' tag met de 'download' property */}
                                <a
                                    href="/detox-instructies-lyb.pdf"
                                    download="LYB_Detox_Instructies.pdf"
                                    className="inline-flex items-center px-6 py-3 bg-darkYellow text-white rounded-full font-bold text-xs tracking-widest hover:bg-bioGreen transition-colors duration-300"
                                >
                                    Download PDF (GRATIS)
                                </a>
                            </div>
                        </SectionWrapper>
                    </div>

                    <SectionWrapper className="mt-20 py-12 lg:text-center border-t border-gray-200">
                        <h3 className="text-xl font-bold mb-4 italic text-darkYellow">Houd je gezonde ritme vast</h3>
                        <p className="body-text mb-8 max-w-2xl mx-auto">
                            Na een detox is het belangrijk om je lichaam te blijven voeden met natuurlijke bouwstoffen. Bekijk het actuele aanbod voor jouw favoriete smoothies en juices.
                        </p>
                        <motion.div variants={fadeInUp} className="w-full">
                            <WipeButton
                                to="/bestellen"
                                style={{ backgroundImage: `url(${fruitBg})` }}
                                className="body w-full max-w-[240px] mx-auto bg-cover bg-center text-white"
                            >
                                Bekijk actuele aanbod
                            </WipeButton>
                        </motion.div>
                    </SectionWrapper>
                </div>

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
                                <p className="text-[10px] text-gray-500 font-medium">Kuur toegevoegd aan mandje</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </>
    );
}