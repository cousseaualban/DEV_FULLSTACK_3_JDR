import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const useLieuStore = defineStore('lieu', () => {
  // - Helpers
  const LOCALSTORAGEKEY = 'lieu_store';

  function _trouverLieu(id) {
    return liste.value.find(({ id: lieuId }) => (lieuId === id));
  }

  // - States
  const liste = ref(JSON.parse(localStorage.getItem(LOCALSTORAGEKEY) ?? '[]'));

  // - Getters
  const lieuSpecifique = computed(() => (
    (id) => _trouverLieu(id)
  ));

  const lieuxCampagne = computed(() => (
    (campagneId) => liste.value
      .filter(({ campagne_id }) => (campagne_id === campagneId))
  ));

  // - Actions
  function ajouterLieu(
    campagne_id,
    nom,
    description,
    commentaire_MJ,
  ) {
    const nouveauLieu = {
      id: crypto.randomUUID(),
      campagne_id,
      nom,
      description,
      commentaire_MJ,
    };

    liste.value.push(nouveauLieu);
  }

  function modifierLieu(
    id,
    nom,
    description,
    commentaire_MJ,
  ) {
    const lieu = _trouverLieu(id);

    if (!lieu) {
      return;
    }

    lieu.nom = nom;
    lieu.description = description;
    lieu.commentaire_MJ = commentaire_MJ;
  }

  function dupliquerLieu(id) {
    const lieu = _trouverLieu(id);

    if (!lieu) {
      return;
    }

    const nouveauLieu = {
      ...lieu,
      id: crypto.randomUUID(),
    };

    liste.value.push(nouveauLieu);
  }

  function supprimerLieu(id) {
    const index = liste.value.findIndex(({ id: lieuId }) => (lieuId === id));

    if (index === -1) {
      return;
    }

    liste.value.splice(index, 1);
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
    lieuSpecifique,
    lieuxCampagne,
    ajouterLieu,
    modifierLieu,
    dupliquerLieu,
    supprimerLieu,
  };
});

export default useLieuStore;