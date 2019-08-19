<template>
  <v-app>
    <slot></slot>

    <v-snackbar
      :value="notification.active"
      @input="DEACTIVE_NOTIFICATION"
      :timeout="0"
      :color="notification.color"
      right
      bottom
    >
      {{ notification.message }}
      <v-btn text @click="DEACTIVE_NOTIFICATION">
        <v-icon>cancel</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("notification", ["DEACTIVE_NOTIFICATION"])
  },
  computed: {
    ...mapState("notification", ["notification"])
  }
};
</script>

<style lang="scss"></style>