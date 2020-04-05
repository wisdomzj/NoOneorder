<template>
  <div id="pcontent">
    <router-link to="/home">
      <div class="back">返回</div>
    </router-link>

    <div class="p_content">
      <div class="p_info">
        <img :src="websiteUrl+detail.img_url" />
        <h2>{{detail.title}}</h2>
        <p class="price">{{detail.price}}元/份</p>
      </div>
      <div class="p_detial">
        <h3>商品详情</h3>
        <div class="p_content" v-html="detail.content"></div>
      </div>
    </div>

    <footer class="pfooter">
      <div class="cart">
        <strong>数量:</strong>
        <div class="cart_num">
          <div class="input_left" @click="rednum">-</div>
          <div class="input_center">
            <input type="text" readonly="readonly" name="num" id="num" v-model="num" />
          </div>
          <div class="input_right" @click="addnum">+</div>
        </div>
      </div>

      <button class="addcart" @click="addCart">
        加入购物车  
      </button>	
    </footer>
  </div>
</template>


<script>
import Config from '../model/config';
import Storage from '../model/storage';
export default {
  data() {
    return {
      detail:"",
      websiteUrl:Config.url,
      num:1
    };
  },
  methods:{
    requestData(){
        let pid = this.$route.params.pid;
        let api = this.websiteUrl+'api/proDetail?pid='+pid;
        this.$http.get(api).then( res=> {
            this.detail = res.body.result;
        }, err => {
            if(err) return
        });
    },
    addnum(){
      ++this.num;
      
    },
    rednum(){
      if(this.num>1){
        --this.num; 
      }
    },
    addCart(){
      let api = this.websiteUrl+'api/addCart';
      let deskid = Storage.get("deskid");
      this.$http.post(api,{
          desk_id:deskid,
          title:this.detail.title,
          p_id:this.detail._id,
          img_url:this.detail.img_url,
          price:this.detail.price,
          num:this.num,
          open_id:""
      }).then((res)=>{
          if(res.body.status){
            this.$socket.emit("cartsync","cartsync");
            this.$router.push({ path: '/home'})
          }              
      },(err)=>{
          console.log(err);
      })
    }
  },
  mounted(){
    this.requestData();
  }
};
</script>

<style lang="scss">
.back {
  height: 3.8rem;
  line-height: 3.8rem;
  width: 3.8rem;
  border-radius: 50%;
  background: #000;
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  color: #fff;
  &:before {
    content: "";
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    border-left: 0.2rem solid #fff;
    border-bottom: 0.2rem solid #fff;
    float: left;
    position: relative;
    top: 1.3rem;
    left: 0.6rem;
    transform: rotate(45deg);
    margin-right: 0.4rem;
  }
}

.p_content {
  .p_info {
    background: #fff;
    img {
      width: 100%;
      height: 18rem;
    }
    h2 {
      padding: 0.2rem 0.5rem;
    }
    .price {
      padding: 0.2rem 0.5rem;
      color: red;
    }
  }

  .p_detial {
    background: #fff;
    margin-top: 1rem;
    h3 {
      padding: 0.5rem;
    }
    .p_content {
      padding: 1rem;
      img {
        max-width: 100%;
        display: block;
        margin: 0 auto;
      }
      * {
        line-height: 1.5;
        color: #666;
      }
    }
  }
}

/*底部*/

.pfooter {
  position: fixed;
  bottom: 0px;
  height: 4.4rem;
  line-height: 4.4rem;
  background: #fff;
  left: 0px;
  width: 100%;
  border-top: 1px solid #eee;
  .cart {
    float: left;
    display: flex;
    strong {
      flex: 1;
      font-size: 1.6rem;
      padding: 0rem 0.5rem;
    }
    .cart_num {
      width: 10rem;
      display: flex;
      margin-top: 0.8rem;
      .input_left,
      .input_right {
        flex: 1;
        width: 2.8rem;
        height: 2.8rem;
        line-height: 2.8rem;
        text-align: center;
        color: red;
        border: 1px solid #eee;
        font-size: 2.4rem;
      }
      .input_center {
        flex: 1;
        input {
          width: 2rem;
          text-align: center;
          width: 100%;
          height: 2.8rem;
          border: none;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          float: left;
        }
      }
    }
  }

  .addcart {
    float: right;
    background: red;
    color: #fff;
    height: 3rem;
    border: none;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    margin-top: 0.8rem;
    margin-right: 0.5rem;
  }
}
</style>