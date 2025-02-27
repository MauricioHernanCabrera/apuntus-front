export const state = () => ({
  position: {
    x: 0,
    y: 0
  },

  drawer: null,

  firstLoad: false
});

export const mutations = {
  SET_POSITION(state, position) {
    state.position = position;
  },

  SET_DRAWER(state, drawer) {
    state.drawer = drawer;
  },

  SET_FIRST_LOAD(state, firstLoad) {
    state.firstLoad = firstLoad;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch, $axios, commit }) {
    try {
      const token = this.$cookies.get('token');
      console.log('>>> nuxtServerInit <<<');

      if (token) {
        await dispatch('auth/verifyToken', { token });
        const { data } = await dispatch('user/me', {});
        commit('user/SET_USER', data);
      }
    } catch (error) {
      console.log('No se pudo loguear');
    }
  }
};
