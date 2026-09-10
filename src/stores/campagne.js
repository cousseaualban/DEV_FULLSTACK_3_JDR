import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const useCampagneStore = defineStore('campagne', () => {
  // - Helpers
  const LOCALSTORAGEKEY = 'campagne_store';

  function _trouverCampagne(id) {
    return liste.value.find(({ id: campagneId }) => (campagneId === id));
  }

  // - States
  const liste = ref(JSON.parse(localStorage.getItem(LOCALSTORAGEKEY) ?? '[]'));

  // - Getters
  const campagneSpecifique = computed(() => (
    (id) => _trouverCampagne(id)
  ));

  const campagneActive = computed(() => (
    liste.value.find(({ statut }) => (statut === 'active'))
  ));

  // - Actions
  function ajouterCampagne(nom, statut, description, commentaire_MJ) {
    const nouvelleCampagne = {
      id: crypto.randomUUID(),
      nom,
      statut,
      description,
      commentaire_MJ,
    };

    liste.value.push(nouvelleCampagne);
  }

  function modifierCampagne(id, nom, description, commentaire_MJ) {
    const campagne = _trouverCampagne(id);

    if (!campagne) {
      return;
    }

    campagne.nom = nom;
    campagne.description = description;
    campagne.commentaire_MJ = commentaire_MJ;
  }

  function supprimerCampagne(id) {
    const index = liste.value.findIndex(({ id: campagneId }) => (campagneId === id));

    if (index === -1) {
      return;
    }

    liste.value.splice(index, 1);
  }

  function definirCampagneActive(id) {
    const campagne = _trouverCampagne(id);

    if (!campagne) {
      return;
    }

    liste.value.forEach((campagneExistante) => {
      if (campagneExistante.statut === 'active') {
        campagneExistante.statut = 'disponible';
      }
    });

    campagne.statut = 'active';
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
    campagneSpecifique,
    campagneActive,
    ajouterCampagne,
    modifierCampagne,
    supprimerCampagne,
    definirCampagneActive,
  };
});

export default useCampagneStore;
