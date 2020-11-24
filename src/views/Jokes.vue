<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
      <h2 class="mb-3">Chuck Norris Jokes</h2>
      <v-simple-table v-if="jokes.length" dark height="800px">
        <tbody id="tableBody">
          <tr v-for="joke in jokes" :key="joke.id">
            <td :class="[joke.id !== loadingJokeIndex ? 'text-left' : '', 'pa-2']">
              <p class="pa-0 ma-0" v-if="joke.id !== loadingJokeIndex">
                {{joke.value}}}
              </p>

              <p v-else class="pa-0 ma-0">
                <v-progress-circular indeterminate color="primary" />
              </p>
            </td>

            <td class="pa-2">
              <v-btn
                  fab
                  dark
                  small
                  color="primary"
                  @click="changeJoke(joke.id)"
                  :disabled="joke.id === loadingJokeIndex"
                  :loading="joke.id === loadingJokeIndex">
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
  import {TJoke, TJokes} from "@/store/types";

  Vue.use(Toasted, {
    position: 'top-center',
    duration: 2000,
    singleton: true
  });

  interface Data {
    loadingJokeIndex: number | null
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
        const jokes: TJokes = [];

        for (let i = 0; i < 50; i++) {
          const joke = await axios.get('https://api.chucknorris.io/jokes/random');
          jokes.push({
            value: joke.data.value,
            id: i
          });
        }

        this.setJokes(jokes);
      },

      async changeJoke(jokeId: number) {
        const jokeBeforeChange: TJoke = {
          value: this.jokes[jokeId].value,
          id: jokeId
        };

        this.loadingJokeIndex = jokeId;

        const newJoke = await axios.get('https://api.chucknorris.io/jokes/random');
        const jokeToReplace: TJoke = {
          value: newJoke.data.value,
          id: jokeId
        };

        this.replaceJoke(jokeToReplace);
        this.loadingJokeIndex = null;

        Vue.toasted.show('Joke has been changed', {
          action: {
            text: 'Undo',
            onClick: (e, toastObject) => {
              this.replaceJoke(jokeBeforeChange);
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
