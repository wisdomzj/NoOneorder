<template>
  <div class="start_box">
    <div class="start_content">
      <header class="start_header">
        <img src="../assets/img/canju.png" /> 用餐人数
      </header>
      <p class="notice">请选择正确的用餐人数 ，小二马上给你送餐具</p>
      <div class="content">
        <ul class="user_list">
          <li
            v-for="(item, index) in userList"
            :key="index"
            :class="{ active: index === 0 }"
          >
            <span>{{ item }}人</span>
          </li>
        </ul>
        <div class="mark_input">
          <input
            type="text"
            v-model="note"
            placeholder="请输入您的口味要求，忌口等（可不填）"
          />
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
    <div class="start" @click="addInfo">
      <span>开始点菜</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 1,
      note: '',
      userList: [],
    }
  },
  
  mounted() {
    this._showuserlist()
    this.$nextTick(function(){
      this._addChangeEnvet()
    })
  },
  
  methods: {
    addInfo(){
      const desk_id = 'a12'
      this.$request.addInfo({ 
        desk_id,
        number: parseInt(this.number),
        mark: this.note,
        addtime: new Date(),
        status: 0
      }).then((res)=>{
        if(res.result){
          this.$router.push({ path:'home' })
        }
      })
    },
    _showuserlist() {
      for (let i = 0; i < 12; i++) {
        this.userList.push(i + 1)
      }
    },
    _addChangeEnvet() {
      let that = this
      let userlis = document.querySelectorAll('.user_list li')
      for (let i = 0; i < userlis.length; i++) {
        userlis[i].onclick = function() {
          for (let j = 0; j < userlis.length; j++) {
            userlis[j].className = ''
          }
          this.className = 'active'
          that.number = parseInt(this.querySelector('span').innerHTML.trim())
        }
      }
      let markLis = document.querySelectorAll('.mark_list li')
      for (let i = 0; i < markLis.length; i++) {
        markLis[i].onclick = function() {
          for (let j = 0; j < markLis.length; j++) {
            markLis[j].className = ''
          }
          this.className = 'active'
          that.note = that.note + " " + this.querySelector("span").innerHTML.trim()
        }
      }
    }
  }
}
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
      box-sizing: border-box;
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
  }
  li.active {
    span {
      background: red;
      border: 1px solid red;
      color: #fff;
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
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    display: block;
    width: 3rem;
  }
}
</style>
