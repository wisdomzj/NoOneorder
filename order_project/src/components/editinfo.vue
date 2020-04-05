<template>
  <div id="start">
    <div class="start_content">
      <header class="start_header">
        <img src="../assets/img/canju.png"/> 修改用餐人数
      </header>
      <p class="notice">请选择正确的用餐人数</p>
      <div class="content">
        <ul class="user_list">
          <li v-for="(item,index) in userList" :key="index" :class="{'active':parseInt(orderinfo.number) == index+1}">
            <span>{{item}}</span>
          </li>
        </ul>
        <div class="mark_input">
          <input type="text" v-model="note" placeholder="请输入您的口味要求，忌口等（可不填）" />
        </div>
        <ul class="mark_list">
          <li>
            <span>打包带走</span>
          </li>
          <li>
            <span>不要放辣椒</span>
          </li>
          <li>
            <span>微辣</span>
          </li>
        </ul>
      </div>
    </div>
    <div id="start_cancel" class="start_cancel">
      <router-link to="/cart">
        <span>取消</span>
      </router-link>
    </div>

    <div id="start_ok" class="start_ok" @click="editorderInfo">
      <span>确定修改</span>
    </div>
  </div>
</template>
<script>
//引入config
import Config from "../model/config";
import Storage from '../model/storage';

export default {
  data() {
    return {
      number: 1,
      note: "",
      websiteUrl: Config.url,
      userList: [],
      orderinfo:''
    };
  },
  methods: {
    showuserlist() {
      for (let i = 0; i < 12; i++) {
        this.userList.push(i + 1);
      }
    },
    editorderInfo() {
      let api = this.websiteUrl + "api/orderInfo";
      let deskid = Storage.get("deskid");
      this.$http
        .post(api, {
          desk_id: deskid,
          number: this.number,
          note: this.note
        })
        .then(
          res => {
            if (res.body.status) {
              this.$router.push({ path: "cart" });
            }
          },
          err => {
            console.log(err);
          }
        );
    },
    getorderInfo(){
      let deskid = Storage.get("deskid");
      let api = this.websiteUrl+"api/selorderinfo?id="+deskid;
      this.$http.get(api).then(
        res => {
          this.orderinfo = res.body.result;
          this.note = this.orderinfo.note;
        },
        err => {
          console.log(err);
        }
      );
    },
    addChangeEnvet() {
      let that = this;
      let userLis = document.querySelectorAll(".user_list li");
      for (let i = 0; i < userLis.length; i++) {
        userLis[i].onclick = function() {
          for (let j = 0; j < userLis.length; j++) {
            userLis[j].className = " ";
          }
          this.className = "active";
          that.number = parseInt(this.querySelector("span").innerHTML.trim());
        };
      }
      let markLis = document.querySelectorAll(".mark_list li");
      for (let i = 0; i < markLis.length; i++) {
        markLis[i].onclick = function() {
          for (let j = 0; j < markLis.length; j++) {
            markLis[j].className = " ";
          }
          this.className = "active";
          that.note = that.note + " " + this.querySelector("span").innerHTML.trim();
        };
      }
    }
  },
  mounted() {
    this.showuserlist();
    this.getorderInfo();

    // 等数据渲染加载完成后在去操作doument节点
    this.$nextTick(function() {
      this.addChangeEnvet();
    });
  }
};
</script>

<style lang="scss">
.start_content {
  .start_header {
    height: 3.2rem;
    line-height: 3.2rem;
    background: #000;
    color: #fff;
    width: 10rem;
    margin: 5rem auto 0rem auto;
    border-radius: 0.5rem;
    img {
      height: 2.2rem;
      line-height: 2.2rem;
      position: relative;
      top: 0.5rem;
      margin-left: 1rem;
    }
  }
  .notice {
    color: red;
    text-align: center;
    margin: 1rem 0rem;
  }

  .mark_input {
    padding: 1rem;
    input {
      height: 3rem;
      line-height: 3rem;
      width: 100%;
      border: 1px solid #eee;
    }
  }
  .user_list,
  .mark_list {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    li {
      width: 25%;
      padding: 0.5rem;
      box-sizing: border-box; /*盒子的宽度=盒子本身宽度    默认 盒子的宽度=盒子的宽度+padding+border*/
      span {
        display: block;
        width: 100%;
        height: 3.2rem;
        line-height: 3.2rem;
        text-align: center;
        background: #fff;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
      }
    }
    li.active {
      span {
        background: red;
        border: 1px solid red;
        color: #fff;
      }
    }
  }
}
.start {
  position: fixed;
  bottom: 5rem;
  left: 50%;
  margin-left: -3rem;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: red;
  color: #fff;
  span {
    display: block;
    width: 2rem;
    margin: 0 auto;
    position: relative;
    top: 1.5rem;
  }
}
.start_ok {
  position: fixed;
  bottom: 4rem;
  right: 6rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: red;
  color: #fff;
  span {
    display: block;
    width: 2rem;
    margin: 0 auto;
    position: relative;
    top: 0.5rem;
  }
  a {
    color: #fff;
  }
}
.start_cancel {
  position: fixed;
  bottom: 4rem;
  left: 6rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: red;
  color: #fff;
  span {
    display: block;
    width: 2rem;
    margin: 0 auto;
    position: relative;
    top: 1.5rem;
  }
  a {
    color: #fff;
  }
}
</style>