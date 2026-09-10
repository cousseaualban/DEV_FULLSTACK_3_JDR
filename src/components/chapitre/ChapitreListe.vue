<script setup>
import ChapitreModalModification from './ChapitreModalModification.vue';


const props = defineProps({
    chapitres: {
        type: Array,
        required: true
    }
})

function supprimer(id) {
    const chapitreIndex = props.chapitres.findIndex(({ id: fId }) => (fId === id));

    props.chapitres.splice(chapitreIndex, 1)
}

function dupliquer(chapitre) {
    props.chapitres.push({
        ...chapitre,
        id: crypto.randomUUID()
    })
}

function modifier(chapitre) {
    const index = props.chapitres.findIndex(c => c.id === chapitre.id)

    props.chapitres[index] = chapitre
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
                <th>MDP Activation</th>
                <th>MDP Résolution</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="chapitre in props.chapitres">
                <td>{{ chapitre.id }}</td>
                <td>{{ chapitre.nom }}</td>
                <td>{{ chapitre.etat }}</td>
                <td>{{ chapitre.description }}</td>
                <td>{{ chapitre.commentaire }}</td>
                <td>{{ chapitre.mdpAct }}</td>
                <td>{{ chapitre.mdpRes }}</td>
                <td>
                    <button type="button" @click="supprimer(chapitre.id)">Supprimer</button>
                    <button type="button" @click="dupliquer(chapitre)">Dupliquer</button>
                    <ChapitreModalModification :chapitre @modifier="modifier"/>
                </td>
            </tr>
        </tbody>
    </table>
</template>