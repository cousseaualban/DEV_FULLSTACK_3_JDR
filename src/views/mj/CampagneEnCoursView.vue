<script setup>
import useCampagneStore from '@/stores/campagne';
import { computed } from 'vue';

const store = useCampagneStore()

const campagne = computed(() => (store.campagneActive));

</script>

<template>
    <h1>Campagne en cours</h1>
    <RouterView />
</template>