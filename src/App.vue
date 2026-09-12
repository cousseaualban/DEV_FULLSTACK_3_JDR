<template>
  <div class="app">
    <Navbar />

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
}
</style>