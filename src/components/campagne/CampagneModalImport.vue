<script setup>
import useCampagneStore from '@/stores/campagne';
import Modal from '../Modal.vue';
import { ref } from 'vue';
import AppButton from '../AppButton.vue';

const modal = ref()

const store = useCampagneStore()

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

    const resultat = store.importerCampagne(donnees);

    if (!resultat) {
      message.value = "Le fichier n'est pas un fichier .cplc.json valide.";
      return;
    }

    fichier.value = null;
    message.value = "";
    modal.value.fermer();
  } catch (erreur) {
    console.error(erreur);
    message.value = "Une erreur est survenue pendant l'import.";
  }
}

</script>

<template>
    <Modal ref="modal">

        <template #button>
        Importer une campagne
        </template>

        <h2>Importer une Campagne</h2>

        <p>
        Sélectionne un fichier .cplc.json pour tester son import.
        </p>

        <input
        type="file"
        accept=".json,.cplc.json"
        @change="choisirFichier"
        >

        <AppButton @click="importerFichier">
        Importer la campagne
        </AppButton>

        <p v-if="message">
        {{ message }}
        </p>
        
    </Modal>
</template>