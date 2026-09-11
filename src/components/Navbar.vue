<template>
  <nav class="navbar">

    <div class="navbar-logo">
      🎲 JDR
    </div>

    <!-- Bouton burger -->
    <button
      class="menu-button"
      @click="menuOpen = !menuOpen"
      aria-label="Ouvrir le menu"
    >
      ☰
    </button>

    <!-- Navigation -->
    <div
      class="navbar-links"
      :class="{ 'menu-open': menuOpen }"
    >
      <RouterLink to="/" @click="menuOpen = false">
        Accueil
      </RouterLink>

      <RouterLink to="/mj" @click="menuOpen = false">
        Interface MJ
      </RouterLink>

      <RouterLink to="/player" @click="menuOpen = false">
        Interface Joueur
      </RouterLink>
    </div>

  </nav>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 30px;
  background-color: #1e293b;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.navbar-logo {
  font-size: 22px;
  font-weight: bold;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.navbar-links a:hover {
  background-color: #334155;
}

.navbar-links a.router-link-active {
  font-weight: bold;
  background-color: #475569;
}

/* Bouton burger caché sur ordinateur */
.menu-button {
  display: none;
  border: none;
  background: transparent;
  color: white;
  font-size: 28px;
  cursor: pointer;
}

/* Tablette */
@media (max-width: 768px) {
  .navbar {
    padding: 15px 20px;
  }

  .navbar-links {
    gap: 10px;
  }

  .navbar-links a {
    padding: 7px 9px;
    font-size: 14px;
  }
}

/* Téléphone */
@media (max-width: 600px) {
  .navbar {
    position: relative;
    padding: 15px 20px;
  }

  .menu-button {
    display: block;
  }

  .navbar-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;

    flex-direction: column;
    align-items: stretch;
    gap: 5px;

    padding: 12px 20px;

    background-color: #1e293b;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);

    z-index: 1000;
  }

  .navbar-links.menu-open {
    display: flex;
  }

  .navbar-links a {
    padding: 12px 15px;
    border-radius: 8px;
  }

  .navbar-links a:hover,
  .navbar-links a.router-link-active {
    background-color: #334155;
  }
}
</style>