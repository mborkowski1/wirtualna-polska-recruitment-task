import Vue from 'vue'
import Vuex from 'vuex'
import {IState, TJoke, TJokes} from "@/store/types";

Vue.use(Vuex);

export default new Vuex.Store<IState>({
  state: {
    jokes: [] as TJokes
  },
  mutations: {
    setJokes(state, jokes: TJokes) {
      state.jokes = jokes;
    },

    replaceJoke(state, jokeToReplace: TJoke) {
      state.jokes[jokeToReplace.id].value = jokeToReplace.value;
    }
  },
  actions: {
    setJokes({commit}, jokes: TJokes) {
      commit('setJokes', jokes);
    },

    replaceJoke({commit}, jokeToReplace: TJoke) {
      commit('replaceJoke', jokeToReplace);
    }
  }
})
