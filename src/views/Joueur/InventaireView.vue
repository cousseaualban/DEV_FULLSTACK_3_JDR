<script setup>
import { computed, ref } from "vue";
import useSessionJoueurStore from "@/stores/sessionJoueur";
import useObjetStore from "@/stores/objet";
import useIndiceStore from "@/stores/indice";
import ObjetCard from "@/components/joueur/ObjetCard.vue";
import IndiceCard from "@/components/joueur/IndiceCard.vue";

const sessionJoueurStore = useSessionJoueurStore();
const objetStore = useObjetStore();
const indiceStore = useIndiceStore();
const recherche = ref("");
const joueurCourant = computed(() => sessionJoueurStore.joueurCourant);

const objetsInventaire = computed(() => {
  if (!joueurCourant.value) {
    return [];
  }

  return (joueurCourant.value.inventaire_objets ?? [])
    .map((id) => objetStore.objetSpecifique(id))
    .filter(Boolean);
});

const indicesInventaire = computed(() => {
  if (!joueurCourant.value) {
    return [];
  }

  return (joueurCourant.value.inventaire_indices ?? [])
    .map((id) => indiceStore.indiceSpecifique(id))
    .filter(Boolean);
});

const objetsFiltres = computed(() => {
  const texteRecherche = recherche.value.trim().toLocaleLowerCase();

  return objetsInventaire.value.filter((objet) => {
    const nom = objet.nom?.toLocaleLowerCase() ?? "";
    const description = objet.description?.toLocaleLowerCase() ?? "";

    return nom.includes(texteRecherche) || description.includes(texteRecherche);
  });
});

const indicesFiltres = computed(() => {
  const texteRecherche = recherche.value.trim().toLocaleLowerCase();

  return indicesInventaire.value.filter((indice) => {
    const nom = indice.nom?.toLocaleLowerCase() ?? "";
    const texte = indice.texte?.toLocaleLowerCase() ?? "";

    return nom.includes(texteRecherche) || texte.includes(texteRecherche);
  });
});

const inventaireVide = computed(
  () =>
    objetsInventaire.value.length === 0 && indicesInventaire.value.length === 0
);
</script>

<template>
  <main>
    <RouterLink :to="{ name: 'joueur-accueil' }">
      Retour à l'accueil joueur
    </RouterLink>

    <h1>Inventaire</h1>

    <p v-if="!joueurCourant">Veuillez sélectionner un joueur.</p>

    <template v-else>
      <p>
        Joueur :
        <strong>{{ joueurCourant.nom }}</strong>
      </p>

      <div>
        <label for="recherche-inventaire"> Rechercher dans l'inventaire </label>

        <input
          id="recherche-inventaire"
          v-model="recherche"
          type="search"
          placeholder="Nom, description ou texte"
        />
      </div>

      <p v-if="inventaireVide">L'inventaire est vide.</p>

      <template v-else>
        <section>
          <h2>Objets</h2>

          <p v-if="objetsFiltres.length === 0">Aucun objet correspondant.</p>

          <ObjetCard
            v-for="objet in objetsFiltres"
            :key="objet.id"
            :objet="objet"
          />
        </section>

        <section>
          <h2>Indices</h2>

          <p v-if="indicesFiltres.length === 0">Aucun indice correspondant.</p>

          <IndiceCard
            v-for="indice in indicesFiltres"
            :key="indice.id"
            :indice="indice"
          />
        </section>
      </template>
    </template>
  </main>
</template>