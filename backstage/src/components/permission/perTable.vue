<template>
  <div class="permission-box">
    <div class="permission-table" v-if="cookieValue[2] == -2">
      <!-- 搜索框 -->
      <div class="search-box" style="margin-top: 15px;margin-left:10px">
        <el-input placeholder="请输入内容" v-model="searchword" class="input-with-select" @input="handleInput">
          <el-button slot="append" icon="el-icon-search" @click="searchAdminUser"></el-button>
        </el-input>
        <el-button slot="append" icon="el-icon-plus" @click="addAdmin">添加管理员</el-button>
      </div>
      <!--  -->
      <el-table :data="adminList" stripe style="width: 100%">
        <el-table-column prop="u_name" label="用户名" width="150"></el-table-column>
        <el-table-column prop="u_type" label="类型" width="150">
          <template>
            <div class="type">普通管理员</div>
          </template>
        </el-table-column>
        <el-table-column prop="u_tel" label="电话" width="160"></el-table-column>
        <el-table-column prop="password" label="密码" width="160"></el-table-column>
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

      <!-- 表单弹窗 -->
      <el-dialog title="添加管理员" :visible.sync="dialogFormVisible" width="550px">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input style="width: 350px;" type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="tel">
            <el-input style="width: 350px;" type="text" v-model="ruleForm.tel" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input style="width: 350px;" type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input style="width: 350px;" type="password" v-model="ruleForm.repassword"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
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
import api from '@/api/index.js'
export default {
  inject: ['reload'],
  data() {
    // var telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/g;
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (value.length > 16) {
          callback(new Error('请输入少于16位的内容'))
        }
        callback()
      }
    }
    var validateTel = (rule, value, callback) => {
      var telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/g
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!telReg.test(value)) {
        // console.log(a.test(value))
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length > 16 && value.length < 4) {
        callback(new Error('请输入4-16位的密码'))
      } else {
        callback()
      }
    }
    var validateRePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      adminList: [],
      searchword: '',
      select: '',
      value: '',
      cookieValue: [],
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        tel: '',
        password: '',
        repassword: ''
      },
      rules: {
        name: [{ validator: validateName, trigger: 'blur' }],
        tel: [{ validator: validateTel, trigger: 'blur' }],
        password: [{ validator: validatePwd, trigger: 'blur' }],
        repassword: [{ validator: validateRePwd, trigger: 'blur' }]
      },
      type: ''
    }
  },
  computed: {
    // ...mapState(['stuList']),
    // key: value,
  },
  created() {
    this.cookieHandle()
    // console.log(this.pageSize)
    this.getAdminUserList(this.page, 10)
    this.getAdminUserTotal()
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
              window.location.reload()
            })
        })
        .catch(_ => {})
    },
    getAdminUserList(page, pageSize) {
      api.queryAdminUser(page, pageSize).then(res => {
        this.adminList = res.data.data
      })
    },
    getAdminUserTotal() {
      api.queryAdminUserTotal().then(res => {
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
    searchAdminUser() {
      //   var select = this.select
      if (this.searchword !== '') {
        // console.log(this.searchword)
        api.searchAdminUser(this.searchword).then(res => {
          this.adminList = res.data.data
        })
      }
    },
    addAdmin(index, row) {
      // console.log(index)
      if (JSON.stringify(this.dataIndex) != '{}') {
        if (this.ruleForm.password !== '') {
          this.clearValidate('ruleForm')
        }
      }
      this.dialogFormVisible = true
      // this.resetForm(formName);
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate()
    },
    /* 添加用户 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          // console.log(this.ruleForm)
          api
            .insertAdminUser({
              u_name: this.ruleForm.name,
              u_tel: this.ruleForm.tel,
              password: this.ruleForm.password
            })
            .then(res => {
              console.log(res)
              // window.location.reload()
              this.reload()
              alert('提交成功!')
            })
        } else {
          console.log('error submit!!')
          console.log(this.ruleForm)
          return false
        }
      })
    },
    handleInput() {
      if (this.searchword === '') {
        this.getAdminUserList(this.page, 10)
        this.getAdminUserTotal()
      }
    }
  }
}
</script>

<style scoped>
.permission-box {
  margin-top: 10px;
}
.input-with-select {
  width: 450px;
  padding-bottom: 10px;
}
</style>

<style lang="scss" scoped>
.permission-box {
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

