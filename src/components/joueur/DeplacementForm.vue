<script setup>
import { computed, ref, watch } from "vue";
import useCampagneStore from "@/stores/campagne";
import useLieuStore from "@/stores/lieu";
import useSessionJoueurStore from "@/stores/sessionJoueur";
import { useActionsJoueur } from "@/composables/useActionsJoueur";

const campagneStore = useCampagneStore();
const lieuStore = useLieuStore();
const sessionJoueurStore = useSessionJoueurStore();

const { deplacerJoueur } = useActionsJoueur();

const destinationId = ref("");
const message = ref("");
const succes = ref(false);

const campagneActive = computed(() => campagneStore.campagneActive);

const joueurCourant = computed(() =>
  sessionJoueurStore.joueurCourant,
);

const lieuxDisponibles = computed(() => {
  if (!campagneActive.value) {
    return [];
  }

  return lieuStore.lieuxCampagne(campagneActive.value.id);
});

function deplacer() {
  const resultat = deplacerJoueur(destinationId.value);

  message.value = resultat.message;
  succes.value = resultat.succes;

  if (resultat.succes) {
    destinationId.value = "";
  }
}

watch(
  () => joueurCourant.value?.id,
  () => {
    destinationId.value = "";
    message.value = "";
    succes.value = false;
  },
);
</script>

<template>
  <section>
    <h2>Déplacement</h2>

    <p v-if="!joueurCourant">
      Veuillez sélectionner un joueur.
    </p>

    <form
      v-else
      @submit.prevent="deplacer"
    >
      <label for="destination">
        Destination
      </label>

      <select
        id="destination"
        v-model="destinationId"
        required
      >
        <option
          value=""
          disabled
        >
          Sélectionnez un lieu
        </option>

        <option
          v-for="lieu in lieuxDisponibles"
          :key="lieu.id"
          :value="lieu.id"
        >
          {{ lieu.nom }}
        </option>
      </select>

      <button type="submit">
        Se déplacer
      </button>
    </form>

    <p
      v-if="message"
      :class="{ succes }"
    >
      {{ message }}
    </p>
  </section>
</template>