<template>
    <div class="tw-flex tw-h-full tw-w-full tw-bg-gray-100">
     
        <v-layout class="rounded rounded-md">
            <SideBar :drawer="drawer" :rail="drawer" />
            <v-app-bar flat color="succes">
                <v-app-bar-nav-icon variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <template v-if="$vuetify.display.mdAndUp">

                    <v-switch
                        v-model="mode"
                        :label="`${mode}`"
                        false-value="DARK"
                        true-value="LIGHT"
                        hide-details
                    ></v-switch>

                </template>

                <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
            </v-app-bar>
            <v-main style="height:100vh;">
                <v-breadcrumbs :items="items" >
                    <template v-slot:divider color="red">
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
                    <template  v-slot:title="item">
                        <span  style="text-transform: capitalize;">{{item.item.title.toLowerCase().replaceAll('-',' ')}}</span>
                    </template>
                </v-breadcrumbs>
                <RouterView></RouterView>
            </v-main>
        </v-layout>
    </div>

</template>



<script>
import { RouterLink, RouterView } from "vue-router";
import useUserStore from '@/admin/stores/user';
import SideBar from "@/components/sidebar/sidebar.vue"
import { useNotificationStore } from '@/stores/notification';
import { useGlobalsStore } from "@/stores/globals";
import { storeToRefs } from "pinia";

export default {
    components: {
        RouterView,
        SideBar
    },
    data() {
        return {
            items:[],
            globals:useGlobalsStore(),
            userNavigation:[
                { name: 'Your profile', href: '#' },
                { name: 'Sign out', href: '#' },
            ],
            drawer:true,
            userStore: useUserStore(),
            mode: 'LIGHT',
        }
    },
    watch:{
        'globals.subPageName': function(n,o){
            this.items[1].title = n
        },
        '$route.name': function(n,o){
            this.items[0].title = n
        }
    },
    created(){
     
        this.items = [
                {
                    title: this.$route.name.replaceAll('-',''),
                    disabled: false,
                    href: '#',
                    class: 'tw-text-gray-500 tw-font-bold'
                },
                {
                    title: '',
                    disabled: false,
                    href: '#',
                    class: 'tw-text-green-700 tw-font-bold'
                }
            ]

    },
    methods: {
        showNo() {
            alert()
            const notificationStore = useNotificationStore();
            notificationStore.showNotification({
                type: 'success',
                message: 'Notification triggered!',
            })
        },
        async created() {
            await this.userStore.fetchUserPermissions();
        },

    }
}
</script>
<style scoped></style>
