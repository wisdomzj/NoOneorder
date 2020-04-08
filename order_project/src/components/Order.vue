<template>
  <div id="order">
    <div class="order_content">
      <div class="order_info">
        <div class="order_top">
          <img src="../assets/img/timer.png" />
          <div class="order_info_right">
            <h2>{{ orderInfo.desk_id }}号桌待门店接单</h2>
            <p>请及时联系服务员确认一点菜品信息!</p>
          </div>
        </div>
        <h3>
          已点菜品{{ orderInfo.total_num }}份,合计 :
          <span class="price">{{ orderInfo.total_price }}元</span>
        </h3>
        <button @click="doPay">立即支付</button>
      </div>
      <div class="order_list">
        <h3>菜品详情:</h3>
        <ul class="list">
          <li v-for="(item, index) in products" :key="index" >
            <div class="title">{{ item.title }}/ 已下厨</div>
            <div class="num">{{ item.num }}份</div>
            <div class="price">{{ item.price }}元</div>
          </li>
        </ul>
      </div>
    </div>
    <NavFooter/>
    <div id="footer_book" class="footer_book" style="left:auto;right:5px;">
      <router-link to="/home">
        <img src="../assets/img/menu.png" />
        <p>菜单</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavFooter from "./common/NavFooter.vue"

export default {
  components: {
    NavFooter,
  },
  data() {
    return {
      orderInfo: {},
      products: []
    }
  },
  created(){
    this.showOrder()
  },
  methods:{
    showOrder(){
      const desk_id = 'a11'
      this.$request.showOrder({ desk_id }).then((res)=>{
        const { orderInfo, products } = res.result
        this.orderInfo = orderInfo
        this.products = products
      })
    },
    doPay(){
      this.$request.doPay({ 
        order_id: this.orderInfo._id, 
        total_price: this.orderInfo.total_price, 
        return_url: 'http://localhost:8080/#/success'
      }).then((res)=>{
        console.log(res)
      })

      // var that=this;
      // var uid=storage.get('roomid');
      // var api=this.api+'api/doPay';
      // this.$http.post(api,{
      //     uid,                      
      //     total_price:that.list.total_price,
      //     order_id:that.list.order_id,
      //     return_url:'http://localhost:8080/#/success'                         
      // }).then((response)=>{                              
      //     console.log(response);                        
      //     location.href=response.body.result.data;
      // },(err)=>{
      //     console.log(err);
      // })
    }
  }
}
</script>

<style lang="scss">
.order_content {
  padding: 1rem;
  .order_info {
    background: #fff;
    border-radius: 0.5rem;
    .order_top {
      display: flex;

      img {
        width: 5.6rem;
        height: 5.6rem;
      }
      .order_info_right {
        flex: 1;
        padding-top: 0.5rem;
      }
    }

    h3 {
      line-height: 2;
      padding: 0.5rem;
      .price {
        font-size: 2rem;
        color: red;
      }
    }
  }

  //  订单列表
  .order_list {
    background: #ffffff;
    border-radius: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem;
    h3 {
      line-height: 2;
    }
    .list {
      li {
        display: flex;
        line-height: 2;
        padding: 0.5rem 0rem;
        .title {
          flex: 2;
        }
        .num {
          flex: 1;
          text-align: center;
        }
        .price {
          flex: 1;
          text-align: center;
        }
      }
    }
  }

  /*支付页面*/
  .order_pay {
    background: #fff;
    border-radius: 0.5rem;
    h3 {
      padding: 2rem 0rem 0.5rem 0rem;
      font-size: 2rem;
      text-align: center;
    }

    .order_pay_detail {
      display: flex;
      line-height: 2;
      border-bottom: 1px solid #eee;
      padding: 0.5rem;
      .d_num,
      .p_num,
      .order_time {
        flex: 1;
      }
    }

    .order_pay_info {
      line-height: 2;
      display: flex;
      margin: 1rem 0rem;
      padding: 0.5rem 0.5rem 1rem 0.5rem;
      .price_list {
        flex: 1;
        .price {
          font-size: 2rem;
          color: red;
        }
      }
      .pay_button {
        width: 10rem;
        border-radius: 0.5rem;
        background: red;
        color: #fff;
        text-align: center;
        height: 2.6rem;
        line-height: 2.6rem;
        position: relative;
        top: 0.5rem;
      }
    }
  }
}
</style>
