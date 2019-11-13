<template>
  <div id="home">
    
      <router-view />
   
    <van-tabbar v-if="tabbarShow" v-model="active" route>
      <van-tabbar-item to="/talk">
        <span class="tabbar-font">首页</span>
        <svg class="icon" aria-hidden="true" slot="icon" slot-scope="props">
          <use :xlink:href="props.active ? icon1.active : icon1.normal" />
        </svg>
      </van-tabbar-item>
      <van-tabbar-item to="/sohome">
        <span class="tabbar-font">商城</span>
        <svg class="icon" aria-hidden="true" slot="icon" slot-scope="props">
          <use :xlink:href="props.active ? icon2.active : icon2.normal" />
        </svg>
      </van-tabbar-item>
      <van-tabbar-item @click=" clickPush">
        <span class="tabbar-font">发布</span>
        <svg class="icon" aria-hidden="true" slot="icon" slot-scope="props">
          <use :xlink:href="props.active ? icon3.active : icon3.normal" />
        </svg>
      </van-tabbar-item>
      <van-tabbar-item to="/cart">
        <span class="tabbar-font">购物车</span>
        <svg class="icon" aria-hidden="true" slot="icon" slot-scope="props">
          <use :xlink:href="props.active ? icon4.active : icon4.normal" />
        </svg>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <span class="tabbar-font">个人中心</span>
        <svg class="icon" aria-hidden="true" slot="icon" slot-scope="props">
          <use :xlink:href="props.active ? icon5.active : icon5.normal" />
        </svg>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 发布弹出层 -->
    <van-popup style="width:100%;height:2.8rem" position="bottom" v-model="show">
      <div class="group">
        <ul class="release">
          <router-link
            v-for="(item,index) in fen"
            :key="index"
            tag="li"
            :to="{name:'release', query: {id: item._id} }"
            @click.native="routerFen"
          >
            <img :src="require(`@/assets/img/category_${index+1}.png`)" alt />
            <div>{{item.category}}</div>
          </router-link>
        </ul>
        <div class="icon-cross">
          <van-icon @click="isShow" name="cross" />
        </div>
      </div>
    </van-popup>
  </div>
</template>
 <script>
document.addEventListener("DOMContentLoaded", () => {
  // 获取html宽度 浏览器兼容 苹果5默认html font-size 16px
  let htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  // 获取html对象
  let htmlDom = document.getElementsByTagName("html")[0];
  // 页面宽度固定不能大于750
  if (htmlWidth > 750) {
    htmlWidth = 750;
  }
  // 网易的方案
  // 苹果6 物理375px 设计稿750px  375/3.75=100  1rem=100px  375/7.5=100 1rem = 50px
  htmlDom.style.fontSize = htmlWidth / 3.75 + "px";
});
export default {
  created() {
    if (
      this.$route.name == "user" ||
      this.$route.name == "talk" ||
      this.$route.name == "cart" ||
      this.$route.name == "sohome"
    ) {
      this.tabbarShow = true;
    } else {
      this.tabbarShow = false;
    }
    this.initFen();
  },
  provide() {
    // 提供变量
    return {
      msg: this
    };
  },

  watch: {
    $route: function(n, o) {
      if (
        n.name == "user" ||
        n.name == "talk" ||
        n.name == "cart" ||
        n.name == "sohome"
      ) {
        this.tabbarShow = true;
      } else {
        this.tabbarShow = false;
      }
    }
  },
  data() {
    return {
      fen: "", // 帖子分类
      tabbarShow: true,
      active: 0,
      show: false, // 弹出层显示
      icon1: {
        normal: "#icon-shouye-copy",
        active: "#icon-shouye"
      },
      icon2: {
        normal: "#icon-xinxi-copy",
        active: "#icon-xinxi"
      },
      icon3: {
        normal: "#icon-add2",
        active: "#icon-add2"
      },
      icon4: {
        normal: "#icon-sousuo-copy",
        active: "#icon-sousuo"
      },
      icon5: {
        normal: "#icon-wode-copy",
        active: "#icon-wode"
      }
    };
  },
  methods: {
    clickPush() {
      this.show = !this.show;
    },
    isShow() {
      this.show = false;
    },
    routerFen() {
      this.show = false;
    },
    async initFen() {
      const res = await this.$http.get(`/talks/category`);
      this.fen = res.data.data;
    }
  }
};
</script>
 
<style lang="scss" scoped>
#home {
  color: #110f10;
  font-size: 16px;
  height: 100%;
  svg {
    font-size: 24px;
  }
  .tabbar-font {
    font-size: 10px;
    font-weight: 700;
  }
  .van-tabbar-item--active {
    color: #fe4040;
  }
  .van-tabbar-item:active {
    background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.05)
    );
  }
}
.group {
  margin-top: 0.2rem;

  .release {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
    font-size: 12px;
    > li {
      width: 25%;
      margin-bottom: 0.06rem;
    }
    img {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .icon-cross {
    font-size: 26px;
    text-align: center;
    margin-top: 0.2rem;
  }
}
</style>
