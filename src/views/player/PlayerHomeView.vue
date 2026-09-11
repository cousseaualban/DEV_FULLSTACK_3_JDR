<template>
  <div class="player-dashboard">

    <PageHeader
      title="🎮 Tableau de bord Joueur"
      description="Suivez votre aventure et votre progression."
    />

    <div class="dashboard-grid">

      <AppCard>
        <div class="dashboard-card">
          <div class="icon">📖</div>

          <h2>Ma progression</h2>

          <p>
            Consultez votre progression dans l'aventure.
          </p>

          <AppButton>
            Voir ma progression
          </AppButton>
        </div>
      </AppCard>

      <AppCard>
        <div class="dashboard-card">
          <div class="icon">⚔️</div>

          <h2>Mes quêtes</h2>

          <p>
            Consultez vos quêtes actives et terminées.
          </p>

          <AppButton>
            Voir mes quêtes
          </AppButton>
        </div>
      </AppCard>

      <AppCard>
        <div class="dashboard-card">
          <div class="icon">🎒</div>

          <h2>Mon inventaire</h2>

          <p>
            Consultez les objets que vous possédez.
          </p>

          <AppButton>
            Voir mon inventaire
          </AppButton>
        </div>
      </AppCard>

      <AppCard>
        <div class="dashboard-card">
          <div class="icon">🗺️</div>

          <h2>Mes lieux</h2>

          <p>
            Consultez les lieux découverts pendant votre aventure.
          </p>

          <AppButton>
            Voir les lieux
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
.player-dashboard {
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
  .player-dashboard {
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