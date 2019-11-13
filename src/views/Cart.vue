<template>
    <div id="card"> 
        <div class="head">
            <div class="gw">购物车</div>
            <div class="gl">管理</div>
        </div>
        <div class="number">共{{all.length}}件宝贝</div>
        <div class="tt" v-for="(item,index) in all" :key="index">
            <div class="business">
                <div class="business-a">
                    <div class="change"></div>
                    <div class="titi">天天商店<van-icon name="arrow" /></div>
                    <div class="sc" @click="del(item)">删除</div>
                </div>
            </div>
            <div class="lists">
                <div class="listi">
                    <div class="list-a">
                        <van-checkbox v-model="item.check"></van-checkbox>
                    </div>
                    <div class="list-b"><img :src='require(`@/assets/img/book-${item.items[0].pirce/10}.jpg`)'></div>
                    <div class="list-c">{{item.items[0].des}}</div>
                    <div class="listb-a">￥{{item.items[0].pirce}}</div>
                    <div class="listb-b"></div>
                </div>
            </div>
        </div>
        
        <van-submit-bar
          :price="pice"
          button-text="提交订单"
          @submit="onSubmit"
        >
          <van-checkbox v-model="allSelect">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script>
    export default {
        name:'Cart',
        data(){
            return{
                value:1,
                cid:'',//商品id
                all:'', //购物车页面数据
                allSelect:false,//全选
            }
        },
        computed:{
            pice(){ //价钱
                let num = 0
                if(this.allSelect == true){
                    for(let i = 0; i<this.all.length; i++){
                        num+=this.all[i].items[0].pirce*100
                    }
                }
                if(this.allSelect == false){
                    for(let i =0;i<this.all.length;i++){
                        if(this.all[i].check==true){
                            num+=this.all[i].items[0].pirce*100
                        }
                    }
                }
                return num
            }
        },
        watch:{
            allSelect(newM,oldM){ //监听全选和不全选
                if(newM == true){
                    for(let i = 0; i<this.all.length; i++){
                        this.all[i].check = true
                    }
                }else if(newM == false){ 
                   if(!this.all.length==0){
                        var flage=true
                    var j=this.all.length-1
                    while(true){
                        if(this.all[j].check==false){
                            flage=false
                           break;
                        }                   
                        j--
                        if(j==-1){
                        console.log(j)
                            break;
                        }   
                    }
                    if(flage){
                        for(let i = 0; i<this.all.length; i++){
                            this.all[i].check=false
                        }
                    }
                   }
                }
           },
           all:{
               deep:true,
               handler(newM,oldM){
                   if(!newM.length==0){
                       let status = newM.every(item=>item.check===true)
                   if(status){
                       this.allSelect = true
                   }else{
                       this.allSelect =false
                   }
                   }
               }
           }
        },
        methods:{
            onSubmit(){
                let status = this.all.some(item=>item.check==true)
                if(status){
                    this.$notify('余额不足');
                }else{
                    this.$notify('请选择商品')
                }
                
            },
            async init(){ //购物车页面的数据
                const res = await this.$http.get('/shopping/carts/'+this.cid)
                const data = res.data.data
                let arr =[]
                for(let i =0 ; i < data.length;i++){
                    if(!data[i].items.length == 0){
                        arr.push(data[i])
                    }
                }
                for(let j = 0; j<arr.length ; j++){
                    arr[j].check =false
                }
                this.all = arr
            },
            async del(item){
                console.log(item)
                const res = await this.$http.delete('/shopping/carts/'+item.sid+"/"+item._id)
                this.init()
            }
        },
        created(){
            this.cid = this.$route.query.cid
            this.init()
        }
    }
</script>

<style lang="scss" scoped>
    #card{
        min-height: 84vh;
        margin-bottom: 1.06rem;
        background: #f0f2f5;
        .head{
            width: 100%;
            padding: .2rem 0 .1rem 0;
            background-image: linear-gradient(-90deg, #fe4040 0%, #f1726e 100%);
            display: flex;
            justify-content: space-between;
            .gw{
                margin-left: .1rem;
                color: white;
                font-size: .2rem;
            }
            .gl{
                margin-right: .1rem;
                color: white;
            }
        }
        .number{
            width: 100%;
            box-sizing: border-box;
            padding: 0 .1rem;
                     background-image: linear-gradient(-90deg, #fe4040 0%, #f1726e 100%);

            color: white;
            font-size: .12rem;
            padding-bottom: .1rem;
        }
        &>div:nth-child(3) {
            >.business{
                width: 100%;
                height: .4rem;
                          background-image: linear-gradient(-90deg, #fe4040 0%, #f1726e 100%);

                padding: 0 .1rem;
                box-sizing: border-box;
                margin: 0;
            }
            .lists{
                width: 100%;
                height: 1.23rem;
                background:#f0f2f5;
                padding: 0 .1rem;
                box-sizing: border-box;
                .listi{
                    height: 100%;
                    background: white;
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    .list-a{
                        width: .21rem;
                        height: .21rem;
                        margin-top: .35rem;
                    }
                    .list-b{
                        width: .90rem;
                        height: .9rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .list-c{
                        width: 1.94rem;
                        height: .36rem;
                        display: -webkit-box;
                        font-size: 16px;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        font-size: 14px;
                        margin-top: .17rem;
                    }
                    .listb-a{
                        width: 30%;
                        color: red;
                        line-height: 28px;
                    }
                }
           }
        }

        
        .tt{
            .business{
                width: 100%;
                height: .4rem;
                background:#f0f2f5;
                padding: 0 .1rem;
                box-sizing: border-box;
                margin-top: .1rem;
                .business-a{
                    background: white;
                    height: 100%;
                    position: relative;
                    border-top-right-radius: 8px;
                    border-top-left-radius: 8px;
                    border-bottom: 1px solid white;
                    .change{
                        margin-left: .1rem;
                        padding-top: .1rem;
                        width: .21rem;
                        height: .21rem;
                    }
                    .titi{
                        position: absolute;
                        top: .1rem;
                        left: 15%;
                        .van-icon-arrow{
                            position: absolute;
                            top: .04rem;
                            left: 100%;
                        }
                    }
                    .sc{
                        position: absolute;
                        top: .06rem;
                        right: .06rem;
                        color: #fb1a2f;
                        padding: 4px 4px;
                        border: 1px solid #fb1a2f;
                        border-radius: 12px;
                        font-size: 12px;
                    }
                }
            }
            .lists{
                width: 100%;
                height: 1.23rem;
                background:#f0f2f5;
                padding: 0 .1rem;
                box-sizing: border-box;
                .listi{
                    height: 100%;
                    background: white;
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    .list-a{
                        width: .21rem;
                        height: .21rem;
                        margin-top: .35rem;
                    }
                    .list-b{
                        width: .90rem;
                        height: .9rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .list-c{
                        width: 1.94rem;
                        height: .36rem;
                        display: -webkit-box;
                        font-size: 16px;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        font-size: 14px;
                        margin-top: .17rem;
                    }
                    .listb-a{
                        width: 30%;
                        color: red;
                        line-height: 28px;
                    }
                }
            }
        }
    }
   /deep/ .van-submit-bar{
        bottom: .49rem;
    }
</style>