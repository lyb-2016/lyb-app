import { useState, useRef, useEffect } from "react"; // useRef en useEffect toegevoegd
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import {
    IoCartOutline,
    IoCloseOutline,
    IoTrashOutline,
    IoLogoWhatsapp,
    IoBagHandleOutline,
    IoGiftOutline,
    IoAlertCircleOutline,
    IoSparklesOutline
} from "react-icons/io5";


interface ScratchModalProps {
    onComplete: () => void;
    onClose: () => void;
    giftItem: any;
}

// --- SUBCOMPONENT: DE KRASKAART MODAL ---
function ScratchModal({ onComplete, onClose, giftItem }: ScratchModalProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratched, setIsScratched] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);

    // Initialiseer de kraslaag op het canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Maak canvas even groot als de container
        const size = canvas.offsetWidth;
        canvas.width = size;
        canvas.height = size;

        // Teken de deklaag (BioGreen verloop)
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, "#2ecc71"); // bioGreen
        gradient.addColorStop(1, "#27ae60");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // Voeg tekst toe (optioneel)
        // ctx.fillStyle = "white";
        // ctx.font = "bold 16px Arial";
        // ctx.textAlign = "center";
        // ctx.fillText("KRAS HIER", size / 2, size / 2 + 10);
    }, []);

    const handleScratch = (e: any) => {
        if (isScratched) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Dit "gumt" de laag weg
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();

        // Check of er genoeg gekrast is (simpele check)
        checkProgress(ctx, canvas);
    };

    const checkProgress = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let totalTransparent = 0;

        for (let i = 3; i < pixels.length; i += 40) { // Check om de 10 pixels voor performance
            if (pixels[i] === 0) totalTransparent++;
        }

        // Als meer dan 40% transparant is, beschouwen we het als gekrast
        if (totalTransparent > (pixels.length / 40) * 0.4) {
            if (!isScratched) {
                setIsScratched(true);
                onComplete();
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
                <div className="p-8 text-center">
                    <h3 className="font-black text-2xl italic text-gray-800 mb-2 uppercase tracking-tighter">Kras & Win!</h3>
                    <p className="text-gray-500 text-sm mb-6">Veeg over de kaart om te onthullen</p>

                    <div className="relative w-full aspect-square bg-neutral-100 rounded-3xl overflow-hidden shadow-inner border-4 border-white">

                        {/* DE PRIJS (Onderste laag - Jouw originele code met bouncende iconen) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <IoSparklesOutline size={40} className="text-yellow-400 mb-2" />
                            <img src={giftItem?.img} alt={giftItem?.name} className="w-24 h-24 object-contain mb-2" />
                            <h4 className="font-black text-bioGreen uppercase text-sm leading-none">Je wint een gratis</h4>
                            <p className="text-sm font-black text-gray-800 mt-1 uppercase leading-tight">{giftItem?.name}</p>
                            <p className="text-sm text-gray-400 mt-1">350 ML • AUTOMATISCH TOEGEVOEGD</p>
                        </div>

                        {/* DE KRASLAAG (Canvas - Bovenste laag) */}
                        <canvas
                            ref={canvasRef}
                            onMouseDown={() => setIsDrawing(true)}
                            onMouseUp={() => setIsDrawing(false)}
                            onMouseMove={(e) => isDrawing && handleScratch(e)}
                            onTouchStart={() => setIsDrawing(true)}
                            onTouchEnd={() => setIsDrawing(false)}
                            onTouchMove={(e) => isDrawing && handleScratch(e)}
                            className={`absolute inset-0 z-10 cursor-crosshair touch-none transition-opacity duration-500 ${isScratched ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                        />

                        {/* HET BOUNCENDE CADEAU (Alleen zichtbaar als er nog niet gekrast is) */}
                        {!isScratched && (
                            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center text-white">
                                <IoGiftOutline size={60} className="mb-2 animate-bounce" />
                                <span className="font-black uppercase tracking-widest text-[10px]">Kras hier!</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-6 w-full py-4 bg-neutral-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-bioGreen transition-colors"
                    >
                        {isScratched ? "Geweldig!" : "Sluiten"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeItem, totalPrice, clearCart } = useCartStore();
    const [showScratchCard, setShowScratchCard] = useState(false);
    const [hasWonGift, setHasWonGift] = useState(false);
    const [randomGift, setRandomGift] = useState<any>(null);
    const [showReminder, setShowReminder] = useState(false);

    const subtotal = totalPrice();
    const deliveryFee = 100;
    const grandTotal = subtotal + deliveryFee;
    // CONFIGURATIE VOOR MAKKELIJK AAN/UIT ZETTEN
    const MINIMUM_SPEND = 499;

    useEffect(() => {
        if (subtotal >= MINIMUM_SPEND && !randomGift) {
            import('../api/products').then(({ getJuices, getSmoothies }) => {
                Promise.all([getJuices(), getSmoothies()]).then(([juices, smoothies]) => {
                    const allAvailableItems = [...juices, ...smoothies];
                    const randomIndex = Math.floor(Math.random() * allAvailableItems.length);
                    setRandomGift(allAvailableItems[randomIndex]);
                });
            });
        } else if (subtotal < MINIMUM_SPEND && !hasWonGift) {
            // Reset cadeau als ze weer onder de 500 zakken (en nog niet gekrast hebben)
            setRandomGift(null);
        }
    }, [subtotal, randomGift, hasWonGift]);

    const handleScratchComplete = () => {
        setHasWonGift(true);
        // Hier kun je optioneel ook een actie naar je store sturen:
        // addFreeItem({ id: 'free-smoothie', name: 'Gratis Smoothie 350ml', price: 0 });
    };

    const handleWhatsApp = () => {
        if (subtotal >= 500 && !hasWonGift) {
            setShowReminder(true);
            return;
        }

        executeWhatsAppLink();

        // const wave = String.fromCodePoint(0x1F44B);  // 👋
        // const gift = String.fromCodePoint(0x1F381);  // 🎁
        // const bullet = String.fromCodePoint(0x2022); // •

        // const items = cart.map(i => {
        //     // Zorg dat we met getallen rekenen
        //     const itemPrice = Number(i.price) || 0;
        //     const itemQty = Number(i.quantity) || 1;
        //     const lineTotal = itemPrice * itemQty;

        //     return `${bullet} ${itemQty}x ${i.name} - SRD ${lineTotal}`;
        // }).join('\n');

        // const giftText = hasWonGift ? `\n ${gift} CADEAU: 1x GRATIS ${randomGift?.name} (350ml)` : '';
        // const message = `Hallo LYB! ${wave} Ik wil graag de volgende bestelling plaatsen:\n\n${items}${giftText}\n\nTotaal: SRD ${grandTotal}\nInclusief bezorging.`;

        // window.open(`https://wa.me/5978531071?text=${encodeURIComponent(message)}`, '_blank');
    };

    const executeWhatsAppLink = () => {
        const wave = String.fromCodePoint(0x1F44B);
        const gift = String.fromCodePoint(0x1F381);
        const bullet = String.fromCodePoint(0x2022);

        const items = cart.map(i => `${bullet} ${i.quantity}x ${i.name} - SRD ${i.price * i.quantity}`).join('\n');
        const giftText = hasWonGift ? `\n\n${gift} CADEAU: 1x GRATIS ${randomGift?.name} (350ml)` : '';
        const message = `Hallo LYB! ${wave} Ik wil graag de volgende bestelling plaatsen:\n\n${items}${giftText}\n\nTotaal: SRD ${grandTotal}\nInclusief bezorging.`;

        window.open(`https://wa.me/5978531071?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <>
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/40 z-[150] backdrop-blur-[2px]"
                        />

                        {/* SIDEBAR */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-white z-[160] shadow-[-10px_0_50px_rgba(0,0,0,0.1)] flex flex-col"
                        >
                            {/* HEADER */}
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                                <h3 className="font-black italic flex items-center gap-2 text-gray-800 text-xl">
                                    <IoCartOutline className="text-bioGreen text-3xl" /> Jouw Mandje
                                </h3>
                                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-800">
                                    <IoCloseOutline size={32} />
                                </button>
                            </div>

                            {/* CONTENT AREA */}
                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                <AnimatePresence mode="popLayout">
                                    {cart.length > 0 ? (
                                        cart.map((item) => (
                                            <div key={item.id} className="relative mb-4 overflow-hidden rounded-[1.5rem]">
                                                {/* SWIPE DELETE BACKGOUND */}
                                                <div className="absolute inset-0 bg-red-500 flex items-center px-6">
                                                    <div className="flex items-center gap-2 text-white">
                                                        <IoTrashOutline size={20} />
                                                        <span className="font-black text-[10px] uppercase tracking-wider">Verwijderen</span>
                                                    </div>
                                                </div>

                                                {/* ITEM CARD */}
                                                <motion.div
                                                    drag="x"
                                                    dragConstraints={{ left: 0, right: 150 }}
                                                    dragElastic={0.1}
                                                    onDragEnd={(_, info) => {
                                                        if (info.offset.x > 100) removeItem(item.id);
                                                    }}
                                                    className="relative flex items-center gap-4 bg-white p-4 border border-gray-100 shadow-sm"
                                                >
                                                    <div className="w-16 h-16 flex-shrink-0 bg-neutral-50 rounded-xl flex items-center justify-center p-1">
                                                        <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-bold text-gray-800 text-[12px] uppercase leading-tight">{item.name}</p>
                                                        <p className="text-bioGreen font-black text-sm mt-1">SRD {item.price}</p>

                                                        <div className="flex items-center bg-neutral-100 rounded-full w-fit mt-3 px-1 py-1 gap-3">
                                                            <button onClick={() => useCartStore.getState().updateQuantity(item.id, -1)} className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-bioGreen">-</button>
                                                            <span className="text-xs font-black min-w-[15px] text-center">{item.quantity}</span>
                                                            <button onClick={() => useCartStore.getState().updateQuantity(item.id, 1)} className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-bioGreen">+</button>
                                                        </div>
                                                    </div>

                                                    <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 p-2"><IoTrashOutline size={22} /></button>
                                                </motion.div>
                                            </div>
                                        ))
                                    ) : (
                                        /* LEGE WINKELMAND STATE */
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="h-full flex flex-col items-center justify-center text-center p-10"
                                        >
                                            <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
                                                <IoBagHandleOutline size={48} className="text-gray-300" />
                                            </div>
                                            <h4 className="font-black text-gray-800 uppercase tracking-tight">Je mandje is nog leeg</h4>
                                            <p className="text-gray-400 text-sm mt-2">Het lijkt erop dat je nog geen keus hebt kunnen maken. Onze producten wachten op je!</p>
                                            <button
                                                onClick={() => setIsCartOpen(false)}
                                                className="mt-6 text-bioGreen font-black text-xs uppercase border-b-2 border-bioGreen pb-1 hover:text-gray-800 hover:border-gray-800 transition-all"
                                            >
                                                Verder winkelen
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {cart.length > 0 && (
                                    <button onClick={clearCart} className="w-full py-3 text-red-400 text-xs font-bold hover:underline mt-4">
                                        Winkelmand leegmaken
                                    </button>
                                )}

                                {/* FOOTER */}
                                {cart.length > 0 && (
                                    <div className="p-8 border-t border-gray-100 bg-neutral-50 rounded-t-[2.5rem]">
                                        <div className="space-y-2 mb-6">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Subtotaal</span>
                                                <span className="font-bold text-gray-800">SRD {subtotal}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Bezorgkosten</span>
                                                <span className="font-bold text-gray-800">SRD {deliveryFee}</span>
                                            </div>

                                            {/* GRATIS ITEM WEERGAVE (Na krassen) */}
                                            {hasWonGift && (
                                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between text-bioGreen border-t border-dashed border-bioGreen/30 pt-2 mt-2 text-sm">
                                                    <span className="flex items-center gap-1"><IoSparklesOutline /> {randomGift?.name} 350 ML</span>
                                                    <span className="uppercase text-sm font-bold text-bioGreen px-2 py-0.5 rounded-full">Gratis</span>
                                                </motion.div>
                                            )}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Totaal te betalen</p>
                                                <p className="text-sm font-black text-gray-800">SRD {grandTotal}</p>
                                            </div>
                                        </div>

                                        {/* OPTIE 1: KRASKAART MELDING (Makkelijk te commentariëren) */}
                                        {subtotal >= 500 && !hasWonGift && (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setShowScratchCard(true)}
                                                className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-2xl flex items-center gap-4 mb-4 shadow-md group relative overflow-hidden"
                                            >
                                                <div className="bg-white/20 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
                                                    <IoGiftOutline size={24} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-[11px] font-black text-white uppercase leading-none">Je hebt een cadeau verdiend!</p>
                                                    <p className="text-[12px] text-white font-bold underline decoration-white/50">Bekijk wat je hebt gewonnen!</p>
                                                </div>
                                                <IoSparklesOutline className="absolute right-4 top-4 text-white/40 animate-pulse" />
                                            </motion.button>
                                        )}

                                        {/* OPTIE 2: BESTEDINGSMINIMUM MELDING (Makkelijk te commentariëren) */}
                                        {subtotal < MINIMUM_SPEND && (
                                            <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl flex items-center gap-3 mb-4 text-orange-700">
                                                <IoAlertCircleOutline size={20} className="flex-shrink-0" />
                                                <p className="text-[10px] font-bold">Minimaal SRD 500 nodig om een bestelling te plaatsen via WhatsApp.</p>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleWhatsApp}
                                            disabled={subtotal < MINIMUM_SPEND} // Optioneel: blokkeer knop bij te laag bedrag
                                            className={`w-full py-3 rounded-2xl font-black flex items-center justify-center gap-3 shadow-md transition-all active:scale-95 ${subtotal < MINIMUM_SPEND
                                                ? "bg-gray-300 cursor-not-allowed text-white"
                                                : "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-[0_10px_20px_rgba(37,211,102,0.2)]"
                                                }`}
                                        >
                                            <IoLogoWhatsapp size={24} /> Bestel via WhatsApp
                                        </button>

                                        <p className="text-[11px] text-center text-gray-400 mt-4 leading-relaxed">
                                            Door op bestellen te klikken openen we WhatsApp.<br />Je kunt daar je bestelling controleren en versturen.
                                        </p>
                                    </div>
                                )}
                            </div>


                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* MODAL VOOR KRASKAART MET RANDOM ITEM */}
            <AnimatePresence>
                {showScratchCard && randomGift && (
                    <ScratchModal
                        giftItem={randomGift}
                        onClose={() => setShowScratchCard(false)}
                        onComplete={() => {
                            handleScratchComplete();
                            setTimeout(() => setShowScratchCard(false), 2500);
                        }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showReminder && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowReminder(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >
                            {/* Decoratieve bovenkant */}
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 flex justify-center relative">
                                <IoSparklesOutline className="absolute left-4 top-4 text-white/30 text-4xl" />
                                <div className="bg-white p-4 rounded-3xl shadow-lg">
                                    <IoGiftOutline size={50} className="text-orange-500 animate-bounce" />
                                </div>
                            </div>

                            <div className="p-8 text-center">
                                <h3 className="text-xl font-black text-gray-800 mb-2 italic">Wacht even! 🎁</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                    Je hebt een <span className="font-bold text-orange-500 capitalize">gratis cadeau</span> verdiend bij je bestelling, maar je hebt nog niet gekrast!
                                </p>

                                <div className="space-y-3">
                                    {/* Hoofdknop: Terug naar kraskaart */}
                                    <button
                                        onClick={() => {
                                            setShowReminder(false);
                                            setShowScratchCard(true); // Open de kraskaart modal
                                        }}
                                        className="w-full bg-bioGreen text-white capitalize py-4 rounded-2xl font-black text-sm shadow-md hover:bg-bioGreen/90 transition-all active:scale-95"
                                    >
                                        Nu krassen & cadeau claimen
                                    </button>

                                    {/* Secundaire knop: Doorgaan zonder cadeau */}
                                    <button
                                        onClick={() => {
                                            setShowReminder(false);
                                            executeWhatsAppLink(); // Open direct WhatsApp
                                        }}
                                        className="w-full bg-transparent text-gray-400 py-2 rounded-xl underline font-bold text-xs hover:text-gray-600 transition-colors"
                                    >
                                        Nee bedankt, ga door naar WhatsApp
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}