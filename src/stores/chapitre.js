import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const useChapitreStore = defineStore('chapitre', () => {
  // - Helpers
  const LOCALSTORAGEKEY = 'chapitre_store';

  function _trouverChapitre(id) {
    return liste.value.find(({ id: chapitreId }) => (chapitreId === id));
  }

  // - States
  const liste = ref(JSON.parse(localStorage.getItem(LOCALSTORAGEKEY) ?? '[]'));

  // - Getters
  const chapitreSpecifique = computed(() => (
    (id) => _trouverChapitre(id)
  ));

  const chapitresCampagne = computed(() => (
    (campagneId) => liste.value
      .filter(({ campagne_id }) => (campagne_id === campagneId))
      .sort((chapitreA, chapitreB) => (chapitreA.ordre - chapitreB.ordre))
  ));

  // - Actions
  function ajouterChapitre(
    campagne_id,
    nom,
    description,
    commentaire_MJ,
    mdp_activation,
    objets_necessaires,
    mdp_resolution,
    recompenses_objets,
    recompenses_indices,
    ordre,
  ) {
    const nouveauChapitre = {
      id: crypto.randomUUID(),
      campagne_id,
      nom,
      statut: 'inactif',
      description,
      commentaire_MJ,
      mdp_activation,
      objets_necessaires,
      mdp_resolution,
      recompenses_objets,
      recompenses_indices,
      ordre,
    };

    liste.value.push(nouveauChapitre);
  }

  function modifierChapitre(
    id,
    nom,
    description,
    commentaire_MJ,
    mdp_activation,
    objets_necessaires,
    mdp_resolution,
    recompenses_objets,
    recompenses_indices,
  ) {
    const chapitre = _trouverChapitre(id);

    if (!chapitre) {
      return;
    }

    chapitre.nom = nom;
    chapitre.description = description;
    chapitre.commentaire_MJ = commentaire_MJ;
    chapitre.mdp_activation = mdp_activation;
    chapitre.objets_necessaires = objets_necessaires;
    chapitre.mdp_resolution = mdp_resolution;
    chapitre.recompenses_objets = recompenses_objets;
    chapitre.recompenses_indices = recompenses_indices;
  }

  function supprimerChapitre(id) {
    const index = liste.value.findIndex(({ id: chapitreId }) => (chapitreId === id));

    if (index === -1) {
      return;
    }

    liste.value.splice(index, 1);
  }

  function changerStatutChapitre(id, statut) {
    const chapitre = _trouverChapitre(id);

    if (!chapitre) {
      return;
    }

    chapitre.statut = statut;
  }

  function monterChapitre(id) {
    const chapitre = _trouverChapitre(id);

    if (!chapitre) {
      return;
    }

    const chapitres = liste.value
      .filter(({ campagne_id }) => (campagne_id === chapitre.campagne_id))
      .sort((chapitreA, chapitreB) => (chapitreA.ordre - chapitreB.ordre));

    const index = chapitres.findIndex(({ id: chapitreId }) => (chapitreId === id));

    if (index <= 0) {
      return;
    }

    const chapitrePrecedent = chapitres[index - 1];
    const ordreChapitre = chapitre.ordre;

    chapitre.ordre = chapitrePrecedent.ordre;
    chapitrePrecedent.ordre = ordreChapitre;
  }

  function descendreChapitre(id) {
    const chapitre = _trouverChapitre(id);

    if (!chapitre) {
      return;
    }

    const chapitres = liste.value
      .filter(({ campagne_id }) => (campagne_id === chapitre.campagne_id))
      .sort((chapitreA, chapitreB) => (chapitreA.ordre - chapitreB.ordre));

    const index = chapitres.findIndex(({ id: chapitreId }) => (chapitreId === id));

    if (index === -1 || index >= chapitres.length - 1) {
      return;
    }

    const chapitreSuivant = chapitres[index + 1];
    const ordreChapitre = chapitre.ordre;

    chapitre.ordre = chapitreSuivant.ordre;
    chapitreSuivant.ordre = ordreChapitre;
  }

  // - Watcher
  watch(
    liste,
    () => {
      localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(liste.value));
    },
    { deep: true },
  );

  // - Expose
  return {
    liste,
    chapitreSpecifique,
    chapitresCampagne,
    ajouterChapitre,
    modifierChapitre,
    supprimerChapitre,
    changerStatutChapitre,
    monterChapitre,
    descendreChapitre,
  };
});

export default useChapitreStore;