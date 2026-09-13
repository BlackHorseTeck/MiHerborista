import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'serum-acide-hyaluronique',
    name: 'Sérum concentré Acide Hyaluronique 3,5%',
    subtitle: '100% d\'origine naturelle • Haute concentration multi-poids',
    category: 'soins-visage',
    subcategory: 'serums-concentres',
    tagline: 'Hydrate intensément, repulpe visiblement et comble les ridules',
    price: 5.95,
    originalPrice: undefined,
    volume: '30 ml',
    volumeOptions: [
      { volume: '30 ml', price: 5.95 },
      { volume: '100 ml', price: 13.95 },
      { volume: 'Éco-recharge 100 ml', price: 11.95 }
    ],
    rating: 4.8,
    reviewsCount: 32853,
    badge: 'N°1 Ventes',
    badgeType: 'bestseller',
    image: '/products/serum-acide-hyaluronique.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    origin: 'Formulé en Tunisie',
    labels: ['Cosmébio', '100% d’origine naturelle', 'Sans parfum', 'Végan'],
    description: 'Le sérum culte MiHerborista ! Formulé à base de 3,5% d\'acide hyaluronique pur d’origine végétale, ce sérum offre une hydratation sans égale. Sa texture gel fraîche pénètre instantanément sans pelucher ni coller. Convient à tous les types de peaux, y compris sensibles.',
    benefits: [
      'Pénètre en profondeur pour repulper la matrice cutanée',
      'Atténue les ridules de déshydratation dès les premières applications',
      'Peut être utilisé pur ou personnalisé avec des actifs et huiles essentielles',
      'Idéal également en soin lissant et hydratant sur les pointes de cheveux'
    ],
    inci: 'Aqua, Sodium hyaluronate, Salix nigra bark extract, Glycerin, Levulinic acid, Sodium levulinate.',
    usageTips: 'Appliquer 2 à 3 gouttes matin et/ou soir sur le visage et le cou préalablement nettoyés, avant votre crème ou huile végétale.',
    texture: 'Gel frais aqueux fondant et non gras'
  },
  {
    id: 'serum-niacinamide-cuivre-zinc',
    name: 'Sérum concentré Niacinamide 10%, Cuivre & Zinc',
    subtitle: 'Régulateur de sébum, anti-imperfections et resserre les pores',
    category: 'soins-visage',
    subcategory: 'serums-concentres',
    tagline: 'Atténue les rougeurs, lisse le grain de peau et traite les boutons',
    price: 6.95,
    volume: '30 ml',
    volumeOptions: [
      { volume: '30 ml', price: 6.95 },
      { volume: '100 ml', price: 15.95 }
    ],
    rating: 4.7,
    reviewsCount: 8037,
    badge: 'Best-seller',
    badgeType: 'bestseller',
    image: '/products/serum-niacinamide-cuivre-zinc.jpg',
    origin: 'Formulé en Tunisie',
    labels: ['Cosmébio', '99,8% d’origine naturelle', 'Testé dermatologiquement'],
    description: 'Une synergie surpuissante de Niacinamide (Vitamine B3) à 10%, de Zinc PCA et de Cuivre pour purifier et apaiser les peaux mixtes à grasses ou sujettes aux imperfections. Il régule les brillances et estompe les taches pigmentaires.',
    benefits: [
      'Resserre visiblement les pores dilatés',
      'Prévient l’apparition des comédons et imperfections',
      'Atténue les marques post-acnéiques et rougeurs diffuses',
      'Enrichi en acide hyaluronique pour préserver l’hydratation'
    ],
    inci: 'Aqua, Niacinamide, Zinc PCA, Copper PCA, Sodium hyaluronate, Biosaccharide gum-1, Levulinic acid, Sodium levulinate.',
    usageTips: 'Appliquez quelques gouttes matin et soir sur l’ensemble du visage ou localement sur la zone T avant votre crème de jour.',
    texture: 'Gel fluide bleuté naturel, pénétration ultra-rapide'
  },
  {
    id: 'serum-vitamine-c-astaxanthine',
    name: 'Sérum concentré Vitamine C 10% & Astaxanthine',
    subtitle: 'Booster d’éclat, bouclier antioxydant et unifiant anti-taches',
    category: 'soins-visage',
    subcategory: 'serums-concentres',
    tagline: 'Illumine le teint terne, stimule le collagène et protège du photo-vieillissement',
    price: 7.95,
    volume: '30 ml',
    volumeOptions: [
      { volume: '30 ml', price: 7.95 }
    ],
    rating: 4.8,
    reviewsCount: 5410,
    badge: 'Éclat intense',
    badgeType: 'new',
    image: '/products/serum-vitamine-c-astaxanthine.jpg',
    origin: 'Formulé en Tunisie',
    labels: ['100% d’origine naturelle', 'Vitamine C micro-encapsulée haute stabilité'],
    description: 'Grâce à 10% de Vitamine C stabilisée et à l’Astaxanthine (le plus puissant antioxydant marin naturel), ce sérum offre un teint radieux et unifié dès 14 jours.',
    benefits: [
      'Booste l’éclat naturel et dissipe la grisaille du teint',
      'Réduit l’intensité des taches brunes et prévient leur réapparition',
      'Protège les cellules cutanées contre les radicaux libres et la pollution'
    ],
    inci: 'Aqua, Ascorbyl glucoside, Haematococcus pluvialis extract, Sodium hyaluronate, Glycerin, Sodium hydroxide.',
    usageTips: 'Idéal le matin sur peau propre pour une protection antioxydante tout au long de la journée. Faites suivre d’une protection solaire.',
    texture: 'Sérum fluide corail lumineux sans film gras'
  },
  {
    id: 'serum-retinol-like-vegetal',
    name: 'Sérum concentré Rétinol-like végétal 1%',
    subtitle: 'Alternative naturelle douce au Rétinol • Bakuchiol pur & Vigna Aconitifolia',
    category: 'soins-visage',
    subcategory: 'serums-concentres',
    tagline: 'Lisse les rides profondes, affine le grain de peau sans rougeurs',
    price: 7.90,
    volume: '30 ml',
    volumeOptions: [
      { volume: '30 ml', price: 7.90 }
    ],
    rating: 4.7,
    reviewsCount: 3912,
    badge: 'Anti-âge culte',
    badgeType: 'bestseller',
    image: '/products/serum-retinol-like-vegetal.jpg',
    origin: 'Formulé en Tunisie',
    labels: ['100% Végétal', 'Non photosensibilisant', 'Tolérance optimale'],
    description: 'Une efficacité comparable au rétinol conventionnel mais sans ses effets secondaires (irritations, desquamation, photosensibilisation). Convient même aux peaux les plus réactives.',
    benefits: [
      'Stimule le renouvellement cellulaire et la synthèse de collagène',
      'Estompe les ridules d’expression et raffermit l’ovale du visage',
      'Améliore la texture de la peau sans provoquer d’assèchement'
    ],
    inci: 'Helianthus annuus seed oil, Bakuchiol, Vigna aconitifolia seed extract, Tocopherol.',
    usageTips: 'Appliquer 3 à 4 gouttes le soir sur l’ensemble du visage et le décolleté en légers massages circulaires.',
    texture: 'Huile fine soyeuse au toucher sec'
  },
  {
    id: 'huile-vegetale-jojoba-bio',
    name: 'Huile végétale de Jojoba BIO',
    subtitle: '100% pure, vierge et première pression à froid',
    category: 'soins-visage',
    subcategory: 'huiles-vegetales-visage',
    tagline: 'L’huile universelle sébo-régulatrice visage, corps et cheveux',
    price: 8.50,
    volume: '100 ml',
    volumeOptions: [
      { volume: '100 ml', price: 8.50 },
      { volume: '250 ml', price: 16.90 },
      { volume: 'Flacon pompe 100 ml', price: 9.20 }
    ],
    rating: 4.9,
    reviewsCount: 19420,
    badge: 'BIO Certifié',
    badgeType: 'bio',
    image: '/products/huile-vegetale-jojoba-bio.jpg',
    origin: 'Origine : Pérou / Israël • Conditionné en Tunisie',
    labels: ['Certifié BIO par Ecocert', 'Cosmébio', 'Pressée à froid'],
    description: 'D’une composition très proche du sébum humain, l’huile de Jojoba rééquilibre les sécrétions sébacées sans laisser de film gras. Elle maintient la souplesse et prévient la déshydratation.',
    benefits: [
      'Régule les peaux mixtes et grasses tout en nourrissant les peaux sèches',
      'Excellente huile démaquillante douce pour les yeux et le teint',
      'Nourrit et redonne brillance aux cheveux ternes ou gras en racine'
    ],
    inci: 'Simmondsia chinensis seed oil* (*Ingrédient issu de l\'agriculture biologique).',
    usageTips: 'À utiliser pure comme soin de jour ou de nuit, ou comme base pour diluer vos huiles essentielles préférées.',
    texture: 'Cire liquide fluide dorée au fini velouté mat'
  },
  {
    id: 'huile-vegetale-ricin-bio',
    name: 'Huile végétale de Ricin BIO fortifiante',
    subtitle: 'Première pression à froid • Pure et non raffinée',
    category: 'cheveux',
    subcategory: 'huiles-serums-capillaires',
    tagline: 'Stimule la pousse, gaine la fibre et fortifie cils et sourcils',
    price: 4.95,
    volume: '100 ml',
    volumeOptions: [
      { volume: '100 ml', price: 4.95 },
      { volume: '250 ml', price: 8.95 },
      { volume: 'Flacon mascara 10 ml', price: 3.50 }
    ],
    rating: 4.8,
    reviewsCount: 15640,
    badge: 'Culte Cheveux',
    badgeType: 'bestseller',
    image: '/products/huile-vegetale-ricin-bio.jpg',
    origin: 'Origine : Inde • Conditionné en Tunisie',
    labels: ['Certifié BIO par Ecocert', 'Cosmébio', '100% Végétal'],
    description: 'Réputée depuis l’Antiquité, cette huile visqueuse d’une richesse exceptionnelle en acide ricinoléique est l’alliée indispensable pour accélérer la pousse et renforcer ongles, cils et cheveux.',
    benefits: [
      'Gaine et nourrit les cheveux dévitalisés et pointes fourchues',
      'Favorise la repousse et densifie les zones clairsemées',
      'Idéale en bain d’huile hebdomadaire avant shampoing'
    ],
    inci: 'Ricinus communis seed oil* (*Ingrédient issu de l\'agriculture biologique).',
    usageTips: 'Masser sur le cuir chevelu en friction avant le coucher ou 30 min avant le shampoing. Sur les cils avec une brosse propre.',
    texture: 'Texture dense et enveloppante'
  },
  {
    id: 'huile-essentielle-ravintsara-bio',
    name: 'Huile essentielle de Ravintsara BIO',
    subtitle: 'Cinnamomum camphora ct cinéole • 100% pure et intégrale',
    category: 'aromatherapie',
    subcategory: 'huiles-essentielles-bio',
    tagline: 'L’incontournable immunité naturelle et voies respiratoires',
    price: 4.20,
    volume: '10 ml',
    volumeOptions: [
      { volume: '10 ml', price: 4.20 },
      { volume: '30 ml', price: 8.90 }
    ],
    rating: 4.9,
    reviewsCount: 22180,
    badge: 'BIO Écocert',
    badgeType: 'bio',
    image: '/products/huile-essentielle-ravintsara-bio.jpg',
    origin: 'Madagascar • Distillerie partenariale éthique',
    labels: ['Huile Essentielle Chémotypée HECT', 'Certifié AB', '100% Pure'],
    description: 'L’huile essentielle antivirale et stimulante immunitaire par excellence. D’une remarquable douceur cutanée, elle purifie l’atmosphère et dégage les voies respiratoires encombrées.',
    benefits: [
      'Soutient les défenses naturelles dès les premiers froids d’automne',
      'Assainit l’air ambiant en diffusion douce',
      'Revitalisante physique et nerveuse en cas de fatigue passagère'
    ],
    inci: 'Cinnamomum camphora leaf oil* (*Issu de l\'agriculture biologique).',
    usageTips: 'En diffusion : 10 gouttes dans votre diffuseur. En friction : 3 gouttes diluées dans 5 gouttes d\'huile végétale sur le thorax.',
    texture: 'Liquide mobile limpide au parfum frais cinéolé et aromatique'
  },
  {
    id: 'huile-essentielle-tea-tree-bio',
    name: 'Huile essentielle de Tea tree BIO (Arbre à thé)',
    subtitle: 'Melaleuca alternifolia • Purifiante et assainissante majeure',
    category: 'aromatherapie',
    subcategory: 'huiles-essentielles-bio',
    tagline: 'L’arme secrète contre les boutons, imperfections et petits bobos',
    price: 3.90,
    volume: '10 ml',
    volumeOptions: [
      { volume: '10 ml', price: 3.90 },
      { volume: '30 ml', price: 8.20 }
    ],
    rating: 4.9,
    reviewsCount: 26400,
    badge: 'Indispensable',
    badgeType: 'bestseller',
    image: '/products/huile-essentielle-tea-tree-bio.jpg',
    origin: 'Afrique du Sud / Australie • Conditionné en Tunisie',
    labels: ['Certifié BIO', 'HECT', 'Purifiant cutané'],
    description: 'Célèbre pour ses propriétés antibactériennes à large spectre, l’huile essentielle d’Arbre à thé assainit la peau et neutralise les imperfections dès leur apparition.',
    benefits: [
      'Action ciblée sur les boutons et imperfections cutanées',
      'Purifie le cuir chevelu sujet aux pellicules grasses',
      'Assainit le linge et les surfaces en entretien écologique'
    ],
    inci: 'Melaleuca alternifolia leaf oil* (*Biologique).',
    usageTips: 'Appliquer 1 goutte pure localement sur le bouton à l\'aide d\'un coton-tige, ou 2 gouttes dans votre dose de shampoing.',
    texture: 'Liquide fluide vert pâle aux notes herbacées fraîches'
  },
  {
    id: 'creme-neutre-desalterante-bio',
    name: 'Crème neutre Désaltérante BIO personnalisable',
    subtitle: 'Enrichie en gel d\'Aloe vera bio & huile de Jojoba bio',
    category: 'diy-cosmetique',
    subcategory: 'bases-neutres-diy',
    tagline: 'Hydrate 8h, protège la barrière cutanée • Prête à l’emploi ou à personnaliser',
    price: 4.95,
    volume: '100 ml',
    volumeOptions: [
      { volume: '100 ml', price: 4.95 },
      { volume: '250 ml', price: 9.90 },
      { volume: 'Éco-recharge 250 ml', price: 8.50 }
    ],
    rating: 4.7,
    reviewsCount: 11230,
    badge: 'Base Culte DIY',
    badgeType: 'eco',
    image: '/products/creme-neutre-desalterante-bio.jpg',
    origin: 'Formulé en Tunisie',
    labels: ['Cosmébio', '100% d’origine naturelle', 'Sans parfum de synthèse'],
    description: 'Cette émulsion universelle hydratante et matifiante s\'adapte à toutes les envies. Utilisez-la pure comme soin visage quotidien ou personnalisez-la en y incorporant vos huiles essentielles et actifs préférés.',
    benefits: [
      'Hydrate durablement sans sensation collante ni fini brillant',
      'Accueille jusqu’à 5% d’actifs sans déphasage',
      'Convient à toute la famille et aux femmes enceintes'
    ],
    inci: 'Aqua, Aloe barbadensis leaf juice*, Simmondsia chinensis seed oil*, Glycerin, Cetearyl olivate, Sorbitan olivate.',
    usageTips: 'Appliquer matin et soir sur le visage et le cou. Pour personnaliser : ajouter directement les gouttes d\'actifs dans le pot et mélanger.',
    texture: 'Crème onctueuse et fluide au toucher velouté poudré'
  },
  {
    id: 'beurre-karite-brut-bio',
    name: 'Beurre de Karité brut sauvage BIO',
    subtitle: 'Non raffiné, artisanal et équitable • Qualité supérieure',
    category: 'corps-bain',
    subcategory: 'beurres-baumes-vegetaux',
    tagline: 'Nourrit intensément, apaise les zones très sèches et protège',
    price: 4.50,
    volume: '100 ml',
    volumeOptions: [
      { volume: '100 ml', price: 4.50 },
      { volume: '500 ml', price: 13.90 },
      { volume: 'Seau 1 kg', price: 23.50 }
    ],
    rating: 4.8,
    reviewsCount: 14890,
    badge: 'Commerce équitable',
    badgeType: 'bio',
    image: '/products/beurre-karite-brut-bio.jpg',
    origin: 'Coopératives féminines au Ghana & Burkina Faso',
    labels: ['100% Brut non raffiné', 'Commerce équitable', 'Ecocert Bio'],
    description: 'Issu d’une récolte sauvage et d’une pression mécanique traditionnelle, ce beurre de karité préserve l’intégralité de ses vitamines A, D, E et insaponifiables protecteurs.',
    benefits: [
      'Répare les gerçures, callosités et peaux très sèches',
      'Protège les lèvres et le nez du froid hivernal',
      'Base incontournable pour réaliser des chantillys de karité'
    ],
    inci: 'Butyrospermum parkii butter* (*Biologique et brut).',
    usageTips: 'Faire fondre une noisette dans le creux des mains avant d\'appliquer par massages généreux.',
    texture: 'Beurre ferme fondant délicatement sous la chaleur des doigts'
  },
  {
    id: 'hydrolat-rose-damas-bio',
    name: 'Hydrolat de Rose de Damas BIO',
    subtitle: 'Distillation lente à la vapeur d\'eau • Sans conservateur',
    category: 'soins-visage',
    subcategory: 'hydrolats-eaux-florales',
    tagline: 'Tonifiant anti-âge, ravive l’éclat et apaise les rougeurs',
    price: 5.20,
    volume: '200 ml',
    volumeOptions: [
      { volume: '200 ml', price: 5.20 },
      { volume: '1 Litre', price: 17.50 }
    ],
    rating: 4.9,
    reviewsCount: 9780,
    badge: 'Parfum divin',
    badgeType: 'bestseller',
    image: '/products/hydrolat-rose-damas-bio.jpg',
    origin: 'Vallée des Roses, Bulgarie',
    labels: ['100% Pur & Sans conservateur', 'Cosmébio', 'Microfiltré'],
    description: 'Véritable trésor de beauté, cette eau florale de rose tonifie, resserre le grain de peau et prévient le vieillissement cutané tout en enveloppant vos sens de son parfum envoûtant.',
    benefits: [
      'Parfait après le nettoyage pour neutraliser le calcaire de l\'eau',
      'Apaise les rougeurs et calme les peaux délicates',
      'Procure un coup d’éclat instantané le matin au réveil'
    ],
    inci: 'Rosa damascena flower water* (*Biologique).',
    usageTips: 'Vaporiser sur le visage propre avant d’appliquer votre sérum sur peau encore légèrement humide pour décupler son absorption.',
    texture: 'Brume aqueuse vivifiante à la senteur florale subtile'
  },
  {
    id: 'poudre-shikakai-bio',
    name: 'Poudre de Shikakaï BIO cheveux',
    subtitle: 'Shampoing végétal traditionnel ayurvédique • 100% pure',
    category: 'cheveux',
    subcategory: 'poudres-ayurvediques',
    tagline: 'Lave en douceur, démêle, apporte brillance et volume soyeux',
    price: 3.95,
    volume: '250 g',
    volumeOptions: [
      { volume: '250 g', price: 3.95 },
      { volume: '1 kg', price: 11.90 }
    ],
    rating: 4.8,
    reviewsCount: 11840,
    badge: 'Rituel Ayurvéda',
    badgeType: 'bio',
    image: '/products/poudre-shikakai-bio.jpg',
    origin: 'Inde • Récolte sauvage certifiée biologique',
    labels: ['100% Poudre de plante pure', 'Cosmétique Vegan', 'Zéro déchet'],
    description: 'Riche en saponines végétales, le Shikakaï nettoie le cuir chevelu en douceur sans décaper le film hydrolipidique naturel. Il facilite le démêlage et rend les cheveux brillants et soyeux.',
    benefits: [
      'Remplace avantageusement le shampoing liquide conventionnel',
      'Favorise la pousse et lutte contre les démangeaisons du cuir chevelu',
      'Apporte brillance et brillance miroir aux longueurs'
    ],
    inci: 'Acacia concinna fruit powder* (*Biologique).',
    usageTips: 'Mélanger la poudre avec de l\'eau chaude jusqu\'à obtenir une pâte onctueuse. Appliquer sur cuir chevelu mouillé, masser et rincer.',
    texture: 'Poudre ultra-fine couleur noisette'
  },
  {
    id: 'collagene-marin-vitamine-c',
    name: 'Collagène marin hydrolysé & Vitamine C',
    subtitle: 'Peptides de collagène bio-actifs hautement assimilables (Naticol®)',
    category: 'complements-sante',
    subcategory: 'collagene-acide-hyaluronique',
    tagline: 'Fermeté cutanée, élasticité et confort articulaire en cure quotidienne',
    price: 13.90,
    volume: '200 g',
    volumeOptions: [
      { volume: '200 g', price: 13.90 },
      { volume: '500 g format éco', price: 29.90 }
    ],
    rating: 4.8,
    reviewsCount: 6720,
    badge: 'Efficacité prouvée',
    badgeType: 'new',
    image: '/products/collagene-marin-vitamine-c.jpg',
    origin: 'Pêche durable certifiée Friend of the Sea • Conditionné en Tunisie',
    labels: ['Sans sucre', 'Sans arôme artificiel', 'Goût neutre'],
    description: 'Une poudre de peptides de collagène marin purifiée issue de co-produits de la pêche durable. Complétée par de la Vitamine C pour booster la synthèse endogène de collagène.',
    benefits: [
      'Améliore la fermeté et l’élasticité de la peau en 8 semaines',
      'Hydrate la peau de l’intérieur et atténue la profondeur des rides',
      'Se dissout instantanément dans un café, thé, smoothie ou verre d’eau'
    ],
    inci: 'Hydrolysat de collagène de poisson (Naticol®), Acide ascorbique (Vitamine C).',
    usageTips: '1 cuillère doseuse (environ 5 g à 10 g) par jour à diluer dans une boisson chaude ou froide de votre choix.',
    texture: 'Poudre blanche soluble sans odeur ni goût résiduel'
  },
  {
    id: 'shampoing-solide-spiruline-bio',
    name: 'Shampoing solide fortifiant à la Spiruline BIO',
    subtitle: 'Sans sulfates • Équivaut à 2 flacons de 200 ml',
    category: 'cheveux',
    subcategory: 'shampoings-apres-shampoings',
    tagline: 'Fortifie les racines, purifie et apporte légèreté et brillance',
    price: 5.50,
    volume: '85 g',
    volumeOptions: [
      { volume: '85 g', price: 5.50 }
    ],
    rating: 4.7,
    reviewsCount: 7420,
    badge: 'Zéro Plastique',
    badgeType: 'eco',
    image: '/products/shampoing-solide-spiruline-bio.jpg',
    origin: 'Fabriqué artisanalement en Tunisie',
    labels: ['Cosmébio', 'Biodégradable', 'Vegan'],
    description: 'Formulé sans tensioactifs sulfatés agressifs, ce galet enrichi en spiruline revitalisante et huile de ricin fortifie la fibre capillaire tout en moussant généreusement.',
    benefits: [
      'Mousse dense et soyeuse très facile à rincer',
      'Idéal en voyage et dans une salle de bain zéro déchet',
      'Espace les lavages en régulant le sébum'
    ],
    inci: 'Sodium cocoyl isethionate, Hydrogenated vegetable oil, Aqua, Spirulina platensis powder*, Ricinus communis seed oil*.',
    usageTips: 'Frotter directement le galet sur cheveux bien mouillés pour faire mousser, masser le cuir chevelu puis rincer soigneusement.',
    texture: 'Pain solide compact vert émeraude'
  }
];
