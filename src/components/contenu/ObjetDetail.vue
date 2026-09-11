<script setup>
import useObjetStore from '@/stores/objet';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()

const store = useObjetStore()

const objet = computed(() => (store.objetSpecifique(route.params.idObjet)));

function modifier({ target }) {
    const { id } = objet.value
    const nom = target.nom.value
    const description = target.description.value
    const commentaire_MJ = target.commentaire_MJ.value

    store.modifierObjet(id, nom, description, commentaire_MJ)
    router.push({ name: 'liste-contenu', params: { idCampagne: route.params.idCampagne } })
}

</script>

<template>
    <form @submit.prevent="modifier">
        <label>Nom<input name="nom" :value="objet.nom" type="text" required></label>
        <br>
        <label>Description<textarea name="description" :value="objet.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea name="commentaire_MJ" :value="objet.commentaire_MJ" required></textarea></label>
        <br>
        <button type="submit">Enregister</button>
    </form>
</template>