<template>
  <div class="search">
    <label for="search__input" v-show="false">Search for a country...</label>
    <input type="text" class="search__input" :class="{ error: noResultsErrorValue }" name="search__input" placeholder="Search for a country..." v-model="searchText" @keyup.enter="getCountry()">
    <p v-show="noResultsErrorValue" class="error">No results found</p>
  </div>
</template>

<script lang="ts">
import { Component, Emit , Prop, Vue, Watch } from 'vue-property-decorator';
import CountriesApi from '../services/api/countries';

@Component
export default class Search extends Vue {
  private searchText: string = '';
  private noResultsErrorValue: boolean = false;

  @Prop()
  private noResultsError!: boolean;

  @Emit()
  private getCountry() {
    return this.searchText;
  }

  @Watch('noResultsError')
  private onNoResultsErrorChange(newValue: boolean) {
    this.noResultsErrorValue = newValue;
  }
}
</script>

<style scoped lang="scss">
@import "../scss/_variables.scss";

.search {
  border-bottom: 2px solid aliceblue;

  .search__input {
    height: 40px;
    min-width: 200px;
    font-size: 1rem;
    width: 100%;
    padding: 0 5px;
    
    &.error {
      border: 2px solid orangered;
    }  
  }

  p {
    margin: 5px 0;
    float: right;

    &.error {
      color: orangered;
    } 
  }
}

@media screen and (min-width: $break-medium) {
  .search {
    padding: 60px 25%;

    .search__input {
      height: 40px;
      font-size: 1.3rem;
    }
  }
}

@media screen and (min-width: $break-large) {
  .search {
    padding: 80px 25%;

    .search__input {
      height: 50px;
      font-size: 1.5rem;        
    }
  }
}
</style>
