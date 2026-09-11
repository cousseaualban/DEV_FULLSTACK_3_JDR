<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import useCampagneStore from "@/stores/campagne";
import useChapitreStore from "@/stores/chapitre";
import useQueteStore from "@/stores/quete";
import useLieuStore from "@/stores/lieu";
import useObjetStore from "@/stores/objet";
import useIndiceStore from "@/stores/indice";

const route = useRoute();

const campagneStore = useCampagneStore();
const chapitreStore = useChapitreStore();
const queteStore = useQueteStore();
const lieuStore = useLieuStore();
const objetStore = useObjetStore();
const indiceStore = useIndiceStore();

const campagneActive = computed(() => campagneStore.campagneActive);

const quete = computed(() => {
  const queteTrouvee = queteStore.queteSpecifique(route.params.id);

  if (!queteTrouvee || queteTrouvee.statut === "inactive") {
    return undefined;
  }

  const chapitre = chapitreStore.chapitreSpecifique(
    queteTrouvee.chapitre_id,
  );

  if (
    !chapitre
    || !campagneActive.value
    || chapitre.campagne_id !== campagneActive.value.id
  ) {
    return undefined;
  }

  return queteTrouvee;
});

const lieu = computed(() => {
  if (!quete.value?.lieu_id) {
    return undefined;
  }

  return lieuStore.lieuSpecifique(quete.value.lieu_id);
});

const objetsRecompenses = computed(() => {
  if (quete.value?.statut !== "terminee") {
    return [];
  }

  return (quete.value.recompenses_objets ?? [])
    .map((id) => objetStore.objetSpecifique(id))
    .filter(Boolean);
});

const indicesRecompenses = computed(() => {
  if (quete.value?.statut !== "terminee") {
    return [];
  }

  return (quete.value.recompenses_indices ?? [])
    .map((id) => indiceStore.indiceSpecifique(id))
    .filter(Boolean);
});
</script>

<template>
  <main>
    <RouterLink :to="{ name: 'joueur-progression' }">
      Retour à la progression
    </RouterLink>

    <p v-if="!quete">
      Quête introuvable ou non accessible.
    </p>

    <template v-else>
      <h1>{{ quete.nom }}</h1>

      <p>
        Statut :
        {{ quete.statut }}
      </p>

      <p>{{ quete.description }}</p>

      <p>
        Lieu :
        {{ lieu?.nom ?? "Lieu non renseigné" }}
      </p>

      <section v-if="quete.statut === 'terminee'">
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