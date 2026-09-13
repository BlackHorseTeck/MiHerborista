import { DIYRecipe } from '../types';

export const DIY_RECIPES_DATA: DIYRecipe[] = [
  {
    id: 'serum-eclat-vitamine-c',
    title: 'Sérum booster éclat anti-taches & bonne mine',
    subtitle: 'Une synergie antioxydante ultra-fraîche à réaliser en 5 minutes',
    category: 'Soins Visage',
    difficulty: 'Très facile',
    timeMinutes: 5,
    costEstimate: 2.80,
    conservationMonths: 3,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    benefits: [
      'Illumine le teint terne et estompe les taches',
      'Hydrate intensément grâce à la base d’acide hyaluronique',
      'Sans parfum synthétique, 100% actif'
    ],
    description: 'Créez votre propre sérum haute performance en combinant notre base culte de Sérum Acide Hyaluronique avec de l’actif Vitamine C et de l’hydrolat de Rose.',
    ingredients: [
      {
        productId: 'serum-acide-hyaluronique',
        name: 'Sérum concentré Acide Hyaluronique 3,5%',
        dosage: '25 ml (ou 1 flacon)',
        role: 'Base hydratante et repulpante'
      },
      {
        productId: 'hydrolat-rose-damas-bio',
        name: 'Hydrolat de Rose de Damas BIO',
        dosage: '5 ml',
        role: 'Tonifiant anti-âge et fraîcheur florale'
      },
      {
        productId: 'serum-vitamine-c-astaxanthine',
        name: 'Actif concentré Vitamine C',
        dosage: '10 gouttes',
        role: 'Booster d’éclat et antioxydant'
      }
    ],
    steps: [
      'Désinfectez votre matériel et flacon avec de l\'alcool à 70°.',
      'Dans le flacon de Sérum Acide Hyaluronique, versez l\'hydrolat de rose de Damas.',
      'Ajoutez les 10 gouttes de Vitamine C.',
      'Refermez le flacon et agitez vigoureusement pendant 30 secondes pour bien homogénéiser.',
      'Votre sérum personnalisé est prêt ! À appliquer matin et soir.'
    ],
    equipmentNeeded: ['Pipette graduée 10 ml', 'Flacon verre ambré 30 ml', 'Alcool à 70°']
  },
  {
    id: 'chantilly-karite-nourrissante',
    title: 'Chantilly de Karité voluptueuse visage & corps',
    subtitle: 'La texture nuage ultra-fondante pour réparer les peaux sèches',
    category: 'Corps & Bain',
    difficulty: 'Facile',
    timeMinutes: 15,
    costEstimate: 4.20,
    conservationMonths: 6,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    benefits: [
      'Nourrit et assouplit instantanément les zones rugueuses',
      'Texture mousse aérienne qui fond au contact de la peau',
      'Parfaite pour les coudes, talons, lèvres et pointes de cheveux'
    ],
    description: 'Une texture nuage irrésistible obtenue en fouettant du beurre de karité brut avec de l’huile de jojoba bio. Un réconfort immédiat sans film gras.',
    ingredients: [
      {
        productId: 'beurre-karite-brut-bio',
        name: 'Beurre de Karité brut BIO',
        dosage: '100 g',
        role: 'Nourrissant et protecteur cellulaire'
      },
      {
        productId: 'huile-vegetale-jojoba-bio',
        name: 'Huile végétale de Jojoba BIO',
        dosage: '30 ml',
        role: 'Pénétration rapide et toucher soyeux'
      },
      {
        productId: 'huile-essentielle-ravintsara-bio',
        name: 'Huile essentielle au choix (Ravintsara ou Lavande)',
        dosage: '15 gouttes',
        role: 'Parfum naturel bienfaisant'
      }
    ],
    steps: [
      'Ramollissez le beurre de Karité à l\'aide d\'une fourchette dans un bol propre (sans le chauffer au micro-ondes pour conserver ses vitamines).',
      'Ajoutez progressivement l\'huile végétale de Jojoba tout en fouettant au batteur électrique.',
      'Fouettez à vitesse moyenne pendant 5 à 8 minutes jusqu\'à obtenir une texture chantilly mousseuse blanche.',
      'Incorporez les gouttes d\'huile essentielle et battez encore 30 secondes.',
      'Transférez délicatement dans un pot propre de 150 ml à l\'aide d\'une spatule ou poche à douille.'
    ],
    equipmentNeeded: ['Batteur électrique ou fouet ménager', 'Bol en inox ou verre', 'Spatule souple']
  },
  {
    id: 'lotion-capillaire-pousse-romarin',
    title: 'Lotion stimulante anti-chute & pousse',
    subtitle: 'La formule ancestrale au Romarin et Ricin pour densifier la chevelure',
    category: 'Cheveux',
    difficulty: 'Très facile',
    timeMinutes: 5,
    costEstimate: 3.10,
    conservationMonths: 3,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80',
    benefits: [
      'Active la microcirculation du cuir chevelu',
      'Stimule la pousse et freine la chute saisonnière',
      'Ne graisse pas les racines, s\'utilise sans rinçage'
    ],
    description: 'Une lotion tonique biphasée ou aqueuse hautement concentrée en actifs végétaux réputés pour redonner vigueur et densité aux cheveux fins.',
    ingredients: [
      {
        productId: 'hydrolat-rose-damas-bio',
        name: 'Hydrolat de Romarin à verbénone BIO',
        dosage: '80 ml',
        role: 'Revitalisant du bulbe pileux'
      },
      {
        productId: 'huile-vegetale-ricin-bio',
        name: 'Huile végétale de Ricin BIO',
        dosage: '10 ml',
        role: 'Fortifiant et activateur de pousse'
      },
      {
        productId: 'huile-essentielle-tea-tree-bio',
        name: 'Huile essentielle de Tea tree BIO',
        dosage: '5 gouttes',
        role: 'Assainit le cuir chevelu'
      }
    ],
    steps: [
      'Versez l\'hydrolat dans un flacon spray de 100 ml.',
      'Ajoutez l\'huile de ricin et l\'huile essentielle.',
      'Agitez vigoureusement avant chaque emploi pour émulsionner les deux phases.',
      'Vaporisez raie par raie sur le cuir chevelu le soir ou après le shampoing, puis massez 2 minutes du bout des doigts.'
    ],
    equipmentNeeded: ['Flacon spray 100 ml', 'Entonnoir de précision']
  }
];
