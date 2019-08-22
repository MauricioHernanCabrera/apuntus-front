export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    active: {
      type: Boolean,
      required: true
    },

    nameBtnSubmit: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    }
  }
};
