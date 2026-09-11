<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import useCampagneStore from "@/stores/campagne";
import useChapitreStore from "@/stores/chapitre";
import useQueteStore from "@/stores/quete";
import useObjetStore from "@/stores/objet";
import useIndiceStore from "@/stores/indice";

const route = useRoute();

const campagneStore = useCampagneStore();
const chapitreStore = useChapitreStore();
const queteStore = useQueteStore();
const objetStore = useObjetStore();
const indiceStore = useIndiceStore();

const campagneActive = computed(() => campagneStore.campagneActive);

const chapitre = computed(() => {
  const chapitreTrouve = chapitreStore.chapitreSpecifique(route.params.id);

  if (!chapitreTrouve || !campagneActive.value) {
    return undefined;
  }

  if (chapitreTrouve.campagne_id !== campagneActive.value.id) {
    return undefined;
  }

  return chapitreTrouve;
});

const quetesVisibles = computed(() => {
  if (!chapitre.value) {
    return [];
  }

  return queteStore
    .quetesChapitre(chapitre.value.id)
    .filter((quete) => quete.statut !== "inactive");
});

const objetsRecompenses = computed(() => {
  if (chapitre.value?.statut !== "termine") {
    return [];
  }

  return (chapitre.value.recompenses_objets ?? [])
    .map((id) => objetStore.objetSpecifique(id))
    .filter(Boolean);
});

const indicesRecompenses = computed(() => {
  if (chapitre.value?.statut !== "termine") {
    return [];
  }

  return (chapitre.value.recompenses_indices ?? [])
    .map((id) => indiceStore.indiceSpecifique(id))
    .filter(Boolean);
});
</script>

<template>
  <main>
    <RouterLink :to="{ name: 'joueur-progression' }">
      Retour à la progression
    </RouterLink>

    <p v-if="!chapitre">
      Chapitre introuvable.
    </p>

    <template v-else>
      <h1>{{ chapitre.nom }}</h1>

      <p>
        Statut :
        {{ chapitre.statut }}
      </p>

      <p>{{ chapitre.description }}</p>

      <section>
        <h2>Quêtes du chapitre</h2>

        <p v-if="quetesVisibles.length === 0">
          Aucune quête visible.
        </p>

        <article
          v-for="quete in quetesVisibles"
          :key="quete.id"
        >
          <h3>{{ quete.nom }}</h3>
          <p>Statut : {{ quete.statut }}</p>
          <p>{{ quete.description }}</p>
        </article>
      </section>

      <section v-if="chapitre.statut === 'termine'">
        <h2>Récompenses reçues</h2>

        <p
          v-if="
            objetsRecompenses.length === 0
            && indicesRecompenses.length === 0
          "
        >
          Aucune récompense.
        </p>

        <article
          v-for="objet in objetsRecompenses"
          :key="objet.id"
        >
          <h3>{{ objet.nom }}</h3>
          <p>{{ objet.description }}</p>
        </article>

        <article
          v-for="indice in indicesRecompenses"
          :key="indice.id"
        >
          <h3>{{ indice.nom }}</h3>
          <p>{{ indice.texte }}</p>
        </article>
      </section>
    </template>
  </main>
</template>