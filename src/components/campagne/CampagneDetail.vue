<script setup>
import useCampagneStore from '@/stores/campagne';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()

const store = useCampagneStore()

const etats = ['active', 'disponible', 'brouillon'];

const campagne = computed(() => (store.campagneSpecifique(route.params.idCampagne)));

function modifier({ target }) {
    const { id } = campagne.value
    const nom = target.nom.value
    const statut = target.statut.value
    const description = target.description.value
    const commentaire_MJ = target.commentaire_MJ.value

    store.modifierCampagne(id, nom, statut, description, commentaire_MJ)
    router.push({ name: 'liste-campagne' })
}

</script>

<template>
    <form @submit.prevent="modifier">
        <label>Nom<input name="nom" :value="campagne.nom" type="text" required></label>
        <br>
        <label>Etat
            <select name="statut" :value="campagne.statut" required>
            <option value="" disabled>---</option>
            <option v-for="etat in etats" :value="etat">{{ etat }}</option>
            </select>
        </label>
        <br>
        <label>Description<textarea name="description" :value="campagne.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea name="commentaire_MJ" :value="campagne.commentaire_MJ" required></textarea></label>
        <br>
        <button type="submit">Enregister</button>
    </form>
    <hr>
    <nav>
        <RouterLink :to="{ name: 'liste-chapitre', params: { idCampagne: campagne.id } }">Chapitres</RouterLink>
        |
        <RouterLink :to="{ name: 'liste-contenu', params: { idCampagne: campagne.id } }">Contenu</RouterLink>
        |
        <RouterLink :to="{ name: 'liste-joueur', params: { idCampagne: campagne.id } }">Joueurs</RouterLink>
    </nav>
    <RouterView />
</template>