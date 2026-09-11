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

  function dupliquerChapitre(id) {
    const chapitre = _trouverChapitre(id);

    if (!chapitre) {
      return;
    }

    const nouveauChapitre = {
      ...chapitre,
      id: crypto.randomUUID(),
      objets_necessaires: [...chapitre.objets_necessaires],
      recompenses_objets: [...chapitre.recompenses_objets],
      recompenses_indices: [...chapitre.recompenses_indices],
    };

    liste.value.push(nouveauChapitre);
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
    dupliquerChapitre,
    supprimerChapitre,
    changerStatutChapitre,
  };
});

export default useChapitreStore;