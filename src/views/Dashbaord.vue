<template>
    <div>
        <!-- transaction_type=credit&transaction_status=completed&year=2024&month=Jan&date_type=days -->
        <div class="tw-grid md:tw-grid-cols-3 ">
        <DashboardCard 
            v-for="x in 3"
            :balance="7820000"
            :previousBalance="3910000"
            :percentageChange="50"
            />
            </div>
    </div>
</template>

<script>
import DashboardCard from '@/components/DashboardCard.vue';

    export default {
        components: {
            DashboardCard,
        },
    }
</script>

<style lang="scss" scoped>

</style>