<template>
  <main id="results">
    <div v-if="selectedCountry.name !== undefined" class="result">
      <h2 class="result__name">{{selectedCountry.name}} <img :src="selectedCountry.flag" class="country-flag" /></h2>
      <p class="result__altnames">
        <span>{{selectedCountry.altSpellings.join(', ')}}</span>
      <p>

      <div class="result__section">
        <div class="section__part">
          <h3>Languages</h3>
          <p>{{formatLanguages(selectedCountry.languages)}}</p>
          <h3>Capital</h3>
          <p>{{selectedCountry.capital}}</p>
          <h3 v-if="selectedCountry.population !== null">Population</h3>
          <p v-if="selectedCountry.population !== null">{{formatNumber(selectedCountry.population)}}</p>
          <h3 v-if="selectedCountry.area !== null">Area</h3>
          <p v-if="selectedCountry.area !== null">{{formatNumber(selectedCountry.area)}} km<sup>2</sup></p>
        </div>
        <div class="section__part">
          <h3>Region</h3>
          <p>{{getRegion(selectedCountry)}}</p>
          <div class="continent__image" v-bind:class="getRegion(selectedCountry).replace(' ', '').toLowerCase()">
            <p class="coordinates">[{{selectedCountry.latlng[0].toFixed(1)}}, {{selectedCountry.latlng[1].toFixed(1)}}]</p>
          </div>
        </div>      
      </div>
    </div>

    <div v-else class="results__list">
      <div v-for="(country, index) in searchResults" :key="index" class="result" v-on:click.prevent="performSearch(country.name)">
        <h3 v-on:click.prevent="performSearch(country.name)">{{country.name}} <img :src="country.flag" class="country-flag" /></h3>
      </div>
    </div> 
  </main>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import Country, { Language } from '@/types/country';

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

  @Watch('results')
  private onResultsChange(newValue: Country[]) {
    this.searchResults = newValue;

    if (this.searchResults.length === 1) {
      this.selectedCountry = this.searchResults[0];
    }
  }

  private getRegion(country: Country) {
    if (country.region === 'Americas') {
      return country.subregion;
    } else {
      return country.region;
    }
  }

  private formatNumber(numberToFormat: number) {
    return numberToFormat !== null ? numberToFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
  }

  private formatLanguages(languages: Language[]) {
    return languages.map((currentLanguage) => {
        return currentLanguage.name;
    }).join(', ');
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

    .country-flag {
      height: 1.4rem;
      width: 2.5rem;
      vertical-align: middle;
      border: 1px solid aliceblue;
    }

    .result__name {
      font-size: 1.3rem;
      font-weight: bold;
    }

    .result__altnames {
      width: 50%;
      margin: 5px 0;
      color: slategrey;
    }

    .result__section {
      display: grid;
      grid-template-columns: 1fr;

      .section__part {
        margin: 5px 0;

        h3 {
          margin: 5px 0 ;
        }

        .continent__image {
          position: relative;
          border: 2px solid aliceblue;
          background-image: url('../assets/continents.png');
          background-repeat: no-repeat;
          height: 200px;
          width: 300px;
          margin: 5px 0;

          .coordinates {
            position: absolute;
            bottom: 3px;
            right: 3px;
            font-size: 0.9rem;
            color: slategrey;
          }

          &.asia {
            background-position: -400px -20px;
            background-size : 280%;
          }

          &.europe {
            background-position: -500px -20px;
            background-size : 490%;
          }

          &.oceania {
            background-position: -610px -160px;
            background-size : 280%;
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
      .result__section {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>
