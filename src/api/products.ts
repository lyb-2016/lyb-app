import type { Product, CategoryData } from "../types/api";

// Importeer alle assets (deze blijven voor nu lokaal)
import juice1 from "../assets/lybMenu/juice-1.webp";
import juice2 from "../assets/lybMenu/juice-2.webp";
import juice3 from "../assets/lybMenu/juice-3.webp";
import juice4 from "../assets/lybMenu/juice-4.webp";
import juice5 from "../assets/lybMenu/juice-5.webp";
import juice6 from "../assets/lybMenu/juice-6.webp";
import juice7 from "../assets/lybMenu/juice-7.webp";
import juice8 from "../assets/lybMenu/juice-8.webp";
import smoothie9 from "../assets/lybMenu/smoothie-9.webp";
import smoothie10 from "../assets/lybMenu/smoothie-10.webp";
import smoothie11 from "../assets/lybMenu/smoothie-11.webp";
import smoothie12 from "../assets/lybMenu/smoothie-12.webp";
import smoothie13 from "../assets/lybMenu/smoothie-13.webp";
import smoothie14 from "../assets/lybMenu/smoothie-14.webp";
import smoothie15 from "../assets/lybMenu/smoothie-15.webp";
import smoothie16 from "../assets/lybMenu/smoothie-16.webp";
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
import comboshots from "../assets/lybMenu/cleanse1.webp";
import combojuice from "../assets/lybMenu/cleanse2.webp";
import combovit from "../assets/lybMenu/cleanse3.webp";

// --- De Data (Privé in dit bestand) ---
const MOCK_DATA = {
    juicesAndSmoothies: [
        {
            id: "juices",
            title: "Juices",
            items: [
                { id: "ju01", name: "ananas-lemmetje", img: juice1, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
                { id: "ju02", name: "chia-zuurzak", img: juice2, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
                { id: "ju03", name: "chia-aardbei", img: juice3, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
                { id: "ju04", name: "papaja-kers", img: juice4, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
                { id: "ju05", name: "awarra", img: juice5, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
                { id: "ju06", name: "basilicum-lemmetje-moringa", img: juice6, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
                { id: "ju07", name: "sopropo-zuurzak-moringa", img: juice7, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] },
                { id: "ju08", name: "avocado-ananas-moringa", img: juice8, category: "juices", options: [{ label: "350 ml", price: 100 }, { label: "1000 ml", price: 230 }] }
            ]
        },
        {
            id: "smoothies",
            title: "Smoothies",
            items: [
                { id: "sm01", name: "ananas-framboos-bacove", img: smoothie9, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
                { id: "sm02", name: "zuurzak-aardbei-bacove", img: smoothie10, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
                { id: "sm03", name: "manja-markoesa-bacove", img: smoothie11, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
                { id: "sm04", name: "awarra-bacove", img: smoothie12, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
                { id: "sm05", name: "podosiri-kers-bacove", img: smoothie13, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
                { id: "sm06", name: "spinazie-kers-bacove-moringa", img: smoothie14, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
                { id: "sm07", name: "sopropo-pommeciter-bacove-moringa", img: smoothie15, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] },
                { id: "sm08", name: "komkommer-gember-lemmetje-moringa", img: smoothie16, category: "smoothies", options: [{ label: "350 ml", price: 115 }, { label: "1000 ml", price: 260 }] }
            ]
        }
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
    cleanseAndHeal: [
        {
            id: "cleanseAndHeal",
            title: "Cleanse & Heal",
            items: [
                { id: "ch01", name: "gember-citroengras", img: comboshots, category: "cleanse", options: [{ label: "3x 125 ml", price: 850 }] },
                { id: "ch02", name: "gember-lemmetje", img: combojuice, category: "cleanse", options: [{ label: "3x 350 ml", price: 850 }] },
                { id: "ch03", name: "kurkuma-kers", img: combovit, category: "cleanse", options: [{ label: "3x 1000 ml", price: 850 }] }
            ]
        }
    ],
    sappenkuur: [
        { id: "sk01", name: "1-daagse", img: "", category: "detox", options: [{ label: "8 flessen + 1 shot GRATIS", price: 850 }] },
        { id: "sk02", name: "3-daagse", img: "", category: "detox", options: [{ label: "24 flessen + 3 shots GRATIS", price: 2500 }] },
        { id: "sk03", name: "5-daagse", img: "", category: "detox", options: [{ label: "40 flessen + 5 shots GRATIS", price: 4100 }] },
        { id: "sk04", name: "7-daagse", img: "", category: "detox", options: [{ label: "56 flessen + 7 shots GRATIS", price: 5700 }] }
    ],
    weeklyDeal: {
        id: "wd01",
        name: "gember-citroengras",
        img: vit1,
        category: "specials",
        options: [{ label: "1000 ml", price: 125 }]
    }
};

// --- API Functies ---

// Simuleer een netwerkvertraging
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


// Wanneer de .NET developer klaar is, verander je in getFullMenu de code naar fetch('https://api.lyb.com/products') en de rest van je hele applicatie blijft gewoon werken.

// // Voorbeeld van een voorbereide API call
// export const fetchMenu = async (): Promise<CategoryData[]> => {
//   // Straks vervang je dit door: const res = await fetch('https://api.lyb.com/menu');
//   // Voor nu simuleren we de vertraging van een server:
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(mockData), 500); 
//   });
// };

export const getFullMenu = async () => {
  await delay(800); // 0.8 seconde 'laadtijd'
  return MOCK_DATA;
};

export const getJuicesAndSmoothies = async (): Promise<CategoryData[]> => {
    await delay(500);
    return MOCK_DATA.juicesAndSmoothies;
};

export const getWellnessShots = async (): Promise<Product[]> => {
    await delay(600);
    return MOCK_DATA.wellnessShots;
};

export const getVitamineWater = async (): Promise<Product[]> => {
    await delay(600);
    return MOCK_DATA.vitamineWater;
};

export const getCleanseAndHeal = async (): Promise<CategoryData[]> => {
    await delay(600);
    return MOCK_DATA.cleanseAndHeal;
};

export const getSappenkuren = async (): Promise<Product[]> => {
    await delay(600);
    return MOCK_DATA.sappenkuur;
};