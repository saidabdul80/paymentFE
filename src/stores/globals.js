import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import useUserStore from "@/admin/stores/admin";
import { useClient } from "./client";
import ls from "@/services/ls";

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
    error:'',
    stats:[],
    clients:[],
    loadingClient:false,
    client:{}
  }),
  actions: {
    async bootstrap() {
        //this.pageLoading = true
       
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
      routeTo(prefix) {
        if (!prefix.includes('login')) {
          router.push({ path: `/login`, replace: true })
          return true;
        }
        return false;
      },
      setPrefix() {
        window.prefix = '';
        const authPrefix = ls.get('auth.prefix');
        if (authPrefix) {
          window.prefix = `/${authPrefix}`;
          window.userRoot = ls.get('auth.user_type');;
        }
      },
      async logout(root = false) {
        try {
          localStorage.clear();
  
          if (root) {
            if (!this.routeTo(root)) { return; }
          } else {
            //const token = ls.get('auth.token');
            let prefix = window.prefix || ''; // Initialize prefix
            if (prefix.includes('null')) {
              prefix = '-'; // Handle 'null' case
            }
  
            prefix = prefix === '-' ? 'admin' : prefix; // Default to 'admin' if prefix is empty
            prefix = prefix ==''?'app':prefix
            this.routeTo(prefix)
            // if (token) {
            //  // ls.clear();
  
            // } else {
            //   this.routeTo(prefix)
            // }
          }
          if(!window.isActive401){ //controlling popups, set to true on notification timeout
            const notificationStore = useNotificationStore();
            notificationStore.showNotification({
              type: 'success',
              message: 'Logged out successfully.',
            });
          }
        } catch (err) {
          console.log(err)
          const notificationStore = useNotificationStore();
          notificationStore.showNotification({
            type: 'error',
            message: 'An error occurred while logging out.',
          });
        }
      },
      getContacts(){
        const response = useClient().http({method:'get',path: 'https://www.zohoapis.com/crm/v2/Contacts',fullPath:true,
          headers: {
            'Authorization': `Bearer ${this.access_token}`
          }
        })
       // console.log(response,28830000000);
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
    toCurrency(amount, symbol = true, shorten = true) {
      if (amount == null || isNaN(amount)) {
        return symbol ? '₦0' : '0';
      }

      let formattedAmount;
      const currencySymbol = '₦';
      amount = Number(amount)
      if (shorten && amount >= 1000000) {
        formattedAmount = (amount / 1000000).toFixed(1) + 'M';
      } else if (shorten && amount >= 100000) {
        formattedAmount = (amount / 1000).toFixed(1) + 'K';
      } else {
        formattedAmount = amount.toFixed(0);
        formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

      if (symbol) {
        formattedAmount = `${currencySymbol}${formattedAmount}`;
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
    async getTrasactions(data = null,path=null){
      this.loadingTransactions = true
      const response = await useClient().http({ method: 'get', path:path?path:'transactions/history', data, fullPath:path?true:false })                
      this.loadingTransactions =false
      if(response){
        this.transactions = response
      }
    },
    async getTrasactionsForAdmin(data = null,path=null){
      this.loadingTransactions = true
      const response = await useClient().http({ method: 'get', path:path?path:'admin/transactions', data, fullPath:path?true:false })                
      this.loadingTransactions =false
      if(response){
        this.transactions = response
      }
    },
    async getCustomers(data = null, path=null){
      this.loadingTransactions = true
      const response = await useClient().http({ method: 'get', path: path?path:'transactions/customers', data, fullPath:path?true:false})                
      this.loadingTransactions =false
      if(response){
        this.transactions = response
      }
    },
    async getCustomersForAdmin(data = null, path=null){
      this.loadingTransactions = true
      const response = await useClient().http({ method: 'get', path: path?path:'admin/customers', data, fullPath:path?true:false})                
      this.loadingTransactions =false
      if(response){
        this.transactions = response
      }
    },
    async getClientsForAdmin(data = null, path=null){
      this.loadingTransactions = true
      const response = await useClient().http({ method: 'get', path: path?path:'admin/clients', data, fullPath:path?true:false})                
      this.loadingTransactions =false
      if(response){
        this.clients = response
      }
    },
    async getBalance(id =null, d=null){

      let prefix = 'admin/'
      if(id == null){
        prefix = ''
      }
      const [response, response2] = await Promise.all([
            useClient().http({ method: 'get', path: prefix+ 'transactions/count-stats', data:{client_id:id} }),
            useClient().http({ method: 'get', path: prefix+'transactions/balance', data:{client_id:id}  })
      ])

      if(response){
        this.balance = {
              ...response2,
            }


        if(id != null && id != ''){
          this.balance['Total Credit'] = response.credit_transactions.total_amount;
          this.balance['Total Debit'] = response.debit_transactions.total_amount;
        }else{
          this.balance['Total Fees'] = response.fee_count.total_amount;
        }
        if(d != null){
         this.balance['Total Credit'] = response.credit_transactions.total_amount;
          this.balance['Total Debit'] = response.debit_transactions.total_amount;
        }
        if(this.client?.client?.company_name && id != null){
          this.balance.ledger_balance = this.client?.balance?.ledger_balance || 0
          this.balance.available_balance = this.client?.balance?.available_balance || 0
        }
      }
    },

    async getClient(id){
      this.loadingClient = true
      const response = await useClient().http({ method: 'get', path: 'admin/clients/'+id, data:{} })                
      if(response){
        this.client = response || {}
      }
      this.loadingClient = false
    },
    
  }
});
