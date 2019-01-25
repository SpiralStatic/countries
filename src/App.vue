<template>
  <div id="app">
    <div id="content">
      <Header />
      <Home />
    </div>

    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Footer from './components/Footer.vue';

@Component({
  components: {
    Header,
    Home,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./scss/_reset.scss";

html, body {
  height: 100%;
  min-width: 320px;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#content {
  min-height: 100%;
  margin-bottom: -60px;
}
</style>
