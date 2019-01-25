<template>
  <footer id="footer">
    <p class="footer__text">Powered by Vue</p>
    <img class="footer__image" alt="Vue logo" src="../assets/logo.png"/>
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
  justify-content: flex-end;
  height: 40px;
  padding: 10px 30px;

  .footer__text {
    line-height: 40px;
    color: slategrey;
  }

  .footer__image {
    width: 40px;
    height: 40px;
  }
}
</style>
