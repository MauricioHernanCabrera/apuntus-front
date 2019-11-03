<template>
  <v-app-bar app color="primary" dark class="elevation-0" style="z-index: 10;">
    <v-app-bar-nav-icon @click="SET_DRAWER(!drawer)" />
    <v-btn v-if="!(['index'].includes($route.name))" icon @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-toolbar-title v-if="title.length > 0">{{ title }}</v-toolbar-title>
    <slot />

    <template v-slot:extension v-if="$route.name === 'users-username'">
      <slot name="extension-2"></slot>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    iconBackName: {
      type: String,
      default: "arrow_back"
    }
  },

  methods: {
    ...mapMutations(["SET_DRAWER"])
  },

  computed: {
    ...mapState(["drawer"])
  }
};
</script>

<style>
</style>
