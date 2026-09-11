import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const useJoueurStore = defineStore('joueur', () => {
  // - Helpers
  const LOCALSTORAGEKEY = 'joueur_store';

  function _trouverJoueur(id) {
    return liste.value.find(({ id: joueurId }) => (joueurId === id));
  }

  // - States
  const liste = ref(JSON.parse(localStorage.getItem(LOCALSTORAGEKEY) ?? '[]'));

  // - Getters
  const joueurSpecifique = computed(() => (
    (id) => _trouverJoueur(id)
  ));

  const joueursCampagne = computed(() => (
    (campagneId) => liste.value
      .filter(({ campagne_id }) => (campagne_id === campagneId))
  ));

  const joueursDansLieu = computed(() => (
    (lieuId) => liste.value
      .filter(({ lieu_id }) => (lieu_id === lieuId))
  ));

  // - Actions
  function ajouterJoueur(
    campagne_id,
    nom,
    description,
    commentaire_MJ,
    lieu_id,
  ) {
    const nouveauJoueur = {
      id: crypto.randomUUID(),
      campagne_id,
      nom,
      statut: 'vivant',
      description,
      commentaire_MJ,
      lieu_id,
      inventaire_objets: [],
      inventaire_indices: [],
    };

    liste.value.push(nouveauJoueur);
  }

  function modifierJoueur(
    id,
    nom,
    description,
    commentaire_MJ,
  ) {
    const joueur = _trouverJoueur(id);

    if (!joueur) {
      return;
    }

    joueur.nom = nom;
    joueur.description = description;
    joueur.commentaire_MJ = commentaire_MJ;
  }

  function dupliquerJoueur(id) {
    const joueur = _trouverJoueur(id);

    if (!joueur) {
      return;
    }

    const nouveauJoueur = {
      ...joueur,
      id: crypto.randomUUID(),
      inventaire_objets: [...joueur.inventaire_objets],
      inventaire_indices: [...joueur.inventaire_indices],
    };

    liste.value.push(nouveauJoueur);
  }

  function supprimerJoueur(id) {
    const index = liste.value.findIndex(({ id: joueurId }) => (joueurId === id));

    if (index === -1) {
      return;
    }

    liste.value.splice(index, 1);
  }

  function changerStatutJoueur(id, statut) {
    const joueur = _trouverJoueur(id);

    if (!joueur) {
      return;
    }

    joueur.statut = statut;
  }

  function deplacerJoueur(joueurId, lieuId) {
    const joueur = _trouverJoueur(joueurId);

    if (!joueur) {
      return;
    }

    joueur.lieu_id = lieuId;
  }

  function donnerObjet(joueurId, objetId) {
    const joueur = _trouverJoueur(joueurId);

    if (!joueur) {
      return;
    }

    if (joueur.inventaire_objets.includes(objetId)) {
      return;
    }

    joueur.inventaire_objets.push(objetId);
  }

  function retirerObjet(joueurId, objetId) {
    const joueur = _trouverJoueur(joueurId);

    if (!joueur) {
      return;
    }

    const index = joueur.inventaire_objets.findIndex(
      (id) => (id === objetId),
    );

    if (index === -1) {
      return;
    }

    joueur.inventaire_objets.splice(index, 1);
  }

  function donnerIndice(joueurId, indiceId) {
    const joueur = _trouverJoueur(joueurId);

    if (!joueur) {
      return;
    }

    if (joueur.inventaire_indices.includes(indiceId)) {
      return;
    }

    joueur.inventaire_indices.push(indiceId);
  }

  function retirerIndice(joueurId, indiceId) {
    const joueur = _trouverJoueur(joueurId);

    if (!joueur) {
      return;
    }

    const index = joueur.inventaire_indices.findIndex(
      (id) => (id === indiceId),
    );

    if (index === -1) {
      return;
    }

    joueur.inventaire_indices.splice(index, 1);
  }

  function donnerIndiceATous(campagneId, indiceId) {
    const joueurs = joueursCampagne.value(campagneId);

    joueurs.forEach((joueur) => {
      if (!joueur.inventaire_indices.includes(indiceId)) {
        joueur.inventaire_indices.push(indiceId);
      }
    });
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
    joueurSpecifique,
    joueursCampagne,
    joueursDansLieu,
    ajouterJoueur,
    modifierJoueur,
    dupliquerJoueur,
    supprimerJoueur,
    changerStatutJoueur,
    deplacerJoueur,
    donnerObjet,
    retirerObjet,
    donnerIndice,
    retirerIndice,
    donnerIndiceATous,
  };
});

export default useJoueurStore;