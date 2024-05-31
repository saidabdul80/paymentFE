<template>
    <div class="tw-px-5">
        <h1>Users</h1>
    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';

export default {
    data() {
        return {
            globals: useGlobalsStore()
        }
    },
    components: {
    },
}
</script>