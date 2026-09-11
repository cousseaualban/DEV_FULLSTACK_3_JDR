<script setup>
import { computed, ref } from "vue";
import useCampagneStore from "@/stores/campagne";
import useChapitreStore from "@/stores/chapitre";
import useQueteStore from "@/stores/quete";
import useSessionJoueurStore from "@/stores/sessionJoueur";
import ChapitreCard from "@/components/joueur/ChapitreCard.vue";
import QueteCard from "@/components/joueur/QueteCard.vue";
import ProgressionRecherche from "@/components/joueur/ProgressionRecherche.vue";
import QueteFiltre from "@/components/joueur/QueteFiltre.vue";

const campagneStore = useCampagneStore();
const chapitreStore = useChapitreStore();
const queteStore = useQueteStore();
const sessionJoueurStore = useSessionJoueurStore();

const recherche = ref("");

const statutQuete = ref("toutes");

const campagneActive = computed(() => campagneStore.campagneActive);

const chapitresCampagne = computed(() => {
  if (!campagneActive.value) {
    return [];
  }

  return chapitreStore.chapitresCampagne(campagneActive.value.id);
});

const quetesCampagne = computed(() =>
  chapitresCampagne.value.flatMap((chapitre) =>
    queteStore.quetesChapitre(chapitre.id)
  )
);

function correspondRecherche(element) {
  const nom = element.nom?.toLocaleLowerCase() ?? "";
  const texteRecherche = recherche.value.trim().toLocaleLowerCase();

  return nom.includes(texteRecherche);
}

const chapitresActifs = computed(() =>
  chapitresCampagne.value
    .filter((chapitre) => chapitre.statut === "actif")
    .filter(correspondRecherche)
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);

const chapitresTermines = computed(() =>
  chapitresCampagne.value
    .filter((chapitre) => chapitre.statut === "termine")
    .filter(correspondRecherche)
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);

const quetesActives = computed(() =>
  quetesCampagne.value
    .filter((quete) => quete.statut === "active")
    .filter(correspondRecherche)
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);

const quetesTerminees = computed(() =>
  quetesCampagne.value
    .filter((quete) => quete.statut === "terminee")
    .filter(correspondRecherche)
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);

const quetesAbandonnees = computed(() =>
  quetesCampagne.value
    .filter((quete) => quete.statut === "abandonnee")
    .filter(correspondRecherche)
    .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0))
);
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
      <QueteFiltre v-model="statutQuete" />

      <section>
        <h2>Chapitres actifs</h2>

        <p v-if="chapitresActifs.length === 0">Aucun chapitre actif.</p>

        <ChapitreCard
          v-for="chapitre in chapitresActifs"
          :key="chapitre.id"
          :chapitre="chapitre"
        />
      </section>

      <section>
        <h2>Chapitres terminés</h2>

        <p v-if="chapitresTermines.length === 0">Aucun chapitre terminé.</p>

        <ChapitreCard
          v-for="chapitre in chapitresTermines"
          :key="chapitre.id"
          :chapitre="chapitre"
        />
      </section>

      <section v-if="statutQuete === 'toutes' || statutQuete === 'active'">
        <h2>Quêtes actives</h2>

        <p v-if="quetesActives.length === 0">Aucune quête active.</p>

        <QueteCard
          v-for="quete in quetesActives"
          :key="quete.id"
          :quete="quete"
        />
      </section>

      <section v-if="statutQuete === 'toutes' || statutQuete === 'terminee'">
        <h2>Quêtes terminées</h2>

        <p v-if="quetesTerminees.length === 0">Aucune quête terminée.</p>

        <QueteCard
          v-for="quete in quetesTerminees"
          :key="quete.id"
          :quete="quete"
        />
      </section>

      <section v-if="statutQuete === 'toutes' || statutQuete === 'abandonnee'">
        <h2>Quêtes abandonnées</h2>

        <p v-if="quetesAbandonnees.length === 0">Aucune quête abandonnée.</p>

        <QueteCard
          v-for="quete in quetesAbandonnees"
          :key="quete.id"
          :quete="quete"
        />
      </section>
    </template>
  </main>
</template>