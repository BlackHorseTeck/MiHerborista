import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, Check, ShoppingBag, ShieldCheck, Sparkles, Droplets, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, volume: string, price: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  const [selectedVolume, setSelectedVolume] = useState<string>(
    product?.volumeOptions[0]?.volume || product?.volume || ''
  );
  const [activeTab, setActiveTab] = useState<'description' | 'inci' | 'usage'>('description');
  const [isAdded, setIsAdded] = useState(false);

  // Sync selected volume when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedVolume(product.volumeOptions[0]?.volume || product.volume);
      setActiveTab('description');
      setIsAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const currentOption = product.volumeOptions.find(opt => opt.volume === selectedVolume) || {
    volume: product.volume,
    price: product.price
  };

  const handleAdd = () => {
    onAddToCart(product, currentOption.volume, currentOption.price);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="product-quickview-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#6e6b68] hover:text-[#2d2a2a] shadow-xs flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Section */}
            <div className="md:w-1/2 bg-[#faf8f5] p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-[#ece8e0]">
              <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl bg-white shadow-xs">
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider bg-[#152A21] text-white px-2 py-0.5 rounded shadow-xs">
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Labels & Quality badges */}
              <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                {product.labels.map((lbl, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium text-[#3b5f47] bg-[#eef6f1] border border-[#cbe5d5] px-2 py-0.5 rounded-full"
                  >
                    ✓ {lbl}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Product Details Section */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-3">
                {/* Rating & Origin */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-[#d69837]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-[#d69837]'
                              : 'text-[#d69837]/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#2d2a2a]">{product.rating}/5</span>
                    <span className="text-xs text-[#8a8682]">({product.reviewsCount.toLocaleString('fr-FR')} avis)</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className="text-[#6e6b68] hover:text-[#152A21] p-1 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#152A21] text-[#152A21]' : ''}`} />
                  </button>
                </div>

                {/* Name & Subtitle */}
                <div>
                  <h2 className="text-lg font-bold text-[#2d2a2a] leading-tight font-serif">
                    {product.name}
                  </h2>
                  <p className="text-xs text-[#152A21] font-medium mt-1">
                    {product.subtitle}
                  </p>
                  <p className="text-[11px] text-[#8a8682] mt-0.5">
                    {product.origin}
                  </p>
                </div>

                {/* Format selection */}
                <div>
                  <label className="block text-xs font-semibold text-[#2d2a2a] mb-1.5">
                    Contenance / Format :
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.volumeOptions.map((opt) => (
                      <button
                        key={opt.volume}
                        type="button"
                        onClick={() => setSelectedVolume(opt.volume)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedVolume === opt.volume
                            ? 'border-[#152A21] bg-[#eaf1ed] text-[#152A21]'
                            : 'border-[#e0dcd4] bg-white text-[#6e6b68] hover:border-[#152A21]'
                        }`}
                      >
                        {opt.volume} • {opt.price.toFixed(2).replace('.', ',')} DT
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tabs: Description / INCI / Conseils */}
                <div className="pt-2 border-t border-[#ece8e0]">
                  <div className="flex border-b border-[#f0ece5] text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab('description')}
                      className={`pb-2 mr-4 font-semibold transition-colors ${
                        activeTab === 'description'
                          ? 'text-[#152A21] border-b-2 border-[#152A21]'
                          : 'text-[#8a8682] hover:text-[#2d2a2a]'
                      }`}
                    >
                      Bénéfices
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('usage')}
                      className={`pb-2 mr-4 font-semibold transition-colors ${
                        activeTab === 'usage'
                          ? 'text-[#152A21] border-b-2 border-[#152A21]'
                          : 'text-[#8a8682] hover:text-[#2d2a2a]'
                      }`}
                    >
                      Utilisation & Texture
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('inci')}
                      className={`pb-2 font-semibold transition-colors ${
                        activeTab === 'inci'
                          ? 'text-[#152A21] border-b-2 border-[#152A21]'
                          : 'text-[#8a8682] hover:text-[#2d2a2a]'
                      }`}
                    >
                      Composition (INCI)
                    </button>
                  </div>

                  <div className="py-2.5 text-xs text-[#4a4744] leading-relaxed max-h-32 overflow-y-auto">
                    {activeTab === 'description' && (
                      <div className="space-y-2">
                        <p>{product.description}</p>
                        <ul className="space-y-1 mt-1.5">
                          {product.benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[11px]">
                              <span className="text-[#152A21] font-bold">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeTab === 'usage' && (
                      <div className="space-y-2">
                        <div>
                          <strong className="text-[#2d2a2a] block mb-0.5">Conseils d'application :</strong>
                          <p>{product.usageTips}</p>
                        </div>
                        <div>
                          <strong className="text-[#2d2a2a] block mb-0.5">Texture & sensorialité :</strong>
                          <p>{product.texture}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'inci' && (
                      <div>
                        <strong className="text-[#2d2a2a] block mb-1">Formule transparente 100% détaillée :</strong>
                        <p className="font-mono text-[11px] bg-[#f8f6f0] p-2 rounded border border-[#ece8e0]">
                          {product.inci}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="pt-3 border-t border-[#ece8e0] mt-3">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs text-[#8a8682]">Prix au juste prix MiHerborista</span>
                    <div className="text-xl font-bold text-[#2d2a2a]">
                      {currentOption.price.toFixed(2).replace('.', ',')} DT
                    </div>
                  </div>
                  <span className="text-[11px] text-[#3b5f47] font-semibold bg-[#eef6f1] px-2 py-1 rounded">
                    En stock • Expédié sous 24h
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`w-full py-3 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all uppercase tracking-wider ${
                    isAdded
                      ? 'bg-[#3b5f47] text-white'
                      : 'bg-[#152A21] hover:bg-[#0e1d16] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ajouter au panier ({currentOption.price.toFixed(2).replace('.', ',')} DT)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
