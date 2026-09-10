<script setup>
import { ref } from 'vue';
import Modal from '../Modal.vue';

const emit = defineEmits(['modifier']);

const etats = ['inactif', 'actif', 'terminé'];

const modal = ref()

const props = defineProps({
    chapitre: {
        type: Object,
        required: true
    }
})

const chapitreModifiee = ref({});

function ouvrirModal() {
    chapitreModifiee.value = { ...props.chapitre }
}

function gererSubmit() {
    emit(
        'modifier',
        chapitreModifiee.value,
    );
    modal.value.fermer()
}

</script>

<template>
    <Modal ref="modal" @ouvrir="ouvrirModal">

        <template #button>
        Modifier
        </template>

        <h2>Chapitre</h2>

        <form @submit.prevent="gererSubmit">
        <label>Nom<input v-model="chapitreModifiee.nom" type="text" required></label>
        <br>
        <label>Etat
            <select v-model="chapitreModifiee.etat" required>
            <option value="" disabled>---</option>
            <option v-for="etat in etats" :value="etat">{{ etat }}</option>
            </select>
        </label>
        <br>
        <label>Description<textarea v-model="chapitreModifiee.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea v-model="chapitreModifiee.commentaire" required></textarea></label>
        <br>
        <label>MDP Activation<input v-model="chapitreModifiee.mdpAct" type="password" required></label>
        <br>
        <label>MDP Résolution<input v-model="chapitreModifiee.mdpRes" type="password" required></label>

        <button type="submit">
            Enregistrer
        </button>
        </form>

    </Modal>
</template>