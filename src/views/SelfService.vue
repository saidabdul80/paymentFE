<template>
  <div class="md:tw-w-[60%] tw-w-[90%] tw-mx-auto md:tw-px-20 mt-10">
    <h4 class="text-h5 tw-text-green-700 font-weight-bold">SELF - ENROLMENT</h4>
    <p>Choose the option that best describes you as a taxpayer.</p>
    <!-- <AppBar @toggle-drawer="drawer = !drawer" @toggle-mode="toggleMode" /> -->
    <SelfServiceCard v-for="(card, index) in cards" :key="index" :card="card" @selectCard="selectCard" />    
  </div>

  <v-row class="mt-5" justify="center">
    <Button title="Go Back" variant="outlined" :class="`tw-text-[${$constants.primary}]`" @click="goBack" />
    <Button title="Proceed to Enrolment" :class="`tw-text-[${$constants.light}] tw-bg-[${$constants.primary}]`"
      @click="proceedToEnrolment" />
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
      cards: [
        {
          icon: 'mdi-account',
          iconColor: this.$constants.success,
          iconBgClass: this.getBgClass(this.$constants.success, this.$constants.transparent_level),
          title: 'Individual Taxpayer',
          content: 'Lorem ipsum dolor sit amet consectetur. Aenean vel ut consectetur elementum integer rutrum purus. Aenean vel ut consectetur elementum integer rutrum purus ac vitae. Feugiat pulvinar imperdiet sodales sed phasellus mattis vel nulla.',
          link: '../individual/register',
          selected: false,
        },
        {
          icon: 'mdi-store',
          iconColor: this.$constants.success,
          iconBgClass: this.getBgClass(this.$constants.success, this.$constants.transparent_level),
          title: 'Corporate Taxpayer',
          content: 'Lorem ipsum dolor sit amet consectetur. Aenean vel ut consectetur elementum integer rutrum purus. Aenean vel ut consectetur elementum integer rutrum purus ac vitae. Feugiat pulvinar imperdiet sodales sed phasellus mattis vel nulla.',
          link: '../corporate/register',
          selected: false,
        },
      ],
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
