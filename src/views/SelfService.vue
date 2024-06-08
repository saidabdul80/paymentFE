<template>
  <div class="md:tw-w-[65%] tw-w-[90%] tw-mx-auto tw-mb-10 md:tw-px-20">
    <h4 class="text-h5 font-weight-bold" :class="`tw-text-[${$constants.primary}]`">SELF - ENROLMENT</h4>
    <p>Click the options that best describes you as a taxpayer.</p>
    <div class="tw-mt-4">
      <SelfServiceCard v-for="(card, index) in cards" :key="index" :card="card" :loading="card.loading"   @selectCard="selectCard" />    
    </div>
  </div>
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
          content: 'Lorem ipsum dolor sit amet consectetur. Aenean vel ut consectetur elementum integer rutrum purus ac vitae. Feugiat pulvinar imperdiet sodales sed phasellus mattis vel nulla.',
          link: '../individual/register',
          selected: false,
        },
        {
          icon: 'mdi-store',
          iconColor: this.$constants.warning,
          iconBgClass: this.getBgClass(this.$constants.warning, this.$constants.transparent_level),
          title: 'Corporate Taxpayer',
          content: 'Lorem ipsum dolor sit amet consectetur. Aenean vel ut consectetur elementum integer rutrum purus ac vitae. Feugiat pulvinar imperdiet sodales sed phasellus mattis vel nulla.',
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
    getBgClass(color, transparencyLevel) {
      return `tw-bg-[${color}]/${transparencyLevel}`;
    },

    selectCard(card) {
      this.cards.forEach(c => c.selected = false);
      card.selected = true;
      card.loading = false; // set loading to true
        window.location.href = card.link; // navigate to card link

      // setTimeout(() => {
      //   card.loading = false; // set loading to false after 3 seconds
      //   window.location.href = card.link; // navigate to card link
      // }, 1000);
    },
  },
};
</script>
