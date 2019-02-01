<template>
  <footer id="footer">
    <p>Thanks to <a href="https://restcountries.eu/">REST Countries API</a></p>
    <div class="vue__info">
      <p>Powered by Vue</p>
      <img class="vue__image" alt="Vue logo" src="../assets/logo.png"/>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style scoped lang="scss">
#footer {
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 10px 30px;
  line-height: 40px;
  color: slategrey;

  .vue__info {
    display: flex;

    .vue__image {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
