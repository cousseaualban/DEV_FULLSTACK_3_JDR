<script setup>
import useIndiceStore from '@/stores/indice';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()

const store = useIndiceStore()

const indice = computed(() => (store.indiceSpecifique(route.params.idIndice)));

function modifier({ target }) {
    const { id } = indice.value
    const nom = target.nom.value
    const texte = target.texte.value
    const commentaire_MJ = target.commentaire_MJ.value

    store.modifierIndice(id, nom, texte, commentaire_MJ)
    router.push({ name: 'liste-contenu', params: { idCampagne: route.params.idCampagne } })
}

</script>

<template>
    <form @submit.prevent="modifier">
        <label>Nom<input name="nom" :value="indice.nom" type="text" required></label>
        <br>
        <label>Texte<textarea name="texte" :value="indice.texte" required></textarea></label>
        <br>
        <label>Commentaire<textarea name="commentaire_MJ" :value="indice.commentaire_MJ" required></textarea></label>
        <br>
        <button type="submit">Enregister</button>
    </form>
</template>