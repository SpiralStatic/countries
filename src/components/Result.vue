<template>
  <main id="results">
    <div v-if="selectedCountry.name !== null" class="result">
      <h2 class="result__name">{{selectedCountry.name}}</h2>
      <p class="result__altnames">
        <span v-for="(altname, index) in selectedCountry.altSpellings" :key="index">{{altname}}, </span>
      <p>

      <div class="result__region">
        <div>
          <h3>Region</h3>
          <p>{{selectedCountry.region}}</p>
        </div>
        <div>
          <h3>Capital</h3>
          <p>{{selectedCountry.capital}}</p>
        </div>
        
      </div>
    </div>
    <div v-else class="results__list">
      
    </div> 
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Country from '@/types/country';

@Component
export default class Home extends Vue {
  private selectedCountry: Country = {} as Country;
  private searchResults: Country[] = [];

  @Prop()
  private results!: Country[];

  private mounted() {
    this.searchResults = this.results;

    if (this.searchResults.length === 1) {
      this.selectedCountry = this.searchResults[0];
    }
  }
}
</script>

<style scoped lang="scss">
#results {
  padding: 10px 30px;

  .result {
    border: 2px solid aliceblue;
    padding: 30px;

    .result__name {
      font-size: 1.3rem;
      font-weight: bold;
    }

    .result__altnames {
      margin: 5px 0;
      color: slategrey;
    }

    .result__region {
      display: grid;
      grid-template-columns: .5fr;

      div {
        border: 2px solid aliceblue;
      }
    }
  }
}
</style>
