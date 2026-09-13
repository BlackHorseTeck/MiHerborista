import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, volume: string, price: number) => void;
  onOpenQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenQuickView,
  onToggleWishlist,
  isWishlisted
}) => {
  const [selectedVolume, setSelectedVolume] = useState<string>(product.volumeOptions[0]?.volume || product.volume);
  const [isAdded, setIsAdded] = useState(false);

  const currentOption = product.volumeOptions.find(opt => opt.volume === selectedVolume) || {
    volume: product.volume,
    price: product.price
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, currentOption.volume, currentOption.price);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  // Badge background coloring
  const getBadgeClass = (type?: string) => {
    switch (type) {
      case 'bestseller':
        return 'bg-[#152A21] text-white';
      case 'bio':
        return 'bg-[#152A21] text-white';
      case 'eco':
        return 'bg-[#eef6f1] text-[#152A21] border border-[#c4e3d0]';
      default:
        return 'bg-[#2d2a2a] text-white';
    }
  };

  // Estimate price per 100ml / 100g if relevant
  const getUnitPriceInfo = (price: number, volString: string) => {
    const num = parseFloat(volString.replace(/[^0-9.]/g, ''));
    if (!num || num === 0) return null;
    if (volString.includes('ml')) {
      const per100ml = (price / num) * 100;
      return `${per100ml.toFixed(2).replace('.', ',')} DT / 100ml`;
    }
    if (volString.includes('g')) {
      const per100g = (price / num) * 100;
      return `${per100g.toFixed(2).replace('.', ',')} DT / 100g`;
    }
    return null;
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={() => onOpenQuickView(product)}
      className="group relative bg-white border border-[#ece8e0] hover:border-[#152A21]/50 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-[#faf8f5] overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-sm shadow-xs ${getBadgeClass(product.badgeType)}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#2d2a2a] hover:text-[#152A21] shadow-xs flex items-center justify-center transition-all"
          aria-label={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#152A21] text-[#152A21]' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-3 px-4 hidden sm:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="w-full py-2 bg-white/95 hover:bg-white text-[#2d2a2a] hover:text-[#152A21] rounded-lg text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 backdrop-blur-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Aperçu rapide</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Reviews & Star Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-[#d69837] text-[#d69837]'
                      : 'text-[#d69837]/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-[#2d2a2a] ml-1">
              {product.rating}
            </span>
            <span className="text-[10px] text-[#8a8682]">
              ({product.reviewsCount.toLocaleString('fr-FR')})
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-xs sm:text-sm text-[#2d2a2a] line-clamp-2 group-hover:text-[#152A21] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Short tagline/benefits */}
          <p className="text-[11px] text-[#6e6b68] line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        <div>
          {/* Format selection pills if multiple options */}
          {product.volumeOptions.length > 1 && (
            <div className="flex items-center gap-1.5 flex-wrap my-2">
              {product.volumeOptions.map((opt) => (
                <button
                  key={opt.volume}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVolume(opt.volume);
                  }}
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border transition-all ${
                    selectedVolume === opt.volume
                      ? 'bg-[#152A21] text-white border-[#152A21]'
                      : 'bg-[#faf8f5] text-[#6e6b68] border-[#e8e4dc] hover:border-[#152A21]'
                  }`}
                >
                  {opt.volume}
                </button>
              ))}
            </div>
          )}

          {/* Price Row */}
          <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-[#f4f0e8]">
            <div>
              <div className="text-base sm:text-lg font-bold text-[#2d2a2a]">
                {currentOption.price.toFixed(2).replace('.', ',')} DT
              </div>
              {getUnitPriceInfo(currentOption.price, currentOption.volume) && (
                <div className="text-[10px] text-[#8a8682]">
                  {getUnitPriceInfo(currentOption.price, currentOption.volume)}
                </div>
              )}
            </div>

            {/* Add to cart CTA */}
            <button
              id={`add-to-cart-btn-${product.id}`}
              type="button"
              onClick={handleAdd}
              className={`py-2 px-3 sm:px-4 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                isAdded
                  ? 'bg-[#152A21] text-white'
                  : 'bg-[#152A21] hover:bg-[#0e1d16] text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Ajouté</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Ajouter</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
