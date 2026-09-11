<script setup>
const recherche = defineModel({
  type: String,
  default: "",
});
</script>

<template>
  <section>
    <label for="progression-recherche">
      Rechercher un chapitre ou une quête
    </label>

    <input
      id="progression-recherche"
      v-model="recherche"
      type="search"
      placeholder="Nom du chapitre ou de la quête"
    >
  </section>
</template>