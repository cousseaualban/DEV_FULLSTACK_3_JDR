<!-- Fait par IA-->

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Array,
        default: () => []
    },
    elements: {
        type: Array,
        required: true
    }
})

const ouvert = ref(false)
const selection = ref([...props.value])

function estSelectionne(element) {
    return selection.value.some(
        selectionne => selectionne.id === element.id
    )
}

function selectionner(element) {
    if (estSelectionne(element)) {
        selection.value = selection.value.filter(
            selectionne => selectionne.id !== element.id
        )
    } else {
        selection.value.push(element)
    }
}

// Valeur qui sera envoyée par le formulaire
const valeurFormulaire = computed(() => {
    return JSON.stringify(selection.value)
})
</script>

<template>
    <div class="selecteur">

        <!-- Permet à target[name].value de fonctionner -->
        <input
            type="hidden"
            :name="name"
            :value="valeurFormulaire"
        >

        <button
            type="button"
            @click="ouvert = !ouvert"
        >
            Sélectionner des éléments ▼
        </button>

        <div v-if="ouvert" class="liste">
            <label
                v-for="element in elements"
                :key="element.id"
            >
                <input
                    type="checkbox"
                    :checked="estSelectionne(element)"
                    @change="selectionner(element)"
                >

                {{ element.nom }}
            </label>
        </div>

    </div>
</template>

<style scoped>
.selecteur {
    position: relative;
    width: 300px;
}

.selecteur > button {
    width: 100%;
    padding: 8px;
}

.liste {
    position: absolute;
    width: 100%;
    background: white;
    border: 1px solid #ccc;
    padding: 8px;
    z-index: 10;
}

.liste label {
    display: block;
    padding: 5px;
    cursor: pointer;
}

.liste label:hover {
    background: #eee;
}
</style>
