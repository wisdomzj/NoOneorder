<template>
  <div id="cart">
    <div class="cart_content">
      <div class="cart_info">
        <h2>购物车</h2>
        <div class="p_number">
          <div class="p_number_left">
            <p>用餐人数:{{info.number}}人</p>
            <p>备注:<span v-if="!info.mark">无</span><span v-if="info.mark">{{info.mark}}</span></p>
          </div>
          <router-link to="/info">
            <div class="p_number_right">
              <img src="../assets/img/edit.png" />
              <p>修改</p>
            </div>
          </router-link>
        </div>
        <div class="cart_p_num">
          <p>购物车中总共有{{totalNum}}个菜</p>
          <p>合计：<span class="price">¥{{allPrice}}</span></p>
        </div>
      </div>
      <div class="cart_list">
        <ul>
          <li class="item" v-for="(item,index) in cartList" :key="index">
            <div class="left_food">
              <img :src="item.img_url" />
              <div class="food_info">
                <p>{{item.title}}</p>
                <p class="price">¥{{item.price}}</p>
              </div>
            </div>
            <div id="right_cart">
              <div class="cart_num">
                <div class="input_left" @click="rednum(item,index)">-</div>
                <div class="input_center">
                  <input type="text" readonly="readonly" v-model="item.num" />
                </div>
                <div class="input_right" @click="addnum(item)">+</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="hot_food">
        <h3>本店顾客最长点的菜</h3>
        <div class="item_list_outer">
          <ul class="item_list">
            <li>
              <div class="inner">
                <img src="../assets/img/1.jpg" />
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/img/2.jpg" />
                <p class="title">家乡扣肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/img/1.jpg" />
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/img/2.jpg" />
                <p class="title">家乡扣肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/img/2.jpg" />
                <p class="title">家乡扣肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <NavFooter />
    <router-link to="/home">
      <div id="footer_book" class="footer_book">
        <img src="../assets/img/menu.png" />
        <p>菜单</p>
      </div>
    </router-link>
    <div id="footer_cart" class="footer_cart" @click="order">
      <img src="../assets/img/doorder.png" />
      <p>下单</p>
    </div>
  </div>
</template>

<script>
import NavFooter from "./common/NavFooter.vue"

export default {
  components: { NavFooter },
  data() {
    return {
      cartList: [],
      allPrice: 0,
      totalNum: 0,
      info: {}
    }
  },
  created() {
    this.getCartData()
    this.getInfo()
  },
  methods: {
    getCartData() {
      const desk_id = 'a11'
      this.$request.cartList({ desk_id }).then((res)=>{
        const { list } = res.data
        this.cartList = list
        this.getTotalResult()
      })
    },
    getInfo(){
      const desk_id = 'a11'
      this.$request.showInfo({ desk_id }).then((res)=>{
        const { result } = res
        this.info = result 
      })
    },
    order(){
      const desk_id = 'a11'
      this.$request.addOrder({
        desk_id,
        number: this.info.number,
        mark: this.info.mark,
        items: JSON.stringify(this.cartList),
        total_num: this.totalNum,
        total_price: this.allPrice,
        updatetime: new Date(),
        addtime: new Date(),
        pay_status: 0,
        order_status: 0 
      }).then((res)=>{
        if(res.msg === 'success'){
          this.$router.push({ path: 'order' })
        }
      })
    },  
    rednum(item) {  
      const desk_id = 'a11'
      const { p_id, num } = item 
      item.num = item.num <=0 ? 0 : --item.num
      this.$request.reduceCount({ desk_id, p_id, num }).then((res)=>{
        if(res.result.nModified || res.result.deletedCount){
          this.getCartData()
        }
      })
    },
    addnum(item) {
      const desk_id = 'a11'
      const { p_id, num } = item
      item.num = item.num >=10 ? 10 : ++item.num
      this.$request.addCount({ desk_id, p_id, num }).then((res)=>{
        if(res.result.nModified){
          this.getCartData()
        }
      })
    },
    getTotalResult(){    
      let allPrice = 0
      let totalNum = 0
      for(let i=0; i<this.cartList.length; i++){
        allPrice += parseFloat(this.cartList[i].price * this.cartList[i].num)
        totalNum += this.cartList[i].num
      } 
      this.allPrice = allPrice
      this.totalNum = totalNum
    }
  }
}
</script>

<style lang="scss">
.cart_content {
  padding: 1rem;

  /*头部信息*/
  .cart_info {
    background: #fff;
    h2 {
      text-align: center;
      font-size: 1.8rem;
      padding: 0.8rem 0px;
      border-bottom: 1px solid #eee;
    }
    border-radius: 0.5rem;
    padding: 0.5rem;
    .p_number {
      display: flex;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      .p_number_left {
        flex: 1;
        p {
          line-height: 2;
          &:first-child {
            color: red;
          }
        }
      }
      .p_number_right {
        width: 4rem;
        height: 4rem;
        text-align: center;
        img {
          width: 1.8rem;
          height: 1.8rem;
          margin: 0 auto;
        }
      }
    }

    /*购物车总数量*/
    .cart_p_num {
      border-bottom: 1px solid #eee;
      p {
        line-height: 2;
        .price {
          font-size: 2.4rem;
          color: red;
        }
      }
    }
  }
  /*购物车列表*/
  .cart_list {
    margin-top: 1rem;
    padding: 0.5rem;
    background: #fff;
    border-radius: 0.5rem;
    display: flex;
    ul {
      width: 100%;
      .item {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 1rem 0px;
        .left_food {
          flex: 1;
          display: flex;
          img {
            width: 4rem;
            height: 4rem;
            border-radius: 10%;
            margin-right: 0.8rem;
          }
          .food_info {
            flex: 1;
          }
        }
        .right_cart {
          width: 10rem;
        }
      }
    }
  }

  /*最长点的菜*/
  .hot_food {
    background: #fff;
    margin-top: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 4rem;
    h3 {
      font-size: 1.4rem;
      padding: 0.5rem 0px;
    }

    .item_list_outer {
      width: 100%;
      overflow-x: auto;
      .item_list {
        padding: 0px 0.5rem;
        width: 50rem;
        li {
          width: 8rem;
          padding: 0.5rem;
          box-sizing: border-box;
          float: left;
          .inner {
            background: #fff;
            width: 100%;
            border-radius: 0.5rem;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}

/*购车加减*/
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

/*购车空*/
.cart_empty {
  text-align: center;
  line-height: 3;
  h3 {
    font-size: 1.8rem;
  }
}

</style>