export default {
  data() {
    return {
      dialog: {
        active: '',
        data: {},
        title: '',
        nameBtnSubmit: ''
      }
    };
  },

  methods: {
    setDialog({
      data = {},
      active = '',
      title = '',
      nameBtnSubmit = 'Create'
    }) {
      this.dialog.data = JSON.parse(JSON.stringify(data));
      this.dialog.nameBtnSubmit = nameBtnSubmit;
      this.dialog.title = title;
      this.dialog.active = active;
    },

    cancelDialog() {
      this.setDialog({ active: '' });
    }
  }
};