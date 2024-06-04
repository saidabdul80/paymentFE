<template>
  <div class="tw-px-5 md:tw-px-20 mt-10">
    <h4 class="text-h5 tw-text-green-700 font-weight-bold">SELF - ENROLMENT</h4>
    <p>Choose the option that best describes you as a taxpayer.</p>
    <!-- <AppBar @toggle-drawer="drawer = !drawer" @toggle-mode="toggleMode" /> -->
    <SelfServiceCard />
  </div>

  <v-row class="mt-5" justify="center">
    <Button
      title="Go Back"
      variant="outlined"
      :class="`tw-text-[${$constants.primary}]`"
      @click="goBack"
    />
    <Button
      title="Proceed to Enrolment"
      :class="`tw-text-[${$constants.light}] tw-bg-[${$constants.primary}]`"
      @click="proceedToEnrolment"
    />
  </v-row>
</template>

<script>
import { useGlobalsStore } from "@/stores/globals";
import Button from "@/components/button/Button.vue";
import SelfServiceCard from "@/components/SelfServiceCard.vue";
import AppBar from "@/components/appbar/AppBar.vue";

export default {
  data() {
    return {
      globals: useGlobalsStore(),
    };
  },

  components: {
    AppBar,
    Button,
    SelfServiceCard,
  },

  methods: {
    handleButtonClick(buttonType) {
      if (buttonType === "cancel") {
        this.showDialog = false;
      }
    },
    getColor(type) {
      if (type.toLowerCase() != "inactive") {
        return this.$constants.primary;
      }
    },
    getBgClass(color, transparencyLevel) {
      return `tw-bg-[${color}]/${transparencyLevel}`;
    },
  },
};
</script>
