<script setup>
import { ref } from 'vue';
import Modal from '../Modal.vue';

const emit = defineEmits(['sauvegarde']);

const campagneParDefault = { nom: '', etat: '', description: '', commentaire: '' }
const etats = ['active', 'disponible', 'brouillon'];

const modal = ref()

const nouvelleCampagne = ref({ ...campagneParDefault })

function gererSubmit() {
    emit(
        'sauvegarde',
        nouvelleCampagne.value,
    );
    nouvelleCampagne.value = { ...campagneParDefault }
    modal.value.fermer()
}

</script>

<template>
    <Modal ref="modal">

        <template #button>
        Nouvelle campagne
        </template>

        <h2>Nouvelle Campagne</h2>

        <form @submit.prevent="gererSubmit">
        <label>Nom<input v-model="nouvelleCampagne.nom" type="text" required></label>
        <br>
        <label>Etat
            <select v-model="nouvelleCampagne.etat" required>
            <option value="" disabled>---</option>
            <option v-for="etat in etats" :value="etat">{{ etat }}</option>
            </select>
        </label>
        <br>
        <label>Description<textarea v-model="nouvelleCampagne.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea v-model="nouvelleCampagne.commentaire" required></textarea></label>
        <br>

        <button type="submit">
            Ajouter
        </button>
        </form>

    </Modal>
</template>