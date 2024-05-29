import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGlobalsStore = defineStore('globals', {
  state: () => ({
    subPageName: null,
  }),
  actions: {
    updateSubPageName(name) {
      this.subPageName = name;
    }
  }
});
