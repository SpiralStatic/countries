<template>
  <div id="app">
    <div id="content">
      <Header @reset-page="resetPage" />
      <Home v-if="results.length == 0" @get-country="getCountry" :no-results-error="errors.noResultsError" />
      <Result v-else :results="results" @perform-search="filterCountry" />
    </div>

    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Footer from './components/Footer.vue';
import Result from './components/Result.vue';
import Country from '@/types/country';
import CountriesApi from './services/api/countries';

@Component({
  components: {
    Header,
    Home,
    Footer,
    Result,
  },
})
export default class App extends Vue {
  private results: Country[] = [];
  private errors = {
    noResultsError: false,
  };

  private api: CountriesApi = new CountriesApi('https://restcountries.eu/rest/v2');

  private async getCountry(countryName: string) {
    if (countryName === '') {
      return;
    }

    try {
      this.errors.noResultsError = false;
      this.results = await this.api.get(countryName);
    } catch (error) {
      this.errors.noResultsError = true;
    }
  }

  private filterCountry(countryName: string) {
    this.results = this.results.filter((country) => {
      return country.name === countryName;
    });
  }

  private resetPage() {
    this.results = [];
  }
}
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

sup { 
  vertical-align: super;
  font-size: xx-small;
}
</style>
