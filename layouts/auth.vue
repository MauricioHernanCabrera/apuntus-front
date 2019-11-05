<template>
  <core-app>
    <v-content>
      <v-container fluid fill-height :pa-0="!breakpoint.smAndUp">
        <v-layout :align-center="breakpoint.smAndUp" justify-center>
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
  </core-app>
</template>

<script>
import CoreApp from "@/components/CoreApp";
import hydratedVuetifyBreakpoints from "@/mixins/hydratedVuetifyBreakpoints";
export default {
  mixins: [hydratedVuetifyBreakpoints],
  components: { CoreApp }
};
</script>

<style lang="scss" scoped>
</style>
