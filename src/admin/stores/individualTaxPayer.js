import axios from "axios";
import { defineStore } from "pinia";
import { useNotificationStore } from "@/stores/notification";
import { handleError } from "@/helpers/error-handling";
import Ls from "@/services/ls.js";
import { useClient } from "@/stores/client";
import router from "@/router";

export const useIndividualTaxPayerStore = (useWindow = false) => {
  const defineStoreFunc = useWindow ? window.pinia.defineStore : defineStore;

  return defineStoreFunc({
    id: "individual",
    state: () => ({
      status: "",
      taxpayersLoading:true,
      taxpayers:{},
      individualTaxPayerData: {
        means_of_verification: "",
        verification_number: "",
        verification_document: "",
        personalFirstName: "",
        personalMiddleName: "",
        personalLastName: "",
        personalTitle: "",
        personalGender: "",
        personalDateofBirth: "",
        personalNationality: "",
        personalStateofOrigin: "",
        personalLga: "",

        contactPhoneNumber: "",
        contactEmailAddress: "",
        contact_address_line_one: "",
        contact_address_line_two: "",
        contactTownDistrict: "",
        contactLga: "",
        contactZipCode: "",

        businessOccupation: "",
        businessEmploymentStatus: "",
        businessEmployerName: "",
        business_address_line_one: "",
        business_address_line_two: "",
        businessCountry: "",
        businessState: "",
        businessZipCode: "",
      },
    }),

    actions: {
      async fetchTaxPayers(params=null,path=null) {
        this.taxpayersLoading = true
        const response = await useClient().http({ method: 'get', path:path || '/individual_tax_payers',data:params||{},fullPath: path?true:false })
        this.taxpayersLoading = false                
        if(response){
          this.taxpayers = response;
        }
      },
      async createIndividualTaxPayer(data) {
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
