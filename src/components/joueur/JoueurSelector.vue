<script setup>
import { computed, watch } from 'vue';
import useCampagneStore from '@/stores/campagne';
import useJoueurStore from '@/stores/joueur';
import useSessionJoueurStore from '@/stores/sessionJoueur';

const campagneStore = useCampagneStore();
const joueurStore = useJoueurStore();
const sessionJoueurStore = useSessionJoueurStore();

// Campagne actuellement active.
const campagneActive = computed(() => (
  campagneStore.campagneActive
));

// Joueurs appartenant uniquement à la campagne active.
const joueursDisponibles = computed(() => {
  if (!campagneActive.value) {
    return [];
  }

  return joueurStore.joueursCampagne(campagneActive.value.id);
});

// Permet d'utiliser v-model tout en passant par les actions du store.
const joueurSelectionneId = computed({
  get() {
    return sessionJoueurStore.joueurCourantId ?? '';
  },

  set(id) {
    if (id) {
      sessionJoueurStore.selectionnerJoueur(id);
    } else {
      sessionJoueurStore.deselectionnerJoueur();
    }
  },
});

// Désélectionne automatiquement un joueur qui n'appartient plus
// à la campagne active.
watch(
  joueursDisponibles,
  (joueurs) => {
    const joueurCourantId = sessionJoueurStore.joueurCourantId;

    if (
      joueurCourantId
      && !joueurs.some(({ id }) => id === joueurCourantId)
    ) {
      sessionJoueurStore.deselectionnerJoueur();
    }
  },
  { immediate: true },
);
</script>

<template>
  <section>
    <h2>Sélection du joueur</h2>

    <p v-if="!campagneActive">
      Aucune campagne active.
    </p>

    <p v-else-if="joueursDisponibles.length === 0">
      Aucun joueur n'est disponible dans cette campagne.
    </p>

    <div v-else>
      <label for="joueur">
        Joueur actuel
      </label>

      <select
        id="joueur"
        v-model="joueurSelectionneId"
      >
        <option value="">
          Sélectionnez un joueur
        </option>

        <option
          v-for="joueur in joueursDisponibles"
          :key="joueur.id"
          :value="joueur.id"
        >
          {{ joueur.nom }} — {{ joueur.statut }}
        </option>
      </select>

      <button
        v-if="sessionJoueurStore.joueurCourant"
        type="button"
        @click="sessionJoueurStore.deselectionnerJoueur"
      >
        Désélectionner
      </button>
    </div>
  </section>
</template>