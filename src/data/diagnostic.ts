import { DiagnosticQuestion } from '../types';

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'skin-type',
    question: 'Comment décririez-vous votre type de peau au naturel ?',
    subtext: 'Ressenti quelques heures après le nettoyage sans soin',
    options: [
      {
        id: 'mixte-grasse',
        label: 'Mixte à grasse',
        description: 'Zone T qui brille en journée, pores visibles, parfois de petites imperfections.',
        icon: 'Droplets',
        recommendedProductIds: ['serum-niacinamide-cuivre-zinc', 'huile-vegetale-jojoba-bio']
      },
      {
        id: 'normale-deshydratee',
        label: 'Normale à déshydratée',
        description: 'Confortable mais peut tirailler ponctuellement, ridules de déshydratation.',
        icon: 'Sparkles',
        recommendedProductIds: ['serum-acide-hyaluronique', 'creme-neutre-desalterante-bio']
      },
      {
        id: 'seche-inconfortable',
        label: 'Très sèche & inconfortable',
        description: 'Tiraillements fréquents, desquamations, sensation de manque de nutrition.',
        icon: 'Shield',
        recommendedProductIds: ['beurre-karite-brut-bio', 'serum-acide-hyaluronique']
      },
      {
        id: 'mature',
        label: 'Mature ou premières rides',
        description: 'Perte de fermeté, ridules installées, besoin de stimulation et de rebond.',
        icon: 'Heart',
        recommendedProductIds: ['serum-retinol-like-vegetal', 'collagene-marin-vitamine-c']
      }
    ]
  },
  {
    id: 'main-concern',
    question: 'Quelle est votre préoccupation prioritaire en ce moment ?',
    subtext: 'Votre objectif beauté principal pour les semaines à venir',
    options: [
      {
        id: 'anti-age',
        label: 'Lisser les rides & raffermir',
        description: 'Atténuer les rides, restaurer l’élasticité et le galbe naturel du visage.',
        icon: 'Sparkles',
        recommendedProductIds: ['serum-acide-hyaluronique', 'serum-retinol-like-vegetal', 'collagene-marin-vitamine-c']
      },
      {
        id: 'imperfections',
        label: 'Éliminer les boutons & resserrer les pores',
        description: 'Purifier la peau, réguler l’excès de sébum et estomper les marques rouges.',
        icon: 'Target',
        recommendedProductIds: ['serum-niacinamide-cuivre-zinc', 'huile-essentielle-tea-tree-bio']
      },
      {
        id: 'eclat',
        label: 'Raviver le teint terne & atténuer les taches',
        description: 'Retrouver un teint lumineux, homogène et un grain de peau éclatant.',
        icon: 'Sun',
        recommendedProductIds: ['serum-vitamine-c-astaxanthine', 'hydrolat-rose-damas-bio']
      },
      {
        id: 'apaisement',
        label: 'Calmer les rougeurs & la sensibilité',
        description: 'Renforcer la barrière cutanée et calmer les sensations d’échauffement.',
        icon: 'Heart',
        recommendedProductIds: ['hydrolat-rose-damas-bio', 'huile-vegetale-jojoba-bio']
      }
    ]
  },
  {
    id: 'routine-style',
    question: 'Quel est votre style de routine idéal ?',
    subtext: 'Le temps et l’approche qui vous correspondent le mieux',
    options: [
      {
        id: 'minimaliste',
        label: 'Routine Express (2 minutes)',
        description: '1 sérum + 1 soin hydratant, rapide et ultra-efficace.',
        icon: 'Zap',
        recommendedProductIds: ['serum-acide-hyaluronique', 'creme-neutre-desalterante-bio']
      },
      {
        id: 'expert-diy',
        label: 'Rituel Expert & DIY',
        description: 'J’adore combiner des actifs purs, des huiles et personnaliser mes soins.',
        icon: 'FlaskConical',
        recommendedProductIds: ['creme-neutre-desalterante-bio', 'serum-vitamine-c-astaxanthine', 'hydrolat-rose-damas-bio']
      },
      {
        id: 'holistique',
        label: 'Approche In & Out (Soin + Complément)',
        description: 'Agir à la fois sur la peau de l’extérieur et de l’intérieur.',
        icon: 'Pill',
        recommendedProductIds: ['collagene-marin-vitamine-c', 'serum-acide-hyaluronique']
      }
    ]
  }
];
