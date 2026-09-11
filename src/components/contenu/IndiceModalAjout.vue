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

const indiceParDefault = { nom: '', texte: '', commentaire_MJ: ''}

const modal = ref()

const nouveauIndice = ref({ ...indiceParDefault })

function gererSubmit() {
    emit(
        'sauvegarde',
        idCampagne,
        nouveauIndice.value.nom,
        nouveauIndice.value.texte,
        nouveauIndice.value.commentaire_MJ
    );
    nouveauIndice.value = { ...indiceParDefault }
    modal.value.fermer()
}

</script>

<template>
    <Modal ref="modal">

        <template #button>
        Nouvel indice
        </template>

        <h2>Nouvel indice</h2>

        <form @submit.prevent="gererSubmit">
        <label>Nom<input v-model="nouveauIndice.nom" type="text" required></label>
        <br>
        <label>Texte<textarea v-model="nouveauIndice.texte" required></textarea></label>
        <br>
        <label>Commentaire<textarea v-model="nouveauIndice.commentaire_MJ" required></textarea></label>
        <br>

        <button type="submit">
            Ajouter
        </button>
        </form>

    </Modal>
</template>