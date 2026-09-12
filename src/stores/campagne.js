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
    if (statut === "active") {
      liste.value.forEach((campagneExistante) => {
        if (campagneExistante.statut === "active") {
          campagneExistante.statut = "disponible";
        }
      });
    }
    campagne.statut = statut;
    campagne.description = description;
    campagne.commentaire_MJ = commentaire_MJ;
  }

  function dupliquerCampagne(id) {
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

    // - Nouvelle campagne
    const nouvelleCampagneId = crypto.randomUUID();

    const nouvelleCampagne = {
      ...campagne,
      id: nouvelleCampagneId,
      statut: campagne.statut === "active" ? "brouillon" : campagne.statut,
    };

    // - Chapitres
    const chapitres = chapitreStore.chapitresCampagne(id);
    const correspondanceChapitres = new Map();

    const nouveauxChapitres = chapitres.map((chapitre) => {
      const nouveauChapitreId = crypto.randomUUID();

      correspondanceChapitres.set(chapitre.id, nouveauChapitreId);

      return {
        ...chapitre,
        id: nouveauChapitreId,
        campagne_id: nouvelleCampagneId,
        objets_necessaires: [...(chapitre.objets_necessaires ?? [])],
        recompenses_objets: [...(chapitre.recompenses_objets ?? [])],
        recompenses_indices: [...(chapitre.recompenses_indices ?? [])],
      };
    });

    // - Quêtes
    const chapitresIds = chapitres.map(({ id: chapitreId }) => chapitreId);

    const quetes = queteStore.liste.filter(({ chapitre_id }) =>
      chapitresIds.includes(chapitre_id),
    );

    const nouveauxQuetes = quetes.map((quete) => ({
      ...quete,
      id: crypto.randomUUID(),
      chapitre_id: correspondanceChapitres.get(quete.chapitre_id),
      recompenses_objets: [...(quete.recompenses_objets ?? [])],
      recompenses_indices: [...(quete.recompenses_indices ?? [])],
    }));

    // - Lieux
    const lieux = lieuStore.lieuxCampagne(id);

    const correspondanceLieux = new Map();

    const nouveauxLieux = lieux.map((lieu) => {
      const nouveauLieuId = crypto.randomUUID();

      correspondanceLieux.set(lieu.id, nouveauLieuId);

      return {
        ...lieu,
        id: nouveauLieuId,
        campagne_id: nouvelleCampagneId,
      };
    });

    // - Objets
    const objets = objetStore.objetsCampagne(id);

    const correspondanceObjets = new Map();

    const nouveauxObjets = objets.map((objet) => {
      const nouvelObjetId = crypto.randomUUID();

      correspondanceObjets.set(objet.id, nouvelObjetId);

      return {
        ...objet,
        id: nouvelObjetId,
        campagne_id: nouvelleCampagneId,
      };
    });

    // - Indices
    const indices = indiceStore.indicesCampagne(id);

    const correspondanceIndices = new Map();

    const nouveauxIndices = indices.map((indice) => {
      const nouvelIndiceId = crypto.randomUUID();

      correspondanceIndices.set(indice.id, nouvelIndiceId);

      return {
        ...indice,
        id: nouvelIndiceId,
        campagne_id: nouvelleCampagneId,
      };
    });

    // - Joueurs
    const joueurs = joueurStore.joueursCampagne(id);

    const nouveauxJoueurs = joueurs.map((joueur) => ({
      ...joueur,
      id: crypto.randomUUID(),
      campagne_id: nouvelleCampagneId,
      lieu_id: joueur.lieu_id ? correspondanceLieux.get(joueur.lieu_id) : null,
      inventaire_objets: joueur.inventaire_objets.map((objetId) =>
        correspondanceObjets.get(objetId),
      ),
      inventaire_indices: joueur.inventaire_indices.map((indiceId) =>
        correspondanceIndices.get(indiceId),
      ),
    }));

    // - Ajout des données
    liste.value.push(nouvelleCampagne);

    chapitreStore.liste.push(...nouveauxChapitres);
    queteStore.liste.push(...nouveauxQuetes);
    joueurStore.liste.push(...nouveauxJoueurs);
    lieuStore.liste.push(...nouveauxLieux);
    objetStore.liste.push(...nouveauxObjets);
    indiceStore.liste.push(...nouveauxIndices);
  }

  function supprimerCampagne(id) {
    const index = liste.value.findIndex(
      ({ id: campagneId }) => campagneId === id,
    );

    if (index === -1) {
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

    liste.value.splice(index, 1);

    chapitreStore.liste.splice(
      0,
      chapitreStore.liste.length,
      ...chapitreStore.liste.filter(({ campagne_id }) => campagne_id !== id),
    );

    queteStore.liste.splice(
      0,
      queteStore.liste.length,
      ...queteStore.liste.filter(
        ({ chapitre_id }) => !chapitresIds.includes(chapitre_id),
      ),
    );

    joueurStore.liste.splice(
      0,
      joueurStore.liste.length,
      ...joueurStore.liste.filter(({ campagne_id }) => campagne_id !== id),
    );

    lieuStore.liste.splice(
      0,
      lieuStore.liste.length,
      ...lieuStore.liste.filter(({ campagne_id }) => campagne_id !== id),
    );

    objetStore.liste.splice(
      0,
      objetStore.liste.length,
      ...objetStore.liste.filter(({ campagne_id }) => campagne_id !== id),
    );

    indiceStore.liste.splice(
      0,
      indiceStore.liste.length,
      ...indiceStore.liste.filter(({ campagne_id }) => campagne_id !== id),
    );
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
