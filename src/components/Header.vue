<template>
  <header id="header">
    <h1 class="header__title" @click="resetPage">Countries</h1>
  </header>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Emit()
  private resetPage() {
      return;
  }
}
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
