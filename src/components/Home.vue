<template>
  <main id="home">
    <Search @get-country="getCountry" :no-results-error="noResultsError" />
  </main>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import Search from './Search.vue';

@Component({
  components: {
    Search,
  },
})
export default class Home extends Vue {
    @Prop()
    private noResultsError!: boolean;

    @Emit()
    private getCountry(searchText: string) {
        return searchText;
    }
}
</script>

<style scoped lang="scss">
#home {
  background: white url("../assets/world.png") no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
