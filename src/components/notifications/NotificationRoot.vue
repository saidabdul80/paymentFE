<template>
  <div class="
      tw-fixed
      tw-inset-0
      tw-z-50
      tw-flex flex-col
      tw-items-end
      tw-justify-start
      tw-w-full
      tw-px-4
      tw-py-6
      tw-pointer-events-none
      tw-sm:p-6
    ">
    <transition-group enter-active-class="tw-transition tw-duration-300 tw-ease-out"
      enter-from-class="tw-translate-y-2 tw-opacity-0 tw-sm:translate-y-0 tw-sm:translate-x-2"
      enter-to-class="tw-translate-y-0 tw-opacity-100 tw-sm:translate-x-0" leave-active-class="tw-transition tw-duration-100 tw-ease-in"
      leave-from-class="tw-opacity-100" leave-to-class="tw-opacity-0">
      <NotificationItem v-for="notification in notifications" :key="notification.id" :notification="notification" />
    </transition-group>
  </div>
</template>

<script>
import NotificationItem from './NotificationItem.vue'
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'
export default {
  components: {
    NotificationItem,
  },
  setup() {
    const notificationStore = useNotificationStore()

    const notifications = computed(() => {
      return notificationStore.notifications
    })

    return {
      notifications,
    }
  },
}
</script>
