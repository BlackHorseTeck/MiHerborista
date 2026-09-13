import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Eye, Trash2, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, volume: string, price: number) => void;
  onOpenQuickView: (product: Product) => void;
  onClearWishlist: () => void;
  onAddAllToCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenQuickView,
  onClearWishlist,
  onAddAllToCart
}) => {
  // Find full product details for each wishlisted item
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));
  const [addedItemIds, setAddedItemIds] = React.useState<Set<string>>(new Set());

  const handleQuickAdd = (product: Product) => {
    const defaultVol = product.volumeOptions[0]?.volume || product.volume;
    const defaultPrice = product.volumeOptions[0]?.price || product.price;
    onAddToCart(product, defaultVol, defaultPrice);

    setAddedItemIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItemIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  const totalPrice = wishlistedProducts.reduce((sum, p) => {
    const price = p.volumeOptions[0]?.price || p.price;
    return sum + price;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="wishlist-drawer-container" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="absolute top-0 bottom-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#ece8e0] flex items-center justify-between bg-[#faf7f2]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#152A21]/10 flex items-center justify-center text-[#152A21]">
                  <Heart className="w-4 h-4 fill-[#152A21]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#2d2a2a]">
                    Mes Favoris ({wishlistedProducts.length})
                  </h2>
                  <p className="text-[11px] text-[#6e6b68]">
                    Vos soins et ingrédients botaniques enregistrés
                  </p>
                </div>
              </div>
              <button
                id="close-wishlist-drawer-btn"
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6e6b68] hover:text-[#2d2a2a] hover:bg-[#ede8df] transition-colors"
                aria-label="Fermer mes favoris"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {wishlistedProducts.length === 0 ? (
              /* Empty Wishlist State */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fdfbf9]">
                <div className="w-16 h-16 rounded-full bg-[#f4ede4] flex items-center justify-center text-[#a09c97] mb-4 shadow-inner">
                  <Heart className="w-8 h-8 text-[#a09c97]" />
                </div>
                <h3 className="text-base font-bold text-[#2d2a2a] mb-1">
                  Votre liste de favoris est vide
                </h3>
                <p className="text-xs text-[#6e6b68] max-w-xs mb-6 leading-relaxed">
                  Enregistrez vos sérums, huiles végétales et soins préférés en cliquant sur le cœur ♡ de chaque fiche produit.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#152A21] hover:bg-[#0e1d16] text-white text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#d69837]" />
                  <span>Découvrir nos soins naturels</span>
                </button>
              </div>
            ) : (
              /* Wishlist Items List */
              <>
                {/* List Action Bar */}
                <div className="px-4 py-2.5 bg-[#fbf9f5] border-b border-[#ece8e0] flex items-center justify-between text-xs">
                  <span className="text-[#6e6b68] font-medium">
                    {wishlistedProducts.length} produit{wishlistedProducts.length > 1 ? 's' : ''} sauvegardé{wishlistedProducts.length > 1 ? 's' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={onClearWishlist}
                    className="text-[11px] text-[#8a8682] hover:text-[#a33] font-medium flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vider la liste</span>
                  </button>
                </div>

                {/* Items Container */}
                <div className="flex-1 overflow-y-auto divide-y divide-[#f2ede6] p-4 space-y-3">
                  {wishlistedProducts.map((product) => {
                    const defaultVol = product.volumeOptions[0]?.volume || product.volume;
                    const defaultPrice = product.volumeOptions[0]?.price || product.price;
                    const isJustAdded = addedItemIds.has(product.id);

                    return (
                      <div
                        key={product.id}
                        id={`wishlist-item-${product.id}`}
                        className="pt-3 first:pt-0 flex gap-3 group"
                      >
                        {/* Thumbnail */}
                        <div
                          onClick={() => {
                            onClose();
                            onOpenQuickView(product);
                          }}
                          className="w-20 h-20 rounded-lg overflow-hidden bg-[#faf8f5] border border-[#ece8e0] shrink-0 relative cursor-pointer group-hover:border-[#152A21]/40 transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          {product.badge && (
                            <span className="absolute bottom-1 left-1 text-[8px] font-bold uppercase bg-[#152A21] text-white px-1 py-0.2 rounded">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h4
                                onClick={() => {
                                  onClose();
                                  onOpenQuickView(product);
                                }}
                                className="text-xs font-semibold text-[#2d2a2a] hover:text-[#152A21] cursor-pointer line-clamp-2 leading-tight transition-colors"
                              >
                                {product.name}
                              </h4>
                              <button
                                type="button"
                                onClick={() => onRemoveFromWishlist(product.id)}
                                className="text-[#a09c97] hover:text-[#a33] p-1 transition-colors"
                                title="Retirer des favoris"
                                aria-label="Retirer des favoris"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-[11px] text-[#8a8682] mt-0.5">
                              Format : {defaultVol}
                            </div>
                          </div>

                          {/* Price & Add to Cart Button */}
                          <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-[#f4f0e8]">
                            <div className="text-xs font-bold text-[#152A21]">
                              {defaultPrice.toFixed(2).replace('.', ',')} DT
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onOpenQuickView(product);
                                }}
                                className="p-1.5 text-[#6e6b68] hover:text-[#152A21] hover:bg-[#faf7f2] rounded-md transition-colors"
                                title="Aperçu rapide"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleQuickAdd(product)}
                                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md flex items-center gap-1.5 transition-all ${
                                  isJustAdded
                                    ? 'bg-[#eaf1ed] text-[#152A21] border border-[#152A21]'
                                    : 'bg-[#152A21] hover:bg-[#0e1d16] text-white shadow-2xs'
                                }`}
                              >
                                {isJustAdded ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Ajouté !</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag className="w-3 h-3" />
                                    <span>Au panier</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-[#ece8e0] bg-[#faf7f2] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6e6b68] font-medium">Total estimé ({wishlistedProducts.length} articles) :</span>
                    <span className="text-sm font-bold text-[#152A21]">
                      {totalPrice.toFixed(2).replace('.', ',')} DT
                    </span>
                  </div>

                  <button
                    id="wishlist-add-all-btn"
                    type="button"
                    onClick={onAddAllToCart}
                    className="w-full py-3 bg-[#152A21] hover:bg-[#0e1d16] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#d69837]" />
                    <span>Tout ajouter à mon panier</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
