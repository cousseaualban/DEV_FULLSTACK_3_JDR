import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const useIndiceStore = defineStore('indice', () => {
  // - Helpers
  const LOCALSTORAGEKEY = 'indice_store';

  function _trouverIndice(id) {
    return liste.value.find(({ id: indiceId }) => (indiceId === id));
  }

  // - States
  const liste = ref(JSON.parse(localStorage.getItem(LOCALSTORAGEKEY) ?? '[]'));

  // - Getters
  const indiceSpecifique = computed(() => (
    (id) => _trouverIndice(id)
  ));

  const indicesCampagne = computed(() => (
    (campagneId) => liste.value
      .filter(({ campagne_id }) => (campagne_id === campagneId))
  ));

  // - Actions
  function ajouterIndice(
    campagne_id,
    nom,
    texte,
    commentaire_MJ,
  ) {
    const nouvelIndice = {
      id: crypto.randomUUID(),
      campagne_id,
      nom,
      texte,
      commentaire_MJ,
    };

    liste.value.push(nouvelIndice);
  }

  function modifierIndice(
    id,
    nom,
    texte,
    commentaire_MJ,
  ) {
    const indice = _trouverIndice(id);

    if (!indice) {
      return;
    }

    indice.nom = nom;
    indice.texte = texte;
    indice.commentaire_MJ = commentaire_MJ;
  }

  function dupliquerIndice(id) {
    const indice = _trouverIndice(id);

    if (!indice) {
      return;
    }

    const nouvelIndice = {
      ...indice,
      id: crypto.randomUUID(),
    };

    liste.value.push(nouvelIndice);
  }

  function supprimerIndice(id) {
    const index = liste.value.findIndex(({ id: indiceId }) => (indiceId === id));

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
    indiceSpecifique,
    indicesCampagne,
    ajouterIndice,
    modifierIndice,
    dupliquerIndice,
    supprimerIndice,
  };
});

export default useIndiceStore;