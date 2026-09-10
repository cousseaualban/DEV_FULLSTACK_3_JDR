<script setup>
import ChapitreListe from '../chapitre/ChapitreListe.vue';
import ChapitreModalAjout from '../chapitre/ChapitreModalAjout.vue';
import Modal from '../Modal.vue';

const props = defineProps({
    chapitres: {
        type: Array,
        required: true
    }
})

function ajouter(chapitre) {
    props.chapitres.push({
        ...chapitre,
        id: crypto.randomUUID()
    })
}

</script>

<template>
    <Modal ref="modal">

        <template #button>
        Orga chapitre
        </template>

        <h2>Organisation Chapitre</h2>


        <ChapitreModalAjout @sauvegarde="ajouter"/>

        <ChapitreListe :chapitres="props.chapitres"/>
    </Modal>
</template>