<script setup>
import CampagneModalModification from './CampagneModalModification.vue';


const props = defineProps({
    campagnes: {
        type: Array,
        required: true
    }
})

function supprimer(id) {
    const campagneIndex = props.campagnes.findIndex(({ id: fId }) => (fId === id));

    props.campagnes.splice(campagneIndex, 1)
}

function dupliquer(campagne) {
    props.campagnes.push({
        ...campagne,
        id: crypto.randomUUID()
    })
}

function modifier(campagne) {
    const index = props.campagnes.findIndex(c => c.id === campagne.id)

    props.campagnes[index] = campagne
}

</script>

<template>
    <table border="1">
        <thead>
            <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Etat</th>
                <th>Description</th>
                <th>Commentaire</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="campagne in props.campagnes">
                <td>{{ campagne.id }}</td>
                <td>{{ campagne.nom }}</td>
                <td>{{ campagne.etat }}</td>
                <td>{{ campagne.description }}</td>
                <td>{{ campagne.commentaire }}</td>
                <td>
                    <button type="button" @click="supprimer(campagne.id)">Supprimer</button>
                    <button type="button" @click="dupliquer(campagne)">Dupliquer</button>
                    <CampagneModalModification @modifier="modifier" :campagne></CampagneModalModification>
                </td>
            </tr>
        </tbody>
    </table>
</template>