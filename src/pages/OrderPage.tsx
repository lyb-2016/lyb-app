import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";
import { getFullMenu } from "../api/products";
import { IoCartOutline, IoChevronDownOutline, IoSparklesOutline } from "react-icons/io5";
// import { juicesAndSmoothies, wellnessShots, vitamineWater, cleanseAndHeal, sappenkuur } from '../data/menuData';

// Importeer hier al je assets (zelfde als in MenuPage)
import specialImg from "../assets/bestelling/comboSpecial.webp"; // Voorbeeld voor de banner
import banner from "../assets/bestelling/bestelling.webp"; // Voorbeeld voor de banner


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
                    In winkelmandje
                </button>
            </div>
        </div>
    );
} 

function ProductAddToCart({ item, category, addItem, triggerToast }: any) {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const currentOption = item.options?.[selectedIdx];

    const handleAdd = () => {
        addItem({
            id: `${item.id}-${selectedIdx}`,
            name: `${item.name} (${currentOption.label})`,
            price: currentOption.price, // Gebruik direct het getal
            quantity: 1,
            img: item.img
        });
        triggerToast();
    };

    return (
        <div className="flex flex-col w-full h-full">
            {/* 1. DYNAMISCHE PRIJS (Onder de naam) */}
            <div className="mb-3">
                <p className="text-sm font-black tracking-tight">
                    SRD {currentOption.price}
                </p>
            </div>

            {/* 2. DROPDOWN & PLUS BUTTON RIJ */}
            <div className="flex flex-col items-center gap-2 relative">
                {item.options.length > 1 ? (
                    <div className="relative w-full flex-1">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full bg-neutral-100 py-3 px-4 rounded-xl text-[11px] font-black text-gray-700 flex justify-between items-center uppercase tracking-wider hover:bg-neutral-200 transition-colors border border-transparent focus:border-bioGreen/20"
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
                                        {category.options.map((opt: any, i: number) => (
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
                                                {opt.label} {/* Toon alleen de inhoud (ml) */}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                ) : ( /* Als er maar 1 optie is (zoals bij de Shots), toon dan alleen het label als info */
                    <div className="w-full bg-neutral-50 py-3 px-4 rounded-xl text-[11px] font-bold text-gray-400 uppercase text-center border border-dashed">
                        {currentOption.label}
                    </div>
                )}
                <button
                    onClick={handleAdd}
                    className="bg-bioGreen w-full text-white text-sm h-12 rounded-full flex items-center justify-center hover:bg-darkYellow transition-all shadow-md active:scale-90 flex-shrink-0"
                >
                    In winkelmandje
                </button>
            </div>
        </div>
    );
}

export default function OrderPage() {
    const { addItem } = useCartStore();
    const [showToast, setShowToast] = useState(false);

    const [menuData, setMenuData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const triggerToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500); // Verdwijnt na 2.5 sec
    };

    // De Weekly Special als een vast object
    const weeklySpecial = {
        id: "weekly-special-reset",
        name: "Kurkuma, Kers Vitaminewater",
        price: 550, // Vaste prijs
        description: "Compleet pakket: 2 juices en 2 smoothies van 350 ml & 1 Kurkuma & Kers vitaminewater van 1L.",
        img: specialImg
    };

    useEffect(() => {
        getFullMenu().then(data => {
            setMenuData(data);
            setLoading(false);
        })
            .catch(err => {
                console.error("Menu laden mislukt:", err);
                setLoading(false); // Stop met laden, ook bij error
            });
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center font-bold italic text-bioGreen">Menu aan het laden...</div>;
    }

    if (!menuData) {
        return <div className="...">Er is iets misgegaan bij het laden van het menu.</div>;
    }

    return (
        <>
            <Helmet>
                <title>Bestel Direct | Verse Juices & Smoothies | LYB Suriname</title>
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
                            className="relative w-full bg-gradient-to-r from-yellow-400 to-orange-500 py-8 overflow-hidden flex flex-col md:flex-row items-center justify-between"
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

                            {/* <div className="relative z-10 flex flex-col items-center">
                                <div className="bg-white p-4 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 group">
                                    <IoGiftOutline size={50} className="text-orange-500 animate-bounce" />
                                </div>
                            </div> */}
                        </motion.div>
                    </div>

                    {/* 2. WEEKLY SPECIAL (Zonder Dropdown) */}
                    <section className="mt-16 mb-20">
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Weekly Special</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="bg-white p-6 rounded-xl shadow-sm border-2 border-orange-200 flex flex-col min-h-[420px] relative"
                            >
                                <div className="absolute top-4 right-4 bg-orange-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase z-10">As Seen On Social Media</div>

                                {/* Afbeelding */}
                                <div className="h-full flex items-center justify-center mb-4">
                                    <img src={weeklySpecial.img} alt={weeklySpecial.name} className="max-h-full w-auto object-contain" />
                                </div>

                                {/* Info */}
                                <div className="flex-grow flex flex-col">
                                    <span className="text-[12px] font-black text-orange-400 mb-1 uppercase">Vers van de week</span>
                                    <h4 className="font-bold text-gray-800 mb-2 leading-tight text-sm">{weeklySpecial.name}</h4>
                                    <p className="text-[11px] text-gray-400 font-medium mb-1 italic">{weeklySpecial.description}</p>

                                    {/* Prijs weergave */}
                                    <div className="mb-4 mt-auto">
                                        <p className="text-sm font-black">SRD {weeklySpecial.price}</p>
                                    </div>

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
                                        className="w-full bg-bioGreen text-white h-12 rounded-full text-sm tracking-wide hover:bg-bioGreen transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        In winkelmandje
                                    </button>
                                </div>
                            </motion.div>

                            {/* Informatie tekstje ernaast */}
                            <div className="hidden md:flex bg-neutral-100 rounded-[2.5rem] p-8 flex-col justify-center border border-dashed border-gray-200">
                                <p className="text-gray-400 text-sm italic font-medium">
                                    "Onze Weekly Special is een zorgvuldig samengesteld pakket voor de ultieme boost. <br /><br />
                                    Geen keuzestress, gewoon de beste smaken van dit moment in één deal."
                                </p>
                            </div>
                        </div>
                    </section>

                    {menuData.juicesAndSmoothies?.map((category: any) => (
                        <div key={category.id}>
                            <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">{category.title}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-16">
                                {category.items?.map((item: any) => (
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
                    ))}

                    {/* Wellness Shots */}
                    {/* Wellness Shots */}
                    <div>
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
                                            In winkelmandje
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <div>
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Wellness Shots</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-16">
                            {menuData.wellnessShots.map(({ item, index }: {
                                item: any
                                index: any
                            }) => (
                                <div key={`shot-${index}`} className="bg-white px-3 py-3 shadow-xs border border-gray-100 flex flex-col">
                                    <img src={item.img} alt={item.name} className="w-32 h-auto mx-auto mb-1" />
                                    <h4 className="font-bold text-gray-800 mb-2 h-10 line-clamp-2 capitalize text-sm">{item.name}</h4>
                                    <p className="text-xs text-gray-500 mb-1">{item.qty}</p>
                                    <p className="text-sm font-black mb-3">SRD 500</p>

                                    <button
                                        onClick={() => { addItem({ id: `shot-${index}`, name: item.name, price: 500, quantity: 1, img: item.img }); triggerToast() }}
                                        className="w-full bg-bioGreen h-12 rounded-full text-white text-sm hover:bg-bioGreen hover:text-white transition-colors"
                                    >
                                        In winkelmandje
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    {/* Vitamine Water */}
                    {/* <div>
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Vitamine Water</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-16">
                            {menuData.vitamineWater.map(({ item, index }: {
                                item: any
                                index: any
                            }) => (
                                <div key={`vitawater-${index}`} className="bg-white px-3 py-3 shadow-xs border border-gray-100 flex flex-col">
                                    <img src={item.img} alt={item.name} className="w-32 h-auto mx-auto mb-4" />
                                    <h4 className="font-bold text-gray-800 mb-1 line-clamp-2 capitalize text-sm">{item.name}</h4>
                                    <p className="text-xs text-gray-500 mb-1">1000 ML</p>
                                    <p className="text-sm font-black mb-3">{item.price}</p>
                                    <button
                                        onClick={() => { addItem({ id: `vitawater-${index}`, name: item.name, price: parsePrice(item.price), quantity: 1, img: item.img }); triggerToast() }}
                                        className="w-full bg-bioGreen h-12 rounded-full text-white text-sm hover:bg-bioGreen hover:text-white transition-colors"
                                    >
                                        In winkelmandje
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    {/* Cleanse & Heal Set */}
                    {/* <div>
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Cleanse & Heal Set</h2>
                        <div className="bg-white p-6 shadow-xs border border-gray-100 flex flex-col lg:flex-row items-center gap-6 mb-16">
                            <div className="flex-shrink-0 grid grid-cols-3 gap-4">
                                {menuData.cleanseAndHeal.map(({ item, index }: {
                                    item: any
                                    index: any
                                }) => (
                                    <div key={`cleanse-${index}`}>
                                        <img src={item.img} alt={item.name} className="w-24 h-auto" />
                                        <p className="text-xs text-center text-gray-500 mb-1">{item.info}</p>

                                    </div>
                                ))}
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-bold text-sm text-gray-800 mb-2">Complete Cleanse & Heal Set</h4>
                                <p className="text-gray-600 text-sm mb-1">Een complete set van Gember shots, Aloë vera juice en Kurkuma vitamine water voor een volledige reset.</p>
                                <p className="font-bold text-sm text-bioGreen"><span className="line-through text-gray-400 text-sm">SRD 900</span> SRD 850</p>
                            </div>
                            <div className="flex-shrink-0 w-full lg:w-auto">
                                <button
                                    onClick={() => { addItem({ id: 'cleanse-set', name: 'Cleanse & Heal Set', price: 850, quantity: 1, img: menuData.cleanseAndHeal[0].img }); triggerToast() }}
                                    className="w-full bg-bioGreen h-12 px-6 rounded-full text-white text-sm hover:bg-bioGreen hover:text-white transition-colors"
                                >
                                    In winkelmandje
                                </button>
                            </div>
                        </div>
                    </div> */}

                    {/* Sappenkuur */}
                    {/* <div>
                        <h2 className="text-3xl font-black italic mb-8 border-l-8 border-bioGreen pl-4">Sappenkuur</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                            {menuData.sappenkuur.map(({ item, index }: {
                                item: any
                                index: any
                            }) => (
                                <div key={`kuur-${index}`} className="bg-white p-4 shadow-xs border border-gray-100 flex flex-col">
                                    <h3 className="font-black text-lg text-bioGreen mb-2">{item.d}</h3>
                                    <h4 className="font-bold text-sm text-gray-800 mb-2">{item.i}</h4>
                                    <p className="text-xs text-gray-600 mb-1 flex-grow">{item.qty}</p>
                                    <p className="text-sm font-black mb-3">SRD {item.p}</p>

                                    <button
                                        onClick={() => { addItem({ id: `kuur-${index}`, name: `Sappenkuur ${item.d}`, price: parseInt(item.p, 10), quantity: 1, img: menuData.cleanseAndHeal[0].img }); triggerToast() }}
                                        className="w-full bg-bioGreen h-12 rounded-full text-white text-sm hover:bg-bioGreen hover:text-white transition-colors"
                                    >
                                        In winkelmandje
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div> */}

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