<script setup>
import { computed, ref } from 'vue';
import Modal from '../Modal.vue';
import useObjetStore from '@/stores/objet.js';
import SelecteurMultiple from '../SelecteurMultiple.vue';
import useIndiceStore from '@/stores/indice.js';
import useLieuStore from '@/stores/lieu.js';

const emit = defineEmits(['sauvegarde']);

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

const queteParDefault = { nom: '', statut: '', description: '', commentaire_MJ: '', mdp_activation: '', mdp_resolution: '', recompenses_objets: [], recompenses_indices: [] }

const storeObjet = useObjetStore()
const storeIndice = useIndiceStore()
const storeLieu = useLieuStore()

const listeObjets = computed(() => (storeObjet.objetsCampagne(idCampagne)))
const listeIndices = computed(() => (storeIndice.indicesCampagne(idCampagne)))
const lieux = computed(() => (storeLieu.lieuxCampagne(idCampagne)))

const modal = ref()

const nouvelleQuete = ref({ ...queteParDefault })

function gererSubmit({ target }) {
    emit(
        'sauvegarde',
        idChapitre,
        nouvelleQuete.value.lieu_id,
        nouvelleQuete.value.nom,
        nouvelleQuete.value.description,
        nouvelleQuete.value.commentaire_MJ,
        nouvelleQuete.value.mdp_activation,
        nouvelleQuete.value.mdp_resolution,
        JSON.parse(target.recompenses_objets.value),
        JSON.parse(target.recompenses_indices.value)
    );
    nouvelleQuete.value = { ...queteParDefault }
    modal.value.fermer()
}

</script>

<template>
    <Modal ref="modal">

        <template #button>
        Nouvelle Quete
        </template>

        <h2>Nouvelle quete</h2>

        <form @submit.prevent="gererSubmit">
            <label>Nom<input v-model="nouvelleQuete.nom" type="text" required></label>
            <br>
            <label>Lieu
                <select v-model="nouvelleQuete.lieu_id">
                    <option value="">---</option>
                    <option v-for="lieu in lieux" :value="lieu.id">{{ lieu.nom }}</option>
                </select>
            </label>
            <br>
            <label>Description<textarea v-model="nouvelleQuete.description" required></textarea></label>
            <br>
            <label>Commentaire<textarea v-model="nouvelleQuete.commentaire_MJ" required></textarea></label>
            <br>
            <label>MDP Activation<input v-model="nouvelleQuete.mdp_activation" type="password"></label>
            <br>
            <label>MDP Résolution<input v-model="nouvelleQuete.mdp_resolution" type="password" required></label>
            <br>
            <label>Recompenses Objets
                <SelecteurMultiple name="recompenses_objets" :value="nouvelleQuete.recompenses_objets" :elements="listeObjets"/>
            </label>
            <br>
            <label>Recompenses Indices
                <SelecteurMultiple name="recompenses_indices" :value="nouvelleQuete.recompenses_indices" :elements="listeIndices"/>
            </label>
            <br>

            <button type="submit">
                Ajouter
            </button>
        </form>

    </Modal>
</template>