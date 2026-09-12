<template>
  <span
    class="status-badge"
    :class="statusClass"
  >
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'active'
  }
})

const statusClass = computed(() => {
  return `status-${props.status}`
})

const label = computed(() => {
  const labels = {
    active: 'Actif',
    pending: 'En cours',
    finished: 'Terminé',
    inactive: 'Inactif'
  }

  return labels[props.status] || props.status
})
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

/* Actif */
.status-active {
  background-color: #dcfce7;
  color: #166534;
}

/* En cours */
.status-pending {
  background-color: #fef3c7;
  color: #92400e;
}

/* Terminé */
.status-finished {
  background-color: #e0e7ff;
  color: #3730a3;
}

/* Inactif */
.status-inactive {
  background-color: #e5e7eb;
  color: #374151;
}
</style>