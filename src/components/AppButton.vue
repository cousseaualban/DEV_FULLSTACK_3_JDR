<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="app-button"
    :class="variant"
  >
    <slot></slot>
  </RouterLink>

  <button
    v-else
    class="app-button"
    :class="variant"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },

  to: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.app-button {
  display: inline-block;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  text-decoration: none;
}

.primary {
  background-color: #1e293b;
  color: white;
}

.primary:hover {
  background-color: #334155;
}

.secondary {
  background-color: #e2e8f0;
  color: #1e293b;
}

.secondary:hover {
  background-color: #cbd5e1;
}

.danger {
  background-color: #dc2626;
  color: white;
}

.danger:hover {
  background-color: #b91c1c;
}
</style>