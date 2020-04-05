<template>
  <div id="navfooter">
    <div id="footer_nav" class="footer_nav" @click="flag=!flag">
      <img src="../../assets/img/navigation.png" />
      <p>导航</p>
    </div>

    <div class="footer_nav_show" v-if="flag">
      <ul class="list">
        <li>
          <img src="../../assets/img/menu.png" />
          <p>菜单</p>
        </li>
        <li>
          <img src="../../assets/img/cart.png" />
          <p>购物车</p>
        </li>
        <li>
          <img src="../../assets/img/order.png" />
          <p>我的订单</p>
        </li>
        <li>
          <img src="../../assets/img/wallet.png" />
          <p>结账</p>
        </li>
        <li @click="flag=!flag">
          <img src="../../assets/img/close.png" />
          <p>返回</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    };
  }
};
</script>

