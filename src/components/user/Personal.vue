<template>
  <div id="personal">
    <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-cell @click="show1=!show1" title="更换昵称" :value="name" size="large" />
      <van-cell @click="show2=!show2" title="更换性别" :value="gender=='male'?'男':'女'" size="large" />
      <van-cell title="编辑个人简介" size="large" @click="$router.push('/personalprofile')" />
    </van-cell-group>
    <van-button type="primary" size="large" @click="logout">更换账号</van-button>
    <van-popup class="pshow" round :style="{ height: '1.50rem',width:'90%' }" v-model="show1">
      <div class="setName">修改昵称</div>
      <input type="text" autofocus v-model="rename" placeholder="输入名称" />
      <div class="isQu">
        <span @click="show1=false">取消</span>
        <span @click="setName">确认</span>
      </div>
    </van-popup>
    <van-popup class="pshow2" round :style="{ height: '1.50rem',width:'90%' }" v-model="show2">
      <div class="setSex">请选择性别</div>
      <div class="querySex">
        <van-radio-group v-model="radio">
          <van-radio name="male" checked-color="#fe4040">男</van-radio>
          <van-radio name="fmale" checked-color="#fe4040">女</van-radio>
        </van-radio-group>
      </div>
      <div class="isQu2">
        <span @click="show2=false">取消</span>
        <span @click="setSex">确认</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  created() {
    this.initData();
  },
  data() {
    return {
      show1: false,
      show2: false,
      radio: "",
      gender: "", // 用户性别显示
      name: "", // 用户名显示
      userId: "", // 用户id
      rename: "" // 用户名
    };
  },
  methods: {
     logout() {
      // 退出
      localStorage.setItem("token", "");
      this.$router.push("/login");
    },
    // 修改性别
    async setSex() {
      const res = await this.$http.put(`/users/${this.userId}`, {
        gender: this.radio
      });
      this.show2 = false;
      if (res.data.meta.status == 200) {
        this.initData();
        this.$toast.success("修改成功");
      } else {
        this.$toast("服务器忙");
      }
    },
    // 修改用户名
    async setName() {
      const res = await this.$http.put(`/users/${this.userId}`, {
        name: this.rename
      });
      this.show1 = false;
      if (res.data.meta.status == 200) {
        this.initData();
        this.$toast.success("修改成功");
      } else {
        this.$toast("服务器忙");
      }
    },
    // 初始化数据
    initData() {
      this.userId = localStorage.getItem("userId");
      var q1 = this.$http.get(`/users/${this.userId}`);
      this.$http
        .all([q1])
        .then(
          this.$http.spread(res1 => {
            const { gender, name } = res1.data.data;
            this.gender = gender;
            this.name = name;
          })
        )
        .catch(error => {
          console.log(error);
        });
    },
    onClickLeft() {
      this.$router.push("/user");
    },
   
  }
};
</script>

<style lang="scss" scoped>
#personal {
  .van-icon {
    font-size: 20px;
    color: #000;
  }
  .pshow {
    .setName {
      font-size: 20px;
      margin: 0.2rem 0 0 0.2rem;
    }
    input {
      width: 2.8rem;
      font-size: 14px;
      padding: 0 0 0.06rem 0;
      border: none;
      border-bottom: 1.8px solid #fe4040;
      margin: 0.16rem 0 0 0.2rem;
    }
    .isQu {
      width: 0.8rem;
      font-size: 14px;
      float: right;
      margin-top: 0.26rem;
      margin-right: 0.3rem;
      display: flex;
      justify-content: space-between;
    }
  }
  .pshow2 {
    .setSex {
      font-size: 20px;
      margin: 0.2rem 0 0 0.2rem;
    }
    .querySex {
      // margin-top: .1rem;
      margin-left: 0.2rem;
    }
    .van-radio {
      margin-top: 0.1rem;
    }
    .isQu2 {
      width: 0.8rem;
      font-size: 14px;
      float: right;
      margin-top: 0.1rem;
      margin-right: 0.3rem;
      display: flex;
      justify-content: space-between;
    }
  }
}
.van-cell:active {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.05)
  );
}
</style>