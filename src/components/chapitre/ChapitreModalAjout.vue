<script setup>
import { ref } from 'vue';
import Modal from '../Modal.vue';

const emit = defineEmits(['sauvegarde']);

const { idCampagne } = defineProps({
    idCampagne: {
        type: String,
        required: false
    }
})

const chapitreParDefault = { nom: '', statut: '', description: '', commentaire_MJ: '', mdp_activation: '', mdp_resolution: '' }
const etats = ['inactif', 'actif', 'terminé'];

const modal = ref()

const nouveauChapitre = ref({ ...chapitreParDefault })

function gererSubmit() {
    emit(
        'sauvegarde',
        idCampagne ?? '',
        nouveauChapitre.value.nom,
        nouveauChapitre.value.statut,
        nouveauChapitre.value.description,
        nouveauChapitre.value.commentaire_MJ,
        nouveauChapitre.value.mdp_activation,
        [],
        nouveauChapitre.value.mdp_resolution,
        [],
        []
    );
    nouveauChapitre.value = { ...chapitreParDefault }
    modal.value.fermer()
}

</script>

<template>
    <Modal ref="modal">

        <template #button>
        Nouveau Chapitre
        </template>

        <h2>Nouveau chapitre</h2>

        <form @submit.prevent="gererSubmit">
        <label>Nom<input v-model="nouveauChapitre.nom" type="text" required></label>
        <br>
        <label>Etat
            <select v-model="nouveauChapitre.statut" required>
            <option value="" disabled>---</option>
            <option v-for="etat in etats" :value="etat">{{ etat }}</option>
            </select>
        </label>
        <br>
        <label>Description<textarea v-model="nouveauChapitre.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea v-model="nouveauChapitre.commentaire_MJ" required></textarea></label>
        <br>
        <label>MDP Activation<input v-model="nouveauChapitre.mdp_activation" type="password" required></label>
        <br>
        <label>MDP Résolution<input v-model="nouveauChapitre.mdp_resolution" type="password" required></label>

        <button type="submit">
            Ajouter
        </button>
        </form>

    </Modal>
</template>