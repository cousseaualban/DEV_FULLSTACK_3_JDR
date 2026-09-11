<script setup>
import useChapitreStore from '@/stores/chapitre';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()
const store = useChapitreStore()

const etats = ['inactif', 'actif', 'terminé'];

const chapitre = computed(() => (store.chapitreSpecifique(route.params.idChapitre)));

function modifier({ target }) {
    const { id } = chapitre.value
    const nom = target.nom.value
    const statut = target.statut.value
    const description = target.description.value
    const commentaire_MJ = target.commentaire_MJ.value
    const mdp_activation = target.mdp_activation.value
    const mdp_resolution = target.mdp_resolution.value

    store.modifierChapitre(id, nom, description, commentaire_MJ,mdp_activation, [] , mdp_resolution, [], [])
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
        <label>MDP Résolution<input name="mdp_resolution" :value="chapitre.mdp_resolution" type="password" required></label>
        <br>
        <button type="submit">
            Enregister
        </button>
    </form>
</template>