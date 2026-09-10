<script setup>
import { ref } from 'vue'

const ouverte = ref(false)
const emit = defineEmits(['ouvrir'])

function ouvrir() {
  ouverte.value = true
  emit('ouvrir')
}

function fermer() {
  ouverte.value = false
}

defineExpose({
    fermer
})

</script>

<template>
  <button @click="ouvrir">
    <slot name="button">Ouvrir</slot>
  </button>

  <div v-if="ouverte" class="overlay">
    <div class="modal">
      <button class="close" @click="fermer">
        X
      </button>

      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  min-width: 400px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>