<template>
  <v-app-bar app color="primary" dense dark>
    <v-tabs centered>
      <v-tab v-for="menuItem in menuItems" :key="menuItem.title" :to="menuItem.path">
        {{menuItem.title}}
      </v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NavBar',

  data() {
    return {
      menuItems: [
        { title: 'Home', path: '/' },
        { title: 'Nearest Color', path: '/nearestColor' },
        { title: 'Text Area', path: '/textArea' },
        { title: 'Jokes', path: '/jokes' }
      ]
    }
  },
})
</script>
