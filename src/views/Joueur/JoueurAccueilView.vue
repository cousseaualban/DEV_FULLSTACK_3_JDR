<script setup>
import { computed } from "vue";
import JoueurSelector from "@/components/joueur/JoueurSelector.vue";
import useLieuStore from "@/stores/lieu";
import useSessionJoueurStore from "@/stores/sessionJoueur";

const lieuStore = useLieuStore();
const sessionJoueurStore = useSessionJoueurStore();

const lieuActuel = computed(() => {
  const joueur = sessionJoueurStore.joueurCourant;

  if (!joueur?.lieu_id) {
    return undefined;
  }

  return lieuStore.lieuSpecifique(joueur.lieu_id);
});
</script>

<template>
  <main>
    <h1>Interface joueur</h1>

    <JoueurSelector />

    <section v-if="sessionJoueurStore.joueurCourant">
      <h2>Joueur sélectionné</h2>

      <p>
        Nom :
        {{ sessionJoueurStore.joueurCourant.nom }}
      </p>

      <p>
        Statut :
        {{ sessionJoueurStore.joueurCourant.statut }}
      </p>

      <p>
        Description :
        {{ sessionJoueurStore.joueurCourant.description }}
      </p>

      <p>
        Lieu actuel :
        {{ lieuActuel?.nom ?? "Lieu non renseigné" }}
      </p>

      <p>
        <RouterLink :to="{ name: 'joueur-progression' }">
          Voir la progression
        </RouterLink>
      </p>

      <p>
        <RouterLink :to="{ name: 'joueur-progression' }">
          Voir la progression
        </RouterLink>
      </p>

      <p>
        <RouterLink :to="{ name: 'joueur-inventaire' }">
          Voir l'inventaire
        </RouterLink>
      </p>

      <p>
        <RouterLink :to="{ name: 'joueur-actions' }">
          Effectuer des actions
        </RouterLink>
      </p>
    </section>

    <p v-else>Veuillez sélectionner un joueur pour continuer.</p>
  </main>
</template>