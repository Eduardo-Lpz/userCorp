import axios from 'axios';

const initialState = {
  isAuthenticated: false,
};

export default {
  namespaced: true,
  state: {
    ...initialState,
  },
  mutations: {
    setIsAuthenticated(state, logged) {
      state.isAuthenticated = logged;
    },
  },
  getters: {
    getIsAuthenticated: state => {
      return state.isAuthenticated;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      localStorage.removeItem('ChallengeToken');
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/login`, credentials);
        localStorage.ChallengeToken = response.data.message;
        commit('setIsAuthenticated', true);
      } catch (err) {
        commit('setIsAuthenticated', false);
      }
    },
    async logOutUser({ commit }) {
      localStorage.removeItem('ChallengeToken');
      commit('setUserInfo', {});
      commit('setIsAuthenticated', false);
    },
    async checkIfLogged({ dispatch, commit }) {
      if (localStorage.ChallengeToken !== undefined) {
        await dispatch('fetchUserInfo');
        commit('setIsAuthenticated', true);
      }
    },
    verifyToken({ commit }) {
      if (localStorage.ChallengeToken !== undefined) {
        commit('setIsAuthenticated', true);
      }
    }
  },
};

