<template>
  <main id="results">
    <div v-if="selectedCountry.name !== undefined" class="result">
      <h2 class="result__name">{{selectedCountry.name}}</h2>
      <p class="result__altnames">
        <span v-for="(altname, index) in selectedCountry.altSpellings" :key="index">{{altname}}, </span>
      <p>

      <div class="result__region">
        <div>
          <h3>Capital</h3>
          <p>{{selectedCountry.capital}}</p>
        </div>
        <div>
          <h3>Region</h3>
          <p>{{getRegion(selectedCountry)}}</p>
          <div class="continent__image" v-bind:class="getRegion(selectedCountry).replace(' ', '').toLowerCase()"></div>
        </div>      
      </div>
    </div>

    <div v-else class="results__list">
      <div v-for="(country, index) in searchResults" :key="index" class="result">
        <div v-on:click.prevent="performSearch(country.name)">
          <h3>{{country.name}}</h3>
        </div>
      </div>
    </div> 
  </main>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
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

  @Emit()
  private performSearch(countryName: string) {
    return countryName;
  }

  @Watch('results') onResultsChange(newResults: Country[]) {
    this.searchResults = newResults;

    if (this.searchResults.length === 1) {
      this.selectedCountry = this.searchResults[0];
    }
  }

  private getRegion(country: Country) {
    if(country.region == "Americas") {
      return country.subregion;
    }
    else {
      return country.region;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/_variables.scss";

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
      grid-template-columns: 1fr;

      div {
        margin: 5px 0;

        .continent__image {
          border: 2px solid aliceblue;
          background-image: url('../assets/continents.png');
          background-repeat: no-repeat;
          height: 200px;
          width: 300px;

          &.asia {
            background-position: -400px -20px;
            background-size : 280%;
          }

          &.europe {
            background-position: -500px -20px;
            background-size : 490%;
          }

          &.oceania {
            background-position: -1000px -10px;
          }

          &.northernamerica {
            background-position: -10px -20px;
            background-size : 300%;
          }

          &.southamerica {
            background-position: -40px -195px;
            background-size : 290%;
          }
        }
      }
    }
  }

  .results__list {
    display: flex;
    flex-direction: column;

    .result {
      margin-bottom: 10px;

      &:hover {    
        background-color: aliceblue;
        cursor: pointer;
      }
    }
  }
}

@media screen and (min-width: $break-medium) {
  #results {
    .result {
      .result__region {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>
