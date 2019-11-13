<template>
  <div class="user">
    <div class="user-header">
      <svg class="icon" @click="pushRouter" style="font-size:26px" aria-hidden="true">
        <use xlink:href="#icon-shezhi" />
      </svg>
      <img src="../assets/img/avatar-1.jpg" alt />
      <div>{{name}}</div>
      <p>{{personal?personal:'此人还未说话'}}</p>
    </div>

    <ul class="user-main">
      <li>
        <span>14</span>
        <div>喜欢</div>
      </li>
      <li>
        <span>12</span>
        <div>关注</div>
      </li>
      <li>
        <span>341</span>
        <div>粉丝</div>
      </li>
    </ul>
    <!-- tab栏 -->
    <van-tabs v-model="active">
      <van-tab title="我的发布">我的发布</van-tab>
      <van-tab title="我的评论">我的评论</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  created() {
    this.initData();
  },
  data() {
    return {
      active: 2,
      userId: "", // 用户id
      name:'',
      personal:''
    };
  },
  methods: {
    pushRouter() {
      this.$router.push("/personal");
    },
    async initData() { // 初始化数据
      this.userId = localStorage.getItem("userId");
      const res = await this.$http.get(`/users/${this.userId}`);
      const { name, personal } = res.data.data;
      this.name = name;
      this.personal = personal;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-header {
  height: 2rem;
  text-align: center;
  img {
    margin-top: 0.36rem;
    border-radius: 50%;
    width: 0.7rem;
    height: 0.7rem;
  }
  svg {
    position: absolute;
    right: 0.14rem;
    top: 0.14rem;
  }
  p {
    padding: 0;
    margin: 0;
    margin-top: 0.1rem;
    color: #757575;
    padding: 0 0.5rem;
    font-size: 12px;
  }
}
.user-main {
  // margin-top:.1rem;
  height: 0.76rem;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: space-around;
  span {
    color: #fe3758;
  }
  div {
    color: #787d85;
  }
  li {
    text-align: center;
  }
}
</style>