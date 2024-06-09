import axios from "axios";
import { defineStore } from "pinia";
import { useNotificationStore } from "@/stores/notification";
import { handleError } from "@/helpers/error-handling";
import Ls from "@/services/ls.js";
import { useClient } from "@/stores/client";
import router from "@/router";

export const useCorporateTaxPayerStore = (useWindow = false) => {
  const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;

  return defineStoreFunc({
    id: "corporate",
    state: () => ({
      status: "",
      taxpayersLoading:true,
      taxpayers:{},
      corporateTaxPayerData: {
        rcNumber: "",
        businessName: "",
        sector: "",
        companyPhoneNumber: "",
        companyEmail: "",
        address_line_one: "",
        address_line_two: "",
        townDistrict: "",
        lga: "",
        zipCode: "",
        cac_certificate: "",
      },
    }),

    actions: {
      async fetchTaxPayers(params=null,path=null) {
          this.taxpayersLoading = true
          const response = await useClient().http({ method: 'get', path:path || '/corporate_tax_payers',data:params||{},fullPath: path?true:false })
          this.taxpayersLoading = false                
          if(response){
            this.taxpayers = response;
          }
      },
      async createCorporateTaxPayer(data) {
        console.log(data);
        // const response = await useClient().http({ method: 'post', path: '/staffs/login', data })
        // if (response) {
        //     Ls.set('auth.token', response.token)
        //     this.loginData.username = ''
        //     this.loginData.password = ''
        const notificationStore = useNotificationStore();
        notificationStore.showNotification({
          type: "success",
          message: "Registration Successfully.",
        });
        //     router.push('/admin/dashboard')
        // }
      },
    },
  })();
};
