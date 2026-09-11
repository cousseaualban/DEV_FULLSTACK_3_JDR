<script setup>
import useJoueurStore from '@/stores/joueur';
import useLieuStore from '@/stores/lieu';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()

const store = useJoueurStore()
const storeLieu = useLieuStore()

const lieux = computed(() => (storeLieu.lieuxCampagne(route.params.idCampagne)))
const joueur = computed(() => (store.joueurSpecifique(route.params.idJoueur)));

function modifier({ target }) {
    const { id } = joueur.value
    const nom = target.nom.value
    const description = target.description.value
    const commentaire_MJ = target.commentaire_MJ.value
    const lieu_id = target.lieu_id.value

    store.modifierJoueur(id, nom, description, commentaire_MJ)
    store.deplacerJoueur(id, lieu_id)
    router.push({ name: 'liste-joueur', params: { idCampagne: route.params.idCampagne } })
}

</script>

<template>
    <form @submit.prevent="modifier">
        <label>Nom<input name="nom" :value="joueur.nom" type="text" required></label>
        <br>
        <label>Description<textarea name="description" :value="joueur.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea name="commentaire_MJ" :value="joueur.commentaire_MJ" required></textarea></label>
        <br>
        <label>Lieu
            <select name="lieu_id" :value="joueur.lieu_id">
                <option value="">---</option>
                <option v-for="lieu in lieux" :value="lieu.id">{{ lieu.nom }}</option>
            </select>
        </label>    
        <br>
        <button type="submit">Enregister</button>
    </form>
</template>