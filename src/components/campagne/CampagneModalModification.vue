<script setup>
import { ref } from 'vue';
import Modal from '../Modal.vue';

const emit = defineEmits(['modifier']);

const etats = ['active', 'disponible', 'brouillon'];

const modal = ref()

const props = defineProps({
    campagne: {
        type: Object,
        required: true
    }
})

const campagneModifiee = ref({});

function ouvrirModal() {
    campagneModifiee.value = { ...props.campagne }
}

function gererSubmit() {
    emit(
        'modifier',
        campagneModifiee.value,
    );
    modal.value.fermer()
}

</script>

<template>
    <Modal ref="modal" @ouvrir="ouvrirModal">

        <template #button>
        Modifier
        </template>

        <h2>Campagne</h2>

        <form @submit.prevent="gererSubmit">
        <label>Nom<input v-model="campagneModifiee.nom" type="text" required></label>
        <br>
        <label>Etat
            <select v-model="campagneModifiee.etat" required>
            <option value="" disabled>---</option>
            <option v-for="etat in etats" :value="etat">{{ etat }}</option>
            </select>
        </label>
        <br>
        <label>Description<textarea v-model="campagneModifiee.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea v-model="campagneModifiee.commentaire" required></textarea></label>
        <br>

        <button type="submit">
            Enregistrer
        </button>
        </form>

    </Modal>
</template>