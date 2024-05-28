<template>
    <div class="tw-flex tw-h-full tw-w-full tw-bg-gray-100">
        <div class="tw-fixed tw-right-0 tw-top-0">
            <NotificationRoot  />
        </div>
        <SideBar />
        <main class="overflow-y-auto md:pl-56 xl:pl-64 min-h-0">
            sdoisjoisdjoi
            <div class="pt-16 pb-16">
                <router-view />
            </div>
        </main>
 

    
    </div>
</template>



<script>
import { RouterLink, RouterView } from "vue-router";
import useUserStore from '@/admin/stores/user';
import SideBar from "@/components/sidebar/sidebar.vue"
import { useNotificationStore } from '@/stores/notification';
import NotificationRoot from '@/components/notifications/NotificationRoot.vue';

export default {
    components:{
        RouterView,
        NotificationRoot,
        SideBar
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
