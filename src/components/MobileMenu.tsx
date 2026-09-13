import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Search, 
  Sparkles, 
  FlaskConical, 
  MapPin, 
  Leaf, 
  HelpCircle, 
  Package, 
  Heart,
  Droplets,
  Scissors,
  Pill,
  Home,
  Check,
  MessageCircle
} from 'lucide-react';
import { Category, SubCategoryGroup, SubCategoryItem } from '../types';
import { CATEGORIES_DATA } from '../data/categories';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId: string, subcategoryId?: string) => void;
  onOpenDiagnostic: () => void;
  onOpenRecipes: () => void;
  onOpenChat?: () => void;
  onOpenWishlist?: () => void;
  wishlistCount?: number;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenDiagnostic,
  onOpenRecipes,
  onOpenChat,
  onOpenWishlist,
  wishlistCount = 0
}) => {
  // Navigation stack state: 0 = Root, 1 = Category details, 2 = Subcategory group details
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<SubCategoryGroup | null>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [searchQuery, setSearchQuery] = useState('');

  // Reset menu when closed
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentLevel(0);
      setSelectedCategory(null);
      setSelectedGroup(null);
      setDirection('forward');
    }, 300);
  };

  const handleDrillDownToCategory = (category: Category) => {
    setDirection('forward');
    setSelectedCategory(category);
    setCurrentLevel(1);
  };

  const handleDrillDownToGroup = (group: SubCategoryGroup) => {
    setDirection('forward');
    setSelectedGroup(group);
    setCurrentLevel(2);
  };

  const handleBack = () => {
    setDirection('backward');
    if (currentLevel === 2) {
      setCurrentLevel(1);
      setSelectedGroup(null);
    } else if (currentLevel === 1) {
      setCurrentLevel(0);
      setSelectedCategory(null);
    }
  };

  const handleCategorySelection = (catId: string, subCatId?: string) => {
    onSelectCategory(catId, subCatId);
    handleClose();
  };

  // Get icon by category id
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'soins-visage': return <Sparkles className="w-5 h-5 text-[#152A21]" />;
      case 'cheveux': return <Scissors className="w-5 h-5 text-[#152A21]" />;
      case 'aromatherapie': return <Droplets className="w-5 h-5 text-[#152A21]" />;
      case 'diy-cosmetique': return <FlaskConical className="w-5 h-5 text-[#152A21]" />;
      case 'corps-bain': return <Heart className="w-5 h-5 text-[#152A21]" />;
      case 'complements-sante': return <Pill className="w-5 h-5 text-[#152A21]" />;
      case 'maison-zero-dechet': return <Home className="w-5 h-5 text-[#152A21]" />;
      default: return <Leaf className="w-5 h-5 text-[#152A21]" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="az-mobile-menu-container" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={handleClose}
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="absolute top-0 bottom-0 left-0 w-[88%] max-w-sm bg-white shadow-2xl flex flex-col z-10"
          >
            {/* Top User & Action Header */}
            <div className="bg-[#faf7f2] border-b border-[#e8e4dc] px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-[#e8e4dc] flex items-center justify-center text-[#152A21] shadow-xs">
                  <User className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-xs text-[#6e6b68]">Bienvenue chez MiHerborista</div>
                  <button 
                    type="button" 
                    className="text-sm font-semibold text-[#2d2a2a] hover:text-[#152A21] text-left transition-colors"
                  >
                    Bonjour, <span className="underline decoration-[#152A21]/50">Identifiez-vous</span>
                  </button>
                </div>
              </div>
              <button
                id="close-mobile-menu-btn"
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6e6b68] hover:text-[#2d2a2a] hover:bg-[#ede8df] transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Search inside Mobile Menu */}
            <div className="px-4 py-3 border-b border-[#f0ece5] bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8a8682] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Rechercher un produit, ingrédient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      handleCategorySelection('all');
                    }
                  }}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#f4f1ec] rounded-md text-[#2d2a2a] placeholder-[#8a8682] focus:outline-none focus:ring-1 focus:ring-[#152A21] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Multi-Level Sliding Viewport */}
            <div className="relative flex-1 overflow-hidden bg-white">
              <AnimatePresence initial={false} custom={direction}>
                {/* LEVEL 0: Root Menu */}
                {currentLevel === 0 && (
                  <motion.div
                    key="level-0"
                    custom={direction}
                    initial={{ x: direction === 'forward' ? '-30%' : '-100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="absolute inset-0 overflow-y-auto"
                  >
                    {/* Header Label */}
                    <div className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#8a8682]">
                      Nos rayons
                    </div>

                    {/* All products shortcut */}
                    <button
                      type="button"
                      onClick={() => handleCategorySelection('all')}
                      className="w-full px-4 py-3 flex items-center justify-between text-left text-sm font-medium text-[#152A21] bg-[#faf7f2]/60 hover:bg-[#faf7f2] border-b border-[#f4f0e8] transition-colors"
                    >
                      <span className="font-semibold">Tous nos produits naturels</span>
                      <ChevronRight className="w-4 h-4 text-[#152A21]" />
                    </button>

                    {/* Mes Favoris shortcut */}
                    {onOpenWishlist && (
                      <button
                        id="mobile-menu-wishlist-btn"
                        type="button"
                        onClick={() => {
                          handleClose();
                          onOpenWishlist();
                        }}
                        className="w-full px-4 py-3 flex items-center justify-between text-left text-sm font-medium text-[#2d2a2a] hover:text-[#152A21] bg-white hover:bg-[#faf7f2] border-b border-[#f4f0e8] transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#152A21] fill-[#152A21]' : 'text-[#6e6b68]'}`} />
                          <span className="font-semibold">Mes Favoris</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {wishlistCount > 0 && (
                            <span className="bg-[#152A21] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                              {wishlistCount}
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-[#8a8682]" />
                        </div>
                      </button>
                    )}

                    {/* Categories List */}
                    <div className="divide-y divide-[#f4f0e8]">
                      {CATEGORIES_DATA.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleDrillDownToCategory(cat)}
                          className="w-full px-4 py-3.5 flex items-center justify-between text-left group hover:bg-[#faf9f6] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="p-1.5 rounded-md bg-[#f7f5f0] group-hover:bg-[#f0ece4] transition-colors">
                              {getCategoryIcon(cat.id)}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-[#2d2a2a] group-hover:text-[#152A21] transition-colors">
                                {cat.label}
                              </div>
                              {cat.highlightBadge && (
                                <span className="text-[10px] font-semibold text-[#152A21] bg-[#eaf1ed] px-1.5 py-0.5 rounded">
                                  {cat.highlightBadge}
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#a09c97] group-hover:text-[#2d2a2a] group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>

                    {/* Inspiring Sections */}
                    <div className="mt-3 pt-3 border-t border-[#ede8df] px-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#8a8682] mb-2">
                        Conseils & Expériences
                      </div>

                      <div className="space-y-1">
                        {onOpenChat && (
                          <button
                            type="button"
                            onClick={() => {
                              handleClose();
                              onOpenChat();
                            }}
                            className="w-full py-2.5 px-3 rounded-lg flex items-center justify-between text-left bg-[#152A21] text-white transition-colors shadow-2xs"
                          >
                            <div className="flex items-center gap-3">
                              <MessageCircle className="w-4 h-4 text-[#d69837]" />
                              <div className="text-xs font-bold">Conseillère Botaniste IA (Sonia)</div>
                            </div>
                            <span className="text-[10px] bg-[#d69837] text-[#152A21] px-1.5 py-0.5 rounded font-bold">
                              -10% promo
                            </span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            handleClose();
                            onOpenRecipes();
                          }}
                          className="w-full py-2.5 px-3 rounded-lg flex items-center gap-3 text-left hover:bg-[#faf7f2] text-[#2d2a2a] transition-colors"
                        >
                          <FlaskConical className="w-4 h-4 text-[#152A21]" />
                          <div className="text-xs font-semibold">Recettes & Tutos DIY (+2000)</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleClose();
                            onOpenDiagnostic();
                          }}
                          className="w-full py-2.5 px-3 rounded-lg flex items-center gap-3 text-left hover:bg-[#faf7f2] text-[#2d2a2a] transition-colors"
                        >
                          <Sparkles className="w-4 h-4 text-[#152A21]" />
                          <div className="text-xs font-semibold">Diagnostic Peau personnalisé</div>
                        </button>

                        <div className="py-2.5 px-3 rounded-lg flex items-center gap-3 text-left text-[#2d2a2a]">
                          <MapPin className="w-4 h-4 text-[#152A21]" />
                          <div className="text-xs font-medium">Nos 20 Boutiques & Ateliers</div>
                        </div>

                        <div className="py-2.5 px-3 rounded-lg flex items-center gap-3 text-left text-[#2d2a2a]">
                          <Leaf className="w-4 h-4 text-[#152A21]" />
                          <div className="text-xs font-medium">Engagements 100% Bio & Éthiques</div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom reassurance / Customer care */}
                    <div className="mt-4 p-4 bg-[#faf7f2] border-t border-[#ede8df] space-y-2 text-xs text-[#6e6b68]">
                      <div className="flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-[#152A21]" />
                        <span>Livraison offerte dès 35 DT d’achat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5 text-[#152A21]" />
                        <span>Besoin d’aide ? Service client réactif</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* LEVEL 1: Category Details Screen (Drill-Down) */}
                {currentLevel === 1 && selectedCategory && (
                  <motion.div
                    key={`level-1-${selectedCategory.id}`}
                    custom={direction}
                    initial={{ x: direction === 'forward' ? '100%' : '-100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction === 'forward' ? '-100%' : '100%', opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="absolute inset-0 overflow-y-auto flex flex-col"
                  >
                    {/* Back navigation header */}
                    <div className="sticky top-0 z-10 bg-white border-b border-[#e8e4dc]">
                      <button
                        id="mobile-menu-back-btn"
                        type="button"
                        onClick={handleBack}
                        className="w-full px-4 py-3 flex items-center gap-2 text-xs font-semibold text-[#152A21] hover:bg-[#faf7f2] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Toutes les catégories</span>
                      </button>

                      <div className="px-4 pb-3 flex items-center justify-between">
                        <h2 className="text-base font-bold text-[#2d2a2a]">{selectedCategory.label}</h2>
                      </div>

                      {/* View all in category link */}
                      <div className="px-4 pb-2.5">
                        <button
                          type="button"
                          onClick={() => handleCategorySelection(selectedCategory.id)}
                          className="w-full py-2 px-3 rounded-md bg-[#eaf1ed] text-[#152A21] hover:bg-[#dbe9e0] text-xs font-semibold flex items-center justify-between transition-colors"
                        >
                          <span>Voir tous les produits {selectedCategory.label}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subcategory Groups */}
                    <div className="flex-1 p-4 space-y-5">
                      {selectedCategory.groups?.map((group) => (
                        <div key={group.id} className="space-y-2">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#8a8682] border-b border-[#f4f0e8] pb-1">
                            {group.title}
                          </div>
                          <div className="space-y-1">
                            {group.items.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => handleCategorySelection(selectedCategory.id, item.id)}
                                className="w-full py-2 px-2 text-left rounded text-xs font-medium text-[#2d2a2a] hover:text-[#152A21] hover:bg-[#faf9f6] flex items-center justify-between transition-colors"
                              >
                                <span>{item.label}</span>
                                {item.badge ? (
                                  <span className="text-[10px] font-bold text-[#152A21] bg-[#eaf1ed] px-1.5 py-0.5 rounded">
                                    {item.badge}
                                  </span>
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5 text-[#c4c0b9]" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* LEVEL 2: Subcategory Leaf screen if drilled deeper */}
                {currentLevel === 2 && selectedCategory && selectedGroup && (
                  <motion.div
                    key={`level-2-${selectedGroup.id}`}
                    custom={direction}
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="absolute inset-0 overflow-y-auto flex flex-col bg-white"
                  >
                    <div className="sticky top-0 z-10 bg-white border-b border-[#e8e4dc]">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-full px-4 py-3 flex items-center gap-2 text-xs font-semibold text-[#152A21] hover:bg-[#faf7f2] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Retour à {selectedCategory.label}</span>
                      </button>
                      <div className="px-4 pb-3">
                        <h2 className="text-sm font-bold text-[#2d2a2a]">{selectedGroup.title}</h2>
                      </div>
                    </div>

                    <div className="p-4 divide-y divide-[#f4f0e8]">
                      {selectedGroup.items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleCategorySelection(selectedCategory.id, item.id)}
                          className="w-full py-3 flex items-center justify-between text-left text-xs font-medium text-[#2d2a2a] hover:text-[#152A21] transition-colors"
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#a09c97]" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="bg-[#faf7f2] border-t border-[#e8e4dc] px-4 py-2.5 flex items-center justify-between text-[11px] text-[#6e6b68]">
              <span className="font-medium text-[#2d2a2a]">Tunisie (TND DT)</span>
              <span className="text-[#a09c97]">•</span>
              <button 
                type="button" 
                onClick={handleClose}
                className="hover:text-[#152A21] transition-colors"
              >
                Aide & FAQ
              </button>
              <span className="text-[#a09c97]">•</span>
              <button 
                type="button" 
                onClick={handleClose}
                className="hover:text-[#152A21] transition-colors"
              >
                Fidélité Club
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
