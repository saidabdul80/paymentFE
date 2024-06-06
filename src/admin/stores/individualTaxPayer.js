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
        contactHouseNumber: "",
        contactStreetName: "",
        contactAreaLandmark: "",
        contactTownDistrict: "",
        contactLga: "",
        contactZipCode: "",

        businessOccupation: "",
        businessEmploymentStatus: "",
        businessEmployerName: "",
        businessOfficeNumber: "",
        businessStreetName: "",
        businessAreaLandmark: "",
        businessTownDistrict: "",
        businessState: "",
        businessLga: "",
        businessCountry: "",
        businessZipCode: "",
      },
    }),

    actions: {
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
