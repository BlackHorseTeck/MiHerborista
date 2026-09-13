import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Check, Sparkles } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, volume: string, delta: number) => void;
  onRemoveItem: (productId: string, volume: string) => void;
  onQuickAddProduct: (product: Product, volume: string, price: number) => void;
  recommendedProducts: Product[];
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onQuickAddProduct,
  recommendedProducts
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.selectedPrice * item.quantity, 0);
  const freeShippingThreshold = 35.0;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (promoCode.trim().toUpperCase() === 'BIENVENUE10') {
      setAppliedPromo('BIENVENUE10');
      setPromoDiscount(subtotal * 0.1);
    } else if (promoCode.trim()) {
      setPromoError('Code invalide. Utilisez le code BIENVENUE10 (-10%)');
    }
  };

  const finalTotal = Math.max(0, subtotal - promoDiscount);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cart-drawer-container" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Drawer Slide-in from Right */}
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
                <ShoppingBag className="w-5 h-5 text-[#152A21]" />
                <h2 className="text-base font-bold text-[#2d2a2a]">
                  Mon Panier ({items.reduce((sum, item) => sum + item.quantity, 0)})
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6e6b68] hover:text-[#2d2a2a] hover:bg-[#ede8df] transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-4 py-3 bg-[#fdfaf6] border-b border-[#ece8e0]">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#152A21]" />
                  {remainingForFreeShipping > 0 ? (
                    <span className="text-[#2d2a2a]">
                      Plus que <strong className="text-[#152A21]">{remainingForFreeShipping.toFixed(2).replace('.', ',')} DT</strong> pour la livraison offerte !
                    </span>
                  ) : (
                    <span className="text-[#3b5f47] font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Félicitations ! Votre livraison est offerte
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#8a8682]">Seuil 35 DT</span>
              </div>
              
              <div className="w-full h-2 bg-[#ede8df] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full transition-all ${
                    shippingProgress >= 100 ? 'bg-[#3b5f47]' : 'bg-[#152A21]'
                  }`}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#f0ece5]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#faf7f2] border border-[#e8e4dc] flex items-center justify-center text-[#152A21]">
                    <ShoppingBag className="w-8 h-8 text-[#152A21]/60" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#2d2a2a]">Votre panier est vide</h3>
                    <p className="text-xs text-[#6e6b68] mt-1 max-w-xs">
                      Découvrez nos sérums concentrés naturels, nos huiles essentielles BIO et nos bases personnalisables.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-6 rounded-lg bg-[#152A21] hover:bg-[#0e1d16] text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    Découvrir nos best-sellers
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedVolume}`} className="py-3.5 flex gap-3 group">
                    {/* Thumbnail */}
                    <div className="w-18 h-18 rounded-lg bg-[#faf8f5] border border-[#e8e4dc] overflow-hidden shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info & Modifiers */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-semibold text-[#2d2a2a] line-clamp-2 leading-snug">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] font-medium text-[#8a8682] bg-[#f4f1ec] px-1.5 py-0.5 rounded mt-1 inline-block">
                            {item.selectedVolume}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.selectedVolume)}
                          className="text-[#a09c97] hover:text-[#d33] transition-colors p-1"
                          aria-label="Supprimer cet article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quantity selector and row price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#e8e4dc] rounded-md bg-[#faf8f5]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedVolume, -1)}
                            className="p-1 text-[#6e6b68] hover:text-[#2d2a2a] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#2d2a2a]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedVolume, 1)}
                            className="p-1 text-[#6e6b68] hover:text-[#2d2a2a] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-[#2d2a2a]">
                            {(item.selectedPrice * item.quantity).toFixed(2).replace('.', ',')} DT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Recommended Cross-sell */}
              {items.length > 0 && recommendedProducts.length > 0 && (
                <div className="pt-4 mt-2">
                  <div className="text-xs font-bold text-[#2d2a2a] flex items-center gap-1.5 mb-2.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#152A21]" />
                    <span>Complétez votre routine naturelle</span>
                  </div>
                  <div className="space-y-2">
                    {recommendedProducts.slice(0, 2).map((prod) => (
                      <div
                        key={prod.id}
                        className="p-2.5 rounded-lg border border-[#ece8e0] bg-[#faf8f5] flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-10 h-10 rounded object-cover shrink-0"
                          />
                          <div className="overflow-hidden">
                            <div className="text-[11px] font-semibold text-[#2d2a2a] truncate">
                              {prod.name}
                            </div>
                            <div className="text-[10px] text-[#152A21] font-bold">
                              {prod.price.toFixed(2).replace('.', ',')} DT ({prod.volume})
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onQuickAddProduct(prod, prod.volume, prod.price)}
                          className="shrink-0 py-1 px-2.5 bg-white border border-[#e8e4dc] hover:border-[#152A21] text-[#2d2a2a] text-[11px] font-bold rounded-md hover:bg-[#faf7f2] transition-colors"
                        >
                          + Ajouter
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Checkout & Summary Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-[#ece8e0] bg-[#faf7f2] space-y-3">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Code promo (ex: BIENVENUE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#e0dcd4] rounded-lg text-[#2d2a2a] placeholder-[#8a8682] focus:outline-none focus:ring-1 focus:ring-[#152A21]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#f0ece5] hover:bg-[#e4ded5] text-[#2d2a2a] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Appliquer
                  </button>
                </form>

                {promoError && (
                  <div className="text-[11px] text-[#b44136] bg-[#fdf3f2] p-1.5 rounded-md border border-[#f5c7c2]">
                    {promoError}
                  </div>
                )}

                {appliedPromo && (
                  <div className="text-[11px] text-[#3b5f47] bg-[#edf6f0] p-1.5 rounded-md border border-[#c6e6d0] font-semibold flex items-center justify-between">
                    <span>Code {appliedPromo} appliqué (-10%)</span>
                    <span>-{promoDiscount.toFixed(2).replace('.', ',')} DT</span>
                  </div>
                )}

                {/* Subtotal & Total */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#6e6b68]">
                    <span>Sous-total articles</span>
                    <span>{subtotal.toFixed(2).replace('.', ',')} DT</span>
                  </div>
                  <div className="flex justify-between text-[#6e6b68]">
                    <span>Frais de livraison estimés</span>
                    <span>
                      {subtotal >= freeShippingThreshold ? (
                        <strong className="text-[#3b5f47]">Offerte</strong>
                      ) : (
                        '3,90 DT'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#2d2a2a] pt-1.5 border-t border-[#e8e4dc]">
                    <span>Total TTC</span>
                    <span className="text-base text-[#152A21]">
                      {(finalTotal + (subtotal >= freeShippingThreshold ? 0 : 3.90)).toFixed(2).replace('.', ',')} DT
                    </span>
                  </div>
                </div>

                {checkoutSuccess ? (
                  <div className="p-3 bg-[#152A21] text-white rounded-xl text-center space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#d69837]">
                      <Check className="w-4 h-4" />
                      <span>Commande confirmée avec succès !</span>
                    </div>
                    <p className="text-[11px] text-white/80">
                      Merci pour votre commande démo MiHerborista. Expédition sous 24h en Tunisie.
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCheckoutSuccess(true)}
                    className="w-full py-3 bg-[#152A21] hover:bg-[#0e1d16] text-white rounded-lg text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>Commander ({(finalTotal + (subtotal >= freeShippingThreshold ? 0 : 3.90)).toFixed(2).replace('.', ',')} DT)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <p className="text-center text-[10px] text-[#8a8682]">
                  Paiement 100% sécurisé • Expédition sous 24/48h • Retrait gratuit en boutique
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
