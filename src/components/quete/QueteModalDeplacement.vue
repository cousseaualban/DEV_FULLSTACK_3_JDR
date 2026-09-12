<script setup>
import { computed, ref } from 'vue';
import Modal from '../Modal.vue';
import useObjetStore from '@/stores/objet.js';
import SelecteurMultiple from '../SelecteurMultiple.vue';
import useIndiceStore from '@/stores/indice.js';
import useLieuStore from '@/stores/lieu.js';
import AppButton from '../AppButton.vue';
import useQueteStore from '@/stores/quete.js';
import useChapitreStore from '@/stores/chapitre.js';
import App from '@/App.vue';

const { idCampagne, idChapitre } = defineProps({
    idCampagne: {
        type: String,
        required: false
    },
    idChapitre: {
        type: String,
        required: false
    }
})

const storeQuete = useQueteStore()
const storeChapitre = useChapitreStore()

const modal = ref()

const quete = ref("")
const chapitre = ref("")

const quetes = computed(() => (storeQuete.quetesChapitre(idChapitre)))
const chapitres = computed(() => (storeChapitre.chapitresCampagne(idCampagne).filter(c => c.id !== idChapitre)))



function gererSubmit() {
    storeQuete.deplacerQuete(quete.value, chapitre.value)
    quete.value = ""
    chapitre.value = ""

    modal.value.fermer()
}

</script>

<template>
    <Modal ref="modal">

        <template #button>
        Déplacer une quête
        </template>

        <h2>Déplacement de quête</h2>

        <form @submit.prevent="gererSubmit">
            <label>Quête
                <select v-model="quete" required>
                <option value="" disabled>---</option>
                <option v-for="q in quetes" :value="q.id">{{ q.nom }}</option>
                </select>
            </label>
            <br>
            <label>Chapitre
                <select v-model="chapitre" required>
                <option value="" disabled>---</option>
                <option v-for="c in chapitres" :value="c.id">{{ c.nom }}</option>
                </select>
            </label>
            <br>

            <AppButton type="submit">
                Déplacer
            </AppButton>
        </form>

    </Modal>
</template>