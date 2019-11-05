export default async function({ app }) {
  if (!app.mixins) {
    app.mixins = [];
  }

  console.log(app.mixins);

  app.mixins.push({
    data: () => ({
      isHydrated: false
    }),

    computed: {
      breakpoint() {
        return this.isHydrated ? this.$vuetify.breakpoint : {};
      }
    },

    mounted() {
      this.isHydrated = true;
      console.log(this.$vuetify.breakpoint);
    }
  });
}
