<template>
  <nuxt-link to="/">
    <v-img
      class="my-2"
      :src="original? '/images/logo-apuntus-original.png' : '/images/logo-apuntus-white.png'"
      :max-width="size"
    ></v-img>
  </nuxt-link>
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