import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: null,
    loggedIn: false
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    }
  },
});

export default store;
