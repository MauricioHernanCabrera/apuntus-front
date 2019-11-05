<template>
  <v-layout mx-0 row wrap>
    <template v-if="notes.length > 0">
      <v-flex xs12>
        <card-note
          :hasHover="!breakpoint.xs"
          :onlyLike="onlyLike"
          v-for="item in notes"
          :key="item._id"
          :note="item"
          :toolbarActionsActive="toolbarActionsActive"
          @filter="(filter) => $emit('filter', filter)"
        />
      </v-flex>

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
import CardNote from "@/components/CardNote";
import hydratedVuetifyBreakpoints from "@/mixins/hydratedVuetifyBreakpoints";
export default {
  mixins: [hydratedVuetifyBreakpoints],

  components: { CardNote },

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
    },

    onlyLike: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
