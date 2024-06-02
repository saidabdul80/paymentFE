import { ref, computed } from "vue";
import { defineStore } from "pinia";
import useUserStore from "@/admin/stores/user";
import { useClient } from "./client";

export const useGlobalsStore = defineStore('globals', {
  state: () => ({
    pageLoading:false,
    subPageName: null,
    nameRules:ref(),
  }),
  actions: {
    /* async bootstrap() {
        this.pageLoading = true
        const response = await useClient().http({method:'get',path:'/bootstrap'})
        this.pageLoading =false
        if(response){
            const userStore = useUserStore()
            userStore.currentUser = response
            userStore.currentAbilities = response.abilities
        }
     
      }, */
      async bootstrap(background_process = false) {
        const handleResponse = (response) => {
          if (response) {
            const userStore = useUserStore();
            userStore.currentUser = response;
            userStore.currentAbilities = response.abilities;
            this.pageLoading = false;
          }
        };
      
        if (background_process) {
          useClient().http({ method: 'get', path: '/bootstrap' })
            .then(handleResponse);
        } else {
          this.pageLoading = true;
          const response = await useClient().http({ method: 'get', path: '/bootstrap' });
          handleResponse(response);
        }
      },
    updateSubPageName(name) {
      this.subPageName = name;
    },
    updateNameRules(nameRules) {
        this.nameRules = nameRules;
    },
    toCurrency(amount, symbol = true) {
      if (amount == null || isNaN(amount)) {
        return '₦0';
      }
    
      let formattedAmount;
      if (amount >= 1000000) {
        formattedAmount = (amount / 1000000).toFixed(1) + 'M';
      } else if (amount >= 100000) {
        formattedAmount = (amount / 1000).toFixed(1) + 'K';
      } else {
        formattedAmount = amount.toLocaleString('en-NG', {
          style: 'currency',
          currency: 'NGN'
        });
      }
    
      if (symbol) {
        if (typeof formattedAmount === 'string' && !formattedAmount.startsWith('₦')) {
          formattedAmount = '₦' + formattedAmount;
        }
      } else {
        formattedAmount = formattedAmount.replace(/₦/g, '').replace('.00','');
      }
    
      if (amount >= 1000000) {
        formattedAmount += '+';
      } else if (amount >= 100000) {
        formattedAmount += '+';
      }
    
      return formattedAmount;
    }
    
    
  }
});
