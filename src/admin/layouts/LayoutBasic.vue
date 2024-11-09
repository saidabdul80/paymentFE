<template>
    <div class="`tw-flex  tw-p-0 tw-w-full`" :class="`tw-bg-[${$constants.light}]`">
        <v-layout class="rounded rounded-md" :color="`${$constants.light}`"  >
            <SideBar v-model="drawer" />
            <v-app-bar flat :color="$constants.light" class="tw-shadow-none tw-border-b tw-py-4">                                            
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title class="">
                    <div>
                        <p class="tw-text-xl tw-mb-2">
                            Welcome {{ ls.get('auth.user')?.first_name }} 👋
                        </p>
                    </div>
                </v-toolbar-title>
                
                <v-spacer></v-spacer>
                <div id="topbar-right"></div>
                <!-- <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
            </v-app-bar>            
            <v-main style="min-height:100vh;" class="tw-bg-gray-100/70">
                <BreadCrumbs />
            <div class="tw-px-[18px] tw-pt-[36px] tw-mt-2 ">
                <RouterView v-slot="{ Component }">
                    <transition name="scale">
                        <component :is="Component" />
                    </transition>
                </RouterView>
            </div>
            </v-main>
        </v-layout>
    </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import useUserStore from '@/admin/stores/admin';
import SideBar from "@/components/sidebar/AdminSidebar.vue"
import { useNotificationStore } from '@/stores/notification';
import { useGlobalsStore } from "@/stores/globals";
import ls from "@/services/ls";
import { useConstantsStore } from '@/stores/constants';
import BreadCrumbs  from '@/components/BreadCrumbs.vue' 
import useAdminStore from "@/admin/stores/admin";
import Select from "primevue/select";
import { root } from "postcss";
export default {
    components: {
        RouterView,
        SideBar,
        BreadCrumbs,
        Select,
    },
    data() {
        return {
            ls:ls,
            cs:{},
            items: [],
            globals: useGlobalsStore(),
            userNavigation: [
                { name: 'Your profile', href: '#' },
                { name: 'Sign out', href: '#' },
            ],
            drawer: false,
            userStore: useUserStore(),
            constantsStore: useConstantsStore(),
            adminStore: useAdminStore(),
            loading:false
        }
    },
    watch: {
        'adminStore.account.currency':{
            handler(newValue){
               
                this.cs = this.adminStore.account
            },
            deep:true
        },
        'globals.subPageName': function (n, o) {
            /*   this.items[1] =
              {
                  title: n.name,
                  href: n.href
              } */
        },
        'globals.currentPageName': function (newPage, oldPage) {
            if (!this.items.some(item => item.title === newPage.name)) {
                this.items.push({
                    title: newPage.name,
                    to: newPage.href
                });
            }
        }
    },
    computed: {
        mode() {
            return this.constantsStore.mode;
        },
        constantsStore() {
            return useConstantsStore();
        }
    },
    created() {
        const savedMode = ls.get('mode');
        if (savedMode) {
            this.constantsStore.setMode(savedMode);
        }
        
    },
    computed: {
     
    },
    methods: {
        makeRequest(){
          
            this.adminStore.showAlert({
                title:'Top Up Request',
                text: 'You are about to request for top up on '+ this.cs,
                cancelBtnText:'Cancel',
                confirmBtnText:'Proceed',
                callback: async()=>{
                    this.loading = true;
                    this.adminStore.requestTopUp(this.cs.id)
                    this.loading = false;
                }
            })
        },
        toggleMode() {
            this.constantsStore.toggleMode();
            ls.set('mode', this.constantsStore.mode);
        },
        showNo() {
            const notificationStore = useNotificationStore();
            notificationStore.showNotification({
                type: 'success',
                message: 'Notification triggered!',
            });
        },
        async created() {
            await this.userStore.fetchUserPermissions();
        },
    }
}

</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
    transition: .4s;
}

.slide-enter {
    transform: translate(-100%, 0);
}

.slide-leave-to {
    transform: translate(100%, 0);
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease;
}

.scale-enter-from {
    opacity: 0;
    transform: scale(0);
}

.scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
