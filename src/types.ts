export interface ProductVolumeOption {
  volume: string;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  subcategory: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  volume: string;
  volumeOptions: ProductVolumeOption[];
  rating: number;
  reviewsCount: number;
  badge?: string; // 'Best-seller' | 'BIO' | 'Nouveauté' | 'Éco-recharge'
  badgeType?: 'bestseller' | 'bio' | 'new' | 'eco';
  image: string;
  secondaryImage?: string;
  origin: string;
  labels: string[]; // e.g. ['Cosmébio', '100% Naturel', 'Formulé en Tunisie']
  description: string;
  benefits: string[];
  inci: string;
  usageTips: string;
  texture: string;
  isFavorite?: boolean;
}

export interface SubCategoryItem {
  id: string;
  label: string;
  badge?: string;
}

export interface SubCategoryGroup {
  id: string;
  title: string;
  items: SubCategoryItem[];
}

export interface Category {
  id: string;
  label: string;
  slug: string;
  iconName?: string;
  featured?: boolean;
  highlightBadge?: string;
  description?: string;
  image?: string;
  groups?: SubCategoryGroup[];
}

export interface CartItem {
  product: Product;
  selectedVolume: string;
  selectedPrice: number;
  quantity: number;
}

export interface DIYRecipe {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: 'Très facile' | 'Facile' | 'Intermédiaire';
  timeMinutes: number;
  costEstimate: number; // in euros
  image: string;
  benefits: string[];
  description: string;
  conservationMonths: number;
  ingredients: {
    productId?: string;
    name: string;
    dosage: string;
    role: string;
  }[];
  steps: string[];
  equipmentNeeded: string[];
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  subtext: string;
  options: {
    id: string;
    label: string;
    description: string;
    icon: string;
    recommendedProductIds: string[];
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  recommendedProductIds?: string[];
  suggestedPrompts?: string[];
  promoCode?: string;
}
