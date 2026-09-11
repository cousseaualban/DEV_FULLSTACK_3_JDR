<template>
  <div class="app-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.app-card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
}
</style>