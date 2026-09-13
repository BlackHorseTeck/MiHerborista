import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  MapPin, 
  Sparkles, 
  FlaskConical, 
  ChevronDown, 
  X,
  Check,
  ChevronRight,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { Category } from '../types';
import { CATEGORIES_DATA } from '../data/categories';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenDiagnostic: () => void;
  onOpenRecipes: () => void;
  onOpenSearch: () => void;
  onOpenChat?: () => void;
  onSelectCategory: (categoryId: string, subcategoryId?: string) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  activeCategoryId: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onOpenCart,
  onOpenWishlist,
  onOpenDiagnostic,
  onOpenRecipes,
  onOpenSearch,
  onOpenChat,
  onSelectCategory,
  cartCount,
  cartTotal,
  wishlistCount,
  activeCategoryId
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const announcements = [
    "🌿 LIVRAISON OFFERTE dès 35 DT d'achat sur toute la Tunisie",
    "📦 Retrait gratuit en 1h dans nos boutiques MiHerborista",
    "✨ Plus de 2000 recettes cosmétiques 100% naturelles & testées"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const handleMouseEnterCategory = (cat: Category) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setHoveredCategory(cat);
  };

  const handleMouseLeaveCategory = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 180);
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white shadow-xs">
      {/* Top Notice / Announcement Bar */}
      <div className="bg-[#152A21] text-white text-[11px] font-medium transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex-1 text-center md:text-left transition-all duration-300">
            <span className="font-semibold">{announcements[announcementIndex]}</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-white/90 text-xs">
            {onOpenChat && (
              <button
                type="button"
                onClick={onOpenChat}
                className="hover:text-white flex items-center gap-1.5 transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full font-semibold text-[#f7f4ee]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#52a474] animate-pulse"></span>
                <MessageCircle className="w-3.5 h-3.5 text-[#d69837]" />
                <span>Conseillère IA Sonia</span>
              </button>
            )}
            <button
              type="button"
              onClick={onOpenDiagnostic}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnostic de peau</span>
            </button>
            <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
              <MapPin className="w-3.5 h-3.5" />
              <span>Boutiques Tunisie</span>
            </div>
            <span className="text-white/40">|</span>
            <span className="font-semibold text-white">TN / DT</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="border-b border-[#ece8e0] bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 md:gap-8">
          
          {/* Mobile Menu Trigger & Mobile Search */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="open-mobile-menu-btn"
              type="button"
              onClick={onOpenMobileMenu}
              className="p-2 -ml-2 rounded-lg text-[#2d2a2a] hover:bg-[#faf7f2] flex items-center gap-1.5 focus:outline-none"
              aria-label="Ouvrir le menu de navigation"
            >
              <Menu className="w-6 h-6 text-[#2d2a2a]" />
              <span className="text-xs font-semibold uppercase tracking-wider hidden xs:inline text-[#2d2a2a]">
                Menu
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-[#2d2a2a] hover:bg-[#faf7f2] focus:outline-none"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* MiHerborista Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left flex flex-col justify-center">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex flex-col items-center lg:items-start group"
            >
              <div className="flex items-center font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#152A21]">
                <span>Mi</span>
                <span className="text-[#152A21] underline decoration-[#152A21]/40 decoration-2 underline-offset-4">Herborista</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.2em] text-[#8a8682] font-sans -mt-1 font-semibold">
                Cosmétique naturelle & DIY
              </span>
            </a>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-4">
            <div 
              onClick={onOpenSearch}
              className="w-full relative flex items-center cursor-pointer group"
            >
              <div className="w-full bg-[#f4f1ec] group-hover:bg-[#eeeae2] border border-transparent group-hover:border-[#e0dcd4] rounded-full py-2.5 pl-11 pr-24 text-xs text-[#6e6b68] flex items-center transition-all">
                <Search className="w-4 h-4 text-[#8a8682] absolute left-4" />
                <span>Rechercher un produit, ingrédient, recette, actif...</span>
              </div>
              <span className="absolute right-2.5 py-1 px-3 bg-[#152A21] text-white text-[11px] font-semibold rounded-full hover:bg-[#0e1d16] transition-colors">
                Chercher
              </span>
            </div>
          </div>

          {/* Right Action Icons: Boutiques, Compte, Favoris, Panier */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Desktop Boutiques */}
            <div className="hidden xl:flex flex-col items-center text-center px-2 py-1 text-[#2d2a2a] hover:text-[#152A21] cursor-pointer transition-colors">
              <MapPin className="w-5 h-5 text-[#6e6b68]" />
              <span className="text-[11px] font-medium mt-0.5">Boutiques</span>
            </div>

            {/* Account link */}
            <div className="hidden sm:flex flex-col items-center text-center px-2 py-1 text-[#2d2a2a] hover:text-[#152A21] cursor-pointer transition-colors">
              <User className="w-5 h-5 text-[#6e6b68]" />
              <span className="text-[11px] font-medium mt-0.5">Mon compte</span>
            </div>

            {/* Wishlist Button */}
            <button 
              id="header-wishlist-btn"
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#2d2a2a] hover:text-[#152A21] rounded-full hover:bg-[#faf7f2] cursor-pointer transition-colors focus:outline-none"
              title="Mes favoris"
              aria-label={`Mes favoris (${wishlistCount})`}
            >
              <Heart className={`w-5 h-5 transition-colors ${wishlistCount > 0 ? 'text-[#152A21] fill-[#152A21]/20' : 'text-[#6e6b68]'}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#152A21] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-2xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Bag */}
            <button
              id="header-cart-btn"
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-2.5 bg-[#faf7f2] hover:bg-[#f2ede4] border border-[#e8e4dc] rounded-full py-1.5 px-3 sm:px-3.5 transition-all text-[#2d2a2a]"
              aria-label="Voir mon panier"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#152A21]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#152A21] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden md:flex flex-col text-left leading-none">
                <span className="text-[10px] text-[#8a8682]">Panier</span>
                <span className="text-xs font-bold text-[#2d2a2a]">
                  {cartTotal.toFixed(2).replace('.', ',')} DT
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Horizontal Navigation Category Menu */}
      <nav className="hidden lg:block bg-white border-b border-[#ece8e0] relative">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-between text-xs font-medium tracking-normal text-[#2d2a2a]">
            
            {/* All categories trigger */}
            <li 
              onMouseEnter={() => handleMouseEnterCategory(CATEGORIES_DATA[0])}
              onMouseLeave={handleMouseLeaveCategory}
            >
              <button
                type="button"
                onClick={() => onSelectCategory('all')}
                className={`py-3 px-2 flex items-center gap-1.5 font-semibold transition-colors ${
                  activeCategoryId === 'all' ? 'text-[#152A21] border-b-2 border-[#152A21]' : 'hover:text-[#152A21]'
                }`}
              >
                <span>Tous les produits</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8a8682]" />
              </button>
            </li>

            {/* Individual categories */}
            {CATEGORIES_DATA.map((cat) => (
              <li
                key={cat.id}
                onMouseEnter={() => handleMouseEnterCategory(cat)}
                onMouseLeave={handleMouseLeaveCategory}
              >
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`py-3 px-2 flex items-center gap-1 transition-colors whitespace-nowrap ${
                    activeCategoryId === cat.id ? 'text-[#152A21] font-bold border-b-2 border-[#152A21]' : 'hover:text-[#152A21]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.highlightBadge && (
                    <span className="text-[9px] font-bold text-[#152A21] bg-[#eaf1ed] px-1 py-0.2 rounded">
                      {cat.highlightBadge}
                    </span>
                  )}
                </button>
              </li>
            ))}

            {/* Recipes shortcut */}
            <li>
              <button
                type="button"
                onClick={onOpenRecipes}
                className="py-3 px-2 flex items-center gap-1.5 text-[#152A21] font-semibold hover:text-[#0e1d16] transition-colors"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Recettes & Tutos</span>
              </button>
            </li>

            {/* Diagnostic shortcut with badge */}
            <li>
              <button
                type="button"
                onClick={onOpenDiagnostic}
                className="py-3 px-2.5 flex items-center gap-1.5 text-[#152A21] font-semibold bg-[#eaf1ed] hover:bg-[#dbe9e0] rounded-md my-1 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#152A21]" />
                <span>Diagnostic de peau</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Mega Menu Dropdown Panel */}
        {hoveredCategory && (
          <div
            onMouseEnter={() => {
              if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeaveCategory}
            className="absolute top-full left-0 right-0 bg-white border-b border-[#e8e4dc] shadow-xl z-50 transition-all duration-200"
          >
            <div className="max-w-7xl mx-auto px-8 py-7">
              <div className="flex items-center justify-between border-b border-[#f0ece5] pb-3 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#2d2a2a]">{hoveredCategory.label}</h3>
                  <p className="text-xs text-[#6e6b68] mt-0.5">{hoveredCategory.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(hoveredCategory.id);
                    setHoveredCategory(null);
                  }}
                  className="text-xs font-semibold text-[#152A21] hover:underline flex items-center gap-1"
                >
                  <span>Voir tout {hoveredCategory.label}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-8">
                {/* Column Groups */}
                {hoveredCategory.groups?.map((group) => (
                  <div key={group.id} className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8a8682]">
                      {group.title}
                    </h4>
                    <ul className="space-y-2 text-xs">
                      {group.items.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => {
                              onSelectCategory(hoveredCategory.id, item.id);
                              setHoveredCategory(null);
                            }}
                            className="text-left text-[#4a4744] hover:text-[#152A21] hover:translate-x-0.5 transition-all flex items-center justify-between w-full"
                          >
                            <span>{item.label}</span>
                            {item.badge && (
                              <span className="text-[10px] font-semibold text-[#152A21] bg-[#eaf1ed] px-1.5 py-0.5 rounded">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Promotional / Visual Card Column */}
                {hoveredCategory.image && (
                  <div className="bg-[#faf7f2] rounded-xl p-4 border border-[#e8e4dc] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#152A21] bg-white px-2 py-0.5 rounded-full border border-[#e8e4dc]">
                        Sélection du moment
                      </span>
                      <h4 className="text-sm font-bold text-[#2d2a2a] mt-2">
                        Les Essentiels {hoveredCategory.label}
                      </h4>
                      <p className="text-xs text-[#6e6b68] mt-1 line-clamp-2">
                        Formules épurées, testées sous contrôle dermatologique et au juste prix.
                      </p>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-lg aspect-4/3 relative">
                      <img 
                        src={hoveredCategory.image} 
                        alt={hoveredCategory.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCategory(hoveredCategory.id);
                        setHoveredCategory(null);
                      }}
                      className="mt-3 w-full py-2 bg-[#152A21] text-white rounded-lg text-xs font-semibold hover:bg-[#0e1d16] transition-colors"
                    >
                      Découvrir la gamme
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
