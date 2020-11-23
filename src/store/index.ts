import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

interface IState {
  jokes: Array<string>
}

interface IJokeToReplace {
  joke: string,
  index: number
}

type TJokes = Array<string>;

export default new Vuex.Store<IState>({
  state: {
    jokes: []
  },
  mutations: {
    setJokes(state, jokes: TJokes) {
      state.jokes = jokes;
    },

    replaceJoke(state, jokeToReplace: IJokeToReplace) {
      state.jokes[jokeToReplace.index] = jokeToReplace.joke;
    }
  },
  actions: {
    setJokes({commit}, jokes: TJokes) {
      commit('setJokes', jokes);
    },

    replaceJoke({commit}, jokeToReplace: IJokeToReplace) {
      commit('replaceJoke', jokeToReplace);
    }
  }
})
