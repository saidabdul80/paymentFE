<template>
    <div class="tw-h-full tw-w-full tw-bg-gray-100">
        <div class="tw-fixed tw-right-0 tw-top-0">
            <NotificationRoot  />
        </div>
        <main class="overflow-y-auto md:pl-56 xl:pl-64 min-h-0">
            <div class="pt-16 pb-16">
                <router-view />
            </div>
        </main>
        <v-btn variant="tonal" @click="showNo()">
            Vuetify Button
        </v-btn>

        <v-icon color="teal-darken-2" icon="mdi-email" size="large"></v-icon>
    </div>
</template>



<script>
import { RouterLink, RouterView } from "vue-router";
import useUserStore from '@/admin/stores/user';
import { useNotificationStore } from '@/stores/notification';
import NotificationRoot from '@/components/notifications/NotificationRoot.vue';

export default {
    components:{
        RouterView,
        NotificationRoot
    },
    data() {
        return {
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
