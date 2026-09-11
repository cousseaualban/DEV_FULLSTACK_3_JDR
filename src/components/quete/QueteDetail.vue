<script setup>
import useIndiceStore from '@/stores/indice';
import useLieuStore from '@/stores/lieu';
import useObjetStore from '@/stores/objet';
import useQueteStore from '@/stores/quete';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SelecteurMultiple from '../SelecteurMultiple.vue';

const router = useRouter();
const route = useRoute()

const store = useQueteStore()
const storeLieu = useLieuStore()
const storeObjet = useObjetStore()
const storeIndice = useIndiceStore()

const etats = ['inactive', 'active', 'terminée', 'abandonnée'];

const lieux = computed(() => (storeLieu.lieuxCampagne(route.params.idCampagne)))
const listeObjets = computed(() => (storeObjet.objetsCampagne(route.params.idCampagne)))
const listeIndices = computed(() => (storeIndice.indicesCampagne(route.params.idCampagne)))
const quete = computed(() => (store.queteSpecifique(route.params.idQuete)));

function modifier({ target }) {
    const { id, chapitre_id } = quete.value
    const nom = target.nom.value
    const description = target.description.value
    const commentaire_MJ = target.commentaire_MJ.value
    const lieu_id = target.lieu_id.value
    const mdp_activation = target.mdp_activation.value
    const mdp_resolution = target.mdp_resolution.value
    const recompenses_objets = JSON.parse(target.recompenses_objets.value)
    const recompenses_indices = JSON.parse(target.recompenses_indices.value)
    const statut = target.statut.value

    store.modifierQuete(
        id,
        chapitre_id,
        lieu_id,
        nom,
        description,
        commentaire_MJ,
        mdp_activation,
        mdp_resolution,
        recompenses_objets,
        recompenses_indices
    )
    store.changerStatutQuete(id, statut)
    router.push({ name: 'liste-quete', params: { idCampagne: route.params.idCampagne, idChapitre: route.params.idChapitre } })
}

</script>

<template>
    <form @submit.prevent="modifier">
        <label>Nom<input name="nom" :value="quete.nom" type="text" required></label>
        <br>
        <label>Statut
            <select name="statut" :value="quete.statut" required>
            <option value="" disabled>---</option>
            <option v-for="etat in etats" :value="etat">{{ etat }}</option>
            </select>
        </label>
        <br>
        <label>Lieu
            <select name="lieu_id" :value="quete.lieu_id">
                <option value="">---</option>
                <option v-for="lieu in lieux" :value="lieu.id">{{ lieu.nom }}</option>
            </select>
        </label>
        <br>
        <label>Description<textarea name="description" :value="quete.description" required></textarea></label>
        <br>
        <label>Commentaire<textarea name="commentaire_MJ" :value="quete.commentaire_MJ" required></textarea></label>
        <br>
        <label>MDP Activation<input name="mdp_activation" :value="quete.mdp_activation" type="password"></label>
        <br>
        <label>MDP Résolution<input name="mdp_resolution" :value="quete.mdp_resolution" type="password" required></label>
        <br>
        <label>Recompenses Objets
            <SelecteurMultiple name="recompenses_objets" :value="quete.recompenses_objets" :elements="listeObjets"/>
        </label>
        <br>
        <label>Recompenses Indices
            <SelecteurMultiple name="recompenses_indices" :value="quete.recompenses_indices" :elements="listeIndices"/>
        </label>
        <br>
        <button type="submit">Enregister</button>
    </form>
</template>