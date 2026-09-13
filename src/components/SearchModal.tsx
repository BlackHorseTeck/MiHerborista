import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, Sparkles, ChevronRight, Star } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const trendingQueries = [
    'Acide hyaluronique',
    'Niacinamide',
    'Huile de jojoba',
    'Ravintsara',
    'Huile de ricin',
    'Vitamine C',
    'Shikakai',
    'Karité brut'
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filteredProducts = query.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.inci.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="search-modal-container" className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-[#ece8e0] flex items-center gap-3 bg-[#faf7f2]">
              <Search className="w-5 h-5 text-[#152A21] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher un produit, ingrédient, formule, actif..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-sm bg-transparent border-none text-[#2d2a2a] placeholder-[#8a8682] focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-xs text-[#8a8682] hover:text-[#2d2a2a] p-1"
                >
                  Effacer
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#6e6b68] hover:bg-[#ede8df] hover:text-[#2d2a2a]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results or Trending list */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {!query.trim() ? (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8a8682] uppercase tracking-wider mb-3">
                    <TrendingUp className="w-4 h-4 text-[#152A21]" />
                    <span>Recherches les plus populaires</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {trendingQueries.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setQuery(item)}
                        className="py-1.5 px-3 rounded-full bg-[#f4f1ec] hover:bg-[#152A21] hover:text-white text-xs font-medium text-[#4a4744] transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#f0ece5]">
                    <div className="text-xs font-bold text-[#2d2a2a] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#152A21]" />
                      <span>Nos sérums cultes les plus consultés</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {products.slice(0, 2).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            onSelectProduct(p);
                            onClose();
                          }}
                          className="p-2 rounded-lg border border-[#ece8e0] hover:border-[#152A21] bg-[#faf8f5] cursor-pointer flex items-center gap-2 transition-colors"
                        >
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                          <div className="overflow-hidden">
                            <div className="text-xs font-bold text-[#2d2a2a] truncate">{p.name}</div>
                            <div className="text-[11px] font-semibold text-[#152A21]">{p.price.toFixed(2).replace('.', ',')} DT</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-[#6e6b68]">
                  <p className="text-sm font-semibold">Aucun résultat pour « {query} »</p>
                  <p className="text-xs text-[#8a8682] mt-1">Essayez un autre mot-clé comme « sérum », « huile », « bio » ou « jojoba ».</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-[#8a8682] mb-2">
                    {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                  </div>
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="p-3 rounded-xl border border-[#ece8e0] hover:border-[#152A21] hover:bg-[#faf7f2] flex items-center justify-between gap-3 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-[#faf8f5] shrink-0" />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-[#2d2a2a] truncate">{p.name}</h4>
                          <p className="text-[11px] text-[#6e6b68] truncate">{p.tagline}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star className="w-3 h-3 fill-[#d69837] text-[#d69837]" />
                            <span className="text-[10px] font-bold text-[#2d2a2a]">{p.rating}</span>
                            <span className="text-[10px] text-[#8a8682]">({p.volume})</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-[#2d2a2a]">{p.price.toFixed(2).replace('.', ',')} DT</span>
                        <ChevronRight className="w-4 h-4 text-[#a09c97]" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
