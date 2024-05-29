<template>
    <div class="tw-flex tw-h-full tw-w-full tw-bg-gray-100">
        <div class="tw-fixed tw-right-0 tw-top-0">
            <NotificationRoot />
        </div>
        <v-layout class="rounded rounded-md">
            <SideBar :drawer="drawer" :rail="drawer" />
            <v-app-bar flat color="success">
                <v-app-bar-nav-icon variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>My files</v-toolbar-title>

                <v-spacer></v-spacer>

                <template v-if="$vuetify.display.mdAndUp">
                    <v-btn icon="mdi-magnify" variant="text"></v-btn>

                    <v-btn icon="mdi-filter" variant="text"></v-btn>
                </template>

                <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
            </v-app-bar>
            <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
                Main Content
            </v-main>
        </v-layout>
   
    </div>
</template>



<script>
import { RouterLink, RouterView } from "vue-router";
import useUserStore from '@/admin/stores/user';
import SideBar from "@/components/sidebar/sidebar.vue"
import { useNotificationStore } from '@/stores/notification';
import NotificationRoot from '@/components/notifications/NotificationRoot.vue';

export default {
    components: {
        RouterView,
        NotificationRoot,
        SideBar
    },
    data() {
        return {
            drawer:true,
            userStore: useUserStore(),
        }
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
