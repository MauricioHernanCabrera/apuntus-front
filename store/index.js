export const state = () => ({
  position: {
    x: 0,
    y: 0
  }
});

export const mutations = {
  SET_POSITION(state, position) {
    state.position = position;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch, $axios }) {
    try {
      const token = this.$cookies.get('token');
      console.log('>>> nuxtServerInit <<<');

      if (token) {
        await dispatch('auth/verifyToken', { token });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
