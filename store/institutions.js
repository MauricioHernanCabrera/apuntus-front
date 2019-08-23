const basePath = 'institutions';

export const actions = {
  getAll({}, payload = {}) {
    const { queryParams } = payload;
    return this.$axios.$get(`/${basePath}/`);
  },

  getSubjects({}, payload = {}) {
    const { queryParams = {} } = payload;
    const { _id } = queryParams;
    return this.$axios.$get(`/${basePath}/${_id}/subjects`);
  },

  getOne({}, payload = {}) {
    const { queryParams, pathParams } = payload;
    return this.$axios.$get(`/${basePath}/${pathParams._id}/`);
  },

  createOne({}, payload = {}) {
    const { body, pathParams } = payload;
    return this.$axios.$post(`/${basePath}/`, body);
  },

  createSubject({}, payload = {}) {
    const { body, pathParams = {} } = payload;
    const { _id } = pathParams;
    return this.$axios.$post(`/${basePath}/${_id}/subjects`, body);
  },

  deleteOne({}, payload = {}) {
    const { pathParams } = payload;
    return this.$axios.$delete(`/${basePath}/${pathParams._id}/`);
  },

  updateOne({}, payload = {}) {
    const { body, pathParams } = payload;
    return this.$axios.$patch(`/${basePath}/${pathParams._id}/`, body);
  }
};
