<template>
  <header id="header">
    <h1 class="header__title">Countries</h1>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {}
</script>

<style scoped lang="scss">
#header {
  display: grid;
  padding: 10px 30px;
  border-bottom: 2px solid aliceblue;

  .header__title {
    color: slategrey;
    font-size: 2rem;
  }
}
</style>
