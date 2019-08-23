<template>
  <v-layout mx-0 row wrap>
    <!-- <pre>{{ notes }}</pre> -->
    <template v-if="notes.length > 0">
      <card-note
        v-for="item in notes"
        :key="item._id"
        :note="item"
        :toolbarActionsActive="toolbarActionsActive"
      />

      <v-flex xs12 text-center my-5 v-if="loading">
        <v-progress-circular color="accent" indeterminate size="64"></v-progress-circular>
      </v-flex>
    </template>

    <template v-else>
      <v-flex xs12>
        <v-card flat>
          <v-card-text class="text-center">No se encontraron apuntes</v-card-text>
        </v-card>
      </v-flex>
    </template>
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
    },

    toolbarActionsActive: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>