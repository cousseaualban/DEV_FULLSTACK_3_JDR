<script setup>
import useLieuStore from '@/stores/lieu';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()

const store = useLieuStore()

const lieu = computed(() => (store.lieuSpecifique(route.params.idLieu)));

function modifier({ target }) {
    const { id } = lieu.value
    const nom = target.nom.value
    const description = target.description.value
    const commentaire_MJ = target.commentaire_MJ.value

    store.modifierLieu(id, nom, description, commentaire_MJ)
    router.push({ name: 'liste-contenu', params: { idCampagne: route.params.idCampagne } })
}

</script>

<template>
    <form @submit.prevent="modifier">
        <label>Nom<input name="nom" :value="lieu.nom" type="text" required></label>
        <br>
        <label>Description<textarea name="description" :value="lieu.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea name="commentaire_MJ" :value="lieu.commentaire_MJ" required></textarea></label>
        <br>
        <button type="submit">Enregister</button>
    </form>
</template>