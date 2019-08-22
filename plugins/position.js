const returnPosition = () => {
  console.log(`w=${window.innerWidth}`);
  console.log(`h=${window.innerHeight}`);
  const obj = {
    x: Math.round(window.pageXOffset),
    y: Math.round(window.pageYOffset),
    width: window.innerWidth,
    height: window.innerHeight
  };
  console.log(JSON.stringify(obj));
  return obj;
};

export default ({ store }) => {
  store.commit('SET_POSITION', returnPosition());
  window.onscroll = function() {
    store.commit('SET_POSITION', returnPosition());
  };
};
