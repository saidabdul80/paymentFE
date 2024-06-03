<template>
    <div class="tw-px-5 md:tw-px-20 mt-10">
        <SelfEnrolmentFrom />
    </div>
</template>

<script>
import SelfEnrolmentFrom from './forms/SelfEnrolmentFrom.vue';
import { Button } from "@/components/button/Button.vue";

export default {
    name: 'SelfEnrolment',
    components: {
        SelfEnrolmentFrom,
        Button,
    },
};
</script>

<style></style>