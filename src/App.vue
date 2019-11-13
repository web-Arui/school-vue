<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
 import Home from './Home'
  export default {
    components:{
      Home
    }
  }
</script>

<style lang="scss">
#app {
  font-size: 16px;
  height: 100%;
}
 .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>