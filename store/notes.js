const basePath = 'notes';

export const actions = {
  getAll({}, payload = {}) {
    const { queryParams = {} } = payload;
    const { page } = queryParams;
    const query = `?page=${page}`;
    return this.$axios.$get(`/${basePath}/${query}`);
  },

  getOne({}, payload = {}) {
    const { queryParams, pathParams } = payload;
    return this.$axios.$get(`/${basePath}/${pathParams._id}/`);
  },

  createOne({}, payload = {}) {
    const { body, pathParams } = payload;
    return this.$axios.$post(`/${basePath}/`, body);
  },

  deleteOne({}, payload = {}) {
    const { pathParams } = payload;
    return this.$axios.$delete(`/${basePath}/${pathParams._id}/`);
  },

  updateOne({}, payload = {}) {
    const { body, pathParams } = payload;
    return this.$axios.$patch(`/${basePath}/${pathParams._id}/`, body);
  },

  addFavorite({ rootGetters }, payload = {}) {
    if (!rootGetters['user/isAuth']) return this.$router.push('/auth/login');
    const { body, pathParams = {} } = payload;
    const { _id } = pathParams;
    return this.$axios.$post(`/${basePath}/${_id}/favorites/`);
  },

  removeFavorite({ rootGetters }, payload = {}) {
    if (!rootGetters['user/isAuth']) return this.$router.push('/auth/login');
    const { pathParams = {} } = payload;
    const { _id } = pathParams;
    return this.$axios.$delete(`/${basePath}/${_id}/favorites/`);
  },

  addSaved({ rootGetters }, payload = {}) {
    if (!rootGetters['user/isAuth']) return this.$router.push('/auth/login');
    const { body, pathParams = {} } = payload;
    const { _id } = pathParams;
    return this.$axios.$post(`/${basePath}/${_id}/saved/`);
  },

  removeSaved({ rootGetters }, payload = {}) {
    if (!rootGetters['user/isAuth']) return this.$router.push('/auth/login');
    const { pathParams = {} } = payload;
    const { _id } = pathParams;
    return this.$axios.$delete(`/${basePath}/${_id}/saved/`);
  }
};
