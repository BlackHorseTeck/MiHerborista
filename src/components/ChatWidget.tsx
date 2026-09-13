import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Tag, 
  Truck, 
  RotateCcw, 
  ChevronRight, 
  Copy,
  Leaf,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Product, ChatMessage } from '../types';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product, volume: string, price: number) => void;
  onOpenQuickView: (product: Product) => void;
  onOpenCart: () => void;
  cartTotal: number;
  cartItemIds: string[];
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isOpen,
  onToggle,
  onClose,
  products,
  onAddToCart,
  onOpenQuickView,
  onOpenCart,
  cartTotal,
  cartItemIds
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [addedProductIds, setAddedProductIds] = useState<Record<string, boolean>>({});
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [showPreviewBubble, setShowPreviewBubble] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-msg',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Bonjour ! Je suis **Sonia**, votre conseillère botaniste et dermo-cosmétique certifiée chez **MiHerborista** en Tunisie 🌿

Je suis là pour vous composer une routine 100% sur-mesure, analyser vos besoins ou vous guider parmi nos soins purs formulés en Tunisie.

🎁 **Offre exclusive** : Bénéficiez de **-10%** immédiats sur votre commande avec le code **BIENVENUE10**, et de la **livraison offerte dès 35 DT** partout en Tunisie !

Par quoi aimeriez-vous commencer aujourd'hui ?`,
          recommendedProductIds: [
            'serum-acide-hyaluronique',
            'serum-niacinamide-cuivre-zinc',
            'serum-vitamine-c-astaxanthine'
          ],
          suggestedPrompts: [
            'Acné & pores dilatés',
            'Peau sèche & ridules de déshydratation',
            'Teint terne & taches pigmentaires',
            'Pousse des cheveux & anti-chute'
          ],
          promoCode: 'BIENVENUE10'
        }
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setShowNotificationBadge(false);
      setShowPreviewBubble(false);
      // Auto focus input
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for API
      const history = newMessages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history,
          cartItemIds
        })
      });

      if (!res.ok) {
        throw new Error('Erreur de réponse du serveur');
      }

      const data = await res.json();

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Voici mes recommandations pour votre routine.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: data.recommendedProductIds || [],
        suggestedPrompts: data.suggestedPrompts || [],
        promoCode: data.promoCode
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      // Friendly in-UI recovery message
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: `Je vous recommande de commencer par notre rituel universel : le **Sérum Acide Hyaluronique 3,5%** combiné à la **Crème Neutre Jeunesse BIO** pour une barrière cutanée renforcée. N'oubliez pas le code **BIENVENUE10** pour profiter de -10% !`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedProductIds: ['serum-acide-hyaluronique', 'creme-jeunesse-acide-hyaluronique'],
          suggestedPrompts: ['Comment passer commande ?', 'Délais de livraison en Tunisie ?'],
          promoCode: 'BIENVENUE10'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, product.volume, product.price);
    setAddedProductIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProductIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const remainingForFreeShipping = Math.max(0, 35 - cartTotal);

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-none">
        {/* Preview Bubble when closed */}
        <AnimatePresence>
          {!isOpen && showPreviewBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              className="pointer-events-auto bg-white p-3 rounded-2xl shadow-xl border border-[#ede8df] max-w-[280px] sm:max-w-xs text-xs relative mr-1"
            >
              <button
                type="button"
                onClick={() => setShowPreviewBubble(false)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#e8e4dc] hover:bg-[#d8d3c8] text-[#4a4744] rounded-full flex items-center justify-center text-[10px]"
                aria-label="Fermer bulle"
              >
                ✕
              </button>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#152A21] text-[#d69837] shrink-0 flex items-center justify-center font-bold text-xs shadow-inner">
                  S
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-[#152A21]">
                    <span>Sonia • MiHerborista</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3b5f47] animate-pulse"></span>
                  </div>
                  <p className="text-[#6e6b68] mt-0.5 leading-relaxed">
                    Une question sur votre peau ? Découvrez votre routine idéale + <strong>-10% de bienvenue</strong> !
                  </p>
                  <button
                    type="button"
                    onClick={onToggle}
                    className="mt-2 text-[#152A21] font-bold text-[11px] hover:underline flex items-center gap-1"
                  >
                    <span>Lancer la discussion</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.button
          type="button"
          id="chatbot-floating-toggle"
          onClick={onToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto relative p-3.5 sm:p-4 bg-[#152A21] hover:bg-[#0e1d16] text-white rounded-full shadow-2xl flex items-center justify-center transition-colors group border border-[#2d4d3d]"
          aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat avec Sonia'}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#f7f4ee]" />
          ) : (
            <>
              <div className="relative">
                <MessageCircle className="w-6 h-6 text-[#f7f4ee]" />
                <Sparkles className="w-3.5 h-3.5 text-[#d69837] absolute -top-1.5 -right-2 animate-pulse" />
              </div>
              {showNotificationBadge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d69837] text-[#152A21] rounded-full text-[10px] font-black flex items-center justify-center shadow-md animate-bounce">
                  1
                </span>
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* Main Chat Drawer / Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-3 bottom-20 sm:bottom-24 sm:right-6 sm:left-auto sm:w-[440px] z-50 h-[580px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-[#e2ddd5] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#152A21] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#2d4d3d] shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#1e3b2e] border-2 border-[#d69837] flex items-center justify-center font-bold text-sm text-[#f7f4ee] shadow-sm">
                    🌿
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#3b5f47] border-2 border-[#152A21] rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold tracking-wide">Sonia • Experte MiHerborista</h3>
                    <span className="text-[10px] bg-[#d69837]/20 text-[#d69837] border border-[#d69837]/40 px-1.5 py-0.2 rounded font-medium">
                      IA Botanique
                    </span>
                  </div>
                  <p className="text-[11px] text-[#c5c1ba] flex items-center gap-1.5 mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#52a474]"></span>
                    <span>Conseillère en ligne • Spécialiste soins naturels</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setMessages([]);
                    setTimeout(() => {
                      setMessages([
                        {
                          id: 'reset-msg',
                          sender: 'bot',
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          text: `Bonjour ! Consultation réinitialisée. Décrivez-moi votre type de peau, vos objectifs ou posez-moi vos questions sur nos produits en Tunisie !`,
                          recommendedProductIds: ['serum-acide-hyaluronique', 'serum-niacinamide-cuivre-zinc'],
                          suggestedPrompts: ['Routine anti-imperfections', 'Routine hydratation & éclat', 'Soin cheveux & pousse']
                        }
                      ]);
                    }, 100);
                  }}
                  title="Réinitialiser la discussion"
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Free Shipping & Cart Progress Banner */}
            <div className="bg-[#faf8f5] border-b border-[#ede8df] px-4 py-2 flex items-center justify-between text-[11px] shrink-0">
              <div className="flex items-center gap-1.5 text-[#2d2a2a]">
                <Truck className="w-3.5 h-3.5 text-[#152A21]" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Livraison offerte à 35 DT : plus que <strong className="text-[#152A21]">{remainingForFreeShipping.toFixed(2).replace('.', ',')} DT</strong>
                  </span>
                ) : (
                  <span className="text-[#3b5f47] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Livraison offerte débloquée !
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onOpenCart}
                className="font-bold text-[#152A21] hover:underline flex items-center gap-0.5"
              >
                <span>Panier ({cartTotal.toFixed(2).replace('.', ',')} DT)</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Conversation Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcfbfa]">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';

                // Map recommended product IDs to full product objects
                const recommendedProducts = (msg.recommendedProductIds || [])
                  .map((id) => products.find((p) => p.id === id))
                  .filter((p): p is Product => !!p);

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-end gap-2 max-w-[92%] sm:max-w-[88%]">
                      {isBot && (
                        <div className="w-7 h-7 rounded-full bg-[#152A21] text-white flex items-center justify-center text-[10px] shrink-0 mb-1 font-bold">
                          S
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                          isBot
                            ? 'bg-white border border-[#eae5dd] text-[#2d2a2a] rounded-bl-sm'
                            : 'bg-[#152A21] text-white rounded-br-sm'
                        }`}
                      >
                        {/* Text Content with clean markdown style */}
                        <div className="space-y-1.5 whitespace-pre-line">
                          {msg.text.split('\n\n').map((paragraph, idx) => {
                            // Simple parser for bold tags **text**
                            const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                            return (
                              <p key={idx} className="leading-relaxed">
                                {parts.map((part, pIdx) => {
                                  if (part.startsWith('**') && part.endsWith('**')) {
                                    return (
                                      <strong key={pIdx} className={isBot ? 'text-[#152A21] font-bold' : 'font-bold'}>
                                        {part.slice(2, -2)}
                                      </strong>
                                    );
                                  }
                                  if (part.startsWith('*') && part.endsWith('*')) {
                                    return (
                                      <em key={pIdx} className="italic text-[#6e6b68]">
                                        {part.slice(1, -1)}
                                      </em>
                                    );
                                  }
                                  return part;
                                })}
                              </p>
                            );
                          })}
                        </div>

                        {/* Welcome Promo Code Voucher Card */}
                        {isBot && msg.promoCode && (
                          <div className="mt-3 p-2.5 rounded-xl bg-[#eef6f1] border border-[#d2e8db] text-[#152A21] flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-[#3b5f47] shrink-0" />
                              <div>
                                <div className="font-bold text-xs flex items-center gap-1">
                                  <span>Code : {msg.promoCode}</span>
                                  <span className="text-[10px] bg-[#3b5f47] text-white px-1.5 py-0.2 rounded font-semibold">
                                    -10%
                                  </span>
                                </div>
                                <div className="text-[10px] text-[#4a7258]">
                                  Valable dès maintenant sur tout le panier
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(msg.promoCode!)}
                              className="px-2.5 py-1 bg-white hover:bg-[#f4f9f6] text-[#152A21] border border-[#b8dec7] rounded-lg text-[11px] font-bold flex items-center gap-1 shrink-0 transition-colors shadow-2xs"
                            >
                              {copiedCode === msg.promoCode ? (
                                <>
                                  <Check className="w-3 h-3 text-[#3b5f47]" />
                                  <span>Copié !</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copier</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {/* Interactive In-Chat Recommended Products */}
                        {isBot && recommendedProducts.length > 0 && (
                          <div className="mt-3.5 pt-3 border-t border-[#f0ece4] space-y-2">
                            <div className="text-[11px] font-bold text-[#152A21] flex items-center gap-1">
                              <Leaf className="w-3 h-3 text-[#3b5f47]" />
                              <span>Soins recommandés pour votre routine :</span>
                            </div>

                            <div className="grid grid-cols-1 gap-2">
                              {recommendedProducts.map((prod) => {
                                const isAdded = addedProductIds[prod.id];
                                return (
                                  <div
                                    key={prod.id}
                                    className="p-2 bg-[#faf8f5] hover:bg-[#f5f1ea] border border-[#eae5dc] rounded-xl flex items-center justify-between gap-2.5 transition-colors"
                                  >
                                    <div 
                                      className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
                                      onClick={() => onOpenQuickView(prod)}
                                    >
                                      <img
                                        src={prod.image}
                                        alt={prod.name}
                                        className="w-11 h-11 rounded-lg object-cover border border-[#e0dcd4] shrink-0"
                                      />
                                      <div className="min-w-0">
                                        <div className="font-bold text-xs text-[#2d2a2a] truncate hover:text-[#152A21]">
                                          {prod.name}
                                        </div>
                                        <div className="text-[10px] text-[#8a8682] truncate">
                                          {prod.volume} • {prod.tagline}
                                        </div>
                                        <div className="text-xs font-bold text-[#152A21] mt-0.5">
                                          {prod.price.toFixed(2).replace('.', ',')} DT
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1 shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => onOpenQuickView(prod)}
                                        className="p-1.5 text-[#6e6b68] hover:text-[#152A21] hover:bg-[#ede8df] rounded-lg transition-colors text-[10px]"
                                        title="Voir détails"
                                      >
                                        Détails
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleQuickAdd(prod)}
                                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs transition-all ${
                                          isAdded
                                            ? 'bg-[#3b5f47] text-white'
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
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="text-[9px] text-[#a09c97] mt-1 px-1">
                      {msg.timestamp}
                    </span>

                    {/* Suggested follow-up prompt chips */}
                    {isBot && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                        {msg.suggestedPrompts.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => handleSendMessage(prompt)}
                            className="px-2.5 py-1 bg-white hover:bg-[#faf7f2] border border-[#e0dcd4] hover:border-[#152A21] text-[#4a4744] hover:text-[#152A21] rounded-full text-[11px] font-medium transition-colors text-left flex items-center gap-1 shadow-2xs"
                          >
                            <span>{prompt}</span>
                            <ChevronRight className="w-2.5 h-2.5 text-[#8a8682]" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#152A21] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                    S
                  </div>
                  <div className="p-3 bg-white border border-[#eae5dd] rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2">
                    <span className="text-xs text-[#6e6b68]">Sonia prépare votre routine</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#152A21] animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#152A21] animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#152A21] animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white border-t border-[#ede8df] shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Posez votre question (ex: routine acné, rides...)"
                    className="w-full pl-3.5 pr-8 py-2.5 bg-[#faf8f5] border border-[#ddd8cf] focus:border-[#152A21] rounded-xl text-xs text-[#2d2a2a] placeholder-[#9a9691] outline-none transition-colors"
                  />
                  {inputValue && (
                    <button
                      type="button"
                      onClick={() => setInputValue('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a09c97] hover:text-[#4a4744] text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2.5 bg-[#152A21] hover:bg-[#0e1d16] disabled:bg-[#d0ccc4] text-white rounded-xl shadow-sm transition-colors shrink-0 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Envoyer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Trust micro-badges */}
              <div className="mt-2 flex items-center justify-between text-[10px] text-[#8a8682] px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#3b5f47]" />
                  <span>Conseils botaniques certifiés</span>
                </span>
                <span>Livraison offerte dès 35 DT</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
