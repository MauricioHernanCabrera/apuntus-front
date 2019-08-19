export default ({ store, app: { $axios, $cookies } }) => {
  $axios.setHeader('Authorization', `bearer ${$cookies.get('token')}`);
};