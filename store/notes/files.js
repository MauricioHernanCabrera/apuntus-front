import { objectKeysToQuery } from '@/helpers/query';
const basePath = 'notes';
const secondPath = 'files';

export const actions = {
  createOne({}, { body = {}, pathParams }) {
    const { file } = body;

    const formData = new FormData();
    formData.append('file', file);
    return this.$axios.$post(
      `/${basePath}/${pathParams._id}/${secondPath}`,
      formData
    );
  },

  getAll({}, payload = {}) {
    const { queryParams = {}, pathParams = {} } = payload;

    return this.$axios.$get(
      `/${basePath}/${pathParams._id}/${secondPath}?${objectKeysToQuery(
        queryParams
      )}`
    );
  }

  // deleteOne({}, { pathParams }) {
  //   return this.$axios.$delete(`/${basePath}/${pathParams._id}/${secondPath}/${pathParams._idDocument}`); //prettier-ignore
  // },

  // getOne({}, { pathParams }) {
  //   return this.$axios.$delete(`/${basePath}/${pathParams._id}/${secondPath}/${pathParams._idDocument}`); //prettier-ignore
  // },

  // updateOne({}, { pathParams, body }) {
  //   return this.$axios.$patch(`/${basePath}/${pathParams._id}/${secondPath}/${pathParams._idDocument}`, body); //prettier-ignore
  // }
};
