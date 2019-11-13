<template>
  <div>
    <van-nav-bar title="登陆">
      <van-icon id="rele-incon" @click="onClickLeft" name="cross" slot="right" />
    </van-nav-bar>
    <div class="login">
      <img
        src="../assets/img/logo.png"
        alt
        width="50"
        style="margin-top:.2rem;margin-left:-.06rem;"
      />
      <div class="login-text">
        <!-- <p>您好，</p> -->
        <p>欢迎来到SC</p>
      </div>

      <div v-show="isMsg" :class="loginMsgStyle">密码或用户名错误</div>

      <div class="login-input">
        <div>
          <input type="text" v-model="user" placeholder="请输入您的账号" />
        </div>

        <div>
          <input type="password" v-model="password" placeholder="请输入您的密码" />
        </div>
      </div>
      <div class="login-btn">
        <div :class="isBtnColor" @click="login">登陆</div>
        <p>
          还没有账号？
          <span @click="$router.push('/register')">立即注册</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      password: "",
      user: "",
      isMsg: false, // 登陆信息
      loginMsgStyle: "login-msg"
    };
  },
  computed: {
    isBtnColor: function() {
      return this.password && this.user ? "isBtnColor" : "";
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    async login() {
      if (this.user && this.password) {
        const res = await this.$http.post("/users/login", {
          password: this.password,
          name: this.user
        });
        const { meta ,data } = res.data;
        
        if (meta.status == 200) {
          const id =res.data.data.user._id
          const token = res.data.data.token
          localStorage.setItem("userId",id)
          localStorage.setItem("token",token)
          this.$store.commit('setToken',token)
          this.$router.push("/talk");
        
          this.$toast("登陆成功");
        } else {
          this.isMsg = true;
          this.password = "";
          this.loginMsgStyle = " login-msg active";
          var timeId = setTimeout(() => {
            this.loginMsgStyle = "login-msg";
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
.login {
  width: 2.9rem;
  margin: 0 auto;
  // border:1px solid pink;
  .login-text {
    p {
      margin: 0;
      padding: 0;
      font-size: 26px;
    }
  }
  .login-input {
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
  .login-msg {
    width: 2.9rem;
    height: 0.4rem;
    background-color: #fef0f0;
    color: #f56c6c;
    border-radius: 6px;
    text-align: center;
    line-height: 0.4rem;
    margin-top: 0.1rem;
  }
  .login-msg.active {
    animation: msg 1s;
  }
  .login-btn {
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
      box-shadow: 0 0 6px -3px rgba(0, 0, 0, 0.3);
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