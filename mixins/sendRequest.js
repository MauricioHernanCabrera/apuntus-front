import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false
    };
  },

  methods: {
    ...mapActions('notification', ['handleError', 'setNotification']),

    async sendRequest(
      callbackTry,
      callbackCatch = null,
      callbackFinally = null
    ) {
      if (this.$nuxt.isOffline) {
        return this.setNotification({
          message: '¡Necesitas internet para realizar esta acción!',
          color: 'warning'
        });
      }

      if (!this.loading) {
        this.loading = true;

        try {
          const res = await callbackTry();

          if (res && res.message) {
            this.setNotification({ message: res.message });
          }
        } catch (error) {
          console.log(error);
          this.handleError(error);
          if (callbackCatch) {
            await callbackCatch();
          }
        } finally {
          this.loading = false;
          if (callbackFinally) {
            await callbackFinally();
          }
        }
      }
    }
  }
};
