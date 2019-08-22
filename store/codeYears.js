const basePath = 'code_years';

export const actions = {
  getAll({}, payload = {}) {
    const { queryParams } = payload;
    return this.$axios.$get(`/${basePath}/`);
  }
};
