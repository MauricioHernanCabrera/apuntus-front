const basePath = 'auth';

export const actions = {
  async verifyToken({ commit }, { token }) {
    try {
      const resUser = await this.$axios.$get(`/${basePath}/verify`);
      commit('user/SET_USER', { token }, { root: true });
      console.log(resUser.message);
    } catch (error) {
      this.$cookies.remove('token');
      console.log('No se pudo loguear', error);
    }
  },

  async login({ commit }, payload = {}) {
    const { header } = payload;

    const config = {
      auth: header
    };
    const res = await this.$axios.$get(`/${basePath}/token`, config);

    commit('user/SET_USER', { token: res.data.token }, { root: true });

    const myDate = new Date();
    const sevenDays = new Date(myDate.setDate(myDate.getDate() + 7));

    this.$cookies.set('token', res.data.token, {
      path: '/',
      expires: sevenDays
    });

    this.$axios.setHeader('Authorization', `bearer ${res.data.token}`);

    this.$router.push('/');

    return res;
  },

  async register({ dispatch }, payload = {}) {
    const { body } = payload;
    const res = await this.$axios.$post(`/${basePath}/register`, body);

    const { username, password } = body;
    await dispatch('login', { header: { username, password } });

    return res;
  },

  async forgot({ dispatch }, payload = {}) {
    const { body } = payload;
    const res = await this.$axios.$post(`/${basePath}/forgot`, body);

    return res;
  },

  async getResetPassword({ dispatch }, payload = {}) {
    const { queryParams } = payload;
    const res = await this.$axios.$get(`/${basePath}/reset/${queryParams._id}`);

    return res;
  },

  async postResetPassword({ dispatch }, payload = {}) {
    const { body, queryParams } = payload;
    const { password, username } = body;
    const res = await this.$axios.$post(
      `/${basePath}/reset/${queryParams._id}`,
      {
        password
      }
    );

    await dispatch('login', { header: { username, password } });

    return res;
  },

  async logout({ commit }) {
    commit('user/SET_USER', {}, { root: true });
    this.$cookies.remove('token');
    this.$router.push('/');
    this.$axios.setHeader('Authorization', `bearer`);
  }
};
