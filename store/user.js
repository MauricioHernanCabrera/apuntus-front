const basePath = 'users';

export const state = () => ({
  user: {}
});

export const getters = {
  isAuth({ user: { username = null } }) {
    return !!username;
  }
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  }
};

export const actions = {
  getOne({}, payload = {}) {
    const { queryParams, pathParams } = payload;
    return this.$axios.$get(`/${basePath}/${pathParams.username}/`);
  },

  me({}, payload = {}) {
    const { queryParams, pathParams, header = {} } = payload;
    const { token } = header;
    return this.$axios.$get(`/${basePath}/me/`, {
      headers: {
        token
      }
    });
  },

  getUserNotes({}, payload = {}) {
    const { queryParams = {}, pathParams = {} } = payload;
    const { noteName = 'created', page = 0 } = queryParams;
    const { _id } = pathParams;
    return this.$axios.$get(
      `/${basePath}/${_id}/notes?page=${page}&noteName=${noteName}`
    );
  }
};
