<template>
  <v-app>
    <slot></slot>

    <div
      v-if="!firstLoad"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 100;
        background-color: white;
      "
    >
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

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
  mounted() {
    this.SET_FIRST_LOAD(true);
  },

  methods: {
    ...mapMutations("notification", ["DEACTIVE_NOTIFICATION"]),
    ...mapMutations(["SET_FIRST_LOAD"])
  },

  computed: {
    ...mapState("notification", ["notification"]),
    ...mapState(["firstLoad"])
  }
};
</script>

<style lang="scss"></style>
