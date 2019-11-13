<template>
  <div id="talk">
    <!-- 搜索栏 -->
    <div class="talk-search">
      <van-search v-model="searchValue" shape="round" placeholder="请输入搜索关键词">
        <svg slot="left-icon" class="icon icon-search" aria-hidden="true">
          <use xlink:href="#icon-sousuo" />
        </svg>
        <svg slot="right-icon" class="icon icon-search" aria-hidden="true">
          <use xlink:href="#icon-luyin" />
        </svg>
      </van-search>
    </div>
    <!-- tab栏 -->

    <van-tabs v-model="active" animated lazy-render sticky line-width="16px" swipeable>
      <van-tab title="最新">
        <newest />
      </van-tab>
      <van-tab title="热门">
        <newest />
      </van-tab>

      <van-tab title="活动">
           <hot/>
      </van-tab>
      <van-tab title="分类">
         <category></category>
      </van-tab>
    </van-tabs>
     <!-- tarbar -->
    <router-view></router-view>
  </div>
</template>

<script>
import Newest from "../components/talk/Newest";
import Category from '../components/talk/Category'
import Hot from '../components/talk/Hot'
export default {
  components: {
    Newest,
     Category,
     Hot
  },
  data() {
    return {
      searchValue: "",
      active: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.icon-search {
  font-size: 18px;
}
#talk {
  font-size: 16px;
  color: #110f10;
}
</style>>

