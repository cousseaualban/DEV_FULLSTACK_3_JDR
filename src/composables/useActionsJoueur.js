import useCampagneStore from "@/stores/campagne";
import useChapitreStore from "@/stores/chapitre";
import useQueteStore from "@/stores/quete";
import useJoueurStore from "@/stores/joueur";
import useLieuStore from "@/stores/lieu";
import useSessionJoueurStore from "@/stores/sessionJoueur";

export function useActionsJoueur() {
  const campagneStore = useCampagneStore();
  const chapitreStore = useChapitreStore();
  const queteStore = useQueteStore();
  const joueurStore = useJoueurStore();
  const lieuStore = useLieuStore();
  const sessionJoueurStore = useSessionJoueurStore();

  function resultatErreur(message) {
    return {
      succes: false,
      message,
    };
  }

  function resultatSucces(message) {
    return {
      succes: true,
      message,
    };
  }

  function verifierJoueur() {
    const joueur = sessionJoueurStore.joueurCourant;
    const campagne = campagneStore.campagneActive;

    if (!joueur) {
      return resultatErreur("Veuillez sélectionner un joueur.");
    }

    if (joueur.statut !== "vivant") {
      return resultatErreur(
        "Un joueur mort ne peut pas effectuer cette action.",
      );
    }

    if (!campagne) {
      return resultatErreur("Aucune campagne active.");
    }

    if (joueur.campagne_id !== campagne.id) {
      return resultatErreur(
        "Le joueur n'appartient pas à la campagne active.",
      );
    }

    return null;
  }

  function trouverChapitreAccessible(chapitreId) {
    const chapitre = chapitreStore.chapitreSpecifique(chapitreId);
    const campagne = campagneStore.campagneActive;

    if (
      !chapitre
      || !campagne
      || chapitre.campagne_id !== campagne.id
    ) {
      return undefined;
    }

    return chapitre;
  }

  function trouverQueteAccessible(queteId) {
    const quete = queteStore.queteSpecifique(queteId);

    if (!quete) {
      return undefined;
    }

    const chapitre = trouverChapitreAccessible(quete.chapitre_id);

    if (!chapitre) {
      return undefined;
    }

    return quete;
  }

  function donnerRecompenses(element) {
    const joueur = sessionJoueurStore.joueurCourant;
    const campagne = campagneStore.campagneActive;

    if (!joueur || !campagne) {
      return;
    }

    (element.recompenses_objets ?? []).forEach((objetId) => {
      joueurStore.donnerObjet(joueur.id, objetId);
    });

    (element.recompenses_indices ?? []).forEach((indiceId) => {
      joueurStore.donnerIndiceATous(campagne.id, indiceId);
    });
  }

  function deplacerJoueur(destinationId) {
    const erreurJoueur = verifierJoueur();

    if (erreurJoueur) {
      return erreurJoueur;
    }

    const joueur = sessionJoueurStore.joueurCourant;
    const campagne = campagneStore.campagneActive;
    const destination = lieuStore.lieuSpecifique(destinationId);

    if (
      !destination
      || destination.campagne_id !== campagne.id
    ) {
      return resultatErreur("Destination invalide.");
    }

    if (joueur.lieu_id === destination.id) {
      return resultatErreur(
        "Le joueur se trouve déjà dans ce lieu.",
      );
    }

    joueurStore.deplacerJoueur(joueur.id, destination.id);

    return resultatSucces(
      `Déplacement vers ${destination.nom} réussi.`,
    );
  }

  function activerChapitre(chapitreId, motDePasse) {
    const erreurJoueur = verifierJoueur();

    if (erreurJoueur) {
      return erreurJoueur;
    }

    const joueur = sessionJoueurStore.joueurCourant;
    const chapitre = trouverChapitreAccessible(chapitreId);

    if (!chapitre) {
      return resultatErreur("Chapitre introuvable.");
    }

    if (chapitre.statut !== "inactif") {
      return resultatErreur("Ce chapitre n'est pas inactif.");
    }

    if (motDePasse !== chapitre.mdp_activation) {
      return resultatErreur("Mot de passe incorrect.");
    }

    const objetsManquants = (
      chapitre.objets_necessaires ?? []
    ).filter(
      (objetId) =>
        !joueur.inventaire_objets.includes(objetId),
    );

    if (objetsManquants.length > 0) {
      return resultatErreur("Objet nécessaire manquant.");
    }

    chapitreStore.changerStatutChapitre(
      chapitre.id,
      "actif",
    );

    return resultatSucces("Chapitre activé avec succès.");
  }

  function resoudreChapitre(chapitreId, motDePasse) {
    const erreurJoueur = verifierJoueur();

    if (erreurJoueur) {
      return erreurJoueur;
    }

    const chapitre = trouverChapitreAccessible(chapitreId);

    if (!chapitre) {
      return resultatErreur("Chapitre introuvable.");
    }

    if (chapitre.statut !== "actif") {
      return resultatErreur("Ce chapitre n'est pas actif.");
    }

    if (motDePasse !== chapitre.mdp_resolution) {
      return resultatErreur("Mot de passe incorrect.");
    }

    chapitreStore.changerStatutChapitre(
      chapitre.id,
      "termine",
    );

    donnerRecompenses(chapitre);

    return resultatSucces("Chapitre terminé avec succès.");
  }

  function activerQuete(queteId, motDePasse) {
    const erreurJoueur = verifierJoueur();

    if (erreurJoueur) {
      return erreurJoueur;
    }

    const quete = trouverQueteAccessible(queteId);

    if (!quete) {
      return resultatErreur("Quête introuvable.");
    }

    if (quete.statut !== "inactive") {
      return resultatErreur("Cette quête n'est pas inactive.");
    }

    if (motDePasse !== quete.mdp_activation) {
      return resultatErreur("Mot de passe incorrect.");
    }

    queteStore.changerStatutQuete(quete.id, "active");

    return resultatSucces("Quête activée avec succès.");
  }

  function resoudreQuete(queteId, motDePasse) {
    const erreurJoueur = verifierJoueur();

    if (erreurJoueur) {
      return erreurJoueur;
    }

    const joueur = sessionJoueurStore.joueurCourant;
    const quete = trouverQueteAccessible(queteId);

    if (!quete) {
      return resultatErreur("Quête introuvable.");
    }

    if (quete.statut !== "active") {
      return resultatErreur("Cette quête n'est pas active.");
    }

    if (joueur.lieu_id !== quete.lieu_id) {
      return resultatErreur(
        "Vous devez être dans le lieu de la quête.",
      );
    }

    if (motDePasse !== quete.mdp_resolution) {
      return resultatErreur("Mot de passe incorrect.");
    }

    queteStore.changerStatutQuete(quete.id, "terminee");

    donnerRecompenses(quete);

    return resultatSucces("Quête terminée avec succès.");
  }

  return {
    deplacerJoueur,
    activerChapitre,
    resoudreChapitre,
    activerQuete,
    resoudreQuete,
  };
}