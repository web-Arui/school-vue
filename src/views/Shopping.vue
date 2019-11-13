<template>
    <div id="shop">
        <div class="black" @click="black"><van-icon name="arrow-left" size="26px"/></div>
        <div class="headeImg">
            <img :src="img">
        </div>
        <div class="content">
            <span class="sp">￥{{all.pirce}}.00</span>
            <p>{{all.des}}</p>
       </div>
        <div class="detail">
            <span class="detail-a">领卷</span>
            <span class="detail-b">:满300享9折</span>
            <span class="detail-c">:拼购专享</span>
        </div>
        <div class="text">
            商家发货&售后 · 7天无理由退货
        </div>
        <div class="gap"></div>
        <div class="foot-a">
            <span class="foot-aa"></span>
            <span class="foot-ab">272人正在拼购，可直接参与</span>
            <span class="foot-ac"></span>
        </div>
        <div class="foot-b">
            <div class="foot-ba"><img src="https://wq.360buyimg.com/img/pingou-head/7.jpg"></div>
            <div class="foot-bb">
                <p class="tm">二月的团</p>
                <p class="tt">
                        两人拼团,还差<em>1</em>成团
                    <small>剩余00:00:00:0</small>
                </p>
            </div>
            <div class="foot-bc">去参团</div>
        </div>
        <div class="foot-c">
            <div class="foot-ca"><img src="https://wq.360buyimg.com/img/pingou-head/7.jpg"></div>
            <div class="foot-cb">
                <p class="tm">白天的团</p>
                <p class="tt">
                        两人拼团,还差<em>1</em>成团
                    <small>剩余00:00:00:0</small>
                </p>
            </div>
            <div class="foot-cc">去参团</div>
        </div>

       <van-goods-action>
  <van-goods-action-icon
    icon="chat-o"
    text="客服"
    bind:click="onClickIcon"
  />
  <van-goods-action-icon
    icon="cart-o"
    text="购物车"
    :info="gwc"
    @click="onClickIcon"
  />
  <van-goods-action-button
    text="加入购物车"
    type="warning"
    @click="onClickButton"
  />
  <van-goods-action-button
    text="立即购买"
    type="danger"
    @click="onClickButto"
  />
</van-goods-action>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cid:'',//商品id
                all:'', //商品的所有内容
                uid:'',//用户id
                gwc:'', //购物车的数量
                index:'',//第几个图片
                img:'',//图片
               
            }
        },
        methods:{
            async init(){ //获取一个商业的所有内容
                const res = await this.$http.get('/goods/'+this.cid)
                this.all = res.data.data
            },
            async init2(){ //购物车页面的数据
                const res = await this.$http.get('/shopping/carts/'+this.cid)
                const data = res.data.data
                let arr =[]
                for(let i =0 ; i < data.length;i++){
                    if(!data[i].items.length == 0){
                        arr.push(data[i])
                    }
                }
                this.gwc = arr.length
            },    
            onClickButton(){ //加入购物车
                this.$http.post('/shopping/cart',{sid:this.cid,uid:this.uid}).then(res=>{
                    if(res.data.meta.status==200){
                        this.$notify('加入成功');
                        this.init2()
                    }
                    if(res.data.meta.status==201){
                        this.$notify(res.data.meta.msg);
                    }
                   
                }).catch(err=>console.log(err))
            },
            black(){ //返回
                this.$router.go(-1)
            },
            onClickIcon(){ //去购物车
                this.$router.push({name:'cart'})
            },
            onClickButto(){
                this.$notify('余额不足');
            }
        },
        created(){
         window.scrollTo(0,0)
        
            this.index = Number(this.$route.query.index)+1
            this.img = require(`../assets/img/book-${this.index}.jpg`)
            this.uid = localStorage.getItem('userId')
            this.cid = this.$route.query.cid
            this.init()
            this.init2()
        }
    }
</script>

<style lang="scss" scoped>
    #shop{
       
        margin-bottom: .5rem;
        .black{
            position: absolute;
            left: .06rem;
            top: .14rem;
            .van-icon-arrow-left{
                padding: 4px;
                background: rgba(0,0,0,0.2);
                border-radius: 50%;
                color: white;
            }
        }
        .headeImg{
            width: 100%;
            height: 3.75rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .content{
            width: 100%;
            height: 0.98rem;
            padding: 0 .1rem;
            box-sizing: border-box;
            .sp{
                width: 100%;
                height: .5rem;
                color:#f57089;
                font-size: .26rem;
                font-weight: 700;
                line-height: .5rem;
            }
            p{
               margin: 0;
               padding: 0;
               display: -webkit-box;
               font-size: 16px;
               -webkit-line-clamp: 2;
               -webkit-box-orient: vertical;
               overflow: hidden;
               font-weight: 700;
            }
        }
        .detail{
            width: 100%;
            box-sizing: border-box;
            height: .35rem;
            padding: 0 .1rem;
            .detail-a{
                line-height: .35rem;
                font-size: .12rem;
                background: #f57089;
                padding: 3px;
                color: white;
                border-radius: 4px;
            }
            .detail-b{
                line-height: .35rem;
                font-size: .12rem;
                padding: 3px 2px 3px 2px;
                background: #fff0f0;
                color: #f57089;
                border-radius: 4px;
                margin-left: .08rem;
            }
            .detail-c{
                line-height: .35rem;
                font-size: .12rem;
                padding: 3px 2px 3px 2px;
                background: #fff0f0;
                color: #f57089;
                border-radius: 4px;
                margin-left: .08rem;
            }
        }
        .text{
            width: 100%;
            box-sizing: border-box;
            height: .35rem;
            padding: 0 .1rem;
            background: #fcfcfc;
            color: #999;
            font-size: .12rem;
            line-height: .35rem;
        }
        .gap{
            width: 100%;
            box-sizing: border-box;
            padding: .07rem 0;
            background: #f7f7f7;
        }
        .foot-a{
            width: 100%;
            box-sizing: border-box;
            padding: 0 .1rem;
            height: .44rem;
            background: #fff8f0;
            display: flex;
            .foot-ab{
                color: #ff911b;
                line-height: .44rem;
                font-size: .14rem;
                text-align: center;
                flex: .52;
            }
            .foot-aa{
                position: relative;
               flex: .24;
               line-height: .44rem;
               &::before{
                  content: "";
                  position: absolute;
                  z-index: 1;
                  pointer-events: none;
                  background-color: rgba(255,145,27,.5);
                  height: 1px;
                  left: 0;
                  right: 0;
                  bottom: 50%;
               }
               &::after{
                    content: "";
                    display: block;
                    width: 4px;
                    height: 4px;
                    position: absolute;
                    top: 45%;
                    right: 0;
                    background: rgba(255,145,27,.5);
                    transform: rotate(45deg);
                    transform-origin: 50% 50%;
               }
            }
            .foot-ac{
                position: relative;
                line-height: .44rem;
               flex: .24;
               &::before{
                  content: "";
                  position: absolute;
                  z-index: 1;
                  pointer-events: none;
                  background-color: rgba(255,145,27,.5);
                  height: 1px;
                  left: 0;
                  right: 0;
                  bottom: 50%;
               }
               &::after{
                    content: "";
                    display: block;
                    width: 4px;
                    height: 4px;
                    position: absolute;
                    top: 45%;
                    left: 0;
                    background: rgba(255,145,27,.5);
                    transform: rotate(45deg);
                    transform-origin: 50% 50%;
               }
            }
        }
        .foot-b{
            &::before{
                content: "";
                position: absolute;
                pointer-events: none;
                background-color: rgba(255,145,27,.3);
                height: 1px;
                right: 0;
                bottom: 0;
                left: .1rem;
            }
            position: relative;
            width: 100%;
            height: 0.6rem;
            box-sizing: border-box;
            padding: .1rem .1rem;
            background: #fff8f0;
            justify-content: space-around;
            display: flex;
            .foot-ba{
                height: .4rem;
                width: .4rem;
                border-radius: 50%;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .foot-bb{
                width: 2.23rem;
                height: .4rem;
                display: flex;
                justify-content: space-around;
                font-size: .12rem;
                .tm{
                    line-height: .4rem;
                    flex: .5;
                    margin: 0;
                }
                .tt{
                    flex: .5;
                    margin: 0;
                    margin-top: .05rem;
                    em{
                        color: #f57089;
                        font-style: normal;
                    }
                    small{
                        font-size: .1rem;
                        color: #999;
                        text-align: right;
                    }
                }
            }
            .foot-bc{
                width: .72rem;
                height: .3rem;
                line-height: .3rem;
                text-align: center;
                font-size: 14px;
                color: #fff;
                background-image: -webkit-gradient(linear,right top,left top,from(#f57089),to(#fe4040));
                background-image: -webkit-linear-gradient(right,#f57089,#fe4040);
                background-image: linear-gradient(270deg,#f57089,#fe4040);
                border-radius: 15px;
                transform: translateY(25%);
            }
        }
        .foot-c{
            width: 100%;
            height: 0.6rem;
            box-sizing: border-box;
            padding: .1rem .1rem;
            background: #fff8f0;
            justify-content: space-around;
            display: flex;
            .foot-ca{
                height: .4rem;
                width: .4rem;
                border-radius: 50%;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .foot-cb{
                width: 2.23rem;
                height: .4rem;
                display: flex;
                justify-content: space-around;
                font-size: .12rem;
                .tm{
                    line-height: .4rem;
                    flex: .5;
                    margin: 0;
                }
                .tt{
                    flex: .5;
                    margin: 0;
                    margin-top: .05rem;
                    em{
                        color: #f57089;
                        font-style: normal;
                    }
                    small{
                        font-size: .1rem;
                        color: #999;
                        text-align: right;
                    }
                }
            }
            .foot-cc{
                width: .72rem;
                height: .3rem;
                line-height: .3rem;
                text-align: center;
                font-size: 14px;
                color: #fff;
                background-image: -webkit-gradient(linear,right top,left top,from(#f57089),to(#fe4040));
                background-image: -webkit-linear-gradient(right,#f57089,#fe4040);
                background-image: linear-gradient(270deg,#f57089,#fe4040);
                border-radius: 15px;
                transform: translateY(25%);
            }
        }
        // .van-goods-action{
        //     margin-top: .5rem;
        // }
    }
</style>