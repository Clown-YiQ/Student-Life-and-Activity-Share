<template>
  <div class="wrapper">
    <div class="header">
      <div class="logo">
        <img src="../../assets/logo.png" />
        <span>大学生校园生活分享后台管理系统</span>
      </div>
      <div class="logout">
        <span class="name">
          <img
            class="user"
            src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1038703283,3035227904&fm=11&gp=0.jpg"
            alt
          />
          {{cookieValue[1]}}
        </span>
        <span class="out" @click="logout">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookieValue: []
    }
  },
  created() {
    this.cookieHandle()
  },
  methods: {
    logout() {
      var uname = 'uname'
      var type = 'type'
      var id = 'id'
      this.$confirm('确定退出登录？')
        .then(_ => {
          this.delCookie(uname, type, id)
          this.$router.push('/login')
        })
        .catch(_ => {})
    },
    // 清楚cookie
    delCookie(uname, type, id) {
      var exp = new Date()
      exp.setTime(exp.getTime() - 604800000)
      var cval = this.getCookie(uname)
      var tval = this.getCookie(type)
      var ival = this.getCookie(id)
      if (cval) {
        document.cookie = uname + '=' + cval + ';expires=' + exp.toGMTString()
      }
      if (tval) {
        document.cookie = type + '=' + tval + ';expires=' + exp.toGMTString()
      }
      if (ival) {
        document.cookie = id + '=' + ival + ';expires=' + exp.toGMTString()
      }
    },
    getCookie(name) {
      var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      if ((arr = document.cookie.match(reg))) {
        return arr[2]
      } else {
        return false
      }
    },
    // 处理取到的cookie值
    cookieHandle() {
      var cookieArr = document.cookie.split(';')
      for (var i = 0; i < cookieArr.length; i++) {
        // console.log(cookieArr[i].split('=')[1]);
        var value = cookieArr[i].split('=')[1]
        this.cookieValue.push(value)
      }
      // console.log(this.cookieValue)
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  width: 100%;
  height: 70px;
  line-height: 70px;
  background: #354457;
  position: relative;
  z-index: 100;
  justify-content: space-between;
}
.header .logo {
  width: 300px;
  padding-left: 20px;
  height: 70px;
  line-height: 70px;
  color: #b3bcc5;
  font-size: 16px;
  font-weight: 400;
}
.header .logo img {
  width: 30px;
  height: 30px;
  display: inline-block;
  vertical-align: middle;
}
.header .logout {
  width: 300rpx;
  margin-right: 40px;
}
.header .logout .name {
  display: inline-block;
  color: #fff;
  margin-right: 20px;
  font-size: 18px;
  line-height: 66px;
}
.header .logout .user {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border-radius: 15px;
  margin-right: 10px;
}
.header .logout .out {
  display: inline-block;
  color: #dbdbdb;
  font-size: 14px;
  cursor: pointer;
  height: 66px;
}
.header .logout .out::after {
  content: '';
  position: absolute;
  right: 29px;
  bottom: 0;
  width: 4%;
  height: 2px;
  background: #fff;
  transform: scaleX(0);
  transform-origin: right 0;
  transition: transform 0.5s;
}
.header .logout .out:hover::after {
  transform-origin: 0 0;
  transform: scaleX(1);
}

/* .header .logout .out:hover {
  border-bottom: 2px solid #fff;
  transition: 0.4s;
  transform-origin: 0 0;
  transform: scaleX(1);
} */
</style>