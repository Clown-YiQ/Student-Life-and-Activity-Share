<template>
  <div>
    <div class="left-menu">
      <el-row>
        <el-col>
          <el-menu
            :default-active="this.$router.history.current.meta.id"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#4d5e70"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <router-link tag="div" to="/home">
              <el-menu-item index="1">
                <i class="el-icon-s-home"></i>
                <router-link slot="title" tag="span" to="/home">首页</router-link>
              </el-menu-item>
            </router-link>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>发布管理</span>
              </template>
              <el-menu-item-group>
                <router-link tag="div" to="/activity">
                  <el-menu-item index="2-1">活动管理</el-menu-item>
                </router-link>
                <router-link tag="div" to="/second">
                  <el-menu-item index="2-2">二手商品信息管理</el-menu-item>
                </router-link>
                <router-link tag="div" to="/share">
                  <el-menu-item index="2-3">生活圈管理</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <router-link tag="div" to="/user">
              <el-menu-item  index="3">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
            </router-link>
            <router-link tag="div" to="/permission">
              <el-menu-item index="4">
                <i class="el-icon-set-up"></i>
                <span slot="title">权限管理</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      cookieValue:[]
    }
  },
  created(){
    this.cookieHandle();
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
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
.left-menu {
  width: 200px;
  background-color: #4d5e70;
  height: 100%;
  position: absolute;
  top: 0;
  padding-top: 70px;
  box-sizing: border-box;
  z-index:99 
}
.el-menu {
  border-right: none !important;
}
.right-content {
    min-width: 800px;
    width: calc(100% - 200px);
    padding-left: 200px;
    position: relative;
}

.right-content form {
    width: 400px;
    margin: 50px auto;
    
}
.right-content form label {
    display: inline-block;
    width: 150px;
    text-align: right;
    font-size: 16px;
}
.right-content form input {
    font-size: 16px;
}
.right-content form div {
    margin: 10px;
}
.right-content form .btn {
    padding: 5px 30px;
    font-size: 16px;
}
</style>