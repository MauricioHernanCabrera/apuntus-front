<template>
  <v-btn v-if="hasShare" text icon @click="shareTable">
    <v-icon class="px-2">share</v-icon>
  </v-btn>

  <v-btn v-else text icon @click="sheetActive = true">
    <v-icon class="px-2">share</v-icon>

    <v-bottom-sheet v-model="sheetActive">
      <v-list>
        <v-subheader>Compartir en</v-subheader>
        <v-list-item
          v-for="link in links"
          :key="link.title"
          @click="sheetActive = false"
          :href="link.url"
          target="_blank"
        >
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </v-btn>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      hasShare: false,

      sheetActive: false,

      links: [
        {
          title: "Whatsapp",
          url: `https://wa.me?text=${this.url}`
        },
        {
          title: "Facebook",
          url: `http://www.facebook.com/sharer.php?u=${this.url}`
        },
        {
          title: "Twitter",
          url: `https://twitter.com/share?url=${this.url}`
        }
      ]
    };
  },

  mounted() {
    this.hasShare = navigator.share ? true : false;
  },

  methods: {
    async shareTable() {
      const shared = await navigator.share({
        title: "Apuntus",
        text: "",
        url: `${this.url}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
