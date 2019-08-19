import basePropsForm from '@/mixins/basePropsForm';

export default {
  mixins: [basePropsForm],

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      form: {}
    };
  },

  watch: {
    active(newValue, oldValue) {
      if (newValue) {
        this.form = JSON.parse(JSON.stringify(this.data));
      } else {
        this.form = {};
      }
    }
  },

  methods: {
    async submitForm() {
      let newValue = null;
      let updateValue = null;

      if (this.data && this.data._id) {
        updateValue = this.form;
      } else {
        newValue = this.form;
      }

      await this.$emit('submit-form', { updateValue, newValue });
      this.$emit('cancel-form');
    }
  }
};