<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="align-center">
        Tick Tack Toe
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-content>
      <v-spacer></v-spacer>
      <TicTacToe/>
    </v-content>
  </v-app>
</template>

<script>

import TicTacToe from './components/Game.vue';

export default {
  name: 'App',

  components: {
    TicTacToe,
  },

  data: () => ({
  }),
};
</script>
