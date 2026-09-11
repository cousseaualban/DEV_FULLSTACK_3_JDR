<script setup>
defineProps({
  objet: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article>
    <h3>{{ objet.nom }}</h3>

    <p>{{ objet.description }}</p>
  </article>
</template>