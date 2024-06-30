<template>
    <div class="">
        <AdminDetails />
    </div>
</template>

<script>
import AdminDetails from './details/AdminDetails.vue'
import useAdminStore from '@/admin/stores/admin';

export default {
    data: () => ({
        adminStore: useAdminStore(),
    }),
    components: {
        AdminDetails,
    },
}
</script>

<style>
.v-avatar {
    margin-right: -15px;
}
</style>