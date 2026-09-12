<script setup>
import { ref } from "vue";

defineProps({
  titre: {
    type: String,
    required: true,
  },

  labelBouton: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['soumettre']);

const motDePasse = ref("");

const inputId = `mot-de-passe-${crypto.randomUUID()}`;

function envoyerMotDePasse() {
  emit("soumettre", motDePasse.value);
  motDePasse.value = "";
}
</script>

<template>
  <section>
    <h2>{{ titre }}</h2>

    <form @submit.prevent="envoyerMotDePasse">
      <label :for="inputId">
        Mot de passe
      </label>

      <input
        :id="inputId"
        v-model="motDePasse"
        type="password"
        required
        autocomplete="off"
      >

      <button type="submit">
        {{ labelBouton }}
      </button>
    </form>
  </section>

</template>