<template>
  <div id="home">
    <header class="index_header">
      <div class="hlist">
        <img src="../assets/img/rexiao.png" />
        <p>热销榜</p>
      </div>
      <div class="hlist">
        <img src="../assets/img/caidan.png" />
        <p>精品榜</p>
      </div>
      <div class="hlist">
        <img src="../assets/img/sousuo.png" />
        <p>主打菜</p>
      </div>
    </header>
    <aside class="left_cate" id="left_cate">
      <ul>
        <li
          v-for="(item, index) in DataList"
          :key="index"
          @click="_changeList(index)"
        >
          {{ item.title }}
        </li>
      </ul>

      <div id="nav_cate" class="nav_cate">
        <img src="../assets/img/nav.png" />
        <p>菜单</p>
      </div>
    </aside>

    <div class="content">
      <div class="item" v-for="(item, index) in DataList" :key="index">
        <h3 class="item_cate">{{ item.title }}</h3>
        <ul class="item_list">
          <li v-for="(item, index) in item.list" :key="index">
            <div class="inner">
              <router-link :to="`/product/${item._id}`">
                <img :src="item.img_url" />
                <p class="title">{{ item.title }}</p>
                <p class="price">价格：{{ item.price }}元</p>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg" id="bg"></div>

    <NavFooter />

    <router-link to="/cart">
      <div id="footer_cart" class="footer_cart">
        <img src="../assets/img/cart.png" />
        <p>购物车</p>
        <span class="num" v-if="cartNum">{{ cartNum }}</span>
      </div>
    </router-link>
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
      DataList: [],
      cartNum: 0,
    }
  },
  mounted() {
    this._asideDomInit()
    this.requestData()
    this.getCartCount()
  },
  methods: {
    requestData() {
      this.$request.categoryFindAll({}).then((res)=>{
        const { result } = res
        this.DataList = result
      })
    },
    getCartCount() {
      const desk_id = 'a11'
      this.$request.cartList({ desk_id }).then((res)=>{
        this.cartNum = res.data.list.length
      })
    },
    _changeList(key) {
      let itemCatesDom = document.querySelectorAll(".item_cate");
      document.documentElement.scrollTop = itemCatesDom[key].offsetTop;
      let leftCate = document.getElementById("left_cate");
      let bg = document.getElementById("bg");
      leftCate.style.transform = "translate(-100%,0)";
      bg.style.display = "none";
    },
    _asideDomInit() {
      let navCate = document.getElementById("nav_cate");
      let leftCate = document.getElementById("left_cate");
      let bg = document.getElementById("bg");
      let flag = true;
      bg.onclick = navCate.onclick = function() {
        if (flag) {
          flag = false;
          leftCate.style.transform = "translate(0,0)";
          bg.style.display = "block";
        } else {
          flag = true;
          leftCate.style.transform = "translate(-100%,0)";
          bg.style.display = "none";
        }
      }
    }
  }
};
</script>

<style lang="scss">
.index_header {
  width: 96%;
  margin: 0 auto;
  height: 4.4rem;
  background: #fff;
  margin-top: 1rem;
  display: flex;
  border-radius: 0.5rem;
  .hlist {
    flex: 1;
    text-align: center;
    padding-top: 0.2rem;
    border-right: 1px solid #eee;
    img {
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
    }
    &:last-child {
      border-right: none;
    }
  }
}

/*列表*/
.item {
  .item_cate {
    text-align: center;
    padding: 0.5rem;
  }

  .item_list {
    display: flex;
    flex-wrap: wrap;
    padding: 0px 0.5rem;

    li {
      width: 33.3%;
      padding: 0.5rem;
      box-sizing: border-box;
      .inner {
        background: #fff;
        width: 100%;
        border-radius: 0.5rem;
        overflow: hidden;
        img {
          width: 100%;
        }
        p {
          padding: 0.2rem 0.5rem;
        }

        .title {
          font-weight: bold;
        }
      }
    }
  }
}

/*侧边栏*/

.left_cate {
  /*css3运动  加过渡效果*/
  transition: all 0.5s;
  transform: translate(-100%, 0);
  z-index: 2;
  width: 6rem;
  height: 100%;
  position: fixed;
  background: #eee;
  top: 0px;
  left: 0px;

  ul {
    position: absolute;
    height: 100%;
    padding: 0.5rem;
    z-index: 3;
    background: #eee;
    li {
      line-height: 4.4rem;
    }
  }

  .nav_cate {
    position: absolute;
    right: -3.5rem;
    background: rgba(132, 128, 128, 0.9);
    top: 42%;
    width: 5rem;
    height: 4rem;
    text-align: center;
    border-radius: 0rem 50% 50% 0rem;
    z-index: 2;
    img {
      width: 1.8rem;
      height: 1.8rem;
      margin-left: 1rem;
      margin-top: 0.4rem;
    }
    p {
      color: #fff;
      margin-left: 1rem;
      margin-top: -0.3rem;
    }
  }
}

/*透明层*/
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(132, 128, 128, 0.4);
  left: 0px;
  top: 0px;
  z-index: 1;
  display: none;
}
</style>
