<template>
  <nuxt-link to="/">
    <v-img
      class="my-2"
      :src="original? '/images/apuntus-original.png' : '/images/apuntus-white.png'"
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
