<script setup>
import useChapitreStore from '@/stores/chapitre';
import useObjetStore from '@/stores/objet';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SelecteurMultiple from '../SelecteurMultiple.vue';
import useIndiceStore from '@/stores/indice.js';
import AppButton from '../AppButton.vue';

const router = useRouter();
const route = useRoute()
const store = useChapitreStore()
const storeObjet = useObjetStore()
const storeIndice = useIndiceStore()

const listeObjets = computed(() => (storeObjet.objetsCampagne(route.params.idCampagne)))
const listeIndices = computed(() => (storeIndice.indicesCampagne(route.params.idCampagne)))

const etats = ['inactif', 'actif', 'terminé'];

const chapitre = computed(() => (store.chapitreSpecifique(route.params.idChapitre)));

function modifier({ target }) {
    const { id } = chapitre.value
    const nom = target.nom.value
    const statut = target.statut.value
    const description = target.description.value
    const commentaire_MJ = target.commentaire_MJ.value
    const mdp_activation = target.mdp_activation.value
    const objets_necessaires = JSON.parse(target.objets_necessaires.value)
    const mdp_resolution = target.mdp_resolution.value
    const recompenses_objets = JSON.parse(target.recompenses_objets.value)
    const recompenses_indices = JSON.parse(target.recompenses_indices.value)

    store.modifierChapitre(id, nom, description, commentaire_MJ,mdp_activation, objets_necessaires , mdp_resolution, recompenses_objets, recompenses_indices)
    store.changerStatutChapitre(id, statut)
    router.push({ name: 'liste-chapitre', params: {idCampagne: chapitre.value.campagne_id} })
}
</script>

<template>
    <form @submit.prevent="modifier">
        <label>Nom<input name="nom" :value="chapitre.nom" type="text" required></label>
        <br>
        <label>Etat
            <select name="statut" :value="chapitre.statut" required>
            <option value="" disabled>---</option>
            <option v-for="etat in etats" :value="etat">{{ etat }}</option>
            </select>
        </label>
        <br>
        <label>Description<textarea name="description" :value="chapitre.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea name="commentaire_MJ" :value="chapitre.commentaire_MJ" required></textarea></label>
        <br>
        <label>MDP Activation<input name="mdp_activation" :value="chapitre.mdp_activation" type="password" required></label>
        <br>
        <label>Objets nécessaires
            <SelecteurMultiple name="objets_necessaires" :value="chapitre.objets_necessaires" :elements="listeObjets"/>
        </label>
        <br>
        <label>MDP Résolution<input name="mdp_resolution" :value="chapitre.mdp_resolution" type="password" required></label>
        <br>
        <label>Recompenses Objets
            <SelecteurMultiple name="recompenses_objets" :value="chapitre.recompenses_objets" :elements="listeObjets"/>
        </label>
        <br>
        <label>Recompenses Indices
            <SelecteurMultiple name="recompenses_indices" :value="chapitre.recompenses_indices" :elements="listeIndices"/>
        </label>
        <br>

        <AppButton type="submit">
            Enregister
        </AppButton>
    </form>

    <hr>
    <RouterView />
</template>