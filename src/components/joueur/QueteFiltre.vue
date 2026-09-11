<script setup>
const statutSelectionne = defineModel({
  type: String,
  default: "toutes",
});
</script>

<template>
  <section>
    <label for="quete-filtre">
      Filtrer les quêtes par statut
    </label>

    <select
      id="quete-filtre"
      v-model="statutSelectionne"
    >
      <option value="toutes">
        Toutes
      </option>

      <option value="active">
        Actives
      </option>

      <option value="terminee">
        Terminées
      </option>

      <option value="abandonnee">
        Abandonnées
      </option>
    </select>
  </section>
</template>