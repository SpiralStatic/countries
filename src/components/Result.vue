<template>
  <main id="results">
    <div v-if="selectedCountry.name !== undefined" class="result">
      <div class="result__title">
        <h2 class="title__name">{{selectedCountry.name}}</h2>
        <img :src="selectedCountry.flag" class="country-flag" />
        <p class="title__altnames">
          <span>{{selectedCountry.altSpellings.join(', ')}}</span>
        </p>
      </div>

      <div class="result__section">
        <div class="section__part">
          <h3>Languages</h3>
          <p>{{formatLanguages(selectedCountry.languages)}}</p>
          <h3 v-if="selectedCountry.capital !== ''">Capital</h3>
          <p v-if="selectedCountry.capital !== ''">{{selectedCountry.capital}}</p>
          <h3 v-if="selectedCountry.population !== null">Population</h3>
          <p v-if="selectedCountry.population !== null">{{formatNumber(selectedCountry.population)}}</p>
          <h3 v-if="selectedCountry.area !== null">Area</h3>
          <p v-if="selectedCountry.area !== null">{{formatNumber(selectedCountry.area)}} km<sup>2</sup></p>
          <h3 v-if="selectedCountry.borders.length > 0">Borders</h3>
          <div v-if="selectedCountry.borders.length">
            <a v-for="(country, index) in borderedCountries" :key="index" v-on:click.prevent="performSearchByName(country.name)" class="section__link">{{country.name}}</a>
          </div>
        </div>
        <div class="section__part">
          <h3>Region</h3>
          <p>{{getRegion(selectedCountry)}}</p>
          <div class="continent__image" v-bind:class="getRegion(selectedCountry).replace(' ', '').toLowerCase()">
            <p class="coordinates" v-if="selectedCountry.latlng.length > 0 ">[{{selectedCountry.latlng[0].toFixed(1)}}, {{selectedCountry.latlng[1].toFixed(1)}}]</p>
          </div>
        </div>      
      </div>
    </div>

    <div v-else class="results__list">
      <div v-for="(country, index) in searchResults" :key="index" class="result" v-on:click.prevent="performSearchByName(country.name)">
        <h3 class="list__title" v-on:click.prevent="performSearch(country.name)">{{country.name}}</h3>
        <img :src="country.flag" class="country-flag" />
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
  private borderedCountries: Country[] = [];

  @Prop()
  private resultsProp!: Country[];
  @Prop()
  private borderedCountriesProp!: Country[];

  private mounted() {
    this.searchResults = this.resultsProp;

    if (this.searchResults.length === 1) {
      this.selectedCountry = this.searchResults[0];

      if (this.selectedCountry.borders.length > 0) {
        this.performSearchByCode(this.selectedCountry.borders);
      }
    }
  }

  @Emit()
  private performSearchByName(countryName: string) {
    return countryName;
  }

  @Emit()
  private performSearchByCode(codes: string[]) {
    return codes;
  }

  @Watch('resultsProp')
  private onResultsPropChange(newValue: Country[]) {
    this.searchResults = newValue;

    if (this.searchResults.length === 1) {
      this.selectedCountry = this.searchResults[0];

      if (this.selectedCountry.borders.length > 0) {
        this.performSearchByCode(this.selectedCountry.borders);
      }
    }
  }

  @Watch('borderedCountriesProp')
  private onBorderedCountriesPropChange(newValue: Country[]) {
    this.borderedCountries = newValue;
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
      max-height: 1.5rem;
      width: 2.5rem;
      vertical-align: bottom;
      border: 1px solid aliceblue;
    }

    .list__title {
      display: inline-block;
      margin-right: 0.3rem;
    }

    .result__title {
      min-height: 4rem;

      .title__name {
        display: inline-block;
        font-size: 1.5rem;
        font-weight: bold;
        margin-right: 0.3rem;
      }

      .title__altnames {
        width: 100%;
        margin: 5px 0;
        color: slategrey;
      }
    }

    .result__section {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 5px;
      row-gap: 5px;
      
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

          &.africa {
            background-position: -250px -115px;
            background-size : 275%;
          }

          &.europe {
            background-position: -500px -20px;
            background-size : 490%;
          }

          &.oceania {
            background-position: -530px -160px;
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

      .section__link {
        display: inline-block;
        margin: 0 0.5rem 0.2rem 0;
        border-bottom: 1px solid black;
        cursor: pointer;

        &:hover {
          border-bottom: 1px solid aliceblue;
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

      .title__altnames {
        width: 50%;
      }

      .result__section {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>
