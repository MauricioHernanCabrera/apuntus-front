export default {
  data: () => ({
    isHydrated: false,
    default: {
      xs: false,
      xsOnly: false,
      xsAndUp: false,
      sm: false,
      smOnly: false,
      smAndDown: false,
      smAndUp: false,
      md: false,
      mdOnly: false,
      mdAndDown: false,
      mdAndUp: false,
      lg: false,
      lgOnly: false,
      lgAndDown: false,
      lgAndUp: false,
      xl: false,
      xlOnly: false,
      xlAndDown: false
    }
  }),

  mounted() {
    this.isHydrated = true;
  },

  computed: {
    breakpoint() {
      return Object.keys(this.$vuetify.breakpoint).reduce(
        (breakpoints, dim) => {
          breakpoints[dim] = this.breakpointWithDefault(dim);
          return breakpoints;
        },
        {}
      );
    }
  },

  methods: {
    breakpointWithDefault(breakpoint) {
      return this.isHydrated
        ? this.$vuetify.breakpoint[breakpoint]
        : this.$data.default[breakpoint];
    }
  }
};
