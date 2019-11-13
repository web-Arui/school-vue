<template>
  <div>
    <van-nav-bar title="注册">
      <van-icon id="rele-incon" @click="onClickLeft" name="cross" slot="right" />
    </van-nav-bar>
    <div class="rigister">
      <img
        src="../assets/img/logo.png"
        alt
        width="50"
         style="margin-top:.2rem;margin-left:-.06rem;"
      />
      <div class="rigister-text">
        <p>欢迎加入SC</p>
      </div>
       <div v-show="isMsg" :class="loginMsgStyle">{{rmsg}}</div>
      <div class="rigister-input">
        <div>
          <input type="text" v-model="user" placeholder="请输入您的账号" />
        </div>

        <div>
          <input type="password" v-model="password" placeholder="请输入您的密码" />
        </div>
        <div>
          <input type="password" v-model="repassword" placeholder="请输入确认密码" />
        </div>
      </div>
      <div class="rigister-btn">
        <div  :class="isBtnColor" @click="register">注册</div>
        <p>
          已有账号？
          <span @click="$router.push('/login')">立即登陆</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
     return {
       password:'',
       repassword:'',
       user:'',
       isMsg: false, // 登陆信息
      loginMsgStyle: "register-msg",
      rmsg:''
     }
  },
  computed:{
    isBtnColor: function() {
      return this.password && this.user &&this.repassword? "isBtnColor" : "";
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
        async register() {
      if (this.user && this.password&&this.repassword) {
        if(this.password!==this.repassword){
           this.rmsg= '二次密码不一致'
        }
        const res = await this.$http.post("/users/register", {
          password: this.password,
          name: this.user
        });
        const { meta } = res.data;
        if (meta.status == 200) {
          this.$router.push("/login");
          this.$toast("注册成功");
        } else {
          this.rmsg = '服务器忙'
          if(meta.status==409){
            this.rmsg= '用户名已被注册'
        }
         
          this.isMsg = true;
          this.password = "";
           this.repassword = "";
          this.loginMsgStyle = " register-msg active";
          var timeId = setTimeout(() => {
            this.loginMsgStyle = "register-msg";
            clearTimeout(timeId);
          }, 2000);
        }
        
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#rele-incon {
  font-size: 22px;
  color: #000;
}
#rele {
  .van-field--min-height {
    min-height: 1rem;
  }
}
.rigister {
  width: 2.9rem;
  margin: 0 auto;
  // border:1px solid pink;
  .rigister-text {
    p {
      margin: 0;
      padding: 0;
      font-size: 26px;
    }
  }
  .rigister-input {
    width: 100%;
    // margin-top: 0.1rem;
    text-align: center;
    input {
      margin-top: 0.2rem;
      width: 2.62rem;
      height: 0.4rem;
      border: 1px solid #e1e2e4;
      border-radius: 0.25rem;
      padding: 0 0.14rem;
      caret-color: #fb1a2f;
    }
  }
  .register-msg {
    width: 2.9rem;
    height: 0.4rem;
    background-color: #fef0f0;
    color: #f56c6c;
    border-radius: 6px;
    text-align: center;
    line-height: 0.4rem;
    margin-top: 0.1rem;
  }
  .register-msg.active {
    animation: msg 1s;
  }
  .rigister-btn {
    margin-top: 0.4rem;
    > div {
      background: #e6e8ea;
      margin: 0 auto;
      width: 2.62rem;
      height: 0.4rem;
      //  border: 1px solid #e1e2e4;
      border-radius: 0.25rem;
      padding: 0 0.14rem;
      text-align: center;
      line-height: 0.4rem;
    }
    .isBtnColor {
      background: #fc4a5b;
      color: #fff;
    }
    > p {
      font-size: 14px;
      margin: 0;
      padding: 0;
      margin-top: 0.1rem;
      text-align: center;
      color: #e6e8ea;
      > span {
        color: #fb1a2f;
      }
    }
  }
}
@keyframes msg {
  from,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0);
  }
}
</style>