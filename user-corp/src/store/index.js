import Vue from 'vue'
import Vuex from 'vuex'

import users from './users.js';
import sessions from './sessions';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    notification: {
      message: '',
      color: 'info'
    },
    busy: {
      visible: false,
      title: '',
      message: ''
    },
  },
  mutations: {
    snackbarShowInfo(state, message) {
      state.notification.message = message;
      state.notification.color = 'info';
    },
    snackbarShowSuccess(state, message) {
      state.notification.message = message;
      state.notification.color = 'success';
    },
    snackbarShowWarning(state, message) {
      state.notification.message = message;
      state.notification.color = 'warning';
    },
    snackbarShowError(state, message) {
      state.notification.message = message;
      state.notification.color = 'error';
    },
    snackbarShowBusy(state, busy) {
      state.busy.title = busy.title;
      state.busy.message = busy.message;
      state.busy.visible = true
    },
    snackbarHideBusy(state) {
      state.busy.visible = false;
    },
  },
  modules: {
    users,
    sessions,
  }
})
