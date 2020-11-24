<template>
  <v-app-bar app color="primary" dense dark>
    <v-tabs centered class="hidden-sm-and-down">
      <v-tab v-for="menuItem in menuItems" :key="menuItem.title" :to="menuItem.path">
        {{menuItem.title}}
      </v-tab>
    </v-tabs>

    <div class="hidden-md-and-up">
      <v-menu class="hidden-sm-and-up">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="menuItem in menuItems" :key="menuItem.title" :to="menuItem.path">
            <v-list-item-title>{{menuItem.title}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
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
