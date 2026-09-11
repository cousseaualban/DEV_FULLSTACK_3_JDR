<template>
  <div class="home">

    <PageHeader
      title="🎲 JDR - Gestion de campagne"
      description="Gérez votre aventure et suivez votre progression."
    />

    <div class="welcome">
      <AppCard>
        <div class="role-card">
          <div class="icon">👑</div>

          <h2>Espace MJ</h2>

          <p>
            Gérez vos campagnes, vos chapitres, vos quêtes
            et vos joueurs.
          </p>

          <AppButton to="/mj">
            Accéder à l'espace MJ
          </AppButton>
        </div>
      </AppCard>

      <AppCard>
        <div class="role-card">
          <div class="icon">🎮</div>

          <h2>Espace Joueur</h2>

          <p>
            Suivez votre aventure, vos quêtes, vos objets
            et votre progression.
          </p>

          <AppButton to="/player">
            Accéder à l'espace Joueur
          </AppButton>
        </div>
      </AppCard>
    </div>

  </div>
</template>

<script setup>
import PageHeader from '../components/PageHeader.vue'
import AppCard from '../components/AppCard.vue'
import AppButton from '../components/AppButton.vue'
</script>

<style scoped>
.home {
  padding: 20px 0;
}

.welcome {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.role-card {
  text-align: center;
  padding: 20px;
}

.icon {
  font-size: 45px;
  margin-bottom: 10px;
}

.role-card h2 {
  margin-bottom: 10px;
}

.role-card p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Tablette */
@media (max-width: 768px) {
  .welcome {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .role-card {
    padding: 18px;
  }
}

/* Téléphone */
@media (max-width: 480px) {
  .home {
    padding: 10px 0;
  }

  .welcome {
    gap: 15px;
  }

  .role-card {
    padding: 15px;
  }

  .icon {
    font-size: 38px;
  }

  .role-card h2 {
    font-size: 20px;
  }

  .role-card p {
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>