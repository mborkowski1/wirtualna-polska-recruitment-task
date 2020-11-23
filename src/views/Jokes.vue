<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
      <h2 class="mb-3">Chuck Norris Jokes</h2>
      <v-simple-table v-if="jokes.length" dark height="800px">
        <tbody id="tableBody">
          <tr v-for="(joke, index) in jokes" :key="index">
            <td :class="[index !== loadingJokeIndex ? 'text-left' : '', 'pa-2']">
              <p class="pa-0 ma-0" v-if="index !== loadingJokeIndex">
                {{joke}}}
              </p>

              <p v-else class="pa-0 ma-0">
                <v-progress-circular indeterminate color="primary" />
              </p>
            </td>

            <td class="pa-2">
              <v-btn fab dark small color="primary" @click="changeJoke(index)" :disabled="index === loadingJokeIndex" :loading="index === loadingJokeIndex">
                <v-icon dark>
                  mdi-refresh
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-progress-circular v-else indeterminate color="primary" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapActions, mapState} from "vuex";
  import axios from "axios";
  import Toasted from 'vue-toasted';

  Vue.use(Toasted, {
    position: 'top-center',
    duration: 2000,
    singleton: true
  });

  interface Data {
    loadingJokeIndex: number | null
  }

  interface IJokeToReplace {
    joke: string,
    index: number
  }

  export default Vue.extend( {
    name: "Jokes",

    data(): Data {
      return {
        loadingJokeIndex: null
      }
    },

    created() {
      this.setJokes([]);
      this.downloadJokes();
    },

    methods: {
      ...mapActions([
        'setJokes',
        'replaceJoke'
      ]),

      async downloadJokes () {
        const jokes: Array<string> = [];

        for (let i = 0; i < 50; i++) {
          const joke = await axios.get('https://api.chucknorris.io/jokes/random');
          jokes.push(joke.data.value);
        }

        this.setJokes(jokes);
      },

      async changeJoke(jokeIndex: number) {
        const jokeBeforeChange: IJokeToReplace = {
          joke: this.jokes[jokeIndex],
          index: jokeIndex
        };
        console.log(jokeBeforeChange);

        this.loadingJokeIndex = jokeIndex;

        const newJoke = await axios.get('https://api.chucknorris.io/jokes/random');
        const jokeToReplace: IJokeToReplace = {
          joke: newJoke.data.value,
          index: jokeIndex
        };

        this.replaceJoke(jokeToReplace);
        this.loadingJokeIndex = null;

        Vue.toasted.show('Joke has been changed', {
          action: {
            text: 'Undo',
            onClick: (e, toastObject) => {
              this.loadingJokeIndex = jokeIndex;
              this.replaceJoke(jokeBeforeChange);
              this.loadingJokeIndex = null;
              toastObject.goAway(0);
            }
          }
        });
      }
    },

    computed: {
      ...mapState([
        'jokes'
      ])
    }
  })
</script>

<style scoped lang="scss">
  #tableBody {
    background-color: #546E7A;

    > tr {
      &:hover {
        background-color: #616161;
      }
    }
  }
</style>
