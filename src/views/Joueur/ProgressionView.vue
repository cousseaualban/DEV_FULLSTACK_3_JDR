<script setup>
import { computed, ref } from "vue";
import useCampagneStore from "@/stores/campagne";
import useChapitreStore from "@/stores/chapitre";
import useQueteStore from "@/stores/quete";
import useSessionJoueurStore from "@/stores/sessionJoueur";
import ChapitreCard from "@/components/joueur/ChapitreCard.vue";
import QueteCard from "@/components/joueur/QueteCard.vue";
import ProgressionRecherche from "@/components/joueur/ProgressionRecherche.vue";

const campagneStore = useCampagneStore();
const chapitreStore = useChapitreStore();
const queteStore = useQueteStore();
const sessionJoueurStore = useSessionJoueurStore();

// Campagne actuellement active.
const campagneActive = computed(() => campagneStore.campagneActive);

// Tous les chapitres de la campagne active.
const chapitresCampagne = computed(() => {
  if (!campagneActive.value) {
    return [];
  }

  return chapitreStore.chapitresCampagne(campagneActive.value.id);
});

// Chapitres actuellement actifs.
const chapitresActifs = computed(() =>
  chapitresCampagne.value
    .filter(({ statut }) => statut === "actif")
    .filter(correspondRecherche)
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);

// Chapitres déjà terminés.
const chapitresTermines = computed(() =>
  chapitresCampagne.value
    .filter(({ statut }) => statut === "termine")
    .filter(correspondRecherche)
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);

// Toutes les quêtes appartenant aux chapitres de la campagne.
const quetesCampagne = computed(() =>
  chapitresCampagne.value.flatMap(({ id }) => queteStore.quetesChapitre(id))
);

// Quêtes actuellement actives.
const quetesActives = computed(() =>
  quetesCampagne.value
    .filter(({ statut }) => statut === "active")
    .filter(correspondRecherche)
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);

// Quêtes déjà terminées.
const quetesTerminees = computed(() =>
  quetesCampagne.value
    .filter(({ statut }) => statut === "terminee")
    .filter(correspondRecherche)
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);

const recherche = ref("");

function correspondRecherche({ nom }) {
  const nomNormalise = (nom ?? "").toLocaleLowerCase();
  const rechercheNormalisee = recherche.value
    .trim()
    .toLocaleLowerCase();

  return nomNormalise.includes(rechercheNormalisee);
}


</script>

<template>
  <main>
    <h1>Progression de la campagne</h1>

    <p v-if="sessionJoueurStore.joueurCourant">
      Joueur :
      <strong>{{ sessionJoueurStore.joueurCourant.nom }}</strong>
    </p>

    <p v-else>Aucun joueur sélectionné.</p>

    <p v-if="!campagneActive">Aucune campagne active.</p>

    <template v-else>
      <section>
        <h2>{{ campagneActive.nom }}</h2>
        <p>{{ campagneActive.description }}</p>
        
      </section>

      <ProgressionRecherche v-model="recherche" />

      <section>
        <h2>Chapitres actifs</h2>

        <p v-if="chapitresActifs.length === 0">Aucun chapitre actif.</p>

        <article v-for="chapitre in chapitresActifs" :key="chapitre.id">
          <h3>{{ chapitre.nom }}</h3>
          <p>Statut : {{ chapitre.statut }}</p>
          <p>{{ chapitre.description }}</p>
        </article>
      </section>

      <section>
        <h2>Chapitres terminés</h2>

        <p v-if="chapitresTermines.length === 0">Aucun chapitre terminé.</p>

        <ChapitreCard
          v-for="chapitre in chapitresActifs"
          :key="chapitre.id"
          :chapitre="chapitre"
        />
      </section>

      <section>
        <h2>Quêtes actives</h2>

        <p v-if="quetesActives.length === 0">Aucune quête active.</p>

        <QueteCard
          v-for="quete in quetesActives"
          :key="quete.id"
          :quete="quete"
        />
      </section>

      <section>
        <h2>Quêtes terminées</h2>

        <p v-if="quetesTerminees.length === 0">Aucune quête terminée.</p>

        <QueteCard
          v-for="quete in quetesTerminees"
          :key="quete.id"
          :quete="quete"
        />
      </section>
    </template>
  </main>
</template>