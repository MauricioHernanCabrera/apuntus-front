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
  async nuxtServerInit({ dispatch, $axios, commit }) {
    try {
      const token = this.$cookies.get('token');
      console.log('>>> nuxtServerInit <<<');

      if (token) {
        const [{ data }] = await Promise.all([
          dispatch('user/me', { header: { token } }),
          dispatch('auth/verifyToken', { token })
        ]);
        console.log(data);
        commit('user/SET_USER', data);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
