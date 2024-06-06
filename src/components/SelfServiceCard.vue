<template>
  <v-list>
    <v-card @click="$emit('selectCard', card)" 
      variant="text" class="tw-border"  
      :loading="loading"
      :class="card.selected ? [card.iconBgClass, 'tw-border', 'tw-border-green-200'] : `tw-bg-[${this.$constants.light}]`">
      <div class="tw-p-8 tw-shodow tw-block md:tw-flex tw-text-center md:tw-text-left tw-mb-4">
        <div>
          <span :class="card.selected ? `tw-bg-[${this.$constants.light}]` : card.iconBgClass"
            class="tw-p-[10px] tw-inline-block tw-rounded-[24px]">
            <v-icon size="80px" class="tw-w-[80px] tw-h-[80px]"
              :color="card.iconColor">
              {{ card.icon }}
            </v-icon>
          </span>
        </div>
        <div class="tw-my-4 md:tw-hidden"></div>
        <div class="tw-ml-5">
          <span class="tw-font-bold md:tw-block leading-none tw-mb-3"
            :class="`${$constants.text_size.s4} tw-text-[${$constants.primary}]`">
            {{ card.title }}
          </span>
          <p :class="`${$constants.text_size.s2} tw-text-[${$constants.dark}]`" class="tw-font-thin tw-m-1">
            {{ card.content }}
          </p>
        </div>
      </div>
    </v-card>
  </v-list>
</template>

<script>
export default {
  emits: ['selectCard'],
  props: {
    card: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getColor(type) {
      if (type.toLowerCase() != 'inactive') {
        return this.$constants.primary
      }
    },
  },
};
</script>