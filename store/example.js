const basePath = 'type_of_jobs';

export const actions = {
  getAll({}, payload = {}) {
    const { queryParams } = payload;
    return this.$axios.$get(`/${basePath}/`);
  },

  getOne({}, payload = {}) {
    const { queryParams, pathParams } = payload
    return this.$axios.$get(`/${basePath}/${pathParams._id}/`);
  },

  createOne({}, payload = {}) {
    const { body, pathParams } = payload
    return this.$axios.$post(`/${basePath}/`, body);
  },
  
  deleteOne({}, payload = {}) {
    const { pathParams } = payload
    return this.$axios.$delete(`/${basePath}/${pathParams._id}/`);
  },
  
  updateOne({}, payload = {}) {
    const { body, pathParams } = payload
    return this.$axios.$patch(`/${basePath}/${pathParams._id}/`, body);
  }
};