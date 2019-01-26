<template>
  <div class="search">
    <input type="text" class="search__input" name="search__input" placeholder="Search for a country..." v-model="searchText" @keyup.enter="getCountry($event)">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import CountriesApi from '../services/api/countries';

@Component
export default class Search extends Vue {
    private searchText: string = '';

    @Emit()
    private getCountry() {
        return this.searchText;
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
