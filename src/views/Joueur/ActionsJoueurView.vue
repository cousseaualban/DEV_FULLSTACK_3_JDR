<script setup>
import { computed, ref } from "vue";
import DeplacementForm from "@/components/joueur/DeplacementForm.vue";
import MotDePasseForm from "@/components/joueur/MotDePasseForm.vue";
import useCampagneStore from "@/stores/campagne";
import useChapitreStore from "@/stores/chapitre";
import useQueteStore from "@/stores/quete";
import useLieuStore from "@/stores/lieu";
import useSessionJoueurStore from "@/stores/sessionJoueur";
import { useActionsJoueur } from "@/composables/useActionsJoueur";

const campagneStore = useCampagneStore();
const chapitreStore = useChapitreStore();
const queteStore = useQueteStore();
const lieuStore = useLieuStore();
const sessionJoueurStore = useSessionJoueurStore();

const { activerQuete, resoudreQuete, activerChapitre, resoudreChapitre } =
  useActionsJoueur();

const messageActivation = ref("");
const activationReussie = ref(false);

const messageResolution = ref("");
const resolutionReussie = ref(false);

const messageChapitre = ref("");
const chapitreActive = ref(false);

const messageResolutionChapitre = ref("");
const resolutionChapitreReussie = ref(false);

const joueurCourant = computed(() => sessionJoueurStore.joueurCourant);

const campagneActive = computed(() => campagneStore.campagneActive);

const lieuActuel = computed(() => {
  if (!joueurCourant.value?.lieu_id) {
    return undefined;
  }

  return lieuStore.lieuSpecifique(joueurCourant.value.lieu_id);
});

function obtenirQuetesCampagne() {
  if (!campagneActive.value) {
    return [];
  }

  const chapitres = chapitreStore.chapitresCampagne(campagneActive.value.id);

  return chapitres.flatMap((chapitre) =>
    queteStore.quetesChapitre(chapitre.id)
  );
}

const quetesInactives = computed(() =>
  obtenirQuetesCampagne()
    .filter((quete) => quete.statut === "inactive")
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);

const quetesActives = computed(() =>
  obtenirQuetesCampagne()
    .filter((quete) => quete.statut === "active")
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);

function demanderActivation(queteId, motDePasse) {
  const resultat = activerQuete(queteId, motDePasse);

  messageActivation.value = resultat.message;
  activationReussie.value = resultat.succes;
}

function demanderResolution(queteId, motDePasse) {
  const resultat = resoudreQuete(queteId, motDePasse);

  messageResolution.value = resultat.message;
  resolutionReussie.value = resultat.succes;
}

const chapitresInactifs = computed(() => {
  if (!campagneActive.value) {
    return [];
  }

  return chapitreStore
    .chapitresCampagne(campagneActive.value.id)
    .filter((chapitre) => chapitre.statut === "inactif");
});

const chapitresActifs = computed(() => {
  if (!campagneActive.value) {
    return [];
  }

  return chapitreStore
    .chapitresCampagne(campagneActive.value.id)
    .filter((chapitre) => chapitre.statut === "actif");
});

function demanderResolutionChapitre(chapitreId, motDePasse) {
  const resultat = resoudreChapitre(chapitreId, motDePasse);
  messageResolutionChapitre.value = resultat.message;
  resolutionChapitreReussie.value = resultat.succes;
}

function demanderActivationChapitre(chapitreId, motDePasse) {
  const resultat = activerChapitre(chapitreId, motDePasse);

  messageChapitre.value = resultat.message;
  chapitreActive.value = resultat.succes;
}
</script>

<template>
  <main>
    <RouterLink :to="{ name: 'joueur-accueil' }">
      Retour à l'accueil joueur
    </RouterLink>

    <h1>Actions du joueur</h1>

    <p v-if="!joueurCourant">Veuillez sélectionner un joueur.</p>

    <template v-else>
      <section>
        <h2>Joueur actuel</h2>

        <p>Nom : {{ joueurCourant.nom }}</p>
        <p>Statut : {{ joueurCourant.statut }}</p>
        <p>Lieu actuel : {{ lieuActuel?.nom ?? "Lieu non renseigné" }}</p>
      </section>

      <DeplacementForm />

      <section>
        <h2>Activation des quêtes</h2>

        <p v-if="quetesInactives.length === 0">Aucune quête inactive.</p>

        <article v-for="quete in quetesInactives" :key="quete.id">
          <h3>{{ quete.nom }}</h3>
          <p>{{ quete.description }}</p>

          <MotDePasseForm
            titre="Activer cette quête"
            label-bouton="Activer"
            @soumettre="
              (motDePasse) => demanderActivation(quete.id, motDePasse)
            "
          />
        </article>

        <p
          v-if="messageActivation"
          role="status"
          :class="activationReussie ? 'message-succes' : 'message-erreur'"
        >
          {{ messageActivation }}
        </p>
      </section>

      <section>
        <h2>Résolution des quêtes</h2>

        <p v-if="quetesActives.length === 0">Aucune quête active.</p>

        <article v-for="quete in quetesActives" :key="quete.id">
          <h3>{{ quete.nom }}</h3>
          <p>{{ quete.description }}</p>

          <MotDePasseForm
            titre="Terminer cette quête"
            label-bouton="Terminer"
            @soumettre="
              (motDePasse) => demanderResolution(quete.id, motDePasse)
            "
          />
        </article>

        <p
          v-if="messageResolution"
          role="status"
          :class="resolutionReussie ? 'message-succes' : 'message-erreur'"
        >
          {{ messageResolution }}
        </p>
      </section>

      <section>
        <h2>Activation des chapitres</h2>

        <p v-if="chapitresInactifs.length === 0">Aucun chapitre inactif.</p>

        <article v-for="chapitre in chapitresInactifs" :key="chapitre.id">
          <h3>{{ chapitre.nom }}</h3>
          <p>{{ chapitre.description }}</p>

          <MotDePasseForm
            titre="Activer ce chapitre"
            label-bouton="Activer"
            @soumettre="
              (motDePasse) =>
                demanderActivationChapitre(chapitre.id, motDePasse)
            "
          />
        </article>

        <p
          v-if="messageChapitre"
          role="status"
          :class="chapitreActive ? 'message-succes' : 'message-erreur'"
        >
          {{ messageChapitre }}
        </p>
      </section>

      <section>
        <h2>Résolution des chapitres</h2>

        <p v-if="chapitresActifs.length === 0">Aucun chapitre actif.</p>

        <article v-for="chapitre in chapitresActifs" :key="chapitre.id">
          <h3>{{ chapitre.nom }}</h3>
          <p>{{ chapitre.description }}</p>

          <MotDePasseForm
            titre="Terminer ce chapitre"
            label-bouton="Terminer"
            @soumettre="
              (motDePasse) =>
                demanderResolutionChapitre(chapitre.id, motDePasse)
            "
          />
        </article>

        <p
          v-if="messageResolutionChapitre"
          role="status"
          :class="
            resolutionChapitreReussie ? 'message-succes' : 'message-erreur'
          "
        >
          {{ messageResolutionChapitre }}
        </p>
      </section>
    </template>
  </main>
</template>
<style scoped>
.message-succes {
  color: #176b35;
}

.message-erreur {
  color: #b42318;
}
</style>