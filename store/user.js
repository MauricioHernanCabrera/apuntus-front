const basePath = 'auth';

export const state = () => ({
  user: {}
});

export const getters = {
  isAuth({ user }) {
    return !!user.token;
  }
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  }
};

export const actions = {
};