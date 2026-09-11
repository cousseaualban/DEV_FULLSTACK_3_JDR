<script setup>
defineProps({
  chapitre: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article>
    <h3>{{ chapitre.nom }}</h3>

    <p>Statut : {{ chapitre.statut }}</p>

    <p>{{ chapitre.description }}</p>

    <RouterLink :to="`/joueur/chapitres/${chapitre.id}`">
      Voir le chapitre
    </RouterLink>
  </article>
</template>