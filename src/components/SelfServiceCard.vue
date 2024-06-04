<template>
  <v-list>
    <v-list-item @click="$emit('selectCard', card)" :to="card.link"
      :class="card.selected ? [card.iconBgClass, 'tw-border-2', 'tw-border-green-600'] : `tw-bg-[${this.$constants.light}]`">
      <div class="tw-p-8 tw-shodow tw-border-1 tw-block md:tw-flex tw-text-center md:tw-text-left tw-mb-4">
        <div>
          <span class="tw-font-bold tw-block md:tw-hidden leading-none tw-mb-4"
            :class="`${$constants.text_size.s4} tw-text-[${$constants.primary}]`">
            {{ card.title }}
          </span>
          <span :class="card.selected ? `tw-bg-[${this.$constants.light}]` : card.iconBgClass"
            class="tw-p-[10px] tw-inline-block tw-rounded-[24px]">
            <v-icon size="80px" class="tw-w-[80px] tw-h-[80px]"
              :color="card.selected ? this.$constants.success : card.iconColor">
              {{ card.icon }}
            </v-icon>
          </span>
        </div>
        <div class="tw-ml-4">
          <span class="tw-font-bold tw-hidden md:tw-block leading-none tw-mb-4"
            :class="`${$constants.text_size.s4} tw-text-[${$constants.primary}]`">
            {{ card.title }}
          </span>
          <p :class="`${$constants.text_size.s2} tw-text-[${$constants.dark}]`" class="tw-font-thin tw-m-1">
            {{ card.content }}
          </p>
        </div>
      </div>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  emits: ['selectCard'],
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    getColor(type) {
      if (type.toLowerCase() != 'inactive') {
        return this.$constants.primary
      }
    },
    getBgClass(color, transparencyLevel) {
      return `tw-bg-[${color}]/${transparencyLevel}`;
    },
    selectCard(card) {
      this.cards.forEach(c => c.selected = false);
      card.selected = true;
    }
  },
};
</script>