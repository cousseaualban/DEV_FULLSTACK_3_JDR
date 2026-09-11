<script setup>
import { computed } from "vue";
import useLieuStore from "@/stores/lieu";

const props = defineProps({
  quete: {
    type: Object,
    required: true,
  },
});

const lieuStore = useLieuStore();

const lieu = computed(() => lieuStore.lieuSpecifique(props.quete.lieu_id));

const indicateurStatut = computed(() => {
  if (props.quete.statut === "active") {
    return "▶️";
  }

  if (props.quete.statut === "terminee") {
    return "✅";
  }

  return "⏸️";
});
</script>

<template>
  <article>
    <h3>
      {{ indicateurStatut }}
      {{ quete.nom }}
    </h3>

    <p>Statut : {{ quete.statut }}</p>

    <p>{{ quete.description }}</p>

    <p>
      Lieu :
      {{ lieu?.nom ?? "Non renseigné" }}
    </p>

    <RouterLink
      :to="{
        name: 'joueur-quete-detail',
        params: { id: quete.id },
      }"
    >
      Voir la quête
    </RouterLink>
  </article>
</template>