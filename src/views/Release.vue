<template>
  <div id="rele">
  <van-nav-bar :title="title"  >
  <van-icon id="rele-incon" @click="onClickLeft" name="cross" slot="left" />
</van-nav-bar>
<van-field  type="textarea" v-model="value" placeholder="写些什么和大家分享..." />
<!-- <div class="upload">
  <van-uploader :after-read="afterRead" />
</div> -->
<van-button size="large" @click="commit" style="margin-top:.4rem" type="primary">确认发布</van-button>
  </div>
</template>

<script>
export default {
methods: {
    onClickLeft() {
     this.$router.push('/talk')
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
   async initTile(){ // 初始化标题
        const res = await this.$http.get(`/talks/category/${this.$route.query.id}`) 
        this.title= res.data.data.category
    },
   async commit(){ // 发布帖子
      if(this.value.length<4){
     
          this.$notify('分享内容不能小于4个字');
      }else{
     
      const res = await this.$http.post(`/talks/${this.userId}/category/${this.$route.query.id}`,{content:this.value})
      if(res.data.meta.status==200){
        this.$toast('发布成功');
        this.$router.push('/talk')
        return;
      }
      this.$notify('服务器忙');
      }
    }
  
  },
 data(){
   return{
     title:'', // 标题
     value:'', // 分享内容
     userId:'', // 用户id
   }
 },
 created(){
   this.userId = localStorage.getItem("userId");
  this.initTile()

 }
}
</script>

<style lang="scss" scoped>
#rele-incon{
  font-size: 26px;
  color: #000;
}
#rele{
  .van-field--min-height{
   min-height: 1rem;
}
.upload{
  margin-top: .4rem;
  padding: 0 .1rem;
}
}


</style>