import { ref, computed } from "vue";
import { defineStore } from "pinia";
import useUserStore from "@/admin/stores/user";
import { useClient } from "./client";

export const useGlobalsStore = defineStore('globals', {
  state: () => ({
    pageLoading:false,
    subPageName: null,
  }),
  actions: {
    async bootstrap() {
        this.pageLoading = true
        const response = await useClient().http({method:'get',path:'/bootstrap'})
        this.pageLoading =false
        if(response){
            const userStore = useUserStore()
            userStore.currentUser = response
            userStore.currentAbilities = response.abilities
        }
     
      },
    updateSubPageName(name) {
      this.subPageName = name;
    },
  }
});
