<script setup>
import { computed, ref, watch } from 'vue';
import useCampagneStore from '@/stores/campagne';
import useChapitreStore from '@/stores/chapitre';
import useQueteStore from '@/stores/quete';
import useJoueurStore from '@/stores/joueur';
import useLieuStore from '@/stores/lieu';
import useObjetStore from '@/stores/objet';
import useIndiceStore from '@/stores/indice';
import AppButton from '../AppButton.vue';
import AppCard from '../AppCard.vue';

const campagneStore = useCampagneStore();
const chapitreStore = useChapitreStore();
const queteStore = useQueteStore();
const joueurStore = useJoueurStore();
const lieuStore = useLieuStore();
const objetStore = useObjetStore();
const indiceStore = useIndiceStore();

const campagne = computed(() => campagneStore.campagneActive);

const statutsChapitre = ['inactif', 'actif', 'terminé'];
const statutsQuete = ['inactive', 'active', 'terminée', 'abandonnée'];
const statutsJoueur = ['vivant', 'mort', 'absent', 'inactif'];

const chapitres = computed(() => (
  campagne.value ? chapitreStore.chapitresCampagne(campagne.value.id) : []
));

const quetes = computed(() => {
  if (!campagne.value) {
    return [];
  }

  const idsChapitres = chapitres.value.map(({ id }) => id);

  return queteStore.liste.filter(({ chapitre_id }) => idsChapitres.includes(chapitre_id));
});

const joueurs = computed(() => (
  campagne.value ? joueurStore.joueursCampagne(campagne.value.id) : []
));

const lieux = computed(() => (
  campagne.value ? lieuStore.lieuxCampagne(campagne.value.id) : []
));

const objets = computed(() => (
  campagne.value ? objetStore.objetsCampagne(campagne.value.id) : []
));

const indices = computed(() => (
  campagne.value ? indiceStore.indicesCampagne(campagne.value.id) : []
));

const chapitreSelectionne = ref(null);
const statutChapitre = ref(null);
const chapitrePourQueteSelectionne = ref(null);
const queteSelectionnee = ref(null);
const statutQuete = ref(null);
const joueurSelectionne = ref(null);
const statutJoueur = ref(null);
const joueurDeplacement = ref(null);
const lieuDestination = ref(null);
const objetJoueur = ref(null);
const objetSelectionne = ref(null);
const objetAction = ref(null);
const indiceSelectionne = ref(null);
const indiceAction = ref(null);

const quetesDuChapitreSelectionne = computed(() => {
  if (!chapitrePourQueteSelectionne.value) {
    return [];
  }

  return queteStore.liste.filter(
    ({ chapitre_id }) => chapitre_id === chapitrePourQueteSelectionne.value,
  );
});

watch(chapitres, (liste) => {
  if (!liste.length) {
    chapitreSelectionne.value = null;
    chapitrePourQueteSelectionne.value = null;
    return;
  }

  if (chapitreSelectionne.value && !liste.some(({ id }) => id === chapitreSelectionne.value)) {
    chapitreSelectionne.value = null;
  }

  if (chapitrePourQueteSelectionne.value && !liste.some(({ id }) => id === chapitrePourQueteSelectionne.value)) {
    chapitrePourQueteSelectionne.value = null;
  }
}, { immediate: true });

watch(quetesDuChapitreSelectionne, (liste) => {
  if (!liste.length) {
    queteSelectionnee.value = null;
    statutQuete.value = null;
    return;
  }

  if (queteSelectionnee.value && !liste.some(({ id }) => id === queteSelectionnee.value)) {
    queteSelectionnee.value = null;
  }
}, { immediate: true });

watch(joueurs, (liste) => {
  if (!liste.length) {
    joueurSelectionne.value = null;
    joueurDeplacement.value = null;
    objetJoueur.value = null;
    return;
  }

  if (joueurSelectionne.value && !liste.some(({ id }) => id === joueurSelectionne.value)) {
    joueurSelectionne.value = null;
  }

  if (joueurDeplacement.value && !liste.some(({ id }) => id === joueurDeplacement.value)) {
    joueurDeplacement.value = null;
  }

  if (objetJoueur.value && !liste.some(({ id }) => id === objetJoueur.value)) {
    objetJoueur.value = null;
  }
}, { immediate: true });

watch(lieux, (liste) => {
  if (!liste.length) {
    lieuDestination.value = null;
    return;
  }

  if (lieuDestination.value && !liste.some(({ id }) => id === lieuDestination.value)) {
    lieuDestination.value = null;
  }
}, { immediate: true });

watch(objets, (liste) => {
  if (!liste.length) {
    objetSelectionne.value = null;
    return;
  }

  if (objetSelectionne.value && !liste.some(({ id }) => id === objetSelectionne.value)) {
    objetSelectionne.value = null;
  }
}, { immediate: true });

watch(indices, (liste) => {
  if (!liste.length) {
    indiceSelectionne.value = null;
    return;
  }

  if (indiceSelectionne.value && !liste.some(({ id }) => id === indiceSelectionne.value)) {
    indiceSelectionne.value = null;
  }
}, { immediate: true });

function mettreAJourChapitre() {
  if (!chapitreSelectionne.value) {
    return;
  }

  chapitreStore.changerStatutChapitre(chapitreSelectionne.value, statutChapitre.value);
}

function mettreAJourQuete() {
  if (!queteSelectionnee.value) {
    return;
  }

  queteStore.changerStatutQuete(queteSelectionnee.value, statutQuete.value);
}

function mettreAJourJoueur() {
  if (!joueurSelectionne.value) {
    return;
  }

  joueurStore.changerStatutJoueur(joueurSelectionne.value, statutJoueur.value);
}

function deplacerJoueurManuellement() {
  if (!joueurDeplacement.value || !lieuDestination.value) {
    return;
  }

  joueurStore.deplacerJoueur(joueurDeplacement.value, lieuDestination.value);
}

function gererObjetJoueur() {
  if (!objetJoueur.value || !objetSelectionne.value) {
    return;
  }

  if (objetAction.value === 'donner') {
    joueurStore.donnerObjet(objetJoueur.value, objetSelectionne.value);
    return;
  }

  joueurStore.retirerObjet(objetJoueur.value, objetSelectionne.value);
}

function gererIndicePourTous() {
  if (!campagne.value || !indiceSelectionne.value) {
    return;
  }

  if (indiceAction.value === 'donner') {
    joueurStore.donnerIndiceATous(campagne.value.id, indiceSelectionne.value);
    return;
  }

  joueurStore.retirerIndiceATous(campagne.value.id, indiceSelectionne.value);
}
</script>

<template>
  <div class="campaign-override-page">
    <div v-if="!campagne" class="empty-state">
      <h2>Aucune campagne active</h2>
      <p>Activez une campagne dans la gestion des campagnes pour utiliser cette page.</p>
    </div>

    <div v-else class="admin-grid">
      <AppCard class="panel">
        <h2>État d’un chapitre</h2>

        <label>
          Chapitre
          <select v-model="chapitreSelectionne">
            <option :value="null">---</option>
            <option v-for="chapitre in chapitres" :key="chapitre.id" :value="chapitre.id">
              {{ chapitre.nom }}
            </option>
          </select>
        </label>

        <label>
          Statut
          <select v-model="statutChapitre">
            <option :value="null">Choisir un statut</option>
            <option v-for="etat in statutsChapitre" :key="etat" :value="etat">
              {{ etat }}
            </option>
          </select>
        </label>

        <AppButton @click="mettreAJourChapitre" :disabled="!chapitreSelectionne">
          Mettre à jour
        </AppButton>
      </AppCard>

      <AppCard class="panel">
        <h2>État d’une quête</h2>

        <label>
          Chapitre
          <select v-model="chapitrePourQueteSelectionne">
            <option :value="null">---</option>
            <option v-for="chapitre in chapitres" :key="chapitre.id" :value="chapitre.id">
              {{ chapitre.nom }}
            </option>
          </select>
        </label>

        <label>
          Quête
          <select v-model="queteSelectionnee">
            <option :value="null">---</option>
            <option v-for="quete in quetesDuChapitreSelectionne" :key="quete.id" :value="quete.id">
              {{ quete.nom }}
            </option>
          </select>
        </label>

        <label>
          Statut
          <select v-model="statutQuete">
            <option :value="null">Choisir un statut</option>
            <option v-for="etat in statutsQuete" :key="etat" :value="etat">
              {{ etat }}
            </option>
          </select>
        </label>

        <AppButton @click="mettreAJourQuete" :disabled="!queteSelectionnee">
          Mettre à jour
        </AppButton>
      </AppCard>

      <AppCard class="panel">
        <h2>État d’un joueur</h2>

        <label>
          Joueur
          <select v-model="joueurSelectionne">
            <option :value="null">---</option>
            <option v-for="joueur in joueurs" :key="joueur.id" :value="joueur.id">
              {{ joueur.nom }}
            </option>
          </select>
        </label>

        <label>
          Statut
          <select v-model="statutJoueur">
            <option :value="null">Choisir un statut</option>
            <option v-for="etat in statutsJoueur" :key="etat" :value="etat">
              {{ etat }}
            </option>
          </select>
        </label>

        <AppButton @click="mettreAJourJoueur" :disabled="!joueurSelectionne">
          Mettre à jour
        </AppButton>
      </AppCard>

      <AppCard class="panel">
        <h2>Déplacer un joueur</h2>

        <label>
          Joueur
          <select v-model="joueurDeplacement">
            <option :value="null">---</option>
            <option v-for="joueur in joueurs" :key="joueur.id" :value="joueur.id">
              {{ joueur.nom }}
            </option>
          </select>
        </label>

        <label>
          Nouveau lieu
          <select v-model="lieuDestination">
            <option :value="null">---</option>
            <option v-for="lieu in lieux" :key="lieu.id" :value="lieu.id">
              {{ lieu.nom }}
            </option>
          </select>
        </label>

        <AppButton @click="deplacerJoueurManuellement" :disabled="!joueurDeplacement || !lieuDestination">
          Déplacer
        </AppButton>
      </AppCard>

      <AppCard class="panel">
        <h2>Objet d’un joueur</h2>

        <label>
          Joueur
          <select v-model="objetJoueur">
            <option :value="null">---</option>
            <option v-for="joueur in joueurs" :key="joueur.id" :value="joueur.id">
              {{ joueur.nom }}
            </option>
          </select>
        </label>

        <label>
          Objet
          <select v-model="objetSelectionne">
            <option :value="null">---</option>
            <option v-for="objet in objets" :key="objet.id" :value="objet.id">
              {{ objet.nom }}
            </option>
          </select>
        </label>

        <label>
          Action
          <select v-model="objetAction">
            <option :value="null">Choisir une action</option>
            <option value="donner">Donner</option>
            <option value="reprendre">Reprendre</option>
          </select>
        </label>

        <AppButton @click="gererObjetJoueur" :disabled="!objetJoueur || !objetSelectionne">
          {{ objetAction === 'donner' ? 'Donner' : 'Reprendre' }}
        </AppButton>
      </AppCard>

      <AppCard class="panel">
        <h2>Indice pour tous les joueurs</h2>

        <label>
          Indice
          <select v-model="indiceSelectionne">
            <option :value="null">---</option>
            <option v-for="indice in indices" :key="indice.id" :value="indice.id">
              {{ indice.nom }}
            </option>
          </select>
        </label>

        <label>
          Action
          <select v-model="indiceAction">
            <option :value="null">Choisir une action</option>
            <option value="donner">Donner</option>
            <option value="reprendre">Reprendre</option>
          </select>
        </label>

        <AppButton @click="gererIndicePourTous" :disabled="!indiceSelectionne">
          {{ indiceAction === 'donner' ? 'Distribuer' : 'Retirer' }}
        </AppButton>
      </AppCard>
    </div>
  </div>
</template>

<style scoped>
.campaign-override-page {
  padding: 20px 0;
}

.admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.panel h2 {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: #0f172a;
}

.empty-state {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  color: #475569;
}

.empty-state h2 {
  margin-bottom: 10px;
  color: #0f172a;
}
</style>