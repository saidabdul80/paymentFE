import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { handleError } from '@/helpers/error-handling';
import ls from "@/services/ls";
import { useGlobalsStore } from "./globals";
import router from "@/router";

export const useClient = defineStore("client", () => {


  async function http(config={method:'get',path:'',data: {},fullPath :false, headers:false})  {
    const token = ls.get("auth.token");
    let url =window.baseUrl+ config?.path;

    if (config?.fullPath) {
      url = config?.path;
    }

    if (config.method.toLowerCase() === 'get' && Object.keys(config.data|| {}).length > 0) {
      const cleanedData = Object.fromEntries(
        Object.entries(config.data).filter(([key, value]) => value !== null && value !== undefined && value !== '')
      );
      
      const urlParams = new URLSearchParams(cleanedData).toString();
      if(config.fullPath){
        url += '&' + urlParams;
      }else{
        url += '?' + urlParams;
      }
    }
    
    const headers = {
        Authorization: token ? `Bearer ${token}` : "",
        "ngrok-skip-browser-warning":true,
    };
    

    if (config?.data instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
    }

    try {
      const response = await axios({
        method: config?.method,
        url: url,
        data:config?.data,
        headers:config?.headers?config?.headers : headers,
      });
      if(response.data?.data){
        return response.data.data;
      }
      return response.data;
    } catch (error) {      
      handleError(error);

      if (error?.response?.status == 401) {
      
        if(window?.isActive401){ //controlling popups, set to true on notification timeout
          return;
        }
        const route = window.currentRoute;

        if (route?.meta?.requiresAuth) {
        
          let userRootPath = '';
          /* console.log(useRoute()) */
          userRootPath = route.matched[0]?.path?.replace('/', '') || '';
          useGlobalsStore().logout(userRootPath)
          /* if(userRootPath != ''){
          }else{
            router.push({ path: `/` }); // Redirect to login or home page
          } */
         window.isActive401 = true //controlling popups, set to true on notification timeout
        }
        
      }
      return false
    }
  }

  return {  http };
});
