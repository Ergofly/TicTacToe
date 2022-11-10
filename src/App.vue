<template>
  <div id="app">
    <TicTacToe></TicTacToe>
  </div>
</template>

<script>
import TicTacToe from "@/components/TicTacToe";

export default {
  name: 'App',
  components: {
    TicTacToe
  }
}
</script>

<style>
html,body,#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: calc(100vw/10.80);
}
</style>
