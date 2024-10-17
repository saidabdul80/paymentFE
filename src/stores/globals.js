import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import useUserStore from "@/admin/stores/admin";
import { useClient } from "./client";

export const useGlobalsStore = defineStore('globals', {
  state: () => ({
    pageLoading:false,
    subPageName: null,
    nameRules:ref(),
    currentPageName:{},
    activeTab:null,
    filters: reactive({
      search:null,
      paginate:null,
    }),
    acess_token:null,
    alert: {
      show: false,
      text: '',
      title: '',
      imgpath: null,
      cancelBtnText: '',
      confirmBtnText: '',
      loading: false,
    },
    alertPromiseResolve: null,
    transactions:[],
    loadingTransactions:false,
    balance:0,
    stats:[]
  }),
  actions: {
    async bootstrap() {
        //this.pageLoading = true
        this.getBalance()
        // const response = await useClient().http({method:'get',path:'/bootstrap'})
        // this.pageLoading =false
        // if(response){
        //     const userStore = useUserStore()
        //     userStore.currentUser = response
        //     userStore.currentAbilities = response.abilities
        // }
     
      },
      getZohoToken(){
        const response = useClient().http({method:'post',path:'https://accounts.zoho.com/oauth/v2/token',fullPath:true,data:{
          grant_type: 'client_credentials',
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret:import.meta.env.VITE_SECRETE_ID,
          scope: 'ZohoCRM.modules.ALL'
        },headers:{}})
        this.acess_token = response.data.access_token;
      },
      getContacts(){
        const response = useClient().http({method:'get',path: 'https://www.zohoapis.com/crm/v2/Contacts',fullPath:true,
          headers: {
            'Authorization': `Bearer ${this.access_token}`
          }
        })
        console.log(response,28830000000);
       
      },
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
    setCurrentPageName(item) {
        this.currentPageName = item;
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
    },
    palert({ text, title, cancelBtnText, confirmBtnText,icon=null, loading = false, callback = () => { }, imgpath = null }) {
      return new Promise((resolve) => {
        this.alert = {
          show: true,
          text,
          title,
          imgpath,
          icon,
          cancelBtnText,
          confirmBtnText,
          callback,
          loading,
        };

        this.alertPromiseResolve = { callback, resolve };
      });
    },
    async handleAlertResponse(response) {
      if (this.alertPromiseResolve) {
        if (response) {
          this.alert.loading = true;
          await this.alertPromiseResolve.callback(response)
          this.alert.loading = false;
        }
        setTimeout(() => {
          this.alertPromiseResolve?.resolve(response);
          this.alertPromiseResolve = null;
          this.alert.show = false;
        }, 200)
      }
    },
    objectToFormData(obj, form = new FormData(), namespace = '') {
      for (let property in obj) {
          if (!obj.hasOwnProperty(property) || obj[property] === undefined) continue;
          const formKey = namespace ? `${namespace}[${property}]` : property;
          
          if (obj[property] instanceof Date) {
              form.append(formKey, obj[property].toISOString());
          } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
              this.objectToFormData(obj[property], form, formKey);
          } else {
              form.append(formKey, obj[property]);
          }
      }
      return form;
    },
    async getTrasactions(data = null){
      this.loadingTransactions = true
      const response = await useClient().http({ method: 'get', path: '/transactions/history', data })                
      this.loadingTransactions =false
      if(response){
        this.transactions = response
      }
    },
    async getCustomers(data = null){
      this.loadingTransactions = true
      const response = await useClient().http({ method: 'get', path: '/transactions/customers', data })                
      this.loadingTransactions =false
      if(response){
        this.transactions = response
      }
    },
    async getBalance(){
      const response = await useClient().http({ method: 'get', path: '/transactions/balance' })                
      if(response){
        this.balance = response
      }
    },

    async getBalance(data = null){
      this.loadingStats = true
      const response = await useClient().http({ method: 'get', path: '/transactions/stat', data })                
      if(response){
        this.stats = response
      }
      this.loadingStats = false
    },
    
  }
});
