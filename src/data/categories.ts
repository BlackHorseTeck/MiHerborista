import { Category } from '../types';

export const CATEGORIES_DATA: Category[] = [
  {
    id: 'soins-visage',
    label: 'Soins visage',
    slug: 'soins-visage',
    iconName: 'Sparkles',
    featured: true,
    description: 'Soins naturels experts, sérums ultra-concentrés et actifs purs pour révéler l’éclat de votre peau.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    groups: [
      {
        id: 'visage-produits',
        title: 'Par type de produit',
        items: [
          { id: 'serums-concentres', label: 'Sérums concentrés', badge: 'Culte' },
          { id: 'cremes-fluides', label: 'Crèmes de jour & Fluides neutres' },
          { id: 'huiles-vegetales-visage', label: 'Huiles végétales & Élixirs précieux' },
          { id: 'nettoyants-demaquillants', label: 'Nettoyants doux & Démaquillants' },
          { id: 'hydrolats-eaux-florales', label: 'Hydrolats & Eaux florales BIO' },
          { id: 'contour-yeux-levres', label: 'Contour des yeux & Soins lèvres' },
          { id: 'masques-gommages', label: 'Masques & Gommages éclat' }
        ]
      },
      {
        id: 'visage-besoins',
        title: 'Par préoccupation de peau',
        items: [
          { id: 'anti-age-rides', label: 'Anti-âge, rides & fermeté' },
          { id: 'imperfections-acne', label: 'Imperfections, boutons & pores dilatés' },
          { id: 'hydratation-secheresse', label: 'Hydratation intense & peau sèche' },
          { id: 'eclat-taches', label: 'Éclat du teint & anti-taches brunes' },
          { id: 'rougeurs-sensibilite', label: 'Rougeurs, tiraillements & peaux sensibles' }
        ]
      },
      {
        id: 'visage-actifs',
        title: 'Actifs stars du laboratoire',
        items: [
          { id: 'acide-hyaluronique', label: 'Acide Hyaluronique 3.5%' },
          { id: 'niacinamide', label: 'Niacinamide 10% & Cuivre' },
          { id: 'vitamine-c', label: 'Vitamine C 10% stabilisée' },
          { id: 'retinol-vegetal', label: 'Rétinol-like 100% végétal' },
          { id: 'acide-glycolique', label: 'Acide Glycolique AHA 10%' }
        ]
      }
    ]
  },
  {
    id: 'cheveux',
    label: 'Cheveux',
    slug: 'cheveux',
    iconName: 'Scissors',
    featured: true,
    description: 'Des soins capillaires propres, poudres de plantes et shampoings sans sulfates pour une chevelure éclatante.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    groups: [
      {
        id: 'cheveux-produits',
        title: 'Par type de soin',
        items: [
          { id: 'shampoings-apres-shampoings', label: 'Shampoings & Après-shampoings solides & liquides' },
          { id: 'huiles-serums-capillaires', label: 'Huiles capillaires fortifiantes' },
          { id: 'poudres-ayurvediques', label: 'Poudres de plantes & Hennés 100% purs' },
          { id: 'colorations-vegetales', label: 'Colorations végétales naturelles' },
          { id: 'masques-bases-cheveux', label: 'Masques & Soins démêlants' }
        ]
      },
      {
        id: 'cheveux-besoins',
        title: 'Par type de cheveu & besoin',
        items: [
          { id: 'chute-croissance', label: 'Chute de cheveux & stimulation pousse' },
          { id: 'boucles-ondulations', label: 'Définition boucles & cheveux texturés' },
          { id: 'secs-abimes', label: 'Cheveux très secs, cassants ou colorés' },
          { id: 'cuir-chevelu-sensible', label: 'Cuir chevelu sensible & pellicules' },
          { id: 'gras-regulant', label: 'Racines grasses & pointes sèches' }
        ]
      }
    ]
  },
  {
    id: 'aromatherapie',
    label: 'Aromathérapie',
    slug: 'aromatherapie',
    iconName: 'Droplets',
    featured: true,
    description: 'Huiles essentielles 100% pures, chémotypées et certifiées BIO, sélectionnées directement auprès des producteurs.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
    groups: [
      {
        id: 'aroma-categories',
        title: 'Les essentiels de l’aromathérapie',
        items: [
          { id: 'huiles-essentielles-bio', label: 'Toutes les huiles essentielles BIO' },
          { id: 'huiles-vegetales-support', label: 'Huiles végétales de dilution' },
          { id: 'diffuseurs-nebulisateurs', label: 'Diffuseurs d’ambiance & Brumisateurs' },
          { id: 'synergies-diffusion', label: 'Synergies bien-être prêtes à diffuser' },
          { id: 'roll-ons-inhalateurs', label: 'Roll-ons & Inhalateurs nomades' }
        ]
      },
      {
        id: 'aroma-besoins',
        title: 'Par bienfait recherché',
        items: [
          { id: 'sommeil-relaxation', label: 'Sommeil réparateur & Anti-stress' },
          { id: 'immunite-voies-respiratoires', label: 'Immunité & Voies respiratoires (Ravintsara...)' },
          { id: 'douleurs-musculaires', label: 'Muscles, articulations & récupération' },
          { id: 'digestion-vitalite', label: 'Confort digestif & Tonus naturel' },
          { id: 'purifiant-maison', label: 'Assainissant d’air & purification' }
        ]
      }
    ]
  },
  {
    id: 'diy-cosmetique',
    label: 'DIY & Ingrédients',
    slug: 'diy-cosmetique',
    iconName: 'FlaskConical',
    featured: true,
    description: 'La référence pionnière du cosmétique maison : bases neutres, matières premières pures, flaconnage éco-responsable.',
    image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=600&q=80',
    groups: [
      {
        id: 'diy-bases-actifs',
        title: 'Matières premières & Ingrédients',
        items: [
          { id: 'bases-neutres-diy', label: 'Bases neutres personnalisables' },
          { id: 'actifs-cosmetiques', label: 'Actifs cosmétiques haute performance' },
          { id: 'emulsifiants-cires', label: 'Émulsifiants, cires végétales & gommes' },
          { id: 'conservateurs-antioxydants', label: 'Conservateurs agréés Bio & Antioxydants' },
          { id: 'colorants-micas-pigments', label: 'Pigments minéraux, micas & ocres' }
        ]
      },
      {
        id: 'diy-materiel',
        title: 'Contenants & Accessoires',
        items: [
          { id: 'flacons-verre-ambre', label: 'Flacons en verre ambré & pipettes' },
          { id: 'pots-bocaux-verre', label: 'Pots & contenants rechargeables' },
          { id: 'balances-eprouvettes', label: 'Matériel de mesure, fouets & balances' },
          { id: 'kits-debutant-diy', label: 'Kits complets de fabrication DIY', badge: 'Idée cadeau' }
        ]
      }
    ]
  },
  {
    id: 'corps-bain',
    label: 'Corps & Bain',
    slug: 'corps-bain',
    iconName: 'HeartHandshake',
    description: 'Des soins cocooning pour le corps, baumes ultra-nourrissants et savons saponifiés à froid formulés sans compromis.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    groups: [
      {
        id: 'corps-produits',
        title: 'Nos soins corps',
        items: [
          { id: 'beurres-baumes-vegetaux', label: 'Beurres végétaux bruts (Karité, Cacao...)' },
          { id: 'gels-douche-savons', label: 'Savons saponifiés à froid & Gels douche' },
          { id: 'deodorants-naturels', label: 'Déodorants naturels sans sels d’aluminium' },
          { id: 'huiles-massage-corps', label: 'Huiles de massage relaxantes & minceur' },
          { id: 'gommages-corps', label: 'Gommages au sel & sucre de canne' }
        ]
      }
    ]
  },
  {
    id: 'complements-sante',
    label: 'Compléments & Santé',
    slug: 'complements-sante',
    iconName: 'Pill',
    description: 'Une approche holistique : nutriments bio, collagène marin pur, spiruline et plantes adaptogènes.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    groups: [
      {
        id: 'complements-types',
        title: 'Nutrition & Nutricosmétique',
        items: [
          { id: 'collagene-acide-hyaluronique', label: 'Collagène marin & Beauté de la peau' },
          { id: 'vitamines-mineraux', label: 'Vitamines, Zinc & Magnésium bio' },
          { id: 'superaliments-spiruline', label: 'Superaliments, Spiruline & Maca' },
          { id: 'plantes-gelules-sommeil', label: 'Plantes en gélules (Ashwagandha, Mélatonine...)' },
          { id: 'tisanes-infusions-bio', label: 'Tisanes bien-être & Détox bio' }
        ]
      }
    ]
  },
  {
    id: 'maison-zero-dechet',
    label: 'Maison & Écologie',
    slug: 'maison-zero-dechet',
    iconName: 'Home',
    description: 'L’entretien naturel de la maison : lessive végétale, vinaigre blanc concentré, savon noir et bicarbonate.',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80',
    groups: [
      {
        id: 'maison-produits',
        title: 'Maison saine & éco-gestes',
        items: [
          { id: 'droguerie-ecologique', label: 'Droguerie écologique (Bicarbonate, Percarbonate, Vinaigre)' },
          { id: 'savons-noirs-lessive', label: 'Savon noir à l’huile d’olive & Lessive DIY' },
          { id: 'bougies-parfums-naturels', label: 'Bougies végétales & Parfums d’intérieur' },
          { id: 'accessoires-zero-dechet', label: 'Éponges végétales, brosses bois & Zéro déchet' }
        ]
      }
    ]
  }
];

export const QUICK_CATEGORY_SHORTCUTS = [
  {
    id: 'serums',
    label: 'Sérums Visage',
    badge: 'Best-seller',
    categoryId: 'soins-visage',
    subcategoryId: 'serums-concentres',
    image: '/products/serum-acide-hyaluronique.jpg'
  },
  {
    id: 'huiles-essentielles',
    label: 'Huiles Essentielles',
    badge: '100% BIO',
    categoryId: 'aromatherapie',
    subcategoryId: 'huiles-essentielles-bio',
    image: '/products/huile-essentielle-tea-tree-bio.jpg'
  },
  {
    id: 'huiles-vegetales',
    label: 'Huiles Végétales',
    badge: 'Pures',
    categoryId: 'soins-visage',
    subcategoryId: 'huiles-vegetales-visage',
    image: '/products/huile-vegetale-jojoba-bio.jpg'
  },
  {
    id: 'bases-neutres',
    label: 'Bases & DIY',
    badge: 'Personnalisables',
    categoryId: 'diy-cosmetique',
    subcategoryId: 'bases-neutres-diy',
    image: '/products/creme-neutre-desalterante-bio.jpg'
  },
  {
    id: 'cheveux-poudres',
    label: 'Soins Cheveux',
    badge: 'Sans sulfate',
    categoryId: 'cheveux',
    subcategoryId: 'shampoings-apres-shampoings',
    image: '/products/shampoing-solide-spiruline-bio.jpg'
  },
  {
    id: 'hydrolats',
    label: 'Hydrolats BIO',
    badge: 'Frais & purs',
    categoryId: 'soins-visage',
    subcategoryId: 'hydrolats-eaux-florales',
    image: '/products/hydrolat-rose-damas-bio.jpg'
  },
  {
    id: 'complements-cutanés',
    label: 'Collagène & Santé',
    badge: 'Nouveau',
    categoryId: 'complements-sante',
    subcategoryId: 'collagene-acide-hyaluronique',
    image: '/products/collagene-marin-vitamine-c.jpg'
  },
  {
    id: 'flaconnage',
    label: 'Flaconnage Verre',
    badge: 'Rechargeable',
    categoryId: 'diy-cosmetique',
    subcategoryId: 'flacons-verre-ambre',
    image: '/products/serum-retinol-like-vegetal.jpg'
  }
];
