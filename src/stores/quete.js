import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const useQueteStore = defineStore('quete', () => {
  // - Helpers
  const LOCALSTORAGEKEY = 'quete_store';

  function _trouverQuete(id) {
    return liste.value.find(({ id: queteId }) => (queteId === id));
  }

  // - States
  const liste = ref(JSON.parse(localStorage.getItem(LOCALSTORAGEKEY) ?? '[]'));

  // - Getters
  const queteSpecifique = computed(() => (
    (id) => _trouverQuete(id)
  ));

  const quetesChapitre = computed(() => (
    (chapitreId) => liste.value
      .filter(({ chapitre_id }) => (chapitre_id === chapitreId))
  ));

  const quetesLieu = computed(() => (
    (lieuId) => liste.value
      .filter(({ lieu_id }) => (lieu_id === lieuId))
  ));

  // - Actions
  function ajouterQuete(
    chapitre_id,
    lieu_id,
    nom,
    description,
    commentaire_MJ,
    mdp_activation,
    mdp_resolution,
    recompenses_objets,
    recompenses_indices,
  ) {
    const nouvelleQuete = {
      id: crypto.randomUUID(),
      chapitre_id,
      lieu_id,
      nom,
      statut: mdp_activation ? 'inactive' : 'active',
      description,
      commentaire_MJ,
      mdp_activation,
      mdp_resolution,
      recompenses_objets,
      recompenses_indices,
    };

    liste.value.push(nouvelleQuete);
  }

  function deplacerQuete(id, nouveauChapitreId) {
    const quete = _trouverQuete(id);

    if (!quete) {
      return;
    }

    quete.chapitre_id = nouveauChapitreId;
  }

  function modifierQuete(
    id,
    chapitre_id,
    lieu_id,
    nom,
    description,
    commentaire_MJ,
    mdp_activation,
    mdp_resolution,
    recompenses_objets,
    recompenses_indices,
  ) {
    const quete = _trouverQuete(id);

    if (!quete) {
      return;
    }

    quete.chapitre_id = chapitre_id;
    quete.lieu_id = lieu_id;
    quete.nom = nom;
    quete.description = description;
    quete.commentaire_MJ = commentaire_MJ;
    quete.mdp_activation = mdp_activation;
    quete.mdp_resolution = mdp_resolution;
    quete.recompenses_objets = recompenses_objets;
    quete.recompenses_indices = recompenses_indices;
  }

  function dupliquerQuete(id) {
    const quete = _trouverQuete(id);

    if (!quete) {
      return;
    }

    const nouvelleQuete = {
      ...quete,
      id: crypto.randomUUID(),
      recompenses_objets: [...quete.recompenses_objets],
      recompenses_indices: [...quete.recompenses_indices],
    };

    liste.value.push(nouvelleQuete);
  }

  function supprimerQuete(id) {
    const index = liste.value.findIndex(({ id: queteId }) => (queteId === id));

    if (index === -1) {
      return;
    }

    liste.value.splice(index, 1);
  }

  function changerStatutQuete(id, statut) {
    const quete = _trouverQuete(id);

    if (!quete) {
      return;
    }

    quete.statut = statut;
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
    queteSpecifique,
    quetesChapitre,
    quetesLieu,
    ajouterQuete,
    modifierQuete,
    dupliquerQuete,
    supprimerQuete,
    changerStatutQuete,
    deplacerQuete,
  };
});

export default useQueteStore;