const basePath = 'code_notes';

export const actions = {
  getAll({}, payload = {}) {
    const { queryParams } = payload;
    return this.$axios.$get(`/${basePath}/`);
  }
};
