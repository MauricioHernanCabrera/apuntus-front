<template>
  <v-card to="/" nuxt color="transparent" class="elevation-0">
    <v-card-text class="pa-0">
      <v-img
        class="my-2"
        :src="original? '/images/apuntus-original.png' : '/images/apuntus-white.png'"
        :max-width="size"
      ></v-img>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    original: {
      type: Boolean,
      default: false
    },

    size: {
      type: [Number, String],
      default: 48
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
