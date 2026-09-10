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
      .sort((queteA, queteB) => (queteA.ordre - queteB.ordre))
  ));

  const quetesLieu = computed(() => (
    (lieuId) => liste.value
      .filter(({ lieu_id }) => (lieu_id === lieuId))
      .sort((queteA, queteB) => (queteA.ordre - queteB.ordre))
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
    ordre,
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
      ordre,
    };

    liste.value.push(nouvelleQuete);
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

  function monterQuete(id) {
    const quete = _trouverQuete(id);

    if (!quete) {
      return;
    }

    const quetes = liste.value
      .filter(({ chapitre_id }) => (chapitre_id === quete.chapitre_id))
      .sort((queteA, queteB) => (queteA.ordre - queteB.ordre));

    const index = quetes.findIndex(({ id: queteId }) => (queteId === id));

    if (index <= 0) {
      return;
    }

    const quetePrecedente = quetes[index - 1];
    const ordreQuete = quete.ordre;

    quete.ordre = quetePrecedente.ordre;
    quetePrecedente.ordre = ordreQuete;
  }

  function descendreQuete(id) {
    const quete = _trouverQuete(id);

    if (!quete) {
      return;
    }

    const quetes = liste.value
      .filter(({ chapitre_id }) => (chapitre_id === quete.chapitre_id))
      .sort((queteA, queteB) => (queteA.ordre - queteB.ordre));

    const index = quetes.findIndex(({ id: queteId }) => (queteId === id));

    if (index === -1 || index >= quetes.length - 1) {
      return;
    }

    const queteSuivante = quetes[index + 1];
    const ordreQuete = quete.ordre;

    quete.ordre = queteSuivante.ordre;
    queteSuivante.ordre = ordreQuete;
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
    supprimerQuete,
    changerStatutQuete,
    monterQuete,
    descendreQuete,
  };
});

export default useQueteStore;