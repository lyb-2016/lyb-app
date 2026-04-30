import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useCartStore } from "../store/useCartStore";
import { getFullMenu } from "../api/products";
import ProductSkeleton from "../components/ProductSkeleton";
import { IoCartOutline, IoChevronDownOutline, IoSparklesOutline } from "react-icons/io5";
import banner from "../assets/bestelling/bestelling.webp";

function ProductAddToCart({ item, addItem, triggerToast }: any) {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // In de nieuwe data zitten options direct in het item: [{ label: "350 ml", price: 100 }, ...]
    const currentOption = item.options?.[selectedIdx];

    // Als een item geen opties heeft (veiligheid), renderen we niets of een simpele error
    if (!currentOption) return null;

    const handleAdd = () => {
        addItem({
            id: `${item.id}-${selectedIdx}`,
            name: `${item.name} (${currentOption.label})`,
            price: currentOption.price,
            quantity: 1,
            img: item.img
        });
        triggerToast();
    };

    return (
        <div className="flex flex-col w-full h-full">
            {/* 1. DYNAMISCHE PRIJS (Gebruikt nu direct het getal uit de data) */}
            <div className="mb-3">
                <p className="text-sm font-black tracking-tight text-gray-900">
                    SRD {currentOption.price}
                </p>
            </div>

            {/* 2. DROPDOWN & ADD BUTTON */}
            <div className="flex flex-col items-center gap-2 relative">
                {/* Alleen dropdown tonen als er meer dan 1 optie is */}
                {item.options.length > 1 ? (
                    <div className="relative w-full flex-1">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full bg-neutral-100 py-3 px-4 rounded-xl text-[11px] font-black text-gray-700 flex justify-between items-center uppercase tracking-wider hover:bg-neutral-200 transition-colors border border-transparent"
                        >
                            {currentOption.label}
                            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                                <IoChevronDownOutline size={16} />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <>
                                    <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 5 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute left-0 right-0 top-full bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-[70] py-1"
                                    >
                                        {item.options.map((opt: any, i: number) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setSelectedIdx(i);
                                                    setIsOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors
                                                    ${selectedIdx === i ? 'bg-bioGreen text-white' : 'text-gray-600 hover:bg-bioGreen/10'}
                                                `}
                                            >
                                                {opt.label} — SRD {opt.price}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    /* Als er maar 1 optie is (zoals bij de Shots), toon dan alleen het label als info */
                    <div className="w-full bg-neutral-50 py-3 px-4 rounded-xl text-[11px] font-bold text-gray-400 uppercase text-center border border-dashed">
                        {currentOption.label}
                    </div>
                )}

                <button
                    onClick={handleAdd}
                    className="bg-bioGreen w-full text-white text-sm h-12 rounded-full flex items-center justify-center hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                    In mandje
                </button>
            </div>
        </div>
    );
}

export default function OrderPage() {
    const { addItem } = useCartStore();
    const [showToast, setShowToast] = useState(false);

    const { data: menuData, isLoading, isError } = useQuery({
        queryKey: ['menu'],
        queryFn: getFullMenu,
        staleTime: 1000 * 60 * 5, // Data blijft 5 minuten "vers" in de cache
    });

    const triggerToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500); // Verdwijnt na 2.5 sec
    };

    // 2. Scroll-to-hash logica: Wordt getriggerd zodra menuData beschikbaar is
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

    // De Weekly Special als een vast object
    const weeklySpecial = {
        id: menuData.weeklyDeal.id,
        name: menuData.weeklyDeal.name,
        price: menuData.weeklyDeal.options?.[0]?.price, // Vaste prijs
        description: menuData.weeklyDeal.description,
        img: menuData.weeklyDeal.img
    };

    return (
        <>
            <Helmet>
                <title>Verse Juices & Smoothies Bestellen | Paramaribo | LYB</title>
                <meta name="description" content="Bestel je favoriete verse sappen en smoothies online bij LYB. Levering in overleg in Paramaribo. Kies uit juices, smoothies, shots en meer!" />
                <link rel="canonical" href="https://drinklyb.com/bestellen" />

                {/* WhatsApp / Social Media Preview */}
                <meta property="og:title" content="Bestel Direct je Verse Sappen bij LYB" />
                <meta property="og:description" content="Kies je favoriete smaken en laat ze bezorgen. Gezondheid was nog nooit zo makkelijk." />
                <meta property="og:image" content="https://drinklyb.com/order-preview.jpg" />
                <meta property="og:url" content="https://drinklyb.com/bestellen" />
                <meta property="og:type" content="website" />
            </Helmet>

            <main className="bg-neutral-50 min-h-screen">

                {/* 1. WEEKLY SPECIAL BANNER */}
                <section className="relative w-full h-[300px] md:h-[400px] bg-bioGreen overflow-hidden flex items-center">
                    <img src={banner} alt="Special" className="absolute inset-0 w-full h-full object-cover object-bottom" />
                </section>

                <div className="max-w-screen-xl mx-auto px-6 py-12">
                    {/* 1. KRASKAART ACTIE BANNER (Top Reclame) */}
                    <div className="pt-6 max-w-screen-xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative w-full bg-gradient-to-r from-yellow-400 to-orange-500 py-8 overflow-hidden flex flex-col md:flex-row items-center justify-center"
                        >
                            {/* Decoratieve Sparkles op achtergrond */}
                            <IoSparklesOutline className="absolute left-4 top-4 text-white/20 text-6xl rotate-12" />
                            <IoSparklesOutline className="absolute right-10 bottom-2 text-white/10 text-9xl -rotate-12" />

                            <div className="relative z-10 text-center md:text-left">
                                <span className="bg-white/20 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest border border-white/30">
                                    Tijdelijke Actie Alleen Op de Website
                                </span>
                                <h2 className="text-white text-3xl md:text-4xl font-black px-4 mt-3 drop-shadow-md normal">
                                    Ontvang een Gratis Kraskaart! 🎁
                                </h2>
                                <p className="text-white/90 font-bold px-4 mt-2 text-sm md:text-base">
                                    Bij elke bestelling boven de <span className="text-white underline underline-offset-4">SRD 500</span>. Wat ga jij winnen?
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* 2. WEEKLY SPECIAL (Zonder Dropdown) */}
                    <section className="mt-16 mb-20">
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Weekly Special</h2>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-white p-6 rounded-xl shadow-sm border-2 border-orange-200 flex flex-col md:flex-row md:gap-10 relative"
                        >
                            <div className="flex flex-col md:flex-row gap-4">

                                <div className="absolute top-4 left-4 bg-orange-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase z-10">As Seen On Social Media</div>

                                {/* Afbeelding */}
                                <div className="w-full md:w-[300px] lg:w-[250px] h-auto flex items-center justify-center mb-0">
                                    <img src={weeklySpecial.img} alt={weeklySpecial.name} className="w-full h-auto object-contain" />
                                </div>

                                {/* Info */}
                                <div className="flex flex-col">
                                    <span className="text-[12px] font-black text-orange-400 mb-1 uppercase">Vers van de week</span>
                                    <h4 className="font-bold text-gray-800 mb-2 leading-tight text-sm">{weeklySpecial.name}</h4>
                                    <p className="max-w-screen-sm text-sm text-gray-400 font-medium mb-1 italic">{weeklySpecial.description}</p>
                                    <p className="text-sm font-black pb-2">SRD {weeklySpecial.price}</p>

                                    {/* Directe Add Button (Geen dropdown) */}
                                    <button
                                        onClick={() => {
                                            addItem({
                                                id: weeklySpecial.id,
                                                name: weeklySpecial.name,
                                                price: weeklySpecial.price,
                                                quantity: 1,
                                                img: weeklySpecial.img
                                            });
                                            triggerToast();
                                        }}
                                        className="w-full sm:w-[280px] bg-bioGreen text-white h-12 rounded-full text-sm tracking-wide hover:bg-bioGreen transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        In mandje
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                    </section>

                    {/* Juices */}
                    <div id="juices">
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Juices</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-16">
                            {menuData.juices?.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="bg-white px-3 py-3 shadow-xs border border-gray-100 flex flex-col"
                                >
                                    <div className="h-40 flex items-center justify-center mb-1">
                                        <img src={item.img} alt={item.name} className="max-h-full w-auto object-contain drop-shadow-xl" />
                                    </div>

                                    <div className="flex-grow flex flex-col">
                                        <h4 className="font-bold text-gray-800 mb-1 leading-tight capitalize text-sm">
                                            {item.name}
                                        </h4>
                                        <ProductAddToCart
                                            item={item}
                                            addItem={addItem}
                                            triggerToast={triggerToast}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Smoothies */}
                    <div id="smoothies">
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Smoothies</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-16">
                            {menuData.smoothies?.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="bg-white px-3 py-3 shadow-xs border border-gray-100 flex flex-col"
                                >
                                    <div className="h-40 flex items-center justify-center mb-1">
                                        <img src={item.img} alt={item.name} className="max-h-full w-auto object-contain drop-shadow-xl" />
                                    </div>

                                    <div className="flex-grow flex flex-col">
                                        <h4 className="font-bold text-gray-800 mb-1 leading-tight capitalize text-sm">
                                            {item.name}
                                        </h4>
                                        <ProductAddToCart
                                            item={item}
                                            addItem={addItem}
                                            triggerToast={triggerToast}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wellness Shots */}
                    <div id="shots">
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Wellness Shots</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-16">
                            {/* CORRECTE MAP: item is het eerste argument, index het tweede */}
                            {menuData.wellnessShots?.map((item: any, index: number) => (
                                <div key={item.id || `shot-${index}`} className="bg-white px-3 py-3 shadow-xs border border-gray-100 flex flex-col">

                                    {/* Afbeelding */}
                                    <div className="h-40 flex items-center justify-center mb-1">
                                        <img src={item.img} alt={item.name} className="max-h-full w-auto object-contain drop-shadow-xl" />
                                    </div>

                                    <div className="flex-grow flex flex-col">
                                        <h4 className="font-bold text-gray-800 mb-1 leading-tight capitalize text-sm">
                                            {item.name}
                                        </h4>

                                        {/* Prijs & Opties: In je MOCK_DATA staan prijzen in 'options' */}
                                        <p className="text-[11px] text-gray-400 font-medium mb-1 italic">
                                            {item.options?.[0]?.label || "Standaard formaat"}
                                        </p>
                                        <p className="text-sm font-black mb-3">
                                            SRD {item.options?.[0]?.price || 500}
                                        </p>

                                        <button
                                            onClick={() => {
                                                addItem({
                                                    id: item.id,
                                                    name: item.name,
                                                    price: item.options?.[0]?.price || 500,
                                                    quantity: 1,
                                                    img: item.img
                                                });
                                                triggerToast();
                                            }}
                                            className="w-full bg-bioGreen h-12 rounded-full text-white text-sm hover:opacity-90 transition-all active:scale-95"
                                        >
                                            In mandje
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vitamine Water */}
                    <div id="vitawater">
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Vitamine Water</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-16">
                            {menuData.vitamineWater.map((item: any, index: number) => (
                                <div key={`vitawater-${index}`} className="bg-white px-3 py-3 shadow-xs border border-gray-100 flex flex-col">
                                    <img src={item.img} alt={item.name} className="w-32 h-auto mx-auto mb-4" />
                                    <h4 className="font-bold text-gray-800 mb-1 line-clamp-2 capitalize text-sm">{item.name}</h4>
                                    <p className="text-xs text-gray-500 mb-1">1000 ML</p>
                                    <p className="text-sm font-black mb-3">SRD {item.options?.[0]?.price}</p>
                                    <button
                                        onClick={() => { addItem({ id: `vitawater-${index}`, name: item.name, price: item.options?.[0]?.price, quantity: 1, img: item.img }); triggerToast() }}
                                        className="w-full bg-bioGreen h-12 rounded-full text-white text-sm hover:bg-bioGreen hover:text-white transition-colors"
                                    >
                                        In mandje
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cleanse & Heal Set */}
                    <div id="cleanse">
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Cleanse & Heal Set</h2>
                        <div className="bg-white p-6 shadow-xs border border-gray-100 flex flex-col lg:flex-row items-center gap-6 mb-16">
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <img src={menuData.cleanseAndHeal.img} alt={menuData.cleanseAndHeal.name} className="w-[200px] h-auto" />
                                {/* <p className="text-xs text-center text-gray-500 mb-1">{item.name}</p> */}
                                <div className="">
                                    <h4 className="font-bold text-sm text-gray-800 mb-2">{menuData.cleanseAndHeal.name}</h4>
                                    <p className="max-w-screen-sm text-gray-600 text-sm mb-1">{menuData.cleanseAndHeal.description}</p>
                                    <p className="font-bold text-sm text-bioGreen"><span className="line-through text-gray-400 text-sm">SRD 900</span> SRD {menuData.cleanseAndHeal.options?.[0]?.price}</p>
                                    <div className="flex-shrink-0 pt-2 w-full lg:w-auto">
                                        {/* <button
                                    onClick={() => { addItem({ id: 'cleanse-set', name: menuData.cleanseAndHeal.name, price: menuData.cleanseAndHeal.options?.[0]?.price, quantity: 1, img: menuData.cleanseAndHeal.img }); triggerToast() }}
                                    className="w-full bg-bioGreen h-12 px-6 rounded-full text-white text-sm hover:bg-bioGreen hover:text-white transition-colors"
                                >
                                    In mandje
                                </button> */}

                                        <button
                                            onClick={() => {
                                                const set = menuData.cleanseAndHeal;
                                                const selectedOption = set.options?.[0];

                                                addItem({
                                                    // Voeg een unieke ID toe die past bij de andere producten
                                                    id: `${set.id}-set`,
                                                    // Belangrijk: De naam moet de tekst zijn die je in WhatsApp wilt zien
                                                    name: `${set.name} (Pakket)`,
                                                    // Forceer de prijs naar een echt getal
                                                    price: Number(selectedOption?.price || 850),
                                                    quantity: 1,
                                                    img: set.img
                                                });
                                                triggerToast();
                                            }}
                                            className="w-full sm:w-[280px] bg-bioGreen h-12 px-6 rounded-full text-white text-sm hover:bg-bioGreen transition-all"
                                        >
                                            In mandje
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Sappenkuur */}
                    <div id="detoxen">
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Sappenkuur</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                            {menuData.sappenkuur.map((item: any, index: number) => (
                                <div key={`kuur-${index}`} className="bg-white p-4 shadow-xs border border-gray-100 flex flex-col">
                                    <img src={item.img} alt={item.name} className="w-full h-auto mx-auto mb-4" />
                                    <h3 className="font-black text-lg text-bioGreen mb-2">{item.name}</h3>
                                    <h4 className="font-bold text-sm text-gray-800 mb-2">{item.options?.[0]?.label}</h4>
                                    <p className="text-sm text-gray-600 mb-1 flex-grow">{item.description}</p>
                                    <p className="text-sm font-black mb-3">SRD {item.options?.[0]?.price
                                    }</p>

                                    <button
                                        onClick={() => { addItem({ id: `kuur-${index}`, name: `Sappenkuur ${item.name}`, price: item.options?.[0]?.price, quantity: 1, img: item.img }); triggerToast() }}
                                        className="w-full bg-bioGreen h-12 rounded-full text-white text-sm hover:bg-bioGreen hover:text-white transition-colors"
                                    >
                                        In mandje
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* 4. DE TOAST NOTIFICATIE RECHTSBOVEN */}
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            className="fixed top-24 right-4 z-[200] bg-white border-l-4 border-bioGreen shadow-2xl rounded-2xl p-4 flex items-center gap-3 min-w-[200px]"
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
            </main>
        </>
    );
}