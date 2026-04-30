import type { Product } from "../types/api";

// Importeer alle assets (deze blijven voor nu lokaal)
import juice1 from "../assets/lybMenu/juice-1.webp";
import juice2 from "../assets/lybMenu/juice-2.webp";
import juice3 from "../assets/lybMenu/juice-3.webp";
import juice4 from "../assets/lybMenu/juice-4.webp";
import juice5 from "../assets/lybMenu/juice-5.webp";
import juice6 from "../assets/lybMenu/juice-6.webp";
import juice7 from "../assets/lybMenu/juice-7.webp";
import juice8 from "../assets/lybMenu/juice-8.webp";
import juice9 from "../assets/lybMenu/juice-9.webp";
import juice10 from "../assets/lybMenu/juice-10.webp";
import juice11 from "../assets/lybMenu/juice-11.webp";
import juice12 from "../assets/lybMenu/juice-12.webp";
import juice13 from "../assets/lybMenu/juice-13.webp";
import juice14 from "../assets/lybMenu/juice-14.webp";
import juice15 from "../assets/lybMenu/juice-15.webp";
import juice16 from "../assets/lybMenu/juice-16.webp";
import juice17 from "../assets/lybMenu/juice-17.webp";
import juice18 from "../assets/lybMenu/juice-18.webp";
import smoothie1 from "../assets/lybMenu/smoothie-1.webp";
import smoothie2 from "../assets/lybMenu/smoothie-2.webp";
import smoothie3 from "../assets/lybMenu/smoothie-3.webp";
import smoothie4 from "../assets/lybMenu/smoothie-4.webp";
import smoothie5 from "../assets/lybMenu/smoothie-5.webp";
import smoothie6 from "../assets/lybMenu/smoothie-6.webp";
import smoothie7 from "../assets/lybMenu/smoothie-7.webp";
import smoothie8 from "../assets/lybMenu/smoothie-8.webp";
import smoothie9 from "../assets/lybMenu/smoothie-9.webp";
import smoothie10 from "../assets/lybMenu/smoothie-10.webp";
import smoothie11 from "../assets/lybMenu/smoothie-11.webp";
import smoothie12 from "../assets/lybMenu/smoothie-12.webp";
import smoothie13 from "../assets/lybMenu/smoothie-13.webp";
import smoothie14 from "../assets/lybMenu/smoothie-14.webp";
import smoothie15 from "../assets/lybMenu/smoothie-15.webp";
import vit1 from "../assets/lybMenu/vitwater1.webp";
import vit2 from "../assets/lybMenu/vitwater2.webp";
import vit3 from "../assets/lybMenu/vitwater3.webp";
import vit4 from "../assets/lybMenu/vitwater4.webp";
import vit5 from "../assets/lybMenu/vitwater5.webp";
import vit6 from "../assets/lybMenu/vitwater6.webp";
import vit7 from "../assets/lybMenu/vitwater7.webp";
import shot1 from "../assets/lybMenu/shot1.webp";
import shot2 from "../assets/lybMenu/shot2.webp";
import shot3 from "../assets/lybMenu/shot3.webp";
import shot4 from "../assets/lybMenu/shot4.webp";
import shot5 from "../assets/lybMenu/shot5.webp";
import cleanseHeal from "../assets//bestelling/cleanseHeal.webp";
import sappenkuur from "../assets/bestelling/sappenkuur.webp";
import specials from "../assets/bestelling/comboSpecial.webp";

// import { vitamineWater, wellnessShots } from "../data/menuData";

// --- De Data (Privé in dit bestand) ---
const MOCK_DATA = {
    juices: [
        { id: "ju01", name: "ananas-lemmetje", img: juice1, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
        { id: "ju02", name: "chia-zuurzak", img: juice2, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
        { id: "ju03", name: "chia-aardbei", img: juice3, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
        { id: "ju04", name: "papaja-kers", img: juice4, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
        { id: "ju05", name: "awarra", img: juice5, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
        { id: "ju06", name: "basilicum-lemmetje-moringa", img: juice6, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
        { id: "ju07", name: "sopropo-zuurzak-moringa", img: juice7, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
        { id: "ju08", name: "avocado-ananas-moringa", img: juice8, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] }
    ],
    smoothies: [
        { id: "sm01", name: "ananas-framboos-bacove", img: smoothie1, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
        { id: "sm02", name: "zuurzak-aardbei-bacove", img: smoothie2, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
        { id: "sm03", name: "manja-markoesa-bacove", img: smoothie3, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
        { id: "sm04", name: "awarra-bacove", img: smoothie4, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
        { id: "sm05", name: "podosiri-kers-bacove", img: smoothie5, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
        { id: "sm06", name: "spinazie-kers-bacove-moringa", img: smoothie6, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
        { id: "sm07", name: "sopropo-pommeciter-bacove-moringa", img: smoothie7, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
        { id: "sm08", name: "komkommer-gember-lemmetje-moringa", img: smoothie8, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] }
    ],
    wellnessShots: [
        { id: "ws01", name: "kurkuma-kers-zwarte peper", img: shot1, category: "shots", options: [{ label: "7x 125 ml", price: 500 }] },
        { id: "ws02", name: "gember-markoesa-cayenne", img: shot2, category: "shots", options: [{ label: "7x 125 ml", price: 500 }] },
        { id: "ws03", name: "gember-aardbei", img: shot3, category: "shots", options: [{ label: "5x 125 ml", price: 500 }] },
        { id: "ws04", name: "gember-kurkuma-lemmetje", img: shot4, category: "shots", options: [{ label: "7x 125 ml", price: 500 }] },
        { id: "ws05", name: "gember-cayenne-lemmetje", img: shot5, category: "shots", options: [{ label: "7x 125 ml", price: 500 }] }
    ],
    vitamineWater: [
        { id: "vw01", name: "gember-citroengras", img: vit1, category: "vitamine-water", options: [{ label: "1000 ml", price: 125 }] },
        { id: "vw02", name: "gember-lemmetje", img: vit2, category: "vitamine-water", options: [{ label: "1000 ml", price: 125 }] },
        { id: "vw03", name: "kurkuma-kers", img: vit3, category: "vitamine-water", options: [{ label: "1000 ml", price: 125 }] },
        { id: "vw04", name: "kaneel-kruidnagel", img: vit4, category: "vitamine-water", options: [{ label: "1000 ml", price: 110 }] },
        { id: "vw05", name: "basilicum-lemmetje", img: vit5, category: "vitamine-water", options: [{ label: "1000 ml", price: 110 }] },
        { id: "vw06", name: "sjoeroe", img: vit6, category: "vitamine-water", options: [{ label: "1000 ml", price: 110 }] },
        { id: "vw07", name: "appelazijn", img: vit7, category: "vitamine-water", options: [{ label: "1000 ml", price: 110 }] }
    ],
    cleanseAndHeal: {
        id: "cH01",
        name: "Complete Cleanse & Heal",
        img: cleanseHeal,
        description: "Een complete set van Gember shots (3x 125 ml), Aloë vera juice (3x 350 ml) en Kurkuma vitamine water (3x 1000ml) voor een volledige reset.",
        category: "cleanse-and-heal",
        options: [{ label: "3x 125 ml + 3x 350 ml + 3x 1000 ml", price: 850 }]
    },
    sappenkuur: [
        { id: "sk01", name: "1-daagse", img: sappenkuur, description: "1 set van (1 vitaminewater, 3 greens, 4 fruits) + 1 GRATIS shot.", category: "For Comfort", options: [{ label: "8 flessen (350 ml) + 1 shot GRATIS", price: 850 }] },
        { id: "sk02", name: "3-daagse", img: sappenkuur, description: "3 sets van (1 vitaminewater, 3 greens, 4 fruits) + 3 GRATIS shots.", category: "For Beginners", options: [{ label: "24 flessen (350 ml) + 3 shots GRATIS", price: 2500 }] },
        { id: "sk03", name: "5-daagse", img: sappenkuur, description: "5 sets van (1 vitaminewater, 3 greens, 4 fruits) + 5 GRATIS shots.", category: "Most Popular", options: [{ label: "40 flessen (350 ml) + 5 shots GRATIS", price: 4100 }] },
        { id: "sk04", name: "7-daagse", img: sappenkuur, description: "7 sets van (1 vitaminewater, 3 greens, 4 fruits) + 7 GRATIS shots.", category: "For Advanced", options: [{ label: "56 flessen (350 ml) + 7 shots GRATIS", price: 5700 }] }
    ],
    weeklyDeal: {
        id: "wd01",
        name: "Weekly Special Combo",
        img: vit1,
        description: "test",
        category: "specials",
        options: [{ label: "1000 ml", price: 550 }]
    }
};

// Maak een object dat de string-naam koppelt aan de geïmporteerde asset
const imageMap: Record<string, string> = {
    "juice-1.webp": juice1,
    "juice-2.webp": juice2,
    "juice-3.webp": juice3,
    "juice-4.webp": juice4,
    "juice-5.webp": juice5,
    "juice-6.webp": juice6,
    "juice-7.webp": juice7,
    "juice-8.webp": juice8,
    "juice-9.webp": juice9,
    "juice-10.webp": juice10,
    "juice-11.webp": juice11,
    "juice-12.webp": juice12,
    "juice-13.webp": juice13,
    "juice-14.webp": juice14,
    "juice-15.webp": juice15,
    "juice-16.webp": juice16,
    "juice-17.webp": juice17,
    "juice-18.webp": juice18,
    "smoothie-1.webp": smoothie1,
    "smoothie-2.webp": smoothie2,
    "smoothie-3.webp": smoothie3,
    "smoothie-4.webp": smoothie4,
    "smoothie-5.webp": smoothie5,
    "smoothie-6.webp": smoothie6,
    "smoothie-7.webp": smoothie7,
    "smoothie-8.webp": smoothie8,
    "smoothie-9.webp": smoothie9,
    "smoothie-10.webp": smoothie10,
    "smoothie-11.webp": smoothie11,
    "smoothie-12.webp": smoothie12,
    "smoothie-13.webp": smoothie13,
    "smoothie-14.webp": smoothie14,
    "smoothie-15.webp": smoothie15,
    "shot1.webp": shot1,
    "shot2.webp": shot2,
    "shot3.webp": shot3,
    "shot4.webp": shot4,
    "shot5.webp": shot5,
    "vitwater1.webp": vit1,
    "vitwater2.webp": vit2,
    "vitwater3.webp": vit3,
    "vitwater4.webp": vit4,
    "vitwater5.webp": vit5,
    "vitwater6.webp": vit6,
    "vitwater7.webp": vit7,
    "cleanseHeal.webp": cleanseHeal,
    "sappenkuur.webp": sappenkuur,
    "specials.webp": specials
};

const API_URL = import.meta.env.VITE_API_URL;

const BASE_URL = API_URL.split('/api')[0];

export const getProductImage = (imgName: string | null | undefined): string => {
    if (!imgName) return juice1; // Fallback naar een standaard sapje

    // 1. Is het een externe URL (bijv. Cloudinary)?
    if (imgName.startsWith('http')) {
        return imgName;
    }

    // 2. Is het een lokale asset die we in onze imageMap hebben?
    if (imageMap[imgName]) {
        return imageMap[imgName];
    }

    // 3. Als het geen van beide is, is het een nieuwe upload op de backend
    return `${BASE_URL}/uploads/${imgName}`;
};

export const getFullMenu = async () => {
    const response = await fetch(`${API_URL}/Products`);
    if (!response.ok) throw new Error("Netwerk respons was niet ok");

    const flatData = await response.json();

    // Helper om een product te mappen met de juiste afbeelding
    const mapProduct = (p: any) => ({
        ...p,
        img: getProductImage(p.img)
    });

    const data = {
        juices: flatData.filter((p: any) => p.category === "juices").map(mapProduct),
        smoothies: flatData.filter((p: any) => p.category === "smoothies").map(mapProduct),
        wellnessShots: flatData.filter((p: any) => p.category === "shots").map(mapProduct),
        vitamineWater: flatData.filter((p: any) => p.category === "vitamine-water").map(mapProduct),
        // Voor de single objects (cleanseAndHeal en weeklyDeal):
        cleanseAndHeal: mapProduct(flatData.find((p: any) => p.category === "cleanse-and-heal") || {}),
        sappenkuur: flatData.filter((p: any) =>
            ["For Comfort", "For Beginners", "Most Popular", "For Advanced"].includes(p.category)
        ).map(mapProduct),
        weeklyDeal: mapProduct(flatData.find((p: any) => p.category === "specials") || {})
    };

    return data;
};

// --- API Functies ---

// Simuleer een netwerkvertraging
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getJuices = async (): Promise<Product[]> => {
    await delay(500);
    return MOCK_DATA.juices;
};

export const getSmoothies = async (): Promise<Product[]> => {
    await delay(500);
    return MOCK_DATA.smoothies;
};

export const getWellnessShots = async (): Promise<Product[]> => {
    await delay(600);
    return MOCK_DATA.wellnessShots;
};

export const getVitamineWater = async (): Promise<Product[]> => {
    await delay(600);
    return MOCK_DATA.vitamineWater;
};

export const getCleanseAndHeal = async (): Promise<Product> => {
    await delay(600);
    return MOCK_DATA.cleanseAndHeal;
};

export const getSappenkuren = async (): Promise<Product[]> => {
    await delay(600);
    return MOCK_DATA.sappenkuur;
};