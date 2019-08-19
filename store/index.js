export const actions = {
  async nuxtServerInit({ dispatch, $axios }) {
    try {
      const token = this.$cookies.get('token');
      console.log('>>> nuxtServerInit <<<');

      if (token) {
        await dispatch('auth/verifyToken', { token });
      } else {
        console.log('No entro');
      }
    } catch (error) {
      console.log('Fallo');
      console.log(error);
    }
  }
};
