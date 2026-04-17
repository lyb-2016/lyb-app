export interface ProductOption {
  label: string; // bijv. "350 ml" of "7x 125 ml"
  price: number; // bijv. 100
}

export interface Product {
  id: string | number;
  name: string;
  img: string;
  description?: string;
  category: string;
  options: ProductOption[]; // Altijd een array, zelfs als er maar 1 optie is
}

export interface CategoryData {
  id: string;
  title: string;
  items: Product[];
}