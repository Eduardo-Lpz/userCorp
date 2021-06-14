import axios from 'axios';

const initialState = {
  users: [],
};

export default {
  namespaced: true,
  state: {
    ...initialState,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
  },
  getters: {
    getUsers: state => state.users,
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/users`, {
          headers: {
            'Authorization': `Bearer ${localStorage.ChallengeToken}`
          }
        });
        commit('setUsers', response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async createUser({ commit, dispatch }, newUser){
      try {
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/users`, newUser, {
          headers: {
            'Authorization': `Bearer ${localStorage.ChallengeToken}`
          }
        });
        commit('snackbarShowSuccess', 'successfully created!', { root: true });
        dispatch('fetchUsers');
      } catch (err) {
        console.log(err);
        commit('snackbarShowError', 'something went wrong!', { root: true });
      }
    },
    async updateUser({ commit, dispatch }, user) {
      const { id, ...data } = user;
      try {
        await axios.put(`${process.env.VUE_APP_API_BASE_URL}/users/${id}`, data, {
          headers: {
            'Authorization': `Bearer ${localStorage.ChallengeToken}`
          }
        });
        commit('snackbarShowSuccess', 'successfully updated!', { root: true });
        dispatch('fetchUsers');
      } catch (err) {
        console.log(err);
        commit('snackbarShowError', 'something went wrong!', { root: true });
      }
    },
    async deleteUser({ commit, dispatch }, userData) {
      try {
        await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/users/${userData.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.ChallengeToken}`
          }
        });
        commit('snackbarShowSuccess', 'successfully deleted!', { root: true });
        dispatch('fetchUsers');
      } catch (err) {
        console.log(err);
        commit('snackbarShowError', 'something went wrong!', { root: true });
      }
    },
  },
};

