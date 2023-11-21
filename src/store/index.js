import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)
const getDefaultState = () => {
  return {
      token: "",
  };
};
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: state => {
        return state.token;
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    RESET: state => {
        Object.assign(state, getDefaultState());
    },
  },
  actions: {
    login: ({ commit }, { token }) => {
      console.log(token);
        commit('SET_TOKEN', token);
    },
    logout: ({ commit }) => {
        commit('RESET', '');
    }
  },
  modules: {
  }
})
