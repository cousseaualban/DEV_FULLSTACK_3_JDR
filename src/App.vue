<script setup>
import { ref, nextTick } from 'vue';

import useCampagneStore from './stores/campagne.js';
import useChapitreStore from './stores/chapitre.js';
import useQueteStore from './stores/quete.js';
import useJoueurStore from './stores/joueur.js';
import useLieuStore from './stores/lieu.js';
import useObjetStore from './stores/objet.js';
import useIndiceStore from './stores/indice.js';

const campagneStore = useCampagneStore();
const chapitreStore = useChapitreStore();
const queteStore = useQueteStore();
const joueurStore = useJoueurStore();
const lieuStore = useLieuStore();
const objetStore = useObjetStore();
const indiceStore = useIndiceStore();

const resultats = ref([]);
const testsTermines = ref(false);

function tester(nom, condition) {
  if (condition) {
    resultats.value.push({
      nom,
      resultat: 'Réussi',
    });
  } else {
    resultats.value.push({
      nom,
      resultat: 'Échec',
    });
  }
}

async function lancerTests() {
  resultats.value = [];
  testsTermines.value = false;

  // - Données de test
  const ancienneCampagneActive = campagneStore.liste.find(
    ({ statut }) => (statut === 'active'),
  );

  campagneStore.ajouterCampagne(
    'Campagne de test global',
    'brouillon',
    'Description test',
    'Commentaire MJ test',
  );

  const campagne = campagneStore.liste[campagneStore.liste.length - 1];

  lieuStore.ajouterLieu(
    campagne.id,
    'Lieu de test 1',
    'Description du lieu 1',
    'Commentaire MJ lieu 1',
  );

  lieuStore.ajouterLieu(
    campagne.id,
    'Lieu de test 2',
    'Description du lieu 2',
    'Commentaire MJ lieu 2',
  );

  const lieu1 = lieuStore.liste[lieuStore.liste.length - 2];
  const lieu2 = lieuStore.liste[lieuStore.liste.length - 1];

  objetStore.ajouterObjet(
    campagne.id,
    'Objet de test',
    'Description objet',
    'Commentaire MJ objet',
  );

  const objet = objetStore.liste[objetStore.liste.length - 1];

  indiceStore.ajouterIndice(
    campagne.id,
    'Indice de test',
    'Texte indice',
    'Commentaire MJ indice',
  );

  const indice = indiceStore.liste[indiceStore.liste.length - 1];

  joueurStore.ajouterJoueur(
    campagne.id,
    'Joueur 1',
    'Description joueur 1',
    'Commentaire MJ joueur 1',
    lieu1.id,
  );

  joueurStore.ajouterJoueur(
    campagne.id,
    'Joueur 2',
    'Description joueur 2',
    'Commentaire MJ joueur 2',
    lieu2.id,
  );

  const joueur1 = joueurStore.liste[joueurStore.liste.length - 2];
  const joueur2 = joueurStore.liste[joueurStore.liste.length - 1];

  chapitreStore.ajouterChapitre(
    campagne.id,
    'Chapitre 1',
    'Description chapitre 1',
    'Commentaire MJ chapitre 1',
    null,
    [],
    null,
    [],
    [],
  );

  chapitreStore.ajouterChapitre(
    campagne.id,
    'Chapitre 2',
    'Description chapitre 2',
    'Commentaire MJ chapitre 2',
    null,
    [],
    null,
    [],
    [],
  );

  const chapitre1 = chapitreStore.liste[chapitreStore.liste.length - 2];
  const chapitre2 = chapitreStore.liste[chapitreStore.liste.length - 1];

  queteStore.ajouterQuete(
    chapitre1.id,
    lieu1.id,
    'Quête 1',
    'Description quête 1',
    'Commentaire MJ quête 1',
    null,
    'secret1',
    [],
    [],
  );

  queteStore.ajouterQuete(
    chapitre1.id,
    lieu1.id,
    'Quête 2',
    'Description quête 2',
    'Commentaire MJ quête 2',
    null,
    'secret2',
    [],
    [],
  );

  const quete1 = queteStore.liste[queteStore.liste.length - 2];
  const quete2 = queteStore.liste[queteStore.liste.length - 1];

  // - Test getters
  tester(
    'Trouver une campagne',
    campagneStore.campagneSpecifique(campagne.id)?.id === campagne.id,
  );

  tester(
    'Trouver un chapitre',
    chapitreStore.chapitreSpecifique(chapitre1.id)?.id === chapitre1.id,
  );

  tester(
    'Trouver une quête',
    queteStore.queteSpecifique(quete1.id)?.id === quete1.id,
  );

  tester(
    'Trouver un joueur',
    joueurStore.joueurSpecifique(joueur1.id)?.id === joueur1.id,
  );

  tester(
    'Trouver un lieu',
    lieuStore.lieuSpecifique(lieu1.id)?.id === lieu1.id,
  );

  tester(
    'Trouver un objet',
    objetStore.objetSpecifique(objet.id)?.id === objet.id,
  );

  tester(
    'Trouver un indice',
    indiceStore.indiceSpecifique(indice.id)?.id === indice.id,
  );

  tester(
    'Trouver les chapitres d’une campagne',
    chapitreStore.chapitresCampagne(campagne.id).length === 2,
  );

  tester(
    'Trouver les quêtes d’un chapitre',
    queteStore.quetesChapitre(chapitre1.id).length === 2,
  );

  tester(
    'Trouver les quêtes d’un lieu',
    queteStore.quetesLieu(lieu1.id).length === 2,
  );

  tester(
    'Trouver les joueurs d’une campagne',
    joueurStore.joueursCampagne(campagne.id).length === 2,
  );

  tester(
    'Trouver les joueurs d’un lieu',
    joueurStore.joueursDansLieu(lieu1.id).length === 1,
  );

  tester(
    'Trouver les lieux d’une campagne',
    lieuStore.lieuxCampagne(campagne.id).length === 2,
  );

  tester(
    'Trouver les objets d’une campagne',
    objetStore.objetsCampagne(campagne.id).length === 1,
  );

  tester(
    'Trouver les indices d’une campagne',
    indiceStore.indicesCampagne(campagne.id).length === 1,
  );

  // - Test statuts
  campagneStore.definirCampagneActive(campagne.id);

  tester(
    'Activer une campagne',
    campagne.statut === 'active'
      && campagneStore.campagneActive?.id === campagne.id,
  );

  chapitreStore.changerStatutChapitre(chapitre1.id, 'actif');

  tester(
    'Activer un chapitre',
    chapitre1.statut === 'actif',
  );

  chapitreStore.changerStatutChapitre(chapitre1.id, 'termine');

  tester(
    'Terminer un chapitre',
    chapitre1.statut === 'termine',
  );

  queteStore.changerStatutQuete(quete1.id, 'terminee');

  tester(
    'Terminer une quête',
    quete1.statut === 'terminee',
  );

  queteStore.changerStatutQuete(quete1.id, 'abandonnee');

  tester(
    'Abandonner une quête',
    quete1.statut === 'abandonnee',
  );

  joueurStore.changerStatutJoueur(joueur1.id, 'mort');

  tester(
    'Changer le statut d’un joueur',
    joueur1.statut === 'mort',
  );

  joueurStore.changerStatutJoueur(joueur1.id, 'vivant');

  // - Test déplacement joueur
  joueurStore.deplacerJoueur(joueur1.id, lieu2.id);

  tester(
    'Déplacer un joueur',
    joueur1.lieu_id === lieu2.id,
  );

  joueurStore.deplacerJoueur(joueur1.id, lieu1.id);

  // - Test inventaire objet
  joueurStore.donnerObjet(joueur1.id, objet.id);

  tester(
    'Donner un objet à un joueur',
    joueur1.inventaire_objets.includes(objet.id),
  );

  joueurStore.donnerObjet(joueur1.id, objet.id);

  tester(
    'Empêcher les doublons d’objet',
    joueur1.inventaire_objets.filter((id) => (id === objet.id)).length === 1,
  );

  joueurStore.retirerObjet(joueur1.id, objet.id);

  tester(
    'Retirer un objet',
    !joueur1.inventaire_objets.includes(objet.id),
  );

  // - Test inventaire indice
  joueurStore.donnerIndice(joueur1.id, indice.id);

  tester(
    'Donner un indice à un joueur',
    joueur1.inventaire_indices.includes(indice.id),
  );

  joueurStore.donnerIndice(joueur1.id, indice.id);

  tester(
    'Empêcher les doublons d’indice',
    joueur1.inventaire_indices.filter((id) => (id === indice.id)).length === 1,
  );

  joueurStore.donnerIndiceATous(campagne.id, indice.id);

  tester(
    'Donner un indice à tous les joueurs',
    joueur1.inventaire_indices.includes(indice.id)
      && joueur2.inventaire_indices.includes(indice.id),
  );

  joueurStore.retirerIndice(joueur1.id, indice.id);

  tester(
    'Retirer un indice',
    !joueur1.inventaire_indices.includes(indice.id),
  );

  // - Test assignation chapitre
  chapitreStore.desassignerChapitre(chapitre2.id);

  tester(
    'Désassigner un chapitre',
    chapitre2.campagne_id === null,
  );

  tester(
    'Chapitre désassigné absent de la campagne',
    chapitreStore.chapitresCampagne(campagne.id).length === 1,
  );

  chapitreStore.assignerChapitre(chapitre2.id, campagne.id);

  tester(
    'Assigner un chapitre à une campagne',
    chapitre2.campagne_id === campagne.id,
  );

  tester(
    'Chapitre réassigné à la campagne',
    chapitreStore.chapitresCampagne(campagne.id).length === 2,
  );

  // - Test assignation quête
  queteStore.desassignerQuete(quete2.id);

  tester(
    'Désassigner une quête',
    quete2.chapitre_id === null,
  );

  tester(
    'Quête désassignée absente du chapitre',
    queteStore.quetesChapitre(chapitre1.id).length === 1,
  );

  queteStore.assignerQuete(quete2.id, chapitre1.id);

  tester(
    'Assigner une quête à un chapitre',
    quete2.chapitre_id === chapitre1.id,
  );

  tester(
    'Quête réassignée au chapitre',
    queteStore.quetesChapitre(chapitre1.id).length === 2,
  );

  // - Test modification campagne
  campagneStore.modifierCampagne(
    campagne.id,
    'Campagne modifiée',
    'Description modifiée',
    'Commentaire MJ modifié',
  );

  tester(
    'Modifier une campagne',
    campagne.nom === 'Campagne modifiée'
      && campagne.description === 'Description modifiée'
      && campagne.commentaire_MJ === 'Commentaire MJ modifié',
  );

  // - Test modification chapitre
  chapitreStore.modifierChapitre(
    chapitre1.id,
    'Chapitre modifié',
    'Description modifiée',
    'Commentaire MJ modifié',
    'motdepasse',
    [objet.id],
    'resolution',
    [objet.id],
    [indice.id],
  );

  tester(
    'Modifier un chapitre',
    chapitre1.nom === 'Chapitre modifié'
      && chapitre1.mdp_activation === 'motdepasse'
      && chapitre1.objets_necessaires.includes(objet.id)
      && chapitre1.recompenses_objets.includes(objet.id)
      && chapitre1.recompenses_indices.includes(indice.id),
  );

  // - Test modification quête
  queteStore.modifierQuete(
    quete1.id,
    chapitre2.id,
    lieu2.id,
    'Quête modifiée',
    'Description modifiée',
    'Commentaire MJ modifié',
    'activation',
    'resolution',
    [objet.id],
    [indice.id],
  );

  tester(
    'Modifier une quête',
    quete1.nom === 'Quête modifiée'
      && quete1.chapitre_id === chapitre2.id
      && quete1.lieu_id === lieu2.id
      && quete1.recompenses_objets.includes(objet.id)
      && quete1.recompenses_indices.includes(indice.id),
  );

  // - Test modification joueur
  joueurStore.modifierJoueur(
    joueur1.id,
    'Joueur modifié',
    'Description modifiée',
    'Commentaire MJ modifié',
  );

  tester(
    'Modifier un joueur',
    joueur1.nom === 'Joueur modifié'
      && joueur1.description === 'Description modifiée'
      && joueur1.commentaire_MJ === 'Commentaire MJ modifié',
  );

  // - Test modification lieu
  lieuStore.modifierLieu(
    lieu1.id,
    'Lieu modifié',
    'Description modifiée',
    'Commentaire MJ modifié',
  );

  tester(
    'Modifier un lieu',
    lieu1.nom === 'Lieu modifié'
      && lieu1.description === 'Description modifiée'
      && lieu1.commentaire_MJ === 'Commentaire MJ modifié',
  );

  // - Test modification objet
  objetStore.modifierObjet(
    objet.id,
    'Objet modifié',
    'Description modifiée',
    'Commentaire MJ modifié',
  );

  tester(
    'Modifier un objet',
    objet.nom === 'Objet modifié'
      && objet.description === 'Description modifiée'
      && objet.commentaire_MJ === 'Commentaire MJ modifié',
  );

  // - Test modification indice
  indiceStore.modifierIndice(
    indice.id,
    'Indice modifié',
    'Texte modifié',
    'Commentaire MJ modifié',
  );

  tester(
    'Modifier un indice',
    indice.nom === 'Indice modifié'
      && indice.texte === 'Texte modifié'
      && indice.commentaire_MJ === 'Commentaire MJ modifié',
  );

  // - Test duplication campagne
  const nombreCampagnesAvant = campagneStore.liste.length;

  campagneStore.dupliquerCampagne(campagne.id);

  const campagneDupliquee = campagneStore.liste[campagneStore.liste.length - 1];

  tester(
    'Dupliquer une campagne',
    campagneStore.liste.length === nombreCampagnesAvant + 1
      && campagneDupliquee.id !== campagne.id
      && campagneDupliquee.nom === campagne.nom,
  );

  tester(
    'Duplication campagne active non active',
    campagneDupliquee.statut !== 'active',
  );

  // - Test duplication chapitre
  const nombreChapitresAvant = chapitreStore.liste.length;

  chapitreStore.dupliquerChapitre(chapitre1.id);

  const chapitreDuplique = chapitreStore.liste[chapitreStore.liste.length - 1];

  tester(
    'Dupliquer un chapitre',
    chapitreStore.liste.length === nombreChapitresAvant + 1
      && chapitreDuplique.id !== chapitre1.id
      && chapitreDuplique.nom === chapitre1.nom
      && chapitreDuplique.campagne_id === chapitre1.campagne_id,
  );

  tester(
    'Duplication des récompenses du chapitre',
    chapitreDuplique.recompenses_objets !== chapitre1.recompenses_objets
      && chapitreDuplique.recompenses_indices !== chapitre1.recompenses_indices,
  );

  // - Test duplication quête
  const nombreQuetesAvant = queteStore.liste.length;

  queteStore.dupliquerQuete(quete1.id);

  const queteDupliquee = queteStore.liste[queteStore.liste.length - 1];

  tester(
    'Dupliquer une quête',
    queteStore.liste.length === nombreQuetesAvant + 1
      && queteDupliquee.id !== quete1.id
      && queteDupliquee.nom === quete1.nom
      && queteDupliquee.chapitre_id === quete1.chapitre_id,
  );

  tester(
    'Duplication des récompenses de la quête',
    queteDupliquee.recompenses_objets !== quete1.recompenses_objets
      && queteDupliquee.recompenses_indices !== quete1.recompenses_indices,
  );

  // - Test duplication joueur
  const nombreJoueursAvant = joueurStore.liste.length;

  joueurStore.dupliquerJoueur(joueur1.id);

  const joueurDuplique = joueurStore.liste[joueurStore.liste.length - 1];

  tester(
    'Dupliquer un joueur',
    joueurStore.liste.length === nombreJoueursAvant + 1
      && joueurDuplique.id !== joueur1.id
      && joueurDuplique.nom === joueur1.nom
      && joueurDuplique.campagne_id === joueur1.campagne_id,
  );

  // - Test duplication lieu
  const nombreLieuxAvant = lieuStore.liste.length;

  lieuStore.dupliquerLieu(lieu1.id);

  const lieuDuplique = lieuStore.liste[lieuStore.liste.length - 1];

  tester(
    'Dupliquer un lieu',
    lieuStore.liste.length === nombreLieuxAvant + 1
      && lieuDuplique.id !== lieu1.id
      && lieuDuplique.nom === lieu1.nom
      && lieuDuplique.campagne_id === lieu1.campagne_id,
  );

  // - Test duplication objet
  const nombreObjetsAvant = objetStore.liste.length;

  objetStore.dupliquerObjet(objet.id);

  const objetDuplique = objetStore.liste[objetStore.liste.length - 1];

  tester(
    'Dupliquer un objet',
    objetStore.liste.length === nombreObjetsAvant + 1
      && objetDuplique.id !== objet.id
      && objetDuplique.nom === objet.nom
      && objetDuplique.campagne_id === objet.campagne_id,
  );

  // - Test duplication indice
  const nombreIndicesAvant = indiceStore.liste.length;

  indiceStore.dupliquerIndice(indice.id);

  const indiceDuplique = indiceStore.liste[indiceStore.liste.length - 1];

  tester(
    'Dupliquer un indice',
    indiceStore.liste.length === nombreIndicesAvant + 1
      && indiceDuplique.id !== indice.id
      && indiceDuplique.nom === indice.nom
      && indiceDuplique.campagne_id === indice.campagne_id,
  );

  // - Test persistance
  await nextTick();

  tester(
    'Persistance campagne',
    JSON.parse(localStorage.getItem('campagne_store'))
      .some(({ id }) => (id === campagne.id)),
  );

  tester(
    'Persistance chapitre',
    JSON.parse(localStorage.getItem('chapitre_store'))
      .some(({ id }) => (id === chapitre1.id)),
  );

  tester(
    'Persistance quête',
    JSON.parse(localStorage.getItem('quete_store'))
      .some(({ id }) => (id === quete1.id)),
  );

  tester(
    'Persistance joueur',
    JSON.parse(localStorage.getItem('joueur_store'))
      .some(({ id }) => (id === joueur1.id)),
  );

  tester(
    'Persistance lieu',
    JSON.parse(localStorage.getItem('lieu_store'))
      .some(({ id }) => (id === lieu1.id)),
  );

  tester(
    'Persistance objet',
    JSON.parse(localStorage.getItem('objet_store'))
      .some(({ id }) => (id === objet.id)),
  );

  tester(
    'Persistance indice',
    JSON.parse(localStorage.getItem('indice_store'))
      .some(({ id }) => (id === indice.id)),
  );

  // - Suppression des données de test
  const idsChapitresTest = [
    chapitre1.id,
    chapitre2.id,
    chapitreDuplique.id,
  ];

  const idsQuetesTest = [
    quete1.id,
    quete2.id,
    queteDupliquee.id,
  ];

  const idsJoueursTest = [
    joueur1.id,
    joueur2.id,
    joueurDuplique.id,
  ];

  const idsLieuxTest = [
    lieu1.id,
    lieu2.id,
    lieuDuplique.id,
  ];

  const idsObjetsTest = [
    objet.id,
    objetDuplique.id,
  ];

  const idsIndicesTest = [
    indice.id,
    indiceDuplique.id,
  ];

  idsQuetesTest.forEach((id) => {
    queteStore.supprimerQuete(id);
  });

  idsChapitresTest.forEach((id) => {
    chapitreStore.supprimerChapitre(id);
  });

  idsJoueursTest.forEach((id) => {
    joueurStore.supprimerJoueur(id);
  });

  idsLieuxTest.forEach((id) => {
    lieuStore.supprimerLieu(id);
  });

  idsObjetsTest.forEach((id) => {
    objetStore.supprimerObjet(id);
  });

  idsIndicesTest.forEach((id) => {
    indiceStore.supprimerIndice(id);
  });

  campagneStore.supprimerCampagne(campagne.id);
  campagneStore.supprimerCampagne(campagneDupliquee.id);

  tester(
    'Supprimer les quêtes de test',
    !queteStore.liste.some(({ id }) => idsQuetesTest.includes(id)),
  );

  tester(
    'Supprimer les chapitres de test',
    !chapitreStore.liste.some(({ id }) => idsChapitresTest.includes(id)),
  );

  tester(
    'Supprimer les joueurs de test',
    !joueurStore.liste.some(({ id }) => idsJoueursTest.includes(id)),
  );

  tester(
    'Supprimer les lieux de test',
    !lieuStore.liste.some(({ id }) => idsLieuxTest.includes(id)),
  );

  tester(
    'Supprimer les objets de test',
    !objetStore.liste.some(({ id }) => idsObjetsTest.includes(id)),
  );

  tester(
    'Supprimer les indices de test',
    !indiceStore.liste.some(({ id }) => idsIndicesTest.includes(id)),
  );

  tester(
    'Supprimer les campagnes de test',
    !campagneStore.liste.some(
      ({ id }) => id === campagne.id || id === campagneDupliquee.id,
    ),
  );

  // - Restaurer l’ancienne campagne active
  if (ancienneCampagneActive) {
    campagneStore.definirCampagneActive(ancienneCampagneActive.id);
  }

  await nextTick();

  testsTermines.value = true;
}
</script>

<template>
  <h1>Tests globaux des stores</h1>

  <button @click="lancerTests">
    Lancer tous les tests
  </button>

  <h2 v-if="testsTermines">
    Résultats
  </h2>

  <ul>
    <li
      v-for="resultat in resultats"
      :key="resultat.nom"
    >
      {{ resultat.resultat === 'Réussi' ? '✅' : '❌' }}
      {{ resultat.nom }}
    </li>
  </ul>

  <h2 v-if="testsTermines">
    Résumé
  </h2>

  <p v-if="testsTermines">
    {{ resultats.filter(({ resultat }) => resultat === 'Réussi').length }}
    test(s) réussi(s) /
    {{ resultats.length }}
    test(s)
  </p>
</template>

<style scoped></style>