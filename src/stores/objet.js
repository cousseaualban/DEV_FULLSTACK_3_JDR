import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const useObjetStore = defineStore('objet', () => {
  // - Helpers
  const LOCALSTORAGEKEY = 'objet_store';

  function _trouverObjet(id) {
    return liste.value.find(({ id: objetId }) => (objetId === id));
  }

  // - States
  const liste = ref(JSON.parse(localStorage.getItem(LOCALSTORAGEKEY) ?? '[]'));

  // - Getters
  const objetSpecifique = computed(() => (
    (id) => _trouverObjet(id)
  ));

  const objetsCampagne = computed(() => (
    (campagneId) => liste.value
      .filter(({ campagne_id }) => (campagne_id === campagneId))
  ));

  // - Actions
  function ajouterObjet(
    campagne_id,
    nom,
    description,
    commentaire_MJ,
  ) {
    const nouvelObjet = {
      id: crypto.randomUUID(),
      campagne_id,
      nom,
      description,
      commentaire_MJ,
    };

    liste.value.push(nouvelObjet);
  }

  function modifierObjet(
    id,
    nom,
    description,
    commentaire_MJ,
  ) {
    const objet = _trouverObjet(id);

    if (!objet) {
      return;
    }

    objet.nom = nom;
    objet.description = description;
    objet.commentaire_MJ = commentaire_MJ;
  }

  function dupliquerObjet(id) {
    const objet = _trouverObjet(id);

    if (!objet) {
      return;
    }

    const nouvelObjet = {
      ...objet,
      id: crypto.randomUUID(),
    };

    liste.value.push(nouvelObjet);
  }

  function supprimerObjet(id) {
    const index = liste.value.findIndex(({ id: objetId }) => (objetId === id));

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
    objetSpecifique,
    objetsCampagne,
    ajouterObjet,
    modifierObjet,
    dupliquerObjet,
    supprimerObjet,
  };
});

export default useObjetStore;