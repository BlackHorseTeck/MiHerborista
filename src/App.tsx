import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  FlaskConical, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Leaf, 
  Clock, 
  Award, 
  Filter, 
  SlidersHorizontal,
  Check,
  ShoppingBag,
  Heart,
  Droplets,
  PackageCheck
} from 'lucide-react';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductModal } from './components/ProductModal';
import { DiagnosticModal } from './components/DiagnosticModal';
import { RecipeModal } from './components/RecipeModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

import { Product, CartItem, DIYRecipe } from './types';
import { PRODUCTS_DATA } from './data/products';
import { CATEGORIES_DATA, QUICK_CATEGORY_SHORTCUTS } from './data/categories';
import { DIY_RECIPES_DATA } from './data/recipes';

export default function App() {
  // Modal & Drawer visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<DIYRecipe | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS_DATA[0], // Sérum Acide Hyaluronique
      selectedVolume: '30 ml',
      selectedPrice: 5.95,
      quantity: 1
    }
  ]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set(['serum-acide-hyaluronique']));

  // Filtering and navigation state
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all');
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | null>(null);
  const [selectedFilterTag, setSelectedFilterTag] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('popular');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger temporary toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart management
  const handleAddToCart = (product: Product, volume: string, price: number) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVolume === volume
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedVolume: volume,
            selectedPrice: price,
            quantity: 1
          }
        ];
      }
    });
    triggerToast(`✓ ${product.name} (${volume}) ajouté au panier`);
  };

  const handleAddMultipleToCart = (items: { product: Product; volume: string; price: number }[]) => {
    items.forEach(item => {
      handleAddToCart(item.product, item.volume, item.price);
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, volume: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId && item.selectedVolume === volume) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string, volume: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedVolume === volume)
      )
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        triggerToast('Produit retiré de vos favoris');
      } else {
        next.add(productId);
        triggerToast('Produit ajouté à vos favoris ♡');
      }
      return next;
    });
  };

  const handleAddAllWishlistToCart = () => {
    const wishlistedProducts = PRODUCTS_DATA.filter((p) => wishlist.has(p.id));
    if (wishlistedProducts.length === 0) return;

    setCart((prevCart) => {
      let updated = [...prevCart];
      wishlistedProducts.forEach((p) => {
        const defaultVol = p.volumeOptions[0]?.volume || p.volume;
        const defaultPrice = p.volumeOptions[0]?.price || p.price;
        const existingIndex = updated.findIndex(
          (item) => item.product.id === p.id && item.selectedVolume === defaultVol
        );
        if (existingIndex > -1) {
          updated[existingIndex].quantity += 1;
        } else {
          updated.push({
            product: p,
            selectedVolume: defaultVol,
            selectedPrice: defaultPrice,
            quantity: 1
          });
        }
      });
      return updated;
    });
    setIsWishlistOpen(false);
    setIsCartOpen(true);
    triggerToast(`✓ ${wishlistedProducts.length} produit(s) des favoris ajouté(s) au panier`);
  };

  const handleClearWishlist = () => {
    setWishlist(new Set());
    triggerToast('Vos favoris ont été vidés');
  };

  // Category navigation handler
  const handleSelectCategory = (catId: string, subCatId?: string) => {
    setActiveCategoryId(catId);
    setActiveSubcategoryId(subCatId || null);
    setSelectedFilterTag('all');

    // Smooth scroll down to products section if clicked from menu
    const target = document.getElementById('products-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered and sorted products
  const displayedProducts = useMemo(() => {
    let list = [...PRODUCTS_DATA];

    // Filter by category
    if (activeCategoryId !== 'all') {
      list = list.filter((p) => p.category === activeCategoryId);
    }

    // Filter by subcategory
    if (activeSubcategoryId) {
      list = list.filter((p) => p.subcategory === activeSubcategoryId);
    }

    // Filter by tag pills
    if (selectedFilterTag === 'wishlist') {
      list = list.filter((p) => wishlist.has(p.id));
    } else if (selectedFilterTag === 'bio') {
      list = list.filter((p) => p.badgeType === 'bio' || p.labels.some(l => l.toLowerCase().includes('bio')));
    } else if (selectedFilterTag === 'bestseller') {
      list = list.filter((p) => p.badgeType === 'bestseller');
    } else if (selectedFilterTag === 'serums') {
      list = list.filter((p) => p.subcategory === 'serums-concentres');
    } else if (selectedFilterTag === 'cheveux') {
      list = list.filter((p) => p.category === 'cheveux');
    }

    // Sorting
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: Popularity / Reviews count
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [activeCategoryId, activeSubcategoryId, selectedFilterTag, sortOption]);

  const cartTotal = cart.reduce((sum, item) => sum + item.selectedPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#2d2a2a] selection:bg-[#152A21]/20 selection:text-[#152A21]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#2d2a2a] text-white py-2.5 px-4 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-[#444] animate-bounce-short">
          <Check className="w-4 h-4 text-[#152A21]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        onOpenRecipes={() => {
          setSelectedRecipe(DIY_RECIPES_DATA[0]);
          setIsRecipeModalOpen(true);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onSelectCategory={handleSelectCategory}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.size}
        activeCategoryId={activeCategoryId}
      />

      {/* Mobile Menu (Drill-Down sliding behavior identical to original site) */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={handleSelectCategory}
        onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
        onOpenRecipes={() => {
          setSelectedRecipe(DIY_RECIPES_DATA[0]);
          setIsRecipeModalOpen(true);
        }}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.size}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* HERO SECTION: Warm, refined natural cosmetics atmosphere */}
        <section className="relative overflow-hidden bg-[#faf4ed] border-b border-[#ece6dc]">
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Hero Text */}
              <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-[#e5ded4] rounded-full text-xs font-semibold text-[#152A21] shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#152A21] animate-pulse" />
                  <span>L'expertise naturelle au juste prix depuis 2026</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#2d2a2a] leading-tight tracking-tight">
                  Prenez soin de vous <br className="hidden sm:inline" />
                  avec <span className="text-[#152A21] italic font-normal">la puissance du végétal</span>.
                </h1>

                <p className="text-sm md:text-base text-[#6e6b68] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Sérums ultra-concentrés, huiles pures bio certifiées et bases personnalisables : des soins d’une efficacité clinique sans compromis, développés dans notre laboratoire en Tunisie.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleSelectCategory('soins-visage', 'serums-concentres')}
                    className="w-full sm:w-auto py-3 px-6 bg-[#152A21] hover:bg-[#0e1d16] text-white text-xs md:text-sm font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                  >
                    <span>Découvrir les Sérums Cultes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsDiagnosticOpen(true)}
                    className="w-full sm:w-auto py-3 px-6 bg-white hover:bg-[#f5efe6] text-[#2d2a2a] hover:text-[#152A21] border border-[#d8d0c2] text-xs md:text-sm font-bold rounded-xl shadow-2xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#152A21]" />
                    <span>Faire mon diagnostic de peau</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsChatOpen(true)}
                    className="w-full sm:w-auto py-3 px-5 bg-[#faf4ed] hover:bg-[#f0e6d8] text-[#152A21] border border-[#d8d0c2] text-xs md:text-sm font-bold rounded-xl shadow-2xs flex items-center justify-center gap-2 transition-all"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#3b5f47] animate-pulse" />
                    <span>Conseillère IA Sonia</span>
                  </button>
                </div>

                {/* Micro guarantees */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3 text-[11px] text-[#6e6b68] font-medium">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#3b5f47]" />
                    <span>100% d'origine naturelle</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#3b5f47]" />
                    <span>Formulé en Tunisie</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#3b5f47]" />
                    <span>Dès 3,90 DT</span>
                  </div>
                </div>
              </div>

              {/* Hero Visual Featured Product Spotlight */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md bg-white rounded-2xl p-4 sm:p-5 border border-[#e5dfd4] shadow-lg">
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-[#152A21] text-white px-2.5 py-1 rounded-full shadow-xs">
                      N°1 des Ventes Tunisie
                    </span>
                  </div>

                  <div className="aspect-square rounded-xl overflow-hidden bg-[#faf8f5] relative group">
                    <img
                      src={PRODUCTS_DATA[0].image}
                      alt={PRODUCTS_DATA[0].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-xs p-2.5 rounded-lg border border-[#ece8e0] shadow-xs">
                      <div className="flex items-center justify-between text-xs font-bold text-[#2d2a2a]">
                        <span>Sérum Acide Hyaluronique 3,5%</span>
                        <span className="text-[#152A21]">5,95 DT</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#8a8682] mt-0.5">
                        <Star className="w-3 h-3 fill-[#d69837] text-[#d69837]" />
                        <span className="font-semibold text-[#2d2a2a]">4.8/5</span>
                        <span>(32 853 avis clients)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-xs text-[#6e6b68]">Flacon verre ambré 30 ml</span>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(PRODUCTS_DATA[0], '30 ml', 5.95)}
                      className="py-1.5 px-4 bg-[#152A21] hover:bg-[#0e1d16] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Ajouter</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* AI Botanist Advisory & Exclusive Welcome Discount Strip */}
        <div className="bg-[#152A21] text-[#f7f4ee] py-2.5 px-4 border-b border-[#2d4d3d]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#52a474] animate-pulse"></span>
              <span className="font-semibold">Sonia, experte botaniste MiHerborista est en ligne</span>
              <span className="text-white/60 hidden md:inline">• Diagnostic express & routines sur-mesure</span>
            </div>
            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-1.5 text-[#d69837] hover:text-white font-bold transition-colors underline sm:no-underline sm:bg-white/10 sm:px-3 sm:py-1 sm:rounded-full"
            >
              <span>Discuter avec Sonia (-10% code BIENVENUE10)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CIRCULAR CATEGORY SHORTCUTS CAROUSEL */}
        <section className="py-8 bg-white border-b border-[#ece8e0]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm md:text-base font-bold text-[#2d2a2a] uppercase tracking-wider">
                Nos rayons phares
              </h2>
              <button
                type="button"
                onClick={() => handleSelectCategory('all')}
                className="text-xs font-semibold text-[#152A21] hover:underline flex items-center gap-1"
              >
                <span>Tout explorer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Horizontal Scrollable Icons */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
              {QUICK_CATEGORY_SHORTCUTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectCategory(item.categoryId, item.subcategoryId)}
                  className="flex flex-col items-center shrink-0 group focus:outline-none"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-0.5 border-2 border-transparent group-hover:border-[#152A21] transition-all overflow-hidden bg-[#faf8f5] shadow-2xs">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs font-semibold text-[#2d2a2a] group-hover:text-[#152A21] mt-2 transition-colors text-center max-w-20 sm:max-w-24 truncate">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#8a8682] font-medium">
                    {item.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* BESTSELLERS CATALOG SECTION */}
        <section id="products-section" className="py-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#ece8e0]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#152A21] bg-[#eaf1ed] px-2.5 py-0.5 rounded">
                  {activeCategoryId === 'all' ? 'Sélection Complète' : activeCategoryId}
                </span>
                <span className="text-xs text-[#8a8682]">
                  {displayedProducts.length} produit{displayedProducts.length > 1 ? 's' : ''}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2d2a2a] mt-1">
                {activeCategoryId === 'all' ? 'Nos Produits Cultes & Best-Sellers' : 'Nos Soins & Ingrédients'}
              </h2>
            </div>

            {/* Filter tags & Sorting Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold bg-[#faf8f5] p-1 rounded-lg border border-[#e8e4dc]">
                <button
                  type="button"
                  onClick={() => setSelectedFilterTag('all')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    selectedFilterTag === 'all'
                      ? 'bg-[#152A21] text-white shadow-2xs'
                      : 'text-[#6e6b68] hover:text-[#2d2a2a]'
                  }`}
                >
                  Tous
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilterTag('bestseller')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    selectedFilterTag === 'bestseller'
                      ? 'bg-[#152A21] text-white shadow-2xs'
                      : 'text-[#6e6b68] hover:text-[#2d2a2a]'
                  }`}
                >
                  Best-sellers
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilterTag('bio')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    selectedFilterTag === 'bio'
                      ? 'bg-[#152A21] text-white shadow-2xs'
                      : 'text-[#6e6b68] hover:text-[#2d2a2a]'
                  }`}
                >
                  100% BIO
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilterTag('serums')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    selectedFilterTag === 'serums'
                      ? 'bg-[#152A21] text-white shadow-2xs'
                      : 'text-[#6e6b68] hover:text-[#2d2a2a]'
                  }`}
                >
                  Sérums Visage
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilterTag('wishlist')}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    selectedFilterTag === 'wishlist'
                      ? 'bg-[#152A21] text-white shadow-2xs'
                      : 'text-[#6e6b68] hover:text-[#2d2a2a]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${selectedFilterTag === 'wishlist' ? 'fill-white text-white' : wishlist.size > 0 ? 'text-[#152A21] fill-[#152A21]/30' : ''}`} />
                  <span>Mes Favoris {wishlist.size > 0 && `(${wishlist.size})`}</span>
                </button>
              </div>

              {/* Sort dropdown */}
              <div className="flex items-center gap-1 text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8a8682]" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white border border-[#e0dcd4] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#2d2a2a] focus:outline-none focus:ring-1 focus:ring-[#152A21]"
                >
                  <option value="popular">Popularité (avis)</option>
                  <option value="rating">Meilleures notes (★)</option>
                  <option value="price-asc">Prix : croissant</option>
                  <option value="price-desc">Prix : décroissant</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid or Empty State */}
          {displayedProducts.length === 0 ? (
            <div className="py-16 px-4 text-center bg-[#fbf9f5] rounded-2xl border border-[#ece8e0] max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#f0eae1] flex items-center justify-center text-[#152A21] mx-auto mb-3">
                <Heart className="w-6 h-6 text-[#8a8682]" />
              </div>
              <h3 className="text-sm font-bold text-[#2d2a2a] mb-1">
                {selectedFilterTag === 'wishlist' ? 'Aucun produit dans vos favoris' : 'Aucun produit trouvé'}
              </h3>
              <p className="text-xs text-[#6e6b68] mb-4">
                {selectedFilterTag === 'wishlist' 
                  ? 'Cliquez sur le cœur ♡ de n’importe quel soin pour l’ajouter à vos favoris.' 
                  : 'Essayez de modifier vos filtres ou explorez tout notre catalogue.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategoryId('all');
                  setActiveSubcategoryId(null);
                  setSelectedFilterTag('all');
                }}
                className="py-2 px-5 bg-[#152A21] text-white text-xs font-semibold rounded-full hover:bg-[#0e1d16] transition-colors"
              >
                Voir tous les produits
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onOpenQuickView={(p) => setQuickViewProduct(p)}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlist.has(product.id)}
                />
              ))}
            </div>
          )}

          {/* Reset Filters CTA if filtered */}
          {(activeCategoryId !== 'all' || selectedFilterTag !== 'all') && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setActiveCategoryId('all');
                  setActiveSubcategoryId(null);
                  setSelectedFilterTag('all');
                }}
                className="py-2.5 px-6 rounded-xl border border-[#152A21] text-[#152A21] hover:bg-[#eaf1ed] text-xs font-bold transition-colors"
              >
                Réinitialiser les filtres et voir tout le catalogue
              </button>
            </div>
          )}
        </section>

        {/* INTERACTIVE DIAGNOSTIC PROMO BANNER */}
        <section className="py-12 bg-[#faf7f2] border-y border-[#ece6dc]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e8e4dc] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-xl space-y-3 text-center lg:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#152A21] bg-[#eaf1ed] px-3 py-1 rounded-full border border-[#cbe5d5]">
                  Diagnostic Beauté Gratuit
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#2d2a2a]">
                  Quelle est la routine naturelle faite pour votre peau ?
                </h3>
                <p className="text-xs sm:text-sm text-[#6e6b68] leading-relaxed">
                  En répondant à 3 questions rapides, nos experts identifient vos besoins cutanés et formulent un protocole personnalisé avec les soins et actifs MiHerborista adaptés.
                </p>
                <div className="pt-2 flex justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={() => setIsDiagnosticOpen(true)}
                    className="py-3 px-6 bg-[#152A21] hover:bg-[#0e1d16] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 transition-all uppercase tracking-wider"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Commencer mon diagnostic en 2 min</span>
                  </button>
                </div>
              </div>

              {/* Graphical illustration cards */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
                <div className="bg-[#faf8f5] p-4 rounded-xl border border-[#ece8e0] text-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-[#eaf1ed] text-[#152A21] flex items-center justify-center mx-auto mb-1">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-[#2d2a2a]">Anti-imperfections</div>
                  <div className="text-[10px] text-[#8a8682]">Niacinamide + Zinc</div>
                </div>

                <div className="bg-[#faf8f5] p-4 rounded-xl border border-[#ece8e0] text-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-[#eef6f1] text-[#3b5f47] flex items-center justify-center mx-auto mb-1">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-[#2d2a2a]">Hydratation & Anti-âge</div>
                  <div className="text-[10px] text-[#8a8682]">Acide Hyaluronique 3.5%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIY WORKSHOP & POPULAR RECIPES SECTION */}
        <section className="py-12 max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#3b5f47]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3b5f47]">
                  L'Atelier Cosmétique Maison
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2d2a2a] mt-1">
                Recettes DIY Cultes à Réaliser en Quelques Minutes
              </h2>
              <p className="text-xs text-[#6e6b68] mt-1 max-w-xl">
                Créer ses cosmétiques soi-même, c'est simple, économique et 100% transparent. Testées et approuvées par notre laboratoire.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedRecipe(DIY_RECIPES_DATA[0]);
                setIsRecipeModalOpen(true);
              }}
              className="text-xs font-semibold text-[#152A21] hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              <span>Voir les 2000 recettes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recipes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIY_RECIPES_DATA.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => {
                  setSelectedRecipe(recipe);
                  setIsRecipeModalOpen(true);
                }}
                className="bg-white rounded-2xl border border-[#ece8e0] hover:border-[#152A21]/60 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-16/10 relative overflow-hidden bg-[#faf8f5]">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#2d2a2a] text-[10px] font-bold uppercase px-2.5 py-1 rounded shadow-xs">
                      {recipe.category}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-[#6e6b68] font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#152A21]" />
                        {recipe.timeMinutes} min
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#3b5f47]" />
                        {recipe.difficulty}
                      </span>
                      <span>•</span>
                      <span className="text-[#152A21] font-bold">
                        ~{recipe.costEstimate.toFixed(2).replace('.', ',')} DT / dose
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#2d2a2a] group-hover:text-[#152A21] transition-colors leading-snug">
                      {recipe.title}
                    </h3>

                    <p className="text-xs text-[#6e6b68] line-clamp-2">
                      {recipe.subtitle}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-2 border-t border-[#f4f0e8] flex items-center justify-between">
                  <span className="text-[11px] text-[#8a8682]">
                    {recipe.ingredients.length} ingrédients requis
                  </span>
                  <span className="text-xs font-bold text-[#152A21] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Voir la recette</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ECO-COMMITMENTS / ENGAGEMENTS MIHERBORISTA */}
        <section className="py-12 bg-[#faf4ed] border-t border-[#ece6dc]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3b5f47] bg-[#eef6f1] px-3 py-1 rounded-full border border-[#cce4d6]">
                Nos Engagements
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2d2a2a] mt-2">
                Le juste prix pour vous, la juste rémunération pour les producteurs
              </h2>
              <p className="text-xs sm:text-sm text-[#6e6b68] mt-2">
                Depuis plus de 25 ans, nous bâtissons des partenariats durables avec plus de 300 producteurs et distillateurs à travers le monde.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#e8e4dc] shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#eaf1ed] text-[#152A21] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#2d2a2a]">Direct Producteurs & Laboratoire</h3>
                <p className="text-xs text-[#6e6b68] leading-relaxed">
                  En supprimant les intermédiaires de distribution conventionnels, nous rendons les soins naturels d’exception accessibles au plus grand nombre.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#e8e4dc] shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#eef6f1] text-[#3b5f47] flex items-center justify-center">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#2d2a2a]">Flaconnage Verre & Éco-recharges</h3>
                <p className="text-xs text-[#6e6b68] leading-relaxed">
                  Tous nos flacons en verre ambré sont réutilisables à l'infini et protègent les actifs de la lumière. Nos éco-recharges réduisent de 80% l'usage de plastique.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#e8e4dc] shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#eaf1ed] text-[#152A21] flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-[#2d2a2a]">Formules 100% Clean & Efficacité Clinique</h3>
                <p className="text-xs text-[#6e6b68] leading-relaxed">
                  Sans silicones, sans dérivés pétrochimiques, sans parfums synthétiques. Chaque actif fait l'objet de tests d'efficacité instrumentaux rigoureux.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VERIFIED CUSTOMER REVIEWS STRIP */}
        <section className="py-10 bg-white border-t border-[#ece8e0]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-1 text-[#d69837] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d69837]" />
                ))}
              </div>
              <h3 className="text-base font-bold text-[#2d2a2a]">
                Note moyenne 4.8 / 5 sur plus de 500 000 avis vérifiés
              </h3>
              <p className="text-xs text-[#8a8682]">
                Avis récoltés auprès de notre communauté de passionnés de beauté naturelle
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#ece8e0] text-xs space-y-2">
                <div className="flex items-center justify-between text-[#152A21]">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#d69837]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#8a8682]">Il y a 2 jours</span>
                </div>
                <p className="text-[#4a4744] italic">
                  « Le Sérum Acide Hyaluronique est magique. Ma peau est repulpée dès le matin et son prix est imbattable comparé aux marques de pharmacie. »
                </p>
                <div className="text-[11px] font-semibold text-[#2d2a2a]">
                  Camille D. <span className="text-[#3b5f47] font-normal">• Achat vérifié</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#ece8e0] text-xs space-y-2">
                <div className="flex items-center justify-between text-[#152A21]">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#d69837]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#8a8682]">Il y a 4 jours</span>
                </div>
                <p className="text-[#4a4744] italic">
                  « La Niacinamide a transformé mon grain de peau en 3 semaines. Plus de brillances et des pores beaucoup plus resserrés. Bravo MiHerborista. »
                </p>
                <div className="text-[11px] font-semibold text-[#2d2a2a]">
                  Thomas L. <span className="text-[#3b5f47] font-normal">• Achat vérifié</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#ece8e0] text-xs space-y-2">
                <div className="flex items-center justify-between text-[#152A21]">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#d69837]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#8a8682]">Il y a 1 semaine</span>
                </div>
                <p className="text-[#4a4744] italic">
                  « Livraison ultra rapide, flacons en verre très soignés. J'ai réalisé la chantilly de karité en suivant le tuto, un pur bonheur ! »
                </p>
                <div className="text-[11px] font-semibold text-[#2d2a2a]">
                  Sarah M. <span className="text-[#3b5f47] font-normal">• Achat vérifié</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onQuickAddProduct={handleAddToCart}
        recommendedProducts={PRODUCTS_DATA.filter(p => !cart.some(c => c.product.id === p.id))}
      />

      {/* Wishlist Slide-Over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={Array.from(wishlist)}
        products={PRODUCTS_DATA}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
        onClearWishlist={handleClearWishlist}
        onAddAllToCart={handleAddAllWishlistToCart}
      />

      {/* Product Quick View Modal */}
      <ProductModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.has(quickViewProduct.id) : false}
      />

      {/* Interactive Skin Diagnostic Modal */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        products={PRODUCTS_DATA}
        onAddProductsToCart={handleAddMultipleToCart}
      />

      {/* DIY Recipe Details Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        products={PRODUCTS_DATA}
        onAddProductsToCart={handleAddMultipleToCart}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS_DATA}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Footer */}
      <Footer />

      {/* AI Chatbot Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onClose={() => setIsChatOpen(false)}
        products={PRODUCTS_DATA}
        onAddToCart={handleAddToCart}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
        onOpenCart={() => setIsCartOpen(true)}
        cartTotal={cartTotal}
        cartItemIds={cart.map((c) => c.product.id)}
      />
    </div>
  );
}
