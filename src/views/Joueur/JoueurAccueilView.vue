<script setup>
import JoueurSelector from "@/components/joueur/JoueurSelector.vue";
import useSessionJoueurStore from "@/stores/sessionJoueur";

const sessionJoueurStore = useSessionJoueurStore();
</script>

<template>
  <main>
    <h1>Interface joueur</h1>

    <JoueurSelector />

    <RouterLink :to="{ name: 'joueur-progression' }">
      Voir la progression
    </RouterLink>

    <section v-if="sessionJoueurStore.joueurCourant">
      <h2>Joueur sélectionné</h2>

      <p>Nom : {{ sessionJoueurStore.joueurCourant.nom }}</p>

      <p>Statut : {{ sessionJoueurStore.joueurCourant.statut }}</p>

      <p>
        Description :
        {{ sessionJoueurStore.joueurCourant.description }}
      </p>
    </section>

    <p v-else>Veuillez sélectionner un joueur pour continuer.</p>
  </main>
</template>
