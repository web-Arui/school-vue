<template>
  <div class="home">
    <div class="backgroun">
      <div class="head">
        <div>
          <van-icon name="wap-nav" class="tb" />
        </div>
        <div>
          <van-search v-model="searchValue" shape="round" placeholder="请输入搜索关键词">
            <svg slot="left-icon" class="icon icon-search" aria-hidden="true">
              <use xlink:href="#icon-sousuo" />
            </svg>
            <svg slot="right-icon" class="icon icon-search" aria-hidden="true">
              <use xlink:href="#icon-luyin" />
            </svg>
          </van-search>
        </div>
        <div>
          <span class="sy">你好!</span>
        </div>
      </div>
      <van-swipe class="tbr" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="imgs">
          <img
            src="//imgcps.jd.com/ling4/5572930/5Liq5oqk5YGl5bq36LSt6auY5pWI/5aW95ZOB6LSo5peg6ZyA5aSa6K-0/p-5c17126882acdd181dd53ccf/28678485/cr_1125x445_0_171/s1125x690/q70.jpg"
          />
        </van-swipe-item>
        <van-swipe-item class="imgs">
          <img
            src="//imgcps.jd.com/ling4/5572930/5Liq5oqk5YGl5bq36LSt6auY5pWI/5aW95ZOB6LSo5peg6ZyA5aSa6K-0/p-5c17126882acdd181dd53ccf/28678485/cr_1125x445_0_171/s1125x690/q70.jpg"
          />
        </van-swipe-item>
        <van-swipe-item class="imgs">
          <img
            src="//imgcps.jd.com/ling4/5572930/5Liq5oqk5YGl5bq36LSt6auY5pWI/5aW95ZOB6LSo5peg6ZyA5aSa6K-0/p-5c17126882acdd181dd53ccf/28678485/cr_1125x445_0_171/s1125x690/q70.jpg"
          />
        </van-swipe-item>
        <van-swipe-item class="imgs">
          <img
            src="//m.360buyimg.com/mobilecms/s700x280_jfs/t1/47508/31/10843/147746/5d80988eE916d7d72/6667b2d82acc1a16.jpg!cr_1125x445_0_171!q70.jpg.dpg"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="activity">
      <img
        src="http://img51.ddimg.cn/222060123100431_y.jpg"
      />
    </div>

    <van-swipe :loop="false" :touchable="true" indicator-color="#f57089">
      <van-swipe-item>
        <div class="event">
          <div class="event-d">
            <img src="../assets/img/shoop-1.png" />
          </div>
          <div class="event-d">
            <img src="../assets/img/shoop-2.png" />
          </div>
          <div class="event-d">
            <img src="../assets/img/shoop-3.png" />
          </div>
          <div class="event-d">
            <img src="../assets/img/shoop-4.png" />
          </div>
          <div class="event-d">
            <img src="../assets/img/shoop-5.png" />
          </div>
          <div class="event-d">
            <img src="../assets/img/shoop-6.jpg" />
          </div>
          <div class="event-d">
            <img src="../assets/img/shoop-7.png" />
          </div>
          <div class="event-d">
            <img src="../assets/img/shoop-8.png" />
          </div>
          <div class="event-d">
            <img src="../assets/img/shoop-9.png" />
          </div>
          <div class="event-d">
            <img src="../assets/img/shoop-10.jpg" />
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="event">
          <div class="event-d">
            <img src="../assets/img/shoop-1.png" />
          </div>
           <div class="event-d">
            <img src="../assets/img/shoop-2.png" />
          </div>
          <div class="event-d">
            <img src="../assets/img/shoop-3.png" />
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="recmmed">
      <img
        src="//img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png"
      />
    </div>
    <div class="bigBox">
      <div class="small" v-for="(item,index) in all" :key="index" @click="rap(item._id,index)">
        <img
          :src='item.img'/>
        <span class="spa">{{item.des}}</span>
        <p class="p1"><span class="sp">限时抢</span></p>
        <p class="p2">
          <span class="sp">￥{{item.pirce}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plans: "", //商品分类
      all: "", //全部商品
      searchValue: "",
      img:[
        {img:require('../assets/img/book-1.jpg')},
        {img:require('../assets/img/book-2.jpg')},
        {img:require('../assets/img/book-3.jpg')},
        {img:require('../assets/img/book-4.jpg')},
        {img:require('../assets/img/book-5.jpg')},
        {img:require('../assets/img/book-6.jpg')},
      ]
    };
  },
  methods: {
    rap(id,index) {
      this.$router.push({ name: "shopping", query: { cid: id,index:index } });
    },
    async init() {
      //商品分类数据
      const res = await this.$http.get("/goods/rank");
      this.plans = res.data.data;
    },
    async init2() {
      //全部商品
      const res = await this.$http.get("/goods/good");
      let all = res.data.data;
      for(var i =0 ; i<all.length;i++){
          all[i].img = this.img[i].img
      }
     this.all = all
    }
  },
  created() {
    this.init();
    this.init2();
  }
};
</script>

<style lang="scss" scoped>
.home{
  margin-bottom: .5rem;
}
.backgroun {
  background-color: #f57089;
}
.icon-search {
  font-size: 18px;
}
.van-swipe /deep/ .van-swipe__indicators {
  bottom: 7px;
}
.head {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 33;
  background: #f57089;
  display: flex;
  justify-content: space-around;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  .tb {
    font-size: 0.3rem;
    color: white;
  }
  .van-search {
    padding: 0;
    background: #f57089 !important;
  }

  .sy {
    display: inline-block;
    margin-top: 0.05rem;
    color: white;
  }
}
.tbr {
  width: 3.5rem;
  margin: 0 auto;
  padding-top: 35px;
  .imgs {
    img {
      margin-top: 0.1rem;
      width: 3.5rem;
      height: 1.4rem;
    }
  }
}
.activity {
  width: 100%;
  height: 1.15rem;
  padding: .1rem 0;
  background: #f0f2f5;
  img {
    width: 100%;
    height: 1.15rem;
  }
}
.event {
  text-align: center;
  // background: #ccc;
  background: #fff;
  width: 100%;
  height: 1.62rem;
  display: flex;
  flex-wrap: wrap;
  .event-d {
    width: 20%;
    height: 0.74rem;
    img {
      width: 0.74rem;
      height: 0.74rem;
      text-align: center;
      margin: 0 auto;
    }
    span {
      display: block;
      font-size: 0.12rem;
      color: #666;
      text-align: center;
      // display: inline-block;
      text-align: center;
    }
    .van-swipe__indicator {
      padding-top: 0.2rem;
    }
  }
  &:nth-child(-n + 5) {
    padding-top: 0.08rem;
  }
}
.recmmed {
  width: 100%;
  height: 0.35rem;
  background: #f0f2f5;
  // padding-left: .06rem;
  //   padding-right: .06rem;
  img {
    width: 95.5%;
    padding-left: 0.09rem;
    height: 0.35rem;
  }
}
.bigBox {
  padding: 0 0.05rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: #f0f2f5;
  .small {
    background: white;
    width: 48%;
    height: 2.51rem;
    margin-bottom: 0.06rem;
    img {
      width: 100%;
      height: 1.71rem;
    }
    .spa {
      display: -webkit-box;
      padding: 0 0.05rem;
      height: 0.31rem;
      font-size: 12px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .p1{
      margin: 0;
      margin-left: 0.04rem;
      .sp{
        background: #f57089;
        padding: 0 2px;
        margin-top: .02rem;
        border-radius: 2px;
        color: white;
        font-size: 12px;
      }
    }
    .p2 {
      width: 100%;
      margin: 0;
      .sp {
        font-size: 12px;
        width: 100%;
        &:first-child {
          color: #f57089;
          height: 100%;
          line-height: 0.26rem;
          margin-left: 0.04rem;
        }
        // &:last-child {
        //   height: 0.23rem;
        //   width: 0.7rem;
        //   color: #bfbfbf;
        //   border: 1px solid #bfbfbf;
        //   line-height: 0.25rem;
        //   text-align: center;
        //   margin-right: 0.06rem;
        // }
      }
    }
  }
}
</style>