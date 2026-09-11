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

const objetParDefault = { nom: '', description: '', commentaire_MJ: ''}

const modal = ref()

const nouveauObjet = ref({ ...objetParDefault })

function gererSubmit() {
    emit(
        'sauvegarde',
        idCampagne,
        nouveauObjet.value.nom,
        nouveauObjet.value.description,
        nouveauObjet.value.commentaire_MJ
    );
    nouveauObjet.value = { ...objetParDefault }
    modal.value.fermer()
}

</script>

<template>
    <Modal ref="modal">

        <template #button>
        Nouvel objet
        </template>

        <h2>Nouvel objet</h2>

        <form @submit.prevent="gererSubmit">
        <label>Nom<input v-model="nouveauObjet.nom" type="text" required></label>
        <br>
        <label>Description<textarea v-model="nouveauObjet.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea v-model="nouveauObjet.commentaire_MJ" required></textarea></label>
        <br>

        <button type="submit">
            Ajouter
        </button>
        </form>

    </Modal>
</template>