
<template>
  <div class="mj-dashboard">

    <PageHeader
      title="👑 Tableau de bord MJ"
      description="Gérez votre campagne et votre aventure."
    />

    <div class="dashboard-grid">

      <AppCard>
        <div class="dashboard-card">
          <div class="icon">📚</div>

          <h2>Campagnes</h2>

          <p>
            Créez et gérez vos campagnes de jeu de rôle.
          </p>

          <AppButton to="/campagne">
            Gérer les campagnes
          </AppButton>
        </div>
      </AppCard>

      <AppCard>
        <div class="dashboard-card">
          <div class="icon">📖</div>

          <h2>Chapitres</h2>

          <p>
            Organisez les chapitres de votre aventure.
          </p>

          <AppButton>
            Gérer les chapitres
          </AppButton>
        </div>
      </AppCard>

      <AppCard>
        <div class="dashboard-card">
          <div class="icon">⚔️</div>

          <h2>Quêtes</h2>

          <p>
            Créez et gérez les quêtes de votre campagne.
          </p>

          <AppButton>
            Gérer les quêtes
          </AppButton>
        </div>
      </AppCard>

      <AppCard>
        <div class="dashboard-card">
          <div class="icon">👥</div>

          <h2>Joueurs</h2>

          <p>
            Consultez et gérez les joueurs de votre campagne.
          </p>

          <AppButton>
            Gérer les joueurs
          </AppButton>
        </div>
      </AppCard>

    </div>

  </div>
</template>

<script setup>
import PageHeader from '../../components/PageHeader.vue'
import AppCard from '../../components/AppCard.vue'
import AppButton from '../../components/AppButton.vue'
</script>

<style scoped>
.mj-dashboard {
  padding: 20px 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.dashboard-card {
  text-align: center;
  padding: 15px;
}

.icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.dashboard-card h2 {
  margin-bottom: 10px;
}

.dashboard-card p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Tablette */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .dashboard-card {
    padding: 18px;
  }
}

/* Téléphone */
@media (max-width: 480px) {
  .mj-dashboard {
    padding: 10px 0;
  }

  .dashboard-grid {
    gap: 15px;
  }

  .dashboard-card {
    padding: 15px;
  }

  .icon {
    font-size: 36px;
  }

  .dashboard-card h2 {
    font-size: 20px;
  }

  .dashboard-card p {
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>