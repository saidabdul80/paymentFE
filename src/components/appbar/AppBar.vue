<template>
  <v-app-bar flat :color="$constants.light" class="tw-shadow-md">
    <v-app-bar-nav-icon variant="text" @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-if="$vuetify.display.mdAndUp">
      <v-switch v-model="mode" @change="$emit('toggle-mode')"  class="tw-text-sm tw-w-[150px]"
        :class="mode === 'LIGHT' ? `tw-text-[${$constants.primary}]` : `tw-text-[${$constants.dark}]`"
        :label="`${mode}`"
        false-value="DARK" true-value="LIGHT" hide-details>
        <template v-slot:prepend>
          <v-icon icon="mdi-white-balance-sunny"></v-icon>
        </template>
      </v-switch>
    </template>
    <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
  </v-app-bar>
</template>

<script>
export default {
  emits: ['toggle-drawer', 'toggle-mode'],
  props: {
    drawer: Boolean
  },
  data() {
    return {
      mode: this.$constants.mode
    }
  },
  methods: {
    toggleMode() {
      this.$constants.toggleMode();
      ls.set('mode', this.$constants.mode);
    }
  }
}

</script>