const returnPosition = () => {
  const obj = {
    x: Math.round(window.pageXOffset),
    y: Math.round(window.pageYOffset)
  };
  return obj;
};

export default ({ store }) => {
  store.commit('SET_POSITION', returnPosition());
  window.onscroll = function() {
    store.commit('SET_POSITION', returnPosition());
  };
};
