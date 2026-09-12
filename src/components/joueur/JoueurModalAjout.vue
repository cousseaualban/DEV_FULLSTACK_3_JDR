<script setup>
import { computed, ref } from 'vue';
import Modal from '../Modal.vue';
import useLieuStore from '@/stores/lieu.js';
import AppButton from '../AppButton.vue';

const { idCampagne } = defineProps({
    idCampagne: {
        type: String,
        required: false
    }
})

const emit = defineEmits(['sauvegarde']);

const storeLieu = useLieuStore()
const lieux = computed(() => (storeLieu.lieuxCampagne(idCampagne)))

const joueurParDefault = { nom: '', description: '', commentaire_MJ: '', lieu_id: '' }

const modal = ref()

const nouveauJoueur = ref({ ...joueurParDefault })

function gererSubmit() {
    emit(
        'sauvegarde',
        idCampagne,
        nouveauJoueur.value.nom,
        nouveauJoueur.value.description,
        nouveauJoueur.value.commentaire_MJ,
        nouveauJoueur.value.lieu_id
    );
    nouveauJoueur.value = { ...joueurParDefault }
    modal.value.fermer()
}

</script>

<template>
    <Modal ref="modal">

        <template #button>
        Nouveau joueur
        </template>

        <h2>Nouveau joueur</h2>

        <form @submit.prevent="gererSubmit">
        <label>Nom<input v-model="nouveauJoueur.nom" type="text" required></label>
        <br>
        <label>Description<textarea v-model="nouveauJoueur.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea v-model="nouveauJoueur.commentaire_MJ" required></textarea></label>
        <br>
        <label>Lieu
            <select v-model="nouveauJoueur.lieu_id">
                <option value="">---</option>
                <option v-for="lieu in lieux" :value="lieu.id">{{ lieu.nom }}</option>
            </select>
        </label>
        <br>
        <AppButton type="submit">
            Ajouter
        </AppButton>
        </form>

    </Modal>
</template>