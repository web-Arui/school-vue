<template>
  <div class="category">
    <div  v-for="(item,index) in fen" :key="index" class="category-item" @click="fenl(item._id,item.category)">
      <van-col  span="6" offset="2" @click.prevent='fenl'>
        <img  :src='require(`@/assets/img/category_${index+1}.png`)' alt />
      </van-col>
      <van-col span="18">
        <div class="category-item-title">{{item.category}}</div>
        <div class="category-item-des">{{item.des}}</div>
      </van-col>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fen:'' // 分类数据
    }
  },
  inject:['msg'],
  mounted(){
   this.fen = this.msg.fen
  },
  methods:{
    fenl(id,name){
      this.$router.push({name:'fenlist',query:{id:id,name:name}})
    }
  }
};
</script>

<style lang="scss" scoped>
.category {
  display:flex;
  flex-wrap: wrap;
  margin-bottom: .52rem;
  &-item {
    width: 50%;
    &:active{
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
    }
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.8rem;
    border: 1px solid #ccc;
    margin-left: -2px;
   &-title{
     font-size: 14px;
   }
   &-des{
     font-size: 12px;
     color: #757575;
   }
  }
  img {
    width: 90%;
  }
}
</style>