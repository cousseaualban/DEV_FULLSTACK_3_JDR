<script setup>
import { ref } from "vue";

import useCampagneStore from "./stores/campagne.js";
import useChapitreStore from "./stores/chapitre.js";
import useQueteStore from "./stores/quete.js";
import useJoueurStore from "./stores/joueur.js";
import useLieuStore from "./stores/lieu.js";
import useObjetStore from "./stores/objet.js";
import useIndiceStore from "./stores/indice.js";

const campagneStore = useCampagneStore();
const chapitreStore = useChapitreStore();
const queteStore = useQueteStore();
const joueurStore = useJoueurStore();
const lieuStore = useLieuStore();
const objetStore = useObjetStore();
const indiceStore = useIndiceStore();

const fichier = ref(null);
const message = ref("");

function choisirFichier(event) {
  fichier.value = event.target.files[0] ?? null;
}

async function importerFichier() {
  if (!fichier.value) {
    message.value = "Sélectionne d'abord un fichier .cplc.json.";
    return;
  }

  try {
    const contenu = await fichier.value.text();
    const donnees = JSON.parse(contenu);

    const resultat = campagneStore.importerCampagne(donnees);

    if (!resultat) {
      message.value = "Le fichier n'est pas un fichier .cplc.json valide.";
      return;
    }

    message.value = "Import réussi.";
  } catch (erreur) {
    console.error(erreur);
    message.value = "Une erreur est survenue pendant l'import.";
  }
}
</script>

<template>
  <main>
    <h1>Test import .cplc.json</h1>

    <p>
      Sélectionne un fichier .cplc.json pour tester son import.
    </p>

    <input
      type="file"
      accept=".json,.cplc.json"
      @change="choisirFichier"
    >

    <button type="button" @click="importerFichier">
      Importer la campagne
    </button>

    <p v-if="message">
      {{ message }}
    </p>

    <hr>

    <h2>Données présentes après l'import</h2>

    <p>
      Campagnes : {{ campagneStore.liste.length }}
    </p>

    <p>
      Chapitres : {{ chapitreStore.liste.length }}
    </p>

    <p>
      Quêtes : {{ queteStore.liste.length }}
    </p>

    <p>
      Joueurs : {{ joueurStore.liste.length }}
    </p>

    <p>
      Lieux : {{ lieuStore.liste.length }}
    </p>

    <p>
      Objets : {{ objetStore.liste.length }}
    </p>

    <p>
      Indices : {{ indiceStore.liste.length }}
    </p>

    <hr>

    <h2>Campagnes</h2>

    <ul>
      <li v-for="campagne in campagneStore.liste" :key="campagne.id">
        {{ campagne.nom }} — {{ campagne.statut }}
      </li>
    </ul>

    <h2>Chapitres</h2>

    <ul>
      <li v-for="chapitre in chapitreStore.liste" :key="chapitre.id">
        {{ chapitre.nom }}
        — campagne_id : {{ chapitre.campagne_id }}
      </li>
    </ul>

    <h2>Quêtes</h2>

    <ul>
      <li v-for="quete in queteStore.liste" :key="quete.id">
        {{ quete.nom }}
        — chapitre_id : {{ quete.chapitre_id }}
        — lieu_id : {{ quete.lieu_id }}
      </li>
    </ul>

    <h2>Joueurs</h2>

    <ul>
      <li v-for="joueur in joueurStore.liste" :key="joueur.id">
        {{ joueur.nom }}
        — campagne_id : {{ joueur.campagne_id }}
        — lieu_id : {{ joueur.lieu_id }}
      </li>
    </ul>

    <h2>Lieux</h2>

    <ul>
      <li v-for="lieu in lieuStore.liste" :key="lieu.id">
        {{ lieu.nom }}
        — campagne_id : {{ lieu.campagne_id }}
      </li>
    </ul>

    <h2>Objets</h2>

    <ul>
      <li v-for="objet in objetStore.liste" :key="objet.id">
        {{ objet.nom }}
        — campagne_id : {{ objet.campagne_id }}
      </li>
    </ul>

    <h2>Indices</h2>

    <ul>
      <li v-for="indice in indiceStore.liste" :key="indice.id">
        {{ indice.nom }}
        — campagne_id : {{ indice.campagne_id }}
      </li>
    </ul>
  </main>
</template>