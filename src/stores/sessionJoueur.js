import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import useJoueurStore from "./joueur";


const useSessionJoueurStore = defineStore("sessionJoueur", () => {
 
  // Clé utilisée pour conserver le joueur sélectionné.
  const LOCALSTORAGEKEY = "session_joueur_courant";

  const joueurStore = useJoueurStore();

  // - State
  const joueurCourantId = ref(localStorage.getItem(LOCALSTORAGEKEY));

  // - Getter
  const joueurCourant = computed(() => {
    if (!joueurCourantId.value) {
      return undefined;
    }

    return joueurStore.joueurSpecifique(joueurCourantId.value);
  });

  // - Actions
  function selectionnerJoueur(id) {
    const joueur = joueurStore.joueurSpecifique(id);

    if (!joueur) {
      return false;
    }

    joueurCourantId.value = id;
    return true;
  }

  function deselectionnerJoueur() {
    joueurCourantId.value = null;
  }

  // - Persistance
  watch(joueurCourantId, (nouvelId) => {
    if (nouvelId) {
      localStorage.setItem(LOCALSTORAGEKEY, nouvelId);
    } else {
      localStorage.removeItem(LOCALSTORAGEKEY);
    }
  });

  // - Expose
  return {
    joueurCourantId,
    joueurCourant,
    selectionnerJoueur,
    deselectionnerJoueur,
  };
});

export default useSessionJoueurStore;
