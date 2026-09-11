<script setup>
defineProps({
  indice: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article>
    <h3>{{ indice.nom }}</h3>

    <p>{{ indice.texte }}</p>
  </article>
</template>