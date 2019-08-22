<template>
  <v-layout mx-0 row wrap>
    <!-- <pre>{{ notes }}</pre> -->
    <card-note v-for="item in notes" :key="item._id" :note="item" />

    <v-flex xs12 text-center my-5 v-if="loading">
      <v-progress-circular color="accent" indeterminate size="64"></v-progress-circular>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
</style>