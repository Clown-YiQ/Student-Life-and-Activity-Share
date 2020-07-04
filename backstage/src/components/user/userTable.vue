<template>
  <div class="user-box">
    <div class="user-table" v-if="cookieValue[2] < 0">
      <!-- 搜索框 -->
      <div class="search-box" style="margin-top: 15px;margin-left:10px">
        <el-input placeholder="请输入内容" v-model="searchword" class="input-with-select" @input="handleInput">
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
      </div>
      <!--  -->
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="120"></el-table-column>
        <el-table-column prop="u_name" label="用户名" width="150"></el-table-column>
        <el-table-column prop="u_school" label="学校" width="150"></el-table-column>
        <el-table-column prop="stu_name" label="真实姓名" width="160"></el-table-column>
        <el-table-column prop="stu_id" label="学号" width="150"></el-table-column>
        <el-table-column prop="u_tel" label="电话" width="150"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 没有权限 -->
    <div class="error-page" v-else>
      <div class="error-desc">你没有权限访问该页面~</div>
      <div class="error-handle">
        <a href="/home" class="router-link-active">
          <button type="button" class="el-button el-button--primary el-button--large">
            <span>返回首页</span>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import api from '../../api/index'
export default {
  inject: ['reload'],
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      userList: [],
      optionList: ['内容', '发布人', '学校'],
      searchword: '',
      select: '',
      value: '',
      cookieValue: []
    }
  },
  computed: {
    // ...mapState(['stuList']),
    // key: value,
  },
  created() {
    this.cookieHandle()
    // console.log(this.pageSize)
    if (this.cookieValue[2] < 0) {
      this.getUserList(this.page, 10)
      this.getUserTotal()
    }
  },
  methods: {
    handleDelete(index, row) {
      // console.log(index.id, row)
      this.$confirm('确定删除？')
        .then(_ => {
          api
            .deleteUserById({
              id: index.id
            })
            .then(res => {
              
              this.reload()
            })
        })
        .catch(_ => {})
    },
    //获取用户列表
    getUserList(page, pageSize) {
      api.getUserByType(page, pageSize).then(res => {
        // console.log(res)
        this.userList = res.data.data
      })
    },
    //获取用户总数
    getUserTotal() {
      api.getUserTotal().then(res => {
        let count = res.data.data[0].total
        this.total = Math.ceil(count)
        // console.log(this.total)
      })
    },
    //改变时
    handleSizeChange(val) {
      this.pageSize = val
      // console.log(this.pageSize,'pageSize')
    },
    //条目改变时
    handleCurrentChange(val) {
      this.page = val
      this.getSecondList(val, 10)
    },
    cookieHandle() {
      var cookieArr = document.cookie.split(';')
      for (var i = 0; i < cookieArr.length; i++) {
        // console.log(cookieArr[i].split('=')[1]);
        var value = cookieArr[i].split('=')[1]
        this.cookieValue.push(value)
      }
      // console.log(this.cookieValue)
    },
    //搜索
    searchUser() {
      var select = this.select
      if (this.searchword !== '') {
        // console.log(this.searchword)
        api.searchUser(this.searchword).then(res => {
          this.userList = res.data.data
        })
      }
    },
    handleInput() {
      if (this.searchword === '') {
        if (this.cookieValue[2] < 0) {
          this.getUserList(this.page, 10)
          this.getUserTotal()
        }
      }
    }
  }
}
</script>

<style scoped>
.user-box {
  margin-top: 10px;
}
.input-with-select {
  width: 450px;
  padding-bottom: 10px;
}
</style>

<style lang="scss" scoped>
.user-box {
  .error-page {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin-top: 30px;
    .error-desc {
      font-size: 30px;
      color: #777;
      text-align: center;
      margin-top: 10px;
    }
    .error-handle {
      margin: 15px auto;
      width: 6%;
    }
  }
}
</style>

<style>
@import '../../assets/css/index.css';
</style>