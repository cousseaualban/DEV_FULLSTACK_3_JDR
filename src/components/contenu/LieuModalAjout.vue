<script setup>
import { ref } from 'vue';
import Modal from '../Modal.vue';

const { idCampagne } = defineProps({
    idCampagne: {
        type: String,
        required: false
    }
})

const emit = defineEmits(['sauvegarde']);

const lieuParDefault = { nom: '', description: '', commentaire_MJ: ''}

const modal = ref()

const nouveauLieu = ref({ ...lieuParDefault })

function gererSubmit() {
    emit(
        'sauvegarde',
        idCampagne,
        nouveauLieu.value.nom,
        nouveauLieu.value.description,
        nouveauLieu.value.commentaire_MJ
    );
    nouveauLieu.value = { ...lieuParDefault }
    modal.value.fermer()
}

</script>

<template>
    <Modal ref="modal">

        <template #button>
        Nouvel lieu
        </template>

        <h2>Nouvel lieu</h2>

        <form @submit.prevent="gererSubmit">
        <label>Nom<input v-model="nouveauLieu.nom" type="text" required></label>
        <br>
        <label>Description<textarea v-model="nouveauLieu.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea v-model="nouveauLieu.commentaire_MJ" required></textarea></label>
        <br>

        <button type="submit">
            Ajouter
        </button>
        </form>

    </Modal>
</template>