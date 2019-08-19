export const state = () => ({
  notification: {
    active: false,
    color: '',
    duration: 3000,
    timeout: null,
    message: ''
  }
});

export const mutations = {
  SET_NOTIFICATION(state, notification) {
    state.notification = notification;
  },

  DEACTIVE_NOTIFICATION(state) {
    state.notification.timeout && clearTimeout(state.notification.timeout);
    state.notification.timeout = null;
    state.notification.active = false;
  }
};

export const actions = {
  setNotification(
    { commit },
    { color = 'success', duration = 5000, message = 'Mensaje por defecto' }
  ) {
    commit('DEACTIVE_NOTIFICATION');

    setTimeout(() => {
      const timeout = setTimeout(() => commit('DEACTIVE_NOTIFICATION'), duration); // prettier-ignore

      commit('SET_NOTIFICATION', {
        duration,
        message,
        color,
        active: true,
        timeout
      });
    }, 300);
  },

  handleError({ dispatch }, error = {}) {
    const { response } = error;

    let message =
      'An unexpected error occurred! Restart the page and the answer to test.';

    if (!response) {
      return dispatch('setNotification', {
        color: 'error',
        message
      });
    }

    if (response.status === 500) {
      return dispatch('setNotification', {
        color: 'info',
        message: 'We are updating the server, try again in a few minutes.'
      });
    }

    if (response.status === 401) {
      return dispatch('setNotification', {
        color: 'warning',
        message: '¡Necesitas permisos para realizar esta acción!'
      });
    }

    const { data } = response;

    if (!data) {
      return dispatch('setNotification', {
        color: 'warning',
        message
      });
    }

    message = data.message;

    dispatch('setNotification', { color: 'warning', message });
  }
};