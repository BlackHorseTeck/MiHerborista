import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Truck, RefreshCw, Award, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#f7f5f0] border-t border-[#e8e4dc] text-[#2d2a2a] pt-12 pb-8">
      {/* 4 Brand Pillars / Guarantees Reassurance Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-12 border-b border-[#e8e4dc]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#eaf1ed] text-[#152A21] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2d2a2a]">Livraison offerte dès 35 DT</h4>
              <p className="text-[11px] text-[#6e6b68] mt-0.5">En point relais ou retrait gratuit 1h en boutique</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#eef6f1] text-[#3b5f47] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2d2a2a]">100% Naturel & Bio certifié</h4>
              <p className="text-[11px] text-[#6e6b68] mt-0.5">Matières premières pures sélectionnées à la source</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#eaf1ed] text-[#152A21] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2d2a2a]">Prix direct laboratoire</h4>
              <p className="text-[11px] text-[#6e6b68] mt-0.5">Le juste prix sans intermédiaire superflu</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#eef6f1] text-[#3b5f47] flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2d2a2a]">Paiement 100% sécurisé</h4>
              <p className="text-[11px] text-[#6e6b68] mt-0.5">CB, Visa, Mastercard, PayPal & Apple Pay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Banner */}
      <div className="max-w-7xl mx-auto px-4 py-10 border-b border-[#e8e4dc]">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e4dc] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left max-w-lg">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#152A21] bg-[#eaf1ed] px-2.5 py-1 rounded-full">
              Club MiHerborista
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-[#2d2a2a] mt-2">
              Rejoignez notre communauté & profitez de -10%
            </h3>
            <p className="text-xs text-[#6e6b68] mt-1">
              Recevez nos nouvelles recettes DIY exclusives, nos conseils d'aromathérapie et vos offres privilèges chaque semaine.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {isSubscribed ? (
              <div className="flex items-center gap-2 py-3 px-5 bg-[#eef6f1] text-[#3b5f47] rounded-xl text-xs font-bold border border-[#cbe5d5]">
                <Check className="w-4 h-4" />
                <span>Merci ! Votre code bienvenue BIENVENUE10 a été activé.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#8a8682] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs bg-[#faf8f5] border border-[#d8d3c8] rounded-xl text-[#2d2a2a] placeholder-[#8a8682] focus:outline-none focus:ring-1 focus:ring-[#152A21] focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#152A21] hover:bg-[#0e1d16] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 uppercase tracking-wider"
                >
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main 4 Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#2d2a2a] uppercase tracking-wider text-[11px]">
              À propos de MiHerborista
            </h4>
            <ul className="space-y-2 text-[#6e6b68]">
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Notre histoire depuis 2026</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Notre laboratoire en Tunisie</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Nos filières équitables à la source</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Éco-conception & Flaconnage verre</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Rejoindre nos équipes</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#2d2a2a] uppercase tracking-wider text-[11px]">
              Aide & Services
            </h4>
            <ul className="space-y-2 text-[#6e6b68]">
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Suivre ma commande</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Frais et délais de livraison</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Retours sous 30 jours</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Foire aux questions (FAQ)</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Contacter notre service client</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#2d2a2a] uppercase tracking-wider text-[11px]">
              Conseils & Ateliers
            </h4>
            <ul className="space-y-2 text-[#6e6b68]">
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Plus de 2000 recettes DIY</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Guide expert des Huiles Essentielles</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Diagnostic de peau en ligne</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Participer à un atelier en boutique</a></li>
              <li><a href="#" className="hover:text-[#152A21] transition-colors">Le blog & astuces naturelles</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#2d2a2a] uppercase tracking-wider text-[11px]">
              Nos Boutiques & Ateliers
            </h4>
            <p className="text-[11px] text-[#6e6b68] leading-relaxed">
              Venez découvrir et sentir nos matières premières dans nos boutiques et ateliers en Tunisie :
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-[#4a4744]">
              <span className="bg-[#ede8df] px-2 py-0.5 rounded">Tunis Lac 2</span>
              <span className="bg-[#ede8df] px-2 py-0.5 rounded">La Marsa</span>
              <span className="bg-[#ede8df] px-2 py-0.5 rounded">Ennasr</span>
              <span className="bg-[#ede8df] px-2 py-0.5 rounded">Menzah</span>
              <span className="bg-[#ede8df] px-2 py-0.5 rounded">Sousse</span>
              <span className="bg-[#ede8df] px-2 py-0.5 rounded">Sfax</span>
              <span className="bg-[#ede8df] px-2 py-0.5 rounded">Nabeul</span>
              <span className="bg-[#ede8df] px-2 py-0.5 rounded">Bizerte</span>
            </div>
            <div className="pt-1">
              <a href="#" className="text-xs font-semibold text-[#152A21] hover:underline flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Trouver la boutique la plus proche</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Certifications & Legal Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-[#e8e4dc] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8a8682]">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-sm text-[#2d2a2a]">Mi<span className="text-[#152A21]">Herborista</span></span>
          <span>© 2026 MiHerborista. Tous droits réservés.</span>
        </div>

        <div className="flex flex-wrap gap-4 text-[#6e6b68]">
          <a href="#" className="hover:text-[#152A21]">Mentions légales</a>
          <a href="#" className="hover:text-[#152A21]">Conditions Générales de Vente</a>
          <a href="#" className="hover:text-[#152A21]">Données personnelles & Cookies</a>
          <a href="#" className="hover:text-[#152A21]">Gestion des préférences</a>
        </div>
      </div>
    </footer>
  );
};
