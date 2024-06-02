// src/stores/constants.js
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { constants as lightConstants } from '@/helpers/constants';
import { constantsDark as darkConstants } from '@/helpers/constants_dark';

export const useConstantsStore = defineStore('constants', {
  state: () => ({
    mode: 'LIGHT',
    values: reactive({ ...lightConstants }),
  }),
  actions: {
    toggleMode() {
      this.mode = this.mode === 'LIGHT' ? 'DARK' : 'LIGHT';
      const newConstants = this.mode === 'LIGHT' ? lightConstants : darkConstants;
      Object.assign(this.values, newConstants);
    },
    setMode(mode) {
      this.mode = mode;
      const newConstants = mode === 'LIGHT' ? lightConstants : darkConstants;
      Object.assign(this.values, newConstants);
    }
  }
});
