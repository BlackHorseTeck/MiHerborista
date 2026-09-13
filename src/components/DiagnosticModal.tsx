import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight, ArrowLeft, Check, ShoppingBag, Droplets, Shield, Heart, Target, Sun, Zap, FlaskConical, Pill } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../data/diagnostic';
import { Product } from '../types';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProductsToCart: (products: { product: Product; volume: string; price: number }[]) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddProductsToCart
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [allAdded, setAllAdded] = useState(false);

  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentStep];

  const handleSelectOption = (questionId: string, optionId: string) => {
    const updated = { ...selectedAnswers, [questionId]: optionId };
    setSelectedAnswers(updated);

    if (currentStep < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setAllAdded(false);
  };

  // Get recommended products based on user selections
  const getRecommendedProducts = () => {
    const recommendedIds = new Set<string>();
    DIAGNOSTIC_QUESTIONS.forEach(q => {
      const selectedOptId = selectedAnswers[q.id];
      const opt = q.options.find(o => o.id === selectedOptId);
      if (opt) {
        opt.recommendedProductIds.forEach(id => recommendedIds.add(id));
      }
    });

    return products.filter(p => recommendedIds.has(p.id));
  };

  const recommendedList = getRecommendedProducts();

  const handleAddAll = () => {
    const items = recommendedList.map(p => ({
      product: p,
      volume: p.volume,
      price: p.price
    }));
    onAddProductsToCart(items);
    setAllAdded(true);
    setTimeout(() => {
      onClose();
      handleReset();
    }, 1200);
  };

  const getOptionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-5 h-5 text-[#152A21]" />;
      case 'Shield': return <Shield className="w-5 h-5 text-[#3b5f47]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-[#152A21]" />;
      case 'Target': return <Target className="w-5 h-5 text-[#3b5f47]" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#d69837]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#152A21]" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-[#3b5f47]" />;
      case 'Pill': return <Pill className="w-5 h-5 text-[#152A21]" />;
      default: return <Sparkles className="w-5 h-5 text-[#152A21]" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="diagnostic-modal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f4f1ec] text-[#6e6b68] hover:text-[#2d2a2a] flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isCompleted ? (
              <div>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eaf1ed] text-[#152A21] rounded-full text-xs font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Diagnostic de peau personnalisé</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif text-[#2d2a2a]">
                    Votre routine sur-mesure en 3 étapes
                  </h2>
                  <p className="text-xs text-[#6e6b68] mt-1">
                    Étape {currentStep + 1} sur {DIAGNOSTIC_QUESTIONS.length}
                  </p>

                  {/* Progress bar */}
                  <div className="w-48 h-1.5 bg-[#ede8df] rounded-full mx-auto mt-3 overflow-hidden">
                    <div
                      className="h-full bg-[#152A21] transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="mb-6">
                  <h3 className="text-base font-bold text-[#2d2a2a] text-center mb-1">
                    {currentQuestion.question}
                  </h3>
                  <p className="text-xs text-[#8a8682] text-center">
                    {currentQuestion.subtext}
                  </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between group ${
                        selectedAnswers[currentQuestion.id] === opt.id
                          ? 'border-[#152A21] bg-[#eaf1ed]'
                          : 'border-[#ece8e0] hover:border-[#152A21]/60 hover:bg-[#faf9f6]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="p-2 rounded-lg bg-[#faf7f2] group-hover:bg-[#f2ede4] transition-colors">
                          {getOptionIcon(opt.icon)}
                        </span>
                        {selectedAnswers[currentQuestion.id] === opt.id && (
                          <span className="w-5 h-5 rounded-full bg-[#152A21] text-white flex items-center justify-center text-xs">
                            ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#2d2a2a] group-hover:text-[#152A21] transition-colors">
                          {opt.label}
                        </div>
                        <div className="text-xs text-[#6e6b68] mt-1 leading-relaxed">
                          {opt.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Back button if step > 0 */}
                {currentStep > 0 && (
                  <div className="mt-6 flex justify-start">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="flex items-center gap-1 text-xs text-[#6e6b68] hover:text-[#2d2a2a] font-semibold"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Question précédente</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Diagnostic Results View */
              <div>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#eef6f1] text-[#3b5f47] flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif text-[#2d2a2a]">
                    Voici votre rituel naturel sur-mesure !
                  </h2>
                  <p className="text-xs text-[#6e6b68] mt-1 max-w-md mx-auto">
                    Formulé à partir de vos réponses, voici le protocole recommandé par nos experts scientifiques MiHerborista.
                  </p>
                </div>

                {/* Recommended Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-72 overflow-y-auto pr-1">
                  {recommendedList.map((prod, index) => (
                    <div
                      key={prod.id}
                      className="p-3 rounded-xl border border-[#ece8e0] bg-[#faf8f5] flex items-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-white border border-[#e8e4dc]">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <span className="text-[10px] font-bold text-[#152A21] uppercase">
                          Étape {index + 1}
                        </span>
                        <div className="text-xs font-bold text-[#2d2a2a] truncate">{prod.name}</div>
                        <div className="text-[11px] text-[#8a8682] truncate">{prod.tagline}</div>
                        <div className="text-xs font-bold text-[#2d2a2a] mt-0.5">
                          {prod.price.toFixed(2).replace('.', ',')} DT ({prod.volume})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Routine Summary Total and 1-Click CTA */}
                <div className="pt-4 border-t border-[#ece8e0] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#8a8682]">Total routine complète :</span>
                    <div className="text-lg font-bold text-[#2d2a2a]">
                      {recommendedList.reduce((acc, p) => acc + p.price, 0).toFixed(2).replace('.', ',')} DT
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="py-2.5 px-4 rounded-xl border border-[#e0dcd4] hover:bg-[#faf7f2] text-xs font-semibold text-[#6e6b68]"
                    >
                      Refaire
                    </button>
                    <button
                      type="button"
                      onClick={handleAddAll}
                      className={`flex-1 sm:flex-none py-2.5 px-6 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all ${
                        allAdded
                          ? 'bg-[#3b5f47] text-white'
                          : 'bg-[#152A21] hover:bg-[#0e1d16] text-white'
                      }`}
                    >
                      {allAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Routine ajoutée !</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Ajouter la routine au panier</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
