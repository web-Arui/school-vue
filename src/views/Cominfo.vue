<template>
  <div id="comm">
    <van-nav-bar title="文章详情" fixed left-arrow @click-left="onClickLeft" />
    <div class="main-content" v-if="talk">
      <div class="mc-header">
        <img src="../assets/img/avatar-1.jpg" alt />
        <div class="mc-title">
          <div class="mc-name">{{talk.users[0].name}}</div>
          <div class="mc-date">{{talk.date|convertTime('YYYY-MM-DD')}}</div>
        </div>
      </div>
      <div class="mc-text">{{talk.content}}</div>
    </div>
    <div class="mc-line"></div>
    <!-- 评论区 -->
    <div class="headd">
      <span>最新评论</span>
    </div>
    <div v-if="comment.length===0" class="hidden">再怎么找页没有啦</div>
    <div v-else class="list" v-for="(item,index) in comment" :key="index">
      <div class="avator">
        <img
          src="../assets/img/avatar3.jpg"
        />
      </div>
      <div class="listi">
        <div class="name">
          <span class="namel">{{item.users[0].name}}</span>
          <span class="sj">{{item.date|zctime}}</span>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="reply">
          <div></div>
          <div class="hf" @click="onReply(item.users[0],item)">回复</div>
        </div>
        <div v-if="item.replys.length" class="comments">
          <p class="cma" v-for="(itemx,index) in item.replys" :key="index" v-show="index<4">
            <a class="mz">{{itemx.users[0].name}}</a>
            <span class="cont">:{{itemx.content}}</span>
          </p>
          <van-cell is-link @click="showPopup(item.replys)" class="altogether">
            共{{item.replys.length}}条回复
            <van-icon name="arrow" />
          </van-cell>
        </div>
      </div>
    </div>
    <!-- 评论框  -->
    <footer>
      <div class="foot">
        <div>
          <input
            type="text"
            :placeholder="placeholder"
            v-model="contenta"
            @keyup.enter="onSubmit"
            @blur="onBlur"
            ref="replyInput"
          />
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianzan-copy" />
          </svg>
        </div>
      </div>
    </footer>
    <!-- 弹窗 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <div class="detail">
        <div class="detail-l">
          <span class="pl">评论详情</span>
          <span class="xx">
            <van-icon name="cross" @click="tap" />
          </span>
        </div>
      </div>
      <div class="list" v-for="item in pi">
        <div class="avator">
          <img
            src="//img10.360buyimg.com/mobilecms/s600x600_jfs/t30277/68/1055267295/122953/a05963d4/5c05fb4bN2d8a2993.jpg!q70.jpg"
          />
        </div>
        <div class="listi">
          <div class="name">
            <span class="namel">{{item.users[0].name}}</span>
            <span class="sj">{{item.date|zctime}}</span>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="reply">
            <div></div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      _id: "",
      userid: "", //用户id
      contenta: "", // 评论框的值
      comment: [], // 评论与回复
      talk: "", // 贴子内容
      pi: "", // 传递过的回复内容
      placeholder: "说点什么吧", // input提示
      mid:'', // 目标用户id
      fId:'', // 评论id
    };
  },
  methods: {
    showPopup(res) {
      this.pi = res;
      this.show = true;
    },
    tap() {
      this.show = false;
    },
    async initData() {
      //初始化数据
      const res = await this.$http.get("/talks/" + this._id);

      this.talk = res.data.data.talk[0];
      let comment = res.data.data.comment;
      let reply = res.data.data.reply;
      for (let i = 0; i < comment.length; i++) {
        for (let j = 0; j < reply.length; j++) {
          if (comment[i]._id === reply[j].fId) {
            comment[i].replys.push(reply[j]);
          }
        }
      }
      this.comment = comment;
    },
    async pinlu() { // 发送评论或回复
      if (this.placeholder === "说点什么吧") {
        const res = await this.$http.post("/users/" + this.userid + "/talks/" + this._id,{ content: this.contenta });
      if(res.data.meta.status===200){
        this.$toast('评论成功');
      }
      }else{
      const res = await this.$http.post(`/users/${this.userid}/talks/${this._id}/${this.mid}`,{content: this.contenta,commentType:'reply',fId:this.fId})
      this.placeholder = "说点什么吧";
      this.contenta = "";
      if(res.data.meta.status===200){
        this.$toast('回复成功');
      }
      }
    },
    onSubmit() {
      //回车
      this.pinlu();
      this.contenta = "";
      this.initData();
    },
    // 返回首页
    onClickLeft() {
      this.$router.go(-1);
    },
    onReply(user,f) { // 点击回复
      console.log(f)
      this.fId = f._id
      this.mid = user._id
      // 回复评论
      this.$refs.replyInput.focus();
      this.placeholder = "回复 " + "@" + user.name;
    },
    onBlur() {
      // input 失去焦点触发
      this.placeholder = "说点什么吧";
      this.contenta = "";
    }
  },

  created() {
    this.userid = localStorage.getItem("userId");
    this._id = this.$route.query.id; //获取用户id
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
#comm {
  margin-bottom: 0.36rem;
  width: 100%;
  .main-content {
    margin-top: 0.48rem;
    padding: 0 0.1rem;
    .mc-header {
      display: flex;
      img {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
      }
      .mc-title {
        margin-left: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .mc-name {
          font-size: 14px;
          font-weight: 700;
        }
        .mc-date {
          color: #ccc;
          font-size: 12px;
        }
      }
    }
    .mc-text {
      margin-top: 0.1rem;
    }
  }
  .headd {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.1rem;

    span {
      font-size: 14px;
      display: inline-block;
      margin-top: 0.04rem;
    }
  }
  .list {
    width: 100%;
    box-sizing: border-box;
    padding: 0.1rem 0.1rem;
    display: flex;
    border-bottom: 1px solid #f4f5f7;
    .avator {
      width: 0.3rem;
      height: 0.3rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .listi {
      margin-left: 0.1rem;
      width: 100%;
      .name {
        display: flex;
        justify-content: space-between;
        .namel {
          color: #fb7299;
          font-size: 13px;
        }
        .sj {
          color: #999;
          font-size: 10px;
        }
      }
      .content {
        color: #212121;
        font-size: 14px;
        margin-top: 0.1rem;
      }
      .reply {
        display: flex;
        justify-content: space-between;
        margin-top: 0.1rem;
        .hf {
          color: #999;
          font-size: 12px;
        }
      }
      .comments {
        background: #f4f4f4;
        box-sizing: border-box;
        margin-top: 0.03rem;
        padding: 0 0.1rem 0.06rem 0.1rem;
        border-radius: 4px;
        .cma {
          margin: 0;
          padding-top: 0.06rem;
          color: #212121;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          .mz {
            color: #5090cc;
          }
          .cont {
            overflow: hidden;
          }
        }
        .altogether {
          margin: 0;
          padding: 0;
          // width: .85rem;
          background: #f4f4f4;
          color: #5090cc;
          .van-cell__value--alone {
            color: #5090cc;
          }
          .van-cell__right-icon {
            color: #5090cc;
            margin: 0;
            display: none;
          }
          .van-icon-arrow {
            font-size: 10px;
            // vertical-align: bottom;
          }
        }
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0.1rem;
    border-top: 1px solid #f4f4f4;
    .foot {
      display: flex;
      justify-content: space-between;
      input {
        border: none;
        background: #f4f4f4;
        border-radius: 13px;
        padding: 0.05rem 0 0.05rem 0.1rem;
        font-size: 13px;
        width: 3rem;
        caret-color: #fb7299;
        color: #999;
      }
    }
  }
  .van-popup--bottom {
    .detail {
      width: 100%;
      box-sizing: border-box;
      padding: 0.1rem;
      border-bottom: 1px solid #f4f4f4;
      .detail-l {
        display: flex;
        justify-content: space-between;
        .pl {
          font-size: 14px;
          color: #212121;
        }
        .xx {
          color: #999;
        }
      }
    }
    .list {
      width: 100%;
      box-sizing: border-box;
      padding: 0.1rem 0.1rem;
      display: flex;
      border-bottom: 1px solid #f4f5f7;
      .avator {
        width: 0.3rem;
        height: 0.3rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .listi {
        margin-left: 0.1rem;
        .name {
          display: flex;
          justify-content: space-between;
          .namel {
            color: #fb7299;
            font-size: 13px;
          }
          .sj {
            color: #999;
            font-size: 10px;
          }
        }
        .content {
          color: #212121;
          font-size: 14px;
          margin-top: 0.1rem;
        }
        .reply {
          display: flex;
          justify-content: space-between;
          margin-top: 0.1rem;
          .hf {
            color: #999;
            font-size: 12px;
          }
        }
      }
    }
  }
}
.mc-line {
  background: #f4f4f4;
  height: 4px;
  width: 100%;
  margin-top: 0.06rem;
}
.hidden {
  margin-top: 1rem;
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>