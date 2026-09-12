import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import useChapitreStore from "./chapitre.js";
import useQueteStore from "./quete.js";
import useJoueurStore from "./joueur.js";
import useLieuStore from "./lieu.js";
import useObjetStore from "./objet.js";
import useIndiceStore from "./indice.js";

const useCampagneStore = defineStore("campagne", () => {
  // - Helpers
  const LOCALSTORAGEKEY = "campagne_store";

  function _trouverCampagne(id) {
    return liste.value.find(({ id: campagneId }) => campagneId === id);
  }

  // - States
  const liste = ref(JSON.parse(localStorage.getItem(LOCALSTORAGEKEY) ?? "[]"));

  // - Getters
  const campagneSpecifique = computed(() => (id) => _trouverCampagne(id));

  const campagneActive = computed(() =>
    liste.value.find(({ statut }) => statut === "active"),
  );

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

  function modifierCampagne(id, nom, statut, description, commentaire_MJ) {
    const campagne = _trouverCampagne(id);

    if (!campagne) {
      return;
    }

    campagne.nom = nom;
    if (statut === 'active') {
      liste.value.forEach((campagneExistante) => {
        if (campagneExistante.statut === 'active') {
          campagneExistante.statut = 'disponible';
        }
      });
    }
    campagne.statut = statut
    campagne.description = description;
    campagne.commentaire_MJ = commentaire_MJ;
  }

  function dupliquerCampagne(id) {
    const campagne = _trouverCampagne(id);

    if (!campagne) {
      return;
    }

    const nouvelleCampagne = {
      ...campagne,
      id: crypto.randomUUID(),
      statut: campagne.statut === "active" ? "brouillon" : campagne.statut,
    };

    liste.value.push(nouvelleCampagne);
  }

  function supprimerCampagne(id) {
    const index = liste.value.findIndex(
      ({ id: campagneId }) => campagneId === id,
    );

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
      if (campagneExistante.statut === "active") {
        campagneExistante.statut = "disponible";
      }
    });

    campagne.statut = "active";
  }

  function exporterCampagne(id) {
    const campagne = _trouverCampagne(id);

    if (!campagne) {
      return;
    }

    const chapitreStore = useChapitreStore();
    const queteStore = useQueteStore();
    const joueurStore = useJoueurStore();
    const lieuStore = useLieuStore();
    const objetStore = useObjetStore();
    const indiceStore = useIndiceStore();

    const chapitres = chapitreStore.chapitresCampagne(id);

    const chapitresIds = chapitres.map(({ id: chapitreId }) => chapitreId);

    const quetes = queteStore.liste.filter(({ chapitre_id }) =>
      chapitresIds.includes(chapitre_id),
    );

    const joueurs = joueurStore.joueursCampagne(id);
    const lieux = lieuStore.lieuxCampagne(id);
    const objets = objetStore.objetsCampagne(id);
    const indices = indiceStore.indicesCampagne(id);

    const donnees = {
      format: "cplc",
      version: 1,
      campagne,
      chapitres,
      quetes,
      joueurs,
      lieux,
      objets,
      indices,
    };

    const contenu = JSON.stringify(donnees, null, 2);
    const fichier = new Blob([contenu], {
      type: "application/json",
    });

    const url = URL.createObjectURL(fichier);
    const lien = document.createElement("a");

    lien.href = url;
    lien.download = `${campagne.nom}.cplc.json`;
    lien.click();

    URL.revokeObjectURL(url);
  }

  function importerCampagne(donnees) {
    if (
      donnees.format !== "cplc" ||
      donnees.version !== 1 ||
      !donnees.campagne ||
      !Array.isArray(donnees.chapitres) ||
      !Array.isArray(donnees.quetes) ||
      !Array.isArray(donnees.joueurs) ||
      !Array.isArray(donnees.lieux) ||
      !Array.isArray(donnees.objets) ||
      !Array.isArray(donnees.indices)
    ) {
      return false;
    }

    const chapitreStore = useChapitreStore();
    const queteStore = useQueteStore();
    const joueurStore = useJoueurStore();
    const lieuStore = useLieuStore();
    const objetStore = useObjetStore();
    const indiceStore = useIndiceStore();

    const campagneId = donnees.campagne.id;

    const ancienneCampagne = _trouverCampagne(campagneId);

    if (ancienneCampagne) {
      supprimerCampagne(campagneId);

      chapitreStore.liste = chapitreStore.liste.filter(
        ({ campagne_id }) => campagne_id !== campagneId,
      );

      joueurStore.liste = joueurStore.liste.filter(
        ({ campagne_id }) => campagne_id !== campagneId,
      );

      lieuStore.liste = lieuStore.liste.filter(
        ({ campagne_id }) => campagne_id !== campagneId,
      );

      objetStore.liste = objetStore.liste.filter(
        ({ campagne_id }) => campagne_id !== campagneId,
      );

      indiceStore.liste = indiceStore.liste.filter(
        ({ campagne_id }) => campagne_id !== campagneId,
      );

      const chapitresIds = donnees.chapitres.map(({ id }) => id);

      queteStore.liste = queteStore.liste.filter(
        ({ chapitre_id }) => !chapitresIds.includes(chapitre_id),
      );
    }

    if (donnees.campagne.statut === "active") {
      liste.value.forEach((campagneExistante) => {
        if (campagneExistante.statut === "active") {
          campagneExistante.statut = "disponible";
        }
      });
    }

    liste.value.push(donnees.campagne);

    chapitreStore.liste.push(...donnees.chapitres);
    queteStore.liste.push(...donnees.quetes);
    joueurStore.liste.push(...donnees.joueurs);
    lieuStore.liste.push(...donnees.lieux);
    objetStore.liste.push(...donnees.objets);
    indiceStore.liste.push(...donnees.indices);

    return true;
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
    dupliquerCampagne,
    supprimerCampagne,
    definirCampagneActive,
    exporterCampagne,
    importerCampagne,
  };
});

export default useCampagneStore;
