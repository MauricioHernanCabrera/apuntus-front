<template>
  <core-app>
    <core-drawer />
    <v-content>
      <nuxt />
    </v-content>
  </core-app>
</template>


<script>
import CoreApp from "@/components/CoreApp";
import CoreDrawer from "@/components/CoreDrawer";
export default {
  components: { CoreApp, CoreDrawer }
};
</script>
