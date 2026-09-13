import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { PRODUCTS_DATA } from './src/data/products';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Prepare concise catalog representation for prompt context
const CATALOG_SUMMARY = PRODUCTS_DATA.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  tagline: p.tagline,
  price: `${p.price.toFixed(2)} DT`,
  volume: p.volume,
  badge: p.badge,
  origin: p.origin,
  labels: p.labels.join(', '),
  benefits: p.benefits.join('; '),
  usageTips: p.usageTips,
  inciKeyActives: p.inci
}));

// Fallback intelligent rules if Gemini API is unavailable or missing key
function getFallbackResponse(message: string, cartItemIds: string[] = []): {
  reply: string;
  recommendedProductIds: string[];
  suggestedPrompts: string[];
  promoCode?: string;
} {
  const q = message.toLowerCase();

  if (q.includes('acn') || q.includes('imperfection') || q.includes('bouton') || q.includes('pore') || q.includes('gras') || q.includes('brillance')) {
    return {
      reply: `🌿 **Votre Routine Anti-Imperfections & Pores Resserrés**

Pour traiter les boutons sans assécher ni agresser votre barrière cutanée, voici le protocole recommandé par nos botanistes :

1. **Purifier & Réguler (Matin & Soir)** : Appliquez 2 à 3 gouttes de **Sérum Niacinamide 10% + Cuivre & Zinc**. Il régule le sébum, resserre visiblement les pores et prévient les cicatrices pigmentaires.
2. **Cibler localement (Soir)** : Déposez 1 goutte pure d'**Huile essentielle de Tea Tree BIO** directement sur les imperfections actives pour neutraliser les bactéries en quelques heures.
3. **Équilibrer & Protéger** : Massez 2 gouttes d'**Huile de Jojoba BIO**. D'une composition similaire au sébum humain, elle envoie le signal à la peau de ralentir sa propre production de sébum !

💡 *Astuce fidélité* : Utilisez l'**Argile Verte** 1 fois par semaine en masque purifiant pour désincruster en profondeur.`,
      recommendedProductIds: ['serum-niacinamide-cuivre-zinc', 'huile-essentielle-tea-tree-bio', 'huile-vegetale-jojoba-bio'],
      suggestedPrompts: [
        "Comment appliquer le Tea Tree sans piquer ?",
        "Y a-t-il un code promo première commande ?",
        "Puis-je l'associer à l'Acide Hyaluronique ?"
      ],
      promoCode: 'BIENVENUE10'
    };
  }

  if (q.includes('hydrat') || q.includes('sec') || q.includes('ridule') || q.includes('soif') || q.includes('tiraillement')) {
    return {
      reply: `💧 **Votre Protocole Hydratation Profonde & Éclat Repulpé**

Quand la peau tiraille ou marque de fines ridules, c'est un signe de déshydratation en eau plutôt qu'un manque de gras :

1. **Hydratation multi-niveaux (Matin & Soir)** : Appliquez 3 gouttes de notre **Sérum concentré Acide Hyaluronique 3,5%** sur peau propre et encore légèrement humide (idéalement après une brumisation d'Hydrolat de Rose).
2. **Sceller l'hydratation** : Appliquez une noisette de **Crème Neutre Jeunesse BIO**. L'émulsion emprisonne l'eau dans l'épiderme tout au long de la journée sans effet collant.
3. **Soin SOS Apaisant** : Le **Gel d'Aloe Vera natif 97%** en couche fraîche dès que la peau rougit ou chauffe.

📦 *Livraison offerte* : Ce duo atteint presque le seuil de 35 DT de livraison gratuite sur toute la Tunisie !`,
      recommendedProductIds: ['serum-acide-hyaluronique', 'creme-jeunesse-acide-hyaluronique', 'hydrolat-rose-damas-bio'],
      suggestedPrompts: [
        "Combien de temps dure un flacon de 30 ml ?",
        "Avez-vous des formats éco-recharges ?",
        "Quel est le code promo disponible ?"
      ],
      promoCode: 'BIENVENUE10'
    };
  }

  if (q.includes('tache') || q.includes('eclat') || q.includes('terne') || q.includes('vitamine c') || q.includes('teint')) {
    return {
      reply: `✨ **Votre Cure Teint Radieux & Anti-Taches Haute Performance**

Les taches pigmentaires et le teint fatigué répondent remarquablement aux antioxydants végétaux puissants :

1. **Le Bouclier Matinal** : 3 gouttes du **Sérum Vitamine C 10% & Astaxanthine**. L'astaxanthine végétale (couleur orangée naturelle) réveille le teint immédiatement tout en neutralisant les radicaux libres.
2. **L'alternative douce au Rétinol (Soir)** : Le **Sérum végétal Bakuchiol 1% & Rosier Muscat** stimule le renouvellement cellulaire sans aucune irritation ni desquamation, estompant progressivement les taches d'acné ou de soleil.
3. **Tonique Botanique** : Vaporisez l'**Hydrolat de Rose de Damas BIO** avant vos soins pour équilibrer le pH et resserrer le grain de peau.`,
      recommendedProductIds: ['serum-vitamine-c-astaxanthine', 'serum-bakuchiol-anti-age', 'hydrolat-rose-damas-bio'],
      suggestedPrompts: [
        "La Vitamine C est-elle photosensibilisante ?",
        "Au bout de combien de jours voit-on des résultats ?",
        "Puis-je l'utiliser l'été en Tunisie ?"
      ],
      promoCode: 'BIENVENUE10'
    };
  }

  if (q.includes('cheveu') || q.includes('chute') || q.includes('pousse') || q.includes('cuir chevelu') || q.includes('pellicule')) {
    return {
      reply: `🌿 **Programme Densité & Pousse Capillaire Active**

Pour freiner la chute et stimuler une repousse vigoureuse dès la racine :

1. **Le Bain d'Huile Fortifiant (1 à 2x / semaine)** : Massez le cuir chevelu avec l'**Huile de Ricin BIO pure première pression**. Sa haute teneur en acide ricinoléique active la micro-circulation et renforce le bulbe pileux.
2. **Le Lavage Doux & Détox** : Utilisez notre **Shampoing Solide Fortifiant à la Spiruline BIO**. Sans sulfates agressifs, il assainit le cuir chevelu et équivaut à 2 flacons liquides traditionnels.
3. **Hydratation Longueurs** : Mélangez 1 noisette de **Gel d'Aloe Vera** pour hydrater vos pointes sans les alourdir.

💡 *Conseil économique* : Le shampoing solide dure plus de 3 mois et élimine tout emballage plastique !`,
      recommendedProductIds: ['huile-vegetale-ricin-bio', 'shampoing-solide-spiruline-bio', 'gel-aloe-vera-natif-bio'],
      suggestedPrompts: [
        "Comment rincer facilement l'huile de ricin ?",
        "Puis-je l'utiliser pour faire pousser les cils ?",
        "Livraison gratuite en Tunisie à partir de combien ?"
      ],
      promoCode: 'BIENVENUE10'
    };
  }

  if (q.includes('promo') || q.includes('remise') || q.includes('reduction') || q.includes('code') || q.includes('prix') || q.includes('offre') || q.includes('bienvenue')) {
    return {
      reply: `🎁 **Offre Privilège Nouvelle Cliente MiHerborista !**

Bienvenue dans notre communauté de cosmétique 100% naturelle ! Profitez de notre offre exclusive :

- **-10% immédiats** sur l'ensemble de votre panier avec le code promo : **\`BIENVENUE10\`**
- **Livraison OFFERTE** partout en Tunisie dès **35 DT** d'achat seulement !
- Un guide numérique de 15 recettes cosmétiques DIY offert dans votre colis.

Ajoutez vos soins favoris au panier et insérez le code **BIENVENUE10** dans le volet de commande pour voir la réduction s'appliquer instantanément !`,
      recommendedProductIds: ['serum-acide-hyaluronique', 'serum-niacinamide-cuivre-zinc', 'creme-jeunesse-acide-hyaluronique'],
      suggestedPrompts: [
        "Quels sont vos 3 produits les plus vendus ?",
        "Quels sont les délais de livraison en Tunisie ?",
        "Comment composer une routine complète ?"
      ],
      promoCode: 'BIENVENUE10'
    };
  }

  if (q.includes('livraison') || q.includes('delai') || q.includes('boutique') || q.includes('magasin') || q.includes('tunisie')) {
    return {
      reply: `🚚 **Livraison & Points de Vente MiHerborista en Tunisie**

- **Livraison à domicile express** : Expédition sous 24h à 48h partout en Tunisie (Grand Tunis, Sousse, Sfax, Nabeul, Bizerte, Monastir, etc.).
- **Frais de port** : **OFFERTS dès 35 DT d'achat** (sinon seulement 3,90 DT).
- **Paiement sécurisé** : En ligne ou **paiement en espèces à la livraison** directement auprès du livreur.
- **Nos Boutiques & Ateliers** : Tunis Lac 2, La Marsa, Ennasr, Menzah 6, Sousse Sahloul, Sfax et Nabeul.

Souhaitez-vous que je vous guide vers les indispensables pour atteindre les 35 DT et bénéficier de la livraison gratuite ?`,
      recommendedProductIds: ['serum-acide-hyaluronique', 'huile-vegetale-jojoba-bio', 'creme-jeunesse-acide-hyaluronique'],
      suggestedPrompts: [
        "Quels produits me recommandez-vous ?",
        "Comment utiliser le code BIENVENUE10 ?",
        "Avez-vous des soins anti-âge ?"
      ],
      promoCode: 'BIENVENUE10'
    };
  }

  if (q.includes('diy') || q.includes('recette') || q.includes('fabriquer') || q.includes('base') || q.includes('maison')) {
    return {
      reply: `🧪 **Débuter facilement en Cosmétique Maison (DIY) avec MiHerborista**

Notre approche révolutionne le DIY : plus besoin de balance au milligramme ni de conservateurs chimiques complexes !

1. **La Base Universelle** : Notre **Crème Neutre Jeunesse BIO** ou notre **Sérum Acide Hyaluronique 3,5%** sont prêts à l'emploi et parfaitement stables.
2. **Personnalisation minute** : Incorporez directement 2 à 4 gouttes d'actifs (Vitamine C, Bakuchiol ou Tea tree) dans votre noisette de crème ou flacon.
3. **Économique & Zéro Déchet** : Une seule base vous permet de confectionner soin de jour, soin de nuit et soin contour des yeux selon les saisons !

💡 *Le saviez-vous ?* Recharger vos flacons avec nos éco-recharges de 100 ml vous fait économiser jusqu'à **30%** par rapport aux flacons neufs.`,
      recommendedProductIds: ['creme-jeunesse-acide-hyaluronique', 'serum-acide-hyaluronique', 'beurre-karite-brut-equitable'],
      suggestedPrompts: [
        "Quelle recette facile pour débuter ?",
        "Comment faire une chantilly de karité ?",
        "Donnez-moi une routine complète personnalisée"
      ],
      promoCode: 'BIENVENUE10'
    };
  }

  // Default welcoming response with bestseller recommendations
  return {
    reply: `👋 Bonjour ! Je suis **Sonia**, votre conseillère experte en phytothérapie & dermo-cosmétique naturelle MiHerborista.

Je suis là pour analyser votre type de peau, vos besoins capillaires ou vous guider vers la routine idéale adaptée au climat tunisien.

**Parmi nos soins cultes plébiscités par nos clientes :**
- 💧 **Sérum Acide Hyaluronique 3,5%** : Hydratation intense sans effet gras.
- 🌿 **Sérum Niacinamide 10% + Zinc** : Pores resserrés & zéro brillance.
- ✨ **Sérum Vitamine C 10% & Astaxanthine** : Éclat éclatant & anti-taches.

🎁 *Offre découverte* : N'oubliez pas d'utiliser le code **\`BIENVENUE10\`** pour profiter de **-10%** sur votre commande, avec la livraison offerte dès 35 DT !

Racontez-moi : quelle est votre priorité beauté du moment ?`,
    recommendedProductIds: ['serum-acide-hyaluronique', 'serum-niacinamide-cuivre-zinc', 'serum-vitamine-c-astaxanthine'],
    suggestedPrompts: [
      "Quelle routine pour peau mixte à grasse ?",
      "Comment estomper les rides et ridules ?",
      "Quel soin fortifiant pour mes cheveux ?"
    ],
    promoCode: 'BIENVENUE10'
  };
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Chatbot Route
app.post('/api/chat', async (req, res) => {
  const { message, history = [], cartItemIds = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message requis' });
  }

  // If no Gemini API key configured, use our intelligent fallback engine
  if (!process.env.GEMINI_API_KEY) {
    const fallback = getFallbackResponse(message, cartItemIds);
    return res.json(fallback);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const systemInstruction = `Tu es Sonia, la conseillère dermo-cosmétique et botaniste experte de MiHerborista (boutique officielle en Tunisie).
Ton rôle est d'accueillir les visiteurs, d'analyser leurs besoins avec bienveillance et rigueur scientifique, et de les convertir en clientes conquises et fidèles.

INFORMATIONS ESSENTIELLES SUR MIHERBORISTA :
- Localisation : Formulé et conditionné en Tunisie, filières équitables certifiées.
- Devises : Tous les prix sont en Dinars Tunisiens (DT).
- Seuil de livraison : LIVRAISON OFFERTE partout en Tunisie dès 35 DT d'achat ! (Sinon 3,90 DT).
- Code de Bienvenue exclusif : "BIENVENUE10" offre 10% de réduction immédiate à la première commande.
- Engagements : Flacons en verre ambré réutilisables, formules 100% végétales actives, éco-recharges économiques.

STRATÉGIE DE CONVERSION & FIDÉLISATION :
1. ANALYSER & ÉCOUTER : Identifie clairement la préoccupation cutanée ou capillaire (imperfections, acné, déshydratation, taches, rides, chute de cheveux, etc.).
2. RECOMMANDER UNE ROUTINE CLAIRE : Propose une routine simple de 2 à 3 produits complémentaires issus du catalogue. Explique précisément l'ordre d'application (Matin / Soir).
3. VALORISER LE SEUIL LIVRAISON & LE CODE PROMO : Rappelle opportunément que la livraison est offerte dès 35 DT et invite à utiliser le code "BIENVENUE10" pour économiser 10%.
4. FIDÉLISER DANS LA DURÉE : Explique la rentabilité des éco-recharges 100 ml (-20% à -30%) et la polyvalence des bases DIY (Crème neutre ou Sérum concentré permettant de multiples soins tout au long de l'année).
5. STYLE : Chaleureux, professionnel, bienveillant, clair. Utilise le gras, des listes à puces et des sauts de ligne pour une excellente lisibilité.

CATALOGUE PRODUITS DISPONIBLES :
${JSON.stringify(CATALOG_SUMMARY, null, 2)}

FORMAT DE SORTIE REQUIS (JSON STRICT) :
Réponds impérativement au format JSON avec cette structure :
{
  "reply": "Ta réponse détaillée et aérée avec étapes de routine, conseils d'application et astuces économiques",
  "recommendedProductIds": ["id_du_produit_1", "id_du_produit_2"],
  "suggestedPrompts": ["3 questions courtes et pertinentes de rebond pour continuer la conversation"],
  "promoCode": "BIENVENUE10" (ou null si pas pertinent)
}

Attention : "recommendedProductIds" doit UNIQUEMENT contenir des identifiants valides existant dans le catalogue (ex: 'serum-acide-hyaluronique', 'serum-niacinamide-cuivre-zinc', 'serum-vitamine-c-astaxanthine', 'serum-bakuchiol-anti-age', 'huile-vegetale-jojoba-bio', 'huile-vegetale-ricin-bio', 'hydrolat-rose-damas-bio', 'huile-essentielle-tea-tree-bio', 'creme-jeunesse-acide-hyaluronique', 'beurre-karite-brut-equitable', 'gel-aloe-vera-natif-bio', 'argile-verte-montmorillonite-bio', 'collagene-marin-peptides-vitamine-c', 'shampoing-solide-spiruline-bio'). Ne jamais inventer d'ID.`;

    // Format conversation history for Gemini
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      // Keep last 4 turns for context
      const recentHistory = history.slice(-4);
      for (const item of recentHistory) {
        if (item.role === 'user' || item.role === 'model') {
          contents.push({
            role: item.role,
            parts: [{ text: item.content }]
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [
        {
          text: `Message de l'utilisateur : "${message}". Panier actuel client (IDs): ${JSON.stringify(cartItemIds)}.`
        }
      ]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: 'Explication détaillée, routine structurée et conseils'
            },
            recommendedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Liste des IDs de produits recommandés'
            },
            suggestedPrompts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 questions suggérées pour l’utilisateur'
            },
            promoCode: {
              type: Type.STRING,
              description: 'Code promo BIENVENUE10 si opportun'
            }
          },
          required: ['reply', 'recommendedProductIds', 'suggestedPrompts']
        }
      }
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);

    // Validate that recommendedProductIds actually exist in database
    const validIds = (parsed.recommendedProductIds || []).filter((id: string) =>
      PRODUCTS_DATA.some((p) => p.id === id)
    );

    return res.json({
      reply: parsed.reply || getFallbackResponse(message).reply,
      recommendedProductIds: validIds.length > 0 ? validIds : getFallbackResponse(message).recommendedProductIds,
      suggestedPrompts: parsed.suggestedPrompts || getFallbackResponse(message).suggestedPrompts,
      promoCode: parsed.promoCode || 'BIENVENUE10'
    });
  } catch (error) {
    console.error('Gemini API Error in /api/chat:', error);
    // Graceful fallback to rich static advisor
    const fallback = getFallbackResponse(message, cartItemIds);
    return res.json(fallback);
  }
});

// Start server with Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MiHerborista server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
