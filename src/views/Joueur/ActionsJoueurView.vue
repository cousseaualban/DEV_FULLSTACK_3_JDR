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

const {
  activerQuete,
  resoudreQuete,
} = useActionsJoueur();

const messageActivation = ref("");
const activationReussie = ref(false);

const messageResolution = ref("");
const resolutionReussie = ref(false);

const joueurCourant = computed(() =>
  sessionJoueurStore.joueurCourant,
);

const campagneActive = computed(() =>
  campagneStore.campagneActive,
);

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

  const chapitres = chapitreStore.chapitresCampagne(
    campagneActive.value.id,
  );

  return chapitres.flatMap((chapitre) =>
    queteStore.quetesChapitre(chapitre.id),
  );
}

const quetesInactives = computed(() =>
  obtenirQuetesCampagne()
    .filter((quete) => quete.statut === "inactive")
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0)),
);

const quetesActives = computed(() =>
  obtenirQuetesCampagne()
    .filter((quete) => quete.statut === "active")
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0)),
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
</script>

<template>
  <main>
    <RouterLink :to="{ name: 'joueur-accueil' }">
      Retour à l'accueil joueur
    </RouterLink>

    <h1>Actions du joueur</h1>

    <p v-if="!joueurCourant">
      Veuillez sélectionner un joueur.
    </p>

    <template v-else>
      <section>
        <h2>Joueur actuel</h2>

        <p>
          Nom :
          {{ joueurCourant.nom }}
        </p>

        <p>
          Statut :
          {{ joueurCourant.statut }}
        </p>

        <p>
          Lieu actuel :
          {{ lieuActuel?.nom ?? "Lieu non renseigné" }}
        </p>
      </section>

      <DeplacementForm />

      <section>
        <h2>Activation des quêtes</h2>

        <p v-if="quetesInactives.length === 0">
          Aucune quête inactive.
        </p>

        <article
          v-for="quete in quetesInactives"
          :key="quete.id"
        >
          <h3>{{ quete.nom }}</h3>

          <p>{{ quete.description }}</p>

          <MotDePasseForm
            titre="Activer cette quête"
            label-bouton="Activer"
            @soumettre="
              (motDePasse) =>
                demanderActivation(quete.id, motDePasse)
            "
          />
        </article>

        <p
          v-if="messageActivation"
          :class="{ succes: activationReussie }"
        >
          {{ messageActivation }}
        </p>
      </section>

      <section>
        <h2>Résolution des quêtes</h2>

        <p v-if="quetesActives.length === 0">
          Aucune quête active.
        </p>

        <article
          v-for="quete in quetesActives"
          :key="quete.id"
        >
          <h3>{{ quete.nom }}</h3>

          <p>{{ quete.description }}</p>

          <MotDePasseForm
            titre="Terminer cette quête"
            label-bouton="Terminer"
            @soumettre="
              (motDePasse) =>
                demanderResolution(quete.id, motDePasse)
            "
          />
        </article>

        <p
          v-if="messageResolution"
          :class="{ succes: resolutionReussie }"
        >
          {{ messageResolution }}
        </p>
      </section>
    </template>
  </main>
</template>