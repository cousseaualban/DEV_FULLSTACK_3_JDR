<script setup>
import { computed, ref } from 'vue';
import Modal from '../Modal.vue';
import useObjetStore from '@/stores/objet.js';
import SelecteurMultiple from '../SelecteurMultiple.vue';
import useIndiceStore from '@/stores/indice.js';
import AppButton from '../AppButton.vue';

const emit = defineEmits(['sauvegarde']);

const { idCampagne } = defineProps({
    idCampagne: {
        type: String,
        required: false
    }
})

const chapitreParDefault = { nom: '', statut: '', description: '', commentaire_MJ: '', mdp_activation: '', objets_necessaires: [], mdp_resolution: '', recompenses_objets: [], recompenses_indices: [] }
const etats = ['inactif', 'actif', 'terminé'];

const storeObjet = useObjetStore()
const storeIndice = useIndiceStore()

const listeObjets = computed(() => (storeObjet.objetsCampagne(idCampagne)))
const listeIndices = computed(() => (storeIndice.indicesCampagne(idCampagne)))

const modal = ref()

const nouveauChapitre = ref({ ...chapitreParDefault })

function gererSubmit({ target }) {
    emit(
        'sauvegarde',
        idCampagne,
        nouveauChapitre.value.nom,
        nouveauChapitre.value.statut,
        nouveauChapitre.value.description,
        nouveauChapitre.value.commentaire_MJ,
        nouveauChapitre.value.mdp_activation,
        JSON.parse(target.objets_necessaires.value),
        nouveauChapitre.value.mdp_resolution,
        JSON.parse(target.recompenses_objets.value),
        JSON.parse(target.recompenses_indices.value)
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
        <label>Objets nécessaires
            <SelecteurMultiple name="objets_necessaires" :value="nouveauChapitre.objets_necessaires" :elements="listeObjets"/>
        </label>
        <br>
        <label>MDP Résolution<input v-model="nouveauChapitre.mdp_resolution" type="password" required></label>
        <br>
        <label>Recompenses Objets
            <SelecteurMultiple name="recompenses_objets" :value="nouveauChapitre.recompenses_objets" :elements="listeObjets"/>
        </label>
        <br>
        <label>Recompenses Indices
            <SelecteurMultiple name="recompenses_indices" :value="nouveauChapitre.recompenses_indices" :elements="listeIndices"/>
        </label>
        <br>

        <AppButton type="submit">
            Ajouter
        </AppButton>
        </form>

    </Modal>
</template>