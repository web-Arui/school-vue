<template>
  <div id="PersonalProfile">
  <van-nav-bar title="设置简介"  >
  <van-icon id="rele-incon" @click="onClickLeft" name="cross" slot="left" />
</van-nav-bar>
<van-field  type="textarea" v-model="value" placeholder="用一段话介绍一下自己吧" />
<van-button size="large" @click="setPer" style="margin-top:.4rem" type="danger">确定</van-button>
  </div>
</template>

<script>
export default {
  created(){
     this.userId = localStorage.getItem("userId");
  },
  data(){
    return {
      value:'',
      userId:''
    }
  },
methods: {
   // 修改资料
    async setPer() {
      if(this.value==''){
       return;
      }
      console.log(this.value)
      const res = await this.$http.put(`/users/${this.userId}`, {
         personal: this.value
      });
      if (res.data.meta.status == 200) {
        this.$toast.success("修改成功");
           this.$router.push('/personal')
        
      } else {
        this.$toast("服务器忙");
      }
    },
    onClickLeft() {
     this.$router.push('/user')
    },
  },

 
}
</script>

<style lang="scss" scoped>
#rele-incon{
  font-size: 26px;
  color: #000;
}
#PersonalProfile{
  .van-field--min-height{
   min-height: 1rem;
}
.upload{
  margin-top: .4rem;
  padding: 0 .1rem;
}
}


</style>