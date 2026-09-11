//Ces données de démonstration sont destinées uniquement au développement et peuvent être supprimées lorsque Sam connectera l'interface MJ à Pinia.
import useCampagneStore from '@/stores/campagne';
import useChapitreStore from '@/stores/chapitre';
import useQueteStore from '@/stores/quete';
import useJoueurStore from '@/stores/joueur';
import useLieuStore from '@/stores/lieu';
import useObjetStore from '@/stores/objet';
import useIndiceStore from '@/stores/indice';

export function initialiserDonneesDemo() {
  const campagneStore = useCampagneStore();
  const chapitreStore = useChapitreStore();
  const queteStore = useQueteStore();
  const joueurStore = useJoueurStore();
  const lieuStore = useLieuStore();
  const objetStore = useObjetStore();
  const indiceStore = useIndiceStore();

  const campagneId = 'demo-campagne-royaume';

  // Ne crée pas une deuxième fois les données de démonstration.
  const campagneExiste = campagneStore.liste.some(
    ({ id }) => id === campagneId,
  );

  if (campagneExiste) {
    return;
  }

  campagneStore.liste.push({
    id: campagneId,
    nom: 'Le Royaume perdu',
    statut: 'active',
    description: 'Une aventure pour retrouver un royaume disparu.',
    commentaire_MJ: 'Le dragon protège le secret final.',
  });

  lieuStore.liste.push(
    {
      id: 'demo-lieu-village',
      campagne_id: campagneId,
      nom: 'Le village',
      description: 'Un petit village situé au bord de la forêt.',
      commentaire_MJ: 'Le forgeron connaît un passage secret.',
    },
    {
      id: 'demo-lieu-foret',
      campagne_id: campagneId,
      nom: 'La forêt',
      description: 'Une forêt sombre remplie de mystères.',
      commentaire_MJ: 'La clé est cachée sous un arbre.',
    },
    {
      id: 'demo-lieu-chateau',
      campagne_id: campagneId,
      nom: 'Le château',
      description: 'Un ancien château abandonné.',
      commentaire_MJ: 'Le dragon se trouve dans la grande salle.',
    },
  );

  objetStore.liste.push(
    {
      id: 'demo-objet-carte',
      campagne_id: campagneId,
      nom: 'Carte ancienne',
      description: 'Une carte qui indique le chemin vers la forêt.',
      commentaire_MJ: 'Elle montre également un passage secret.',
    },
    {
      id: 'demo-objet-cle',
      campagne_id: campagneId,
      nom: 'Clé ancienne',
      description: 'Une vieille clé en métal.',
      commentaire_MJ: 'Elle permet d’activer le chapitre du château.',
    },
    {
      id: 'demo-objet-epee',
      campagne_id: campagneId,
      nom: 'Épée en argent',
      description: 'Une épée ancienne particulièrement brillante.',
      commentaire_MJ: 'Cette arme est efficace contre le dragon.',
    },
  );

  indiceStore.liste.push(
    {
      id: 'demo-indice-statue',
      campagne_id: campagneId,
      nom: 'Le message de la statue',
      texte: 'La porte s’ouvrira lorsque la lune apparaîtra.',
      commentaire_MJ: 'Le mot de passe est lune.',
    },
    {
      id: 'demo-indice-dragon',
      campagne_id: campagneId,
      nom: 'La faiblesse du dragon',
      texte: 'Le dragon craint les armes en argent.',
      commentaire_MJ: 'Cet indice prépare le combat final.',
    },
  );

  joueurStore.liste.push(
    {
      id: 'demo-joueur-alice',
      campagne_id: campagneId,
      nom: 'Alice',
      statut: 'vivant',
      description: 'Une exploratrice courageuse.',
      commentaire_MJ: 'Alice connaît le forgeron.',
      lieu_id: 'demo-lieu-village',
      inventaire_objets: ['demo-objet-carte'],
      inventaire_indices: [],
    },
    {
      id: 'demo-joueur-bob',
      campagne_id: campagneId,
      nom: 'Bob',
      statut: 'vivant',
      description: 'Un guerrier expérimenté.',
      commentaire_MJ: 'Bob possède une force exceptionnelle.',
      lieu_id: 'demo-lieu-foret',
      inventaire_objets: [],
      inventaire_indices: [],
    },
  );

  chapitreStore.liste.push(
    {
      id: 'demo-chapitre-village',
      campagne_id: campagneId,
      nom: 'Le village abandonné',
      statut: 'actif',
      description: 'Les aventuriers commencent leur voyage au village.',
      commentaire_MJ: 'Le forgeron donne la première mission.',
      mdp_activation: null,
      objets_necessaires: [],
      mdp_resolution: 'forgeron',
      recompenses_objets: ['demo-objet-cle'],
      recompenses_indices: ['demo-indice-statue'],
      ordre: 1,
    },
    {
      id: 'demo-chapitre-chateau',
      campagne_id: campagneId,
      nom: 'Le château maudit',
      statut: 'inactif',
      description: 'Les aventuriers doivent entrer dans le château.',
      commentaire_MJ: 'Le dragon attend les joueurs.',
      mdp_activation: 'lune',
      objets_necessaires: ['demo-objet-cle'],
      mdp_resolution: 'dragon',
      recompenses_objets: ['demo-objet-epee'],
      recompenses_indices: ['demo-indice-dragon'],
      ordre: 2,
    },
    {
      id: 'demo-chapitre-foret',
      campagne_id: campagneId,
      nom: 'Les secrets de la forêt',
      statut: 'termine',
      description: 'Les aventuriers ont découvert le secret de la forêt.',
      commentaire_MJ: 'Ce chapitre est déjà terminé pour tester la progression.',
      mdp_activation: null,
      objets_necessaires: [],
      mdp_resolution: 'arbre',
      recompenses_objets: [],
      recompenses_indices: [],
      ordre: 3,
    },
  );

  queteStore.liste.push(
    {
      id: 'demo-quete-cle',
      chapitre_id: 'demo-chapitre-village',
      lieu_id: 'demo-lieu-foret',
      nom: 'Trouver la clé',
      statut: 'active',
      description: 'Retrouvez la clé cachée dans la forêt.',
      commentaire_MJ: 'La clé est située sous le plus grand arbre.',
      mdp_activation: null,
      mdp_resolution: 'arbre',
      recompenses_objets: ['demo-objet-cle'],
      recompenses_indices: ['demo-indice-statue'],
      ordre: 1,
    },
    {
      id: 'demo-quete-porte',
      chapitre_id: 'demo-chapitre-chateau',
      lieu_id: 'demo-lieu-chateau',
      nom: 'Ouvrir la porte du château',
      statut: 'inactive',
      description: 'Trouvez un moyen d’ouvrir la porte principale.',
      commentaire_MJ: 'Le joueur doit utiliser le mot de passe lune.',
      mdp_activation: 'lune',
      mdp_resolution: 'cle',
      recompenses_objets: [],
      recompenses_indices: ['demo-indice-dragon'],
      ordre: 1,
    },
    {
      id: 'demo-quete-forgeron',
      chapitre_id: 'demo-chapitre-village',
      lieu_id: 'demo-lieu-village',
      nom: 'Rencontrer le forgeron',
      statut: 'terminee',
      description: 'Le groupe a rencontré le forgeron du village.',
      commentaire_MJ: 'Le forgeron prépare les joueurs pour la forêt.',
      mdp_activation: null,
      mdp_resolution: 'marteau',
      recompenses_objets: ['demo-objet-carte'],
      recompenses_indices: [],
      ordre: 2,
    },
    {
      id: 'demo-quete-dragon',
      chapitre_id: 'demo-chapitre-chateau',
      lieu_id: 'demo-lieu-chateau',
      nom: 'Affronter le dragon',
      statut: 'abandonnee',
      description: 'Le groupe doit affronter le gardien du château.',
      commentaire_MJ: 'Quête abandonnée pour tester le filtre.',
      mdp_activation: null,
      mdp_resolution: 'argent',
      recompenses_objets: ['demo-objet-epee'],
      recompenses_indices: [],
      ordre: 2,
    },
  );
}