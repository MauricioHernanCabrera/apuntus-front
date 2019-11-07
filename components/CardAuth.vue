<template>
  <v-form @submit.prevent="$emit('submit')" style="width: 100%;" class="d-flex justify-center">
    <v-card
      :width="breakpoint.xs? '100%' : '350px'"
      style="display: flex; flex-direction: column;"
      :class="[{ 'elevation-0': breakpoint.xs}]"
    >
      <v-card-text>
        <div class="my-5 d-flex justify-center">
          <logo original size="64" />
        </div>

        <h1
          class="font-weight-regular my-3 text-center"
          :class="[breakpoint.xs? 'subtitle-1' : 'title']"
        >{{ title }}</h1>

        <slot />
      </v-card-text>

      <template v-if="breakpoint.xs">
        <v-spacer></v-spacer>
        <v-divider></v-divider>
      </template>

      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import hydratedVuetifyBreakpoints from "@/mixins/hydratedVuetifyBreakpoints";

export default {
  mixins: [hydratedVuetifyBreakpoints],

  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
