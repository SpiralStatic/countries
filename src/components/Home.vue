<template>
  <main id="home">
    <Search />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Search from './Search.vue';

@Component({
  components: {
    Search,
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
#home {
  background: white url("../assets/world.png") no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
