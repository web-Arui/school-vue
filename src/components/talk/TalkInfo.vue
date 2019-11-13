<template>
  <div id="talkinfo">
    <van-nav-bar
  title="文章详情"
  left-arrow
  @click-left="onClickLeft"
/>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      // Toast('返回');
    }
  }
}
</script>

<style lang="scss" scoped>
#talkinfo{
  .van-icon{
    font-size: 20px;
    color: #000;
  }
}
</style>