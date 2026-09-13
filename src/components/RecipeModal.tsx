import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Coins, Check, ShoppingBag, FlaskConical, Award, Sparkles, BookOpen } from 'lucide-react';
import { DIYRecipe, Product } from '../types';

interface RecipeModalProps {
  recipe: DIYRecipe | null;
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProductsToCart: (products: { product: Product; volume: string; price: number }[]) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isOpen,
  onClose,
  products,
  onAddProductsToCart
}) => {
  const [kitAdded, setKitAdded] = useState(false);

  if (!recipe) return null;

  // Find products associated with the recipe ingredients
  const recipeProducts = recipe.ingredients
    .map(ing => products.find(p => p.id === ing.productId))
    .filter((p): p is Product => p !== undefined);

  const kitTotalPrice = recipeProducts.reduce((sum, p) => sum + p.price, 0);

  const handleAddKit = () => {
    const items = recipeProducts.map(p => ({
      product: p,
      volume: p.volume,
      price: p.price
    }));
    onAddProductsToCart(items);
    setKitAdded(true);
    setTimeout(() => setKitAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="recipe-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#6e6b68] hover:text-[#2d2a2a] shadow-xs flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Hero */}
            <div className="bg-[#faf7f2] border-b border-[#ece8e0] p-6 flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-white border border-[#e8e4dc] shrink-0 shadow-xs">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3b5f47] bg-[#eef6f1] px-2.5 py-0.5 rounded-full border border-[#cce4d6]">
                  {recipe.category} • Laboratoire MiHerborista
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-[#2d2a2a] mt-1">
                  {recipe.title}
                </h2>
                <p className="text-xs text-[#6e6b68] mt-1">
                  {recipe.subtitle}
                </p>

                {/* Badges: Time, Difficulty, Cost */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs font-semibold text-[#2d2a2a]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#152A21]" />
                    <span>{recipe.timeMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#3b5f47]" />
                    <span>{recipe.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-[#d69837]" />
                    <span>~{recipe.costEstimate.toFixed(2).replace('.', ',')} DT / dose</span>
                  </div>
                  <div className="text-[#8a8682] text-[11px]">
                    Conservation : ~{recipe.conservationMonths} mois
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body: Ingredients & Steps */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Ingredients List */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#2d2a2a] flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-[#3b5f47]" />
                    <span>Ingrédients de la recette ({recipe.ingredients.length})</span>
                  </h3>
                  {kitTotalPrice > 0 && (
                    <span className="text-xs text-[#6e6b68]">
                      Kit complet : <strong>{kitTotalPrice.toFixed(2).replace('.', ',')} DT</strong>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {recipe.ingredients.map((ing, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-[#ece8e0] bg-[#faf8f5] text-xs space-y-0.5"
                    >
                      <div className="font-bold text-[#2d2a2a] line-clamp-1">{ing.name}</div>
                      <div className="text-[11px] font-semibold text-[#152A21]">{ing.dosage}</div>
                      <div className="text-[10px] text-[#8a8682]">{ing.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by Step instructions */}
              <div>
                <h3 className="text-sm font-bold text-[#2d2a2a] flex items-center gap-1.5 mb-3">
                  <BookOpen className="w-4 h-4 text-[#152A21]" />
                  <span>Mode opératoire pas à pas</span>
                </h3>

                <ol className="space-y-2.5">
                  {recipe.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-[#4a4744] leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-[#eaf1ed] text-[#152A21] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-[#c4ded0]">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Equipment needed */}
              <div className="p-3 bg-[#fdfaf6] rounded-xl border border-[#ece8e0] text-xs">
                <span className="font-bold text-[#2d2a2a] block mb-1">Matériel recommandé :</span>
                <span className="text-[#6e6b68]">
                  {recipe.equipmentNeeded.join(' • ')}
                </span>
              </div>
            </div>

            {/* Bottom 1-Click Kit CTA */}
            <div className="p-4 bg-[#faf7f2] border-t border-[#ece8e0] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#8a8682]">Kit complet ingrédients :</span>
                <div className="text-base font-bold text-[#2d2a2a]">
                  {kitTotalPrice.toFixed(2).replace('.', ',')} DT
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddKit}
                className={`py-2.5 px-6 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-all uppercase tracking-wider ${
                  kitAdded
                    ? 'bg-[#3b5f47] text-white'
                    : 'bg-[#152A21] hover:bg-[#0e1d16] text-white'
                }`}
              >
                {kitAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Kit ajouté au panier !</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ajouter tout le kit au panier</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
