<template>
    <div id="fen">
        <van-nav-bar fixed :title="fens" left-arrow @click-left="onClickLeft" />
        <van-pull-refresh class="cont" v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" :immediate-check="false" @load="onLoad">
        <div v-for="(item,index) in talks" :key="index" class="articleList" @click="tip(item)">
          <div class="listAvatar">
            <div>
              <img
                src="../assets/img/avatar-1.jpg"
                style=" vertical-align: middle;"
                width="100%"
                alt
              />
              <span>{{" "+item.users[0].name}}</span>
            
            </div>
            <div class="category">{{fens}}</div>
          </div>
          <div class="listItem">
            <!-- <p style="font-size:15px;font-weight: 700;">我说CSS类名可以缩写，你们不要打我</p> -->
            <p class="newest-content" style>{{item.content}}</p>
            <!-- <img src="../../assets/img/avatar-1.jpg" alt /> -->
          </div>
          <div class="listSome">
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianzan-copy" />
              </svg>123
            </div>
            <div style="margin-left: .2rem;flex:2">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xinxi-copy" />
              </svg>18
            </div>
            <div class="time"> 
                     {{item.date|zctime}}
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false, // 判断数据是否请求来了
      list: [],
      loading: false, //  false表示底部数据来了
      finished: false,
      talks: [],
      pagenumber: 1,// 页码
      id:'', //分类id
      fens:'',//分类名字
    };
  },
  mounted() {},

  methods: {
      onClickLeft(){ //返回
          this.$router.go(-1)
      },
      onRefresh() {
      // 下拉触发的方法
      setTimeout(() => {
        // 可以上拉
        this.finished = false;
        this.initData();
        this.$toast("刷新成功");
        this.isLoading = false;
        // this.count++;
      }, 500);
    },
    async onLoad() {
      // 到底部了触发
      this.pagenumber = this.pagenumber + 1;
      const res = await this.$http.get(
        `/talks/categorys/${this.id}?pagesize=5&pagenumber=${this.pagenumber}`
      );
      const {
        data,
        meta: { status }
      } = res.data;
      if (status == 200) {
        setTimeout(() => {
          // 加载状态结束
          this.loading = false;
          this.talks = [...this.talks, ...data];
          // console.log(this.talks);
        }, 500);

        // 数据全部加载完成
        if (data.length < 5) {
          this.finished = true;
        }
      } else {
        this.$toast("服务器忙");
      }
    },
    async initData() {
      // 初始化数据
      const res = await this.$http.get(`/talks/categorys/${this.id}?pagesize=5&pagenumber=1`);
      const {
        data,
        meta: { status }
      } = res.data;
      if (status == 200) {
        this.talks = data;
        console.log(data);
      } else {
        this.$toast("服务器忙");
      }
    },
    async tip(item){
      // 跳转详情页
      console.log(item._id)
      this.$router.push({name:'cominfo',query:{id:item._id}})
      
    }
  },
  created() {
    this.id=this.$route.query.id
    this.fens = this.$route.query.name
    this.initData();
  },
};
</script>

<style lang="scss" scoped>
#fen {
  background-color: #f4f6f9;
}
.cont{
    margin-top: .46rem;
}
    .articleList {
        
  &:active{
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
  }
  margin-top: 0.1rem;
  padding: 0.1rem 0.2rem;
  padding-bottom: 0.06rem;
  background-color: white;
  .listAvatar {
    line-height: 0.3rem;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .category{
      // background-color: #fe3758;
      color: #f57089;
      background:  #fff0f5;
      border-radius: 20px/18px;
      padding: 0 .16rem;
      margin-right:-.1rem ;
    }
    img {
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
    }
  }
  .listItem {
    margin-top: 0.06rem;
    display: flex;
    
    img {
      // width: 70px;
      height: 70px;
    }
  }
  .listSome {
    margin-top: 0.06rem;
    font-size: 12px;
    display: flex;
    // justify-content: space-between;
    svg {
      font-size: 20px;
      vertical-align: bottom;
    }
  }
}
.articleList:nth-child(1) {
  margin-top: 0;
}
.newest-content {
  font-size: 16px;
  margin-top: 0.06rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>