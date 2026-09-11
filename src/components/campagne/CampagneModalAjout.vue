<script setup>
import { ref } from 'vue';
import Modal from '../Modal.vue';
import AppButton from '../AppButton.vue';

const emit = defineEmits(['sauvegarde']);

const campagneParDefault = { nom: '', statut: '', description: '', commentaire_MJ: ''}
const etats = ['active', 'disponible', 'brouillon'];

const modal = ref()

const nouvelleCampagne = ref({ ...campagneParDefault })

function gererSubmit() {
    emit(
        'sauvegarde',
        nouvelleCampagne.value.nom,
        nouvelleCampagne.value.statut,
        nouvelleCampagne.value.description,
        nouvelleCampagne.value.commentaire_MJ
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
                <select v-model="nouvelleCampagne.statut" required>
                <option value="" disabled>---</option>
                <option v-for="etat in etats" :value="etat">{{ etat }}</option>
                </select>
            </label>
            <br>
            <label>Description<textarea v-model="nouvelleCampagne.description" required></textarea></label>
            <br>
            <label>Commentaire<textarea v-model="nouvelleCampagne.commentaire_MJ" required></textarea></label>
            <br>

            <AppButton type="submit">
                Ajouter
            </AppButton>
        </form>

    </Modal>
</template>