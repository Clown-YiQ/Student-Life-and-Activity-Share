<template>
  <div class="wrapper">
    <!-- 搜索框 -->
    <div class="search-box" style="margin-top: 15px;margin-left:10px">
      <el-input
        placeholder="请输入内容"
        v-model="searchword"
        class="input-with-select"
        @input="handleInput"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option v-for="(item, index) in optionList" :key="index" :label="item" :value="index"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchActivity"></el-button>
      </el-input>
    </div>
    <!-- 活动列表 -->
    <el-table :data="actList" stripe style="width: 100%" height="646">
      <el-table-column align="center" prop="id" label="ID" width="80"></el-table-column>
      <el-table-column align="center" prop="activity_title" label="活动名称" width="180"></el-table-column>
      <el-table-column align="center" prop="activity_sort" label="活动类别" width="90"></el-table-column>
      <el-table-column align="center" prop="act_address" label="地址" width="240"></el-table-column>
      <el-table-column align="center" prop="act_time" label="时间" width="150"></el-table-column>
      <el-table-column align="center" prop="act_num" label="人数" width="100"></el-table-column>
      <el-table-column align="center" prop="act_content" label="内容" width="350"></el-table-column>
      <el-table-column align="center" prop="act_cname" label="发布人" width="140"></el-table-column>
      <el-table-column align="center" prop="act_school" label="学校" width="130"></el-table-column>
      <el-table-column align="center" v-if="cookieValue[2] > 0" label="参加用户" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row,table = true)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="cookieValue[2] > 0"
            @click="openDetail(scope.row)"
            size="small"
          >编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="total"
    ></el-pagination>
    <!-- 导出抽屉 -->
    <el-drawer :title="activity.activity_title" :visible.sync="table" direction="rtl" size="19%">
      <el-table :data="joinUser">
        <el-table-column property="join_uname" label="昵称" width="120"></el-table-column>
        <el-table-column property="join_uschool" label="学校" width="120"></el-table-column>
        <el-table-column property="join_utel" label="电话" width="120"></el-table-column>
      </el-table>
      <div class="export">
        <el-button type="primary" @click="exportToExcel">导出</el-button>
      </div>
    </el-drawer>
    <!-- 表单弹窗 -->
    <el-dialog title="活动详情" :visible.sync="dialogFormVisible" width="550px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="title">
          <el-input style="width: 350px;" type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动类别">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input style="width: 350px;" v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-input style="width: 350px;" v-model="ruleForm.time"></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="num">
          <el-input style="width: 350px;" v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="con">
          <el-input type="textarea" autosize style="width: 350px;" v-model="ruleForm.con"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import api from '../../api/index'
export default {
  inject: ['reload'],
  data() {
    //校验时间格式
    var a = /^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})$/
    var validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入活动名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入少于32位的内容'))
        }
        callback()
      }
    }
    var validateAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入地址'))
      } else if (value.length > 16) {
        callback(new Error('请输入少于16位的内容'))
      } else {
        callback()
      }
    }
    var validateTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入时间'))
      } else if (!a.test(value)) {
        // console.log(a.test(value))
        callback(new Error('日期格式不正确,格式应为yyyy-mm-ss'))
      } else {
        callback()
      }
    }
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('人数不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(parseInt(value))) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }
    var validateCon = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入内容'))
      } else if (value.length > 300) {
        callback(new Error('请输入少于300字的内容'))
      } else {
        callback()
      }
    }

    return {
      total: 0,
      page: 1,
      pageSize: 10,
      actList: [],
      activity: '',
      joinUser: [],
      table: false,
      optionList: ['名称', '类别', '发布人', '学校'],
      searchword: '',
      select: '',
      dialogFormVisible: false,
      ruleForm: {
        id: 0,
        title: '',
        address: '',
        time: '',
        num: '',
        con: ''
      },
      rules: {
        title: [{ validator: validateTitle, trigger: 'blur' }],
        address: [{ validator: validateAddress, trigger: 'blur' }],
        time: [{ validator: validateTime, trigger: 'blur' }],
        num: [{ validator: checkNum, trigger: 'blur' }],
        con: [{ validator: validateCon, trigger: 'blur' }]
      },
      // "运动", "游戏", "交友", "旅行", "读书", "竞赛", "电影", "音乐", "其他"
      options: [
        {
          value: '运动'
        },
        {
          value: '游戏'
        },
        {
          value: '交友'
        },
        {
          value: '旅行'
        },
        {
          value: '读书'
        },
        {
          value: '竞赛'
        },
        {
          value: '电影'
        },
        {
          value: '音乐'
        },
        {
          value: '其他'
        }
      ],
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
    this.handleData()
  },
  methods: {
    //参加用户列表抽屉
    handleClick(index, row) {
      // console.log(index, row)
      this.activity = index
      api.getJoinInfoById(index.id).then(res => {
        this.joinUser = res.data.data
      })
    },
    //删除
    handleDelete(index, row) {
      // console.log(index, row)
      this.$confirm('确定删除？')
        .then(_ => {
          api
            .deleteActivityById({
              id: index.id
            })
            .then(res => {
              // window.location.reload()
              this.reload()
            })
        })
        .catch(_ => {})
    },
    //获取活动列表
    getActivityList(page, pageSize) {
      api.queryActivityByPage(page, pageSize).then(res => {
        this.actList = res.data.data
      })
    },
    //获取活动总数
    getActivityTotal() {
      api.getActivityTotal().then(res => {
        let count = res.data.data[0].total
        this.total = Math.ceil(count)
      })
    },
    //根据用户id获取活动列表
    getActivityCidList(cid, page, pageSize) {
      api.queryActivityByPageCid(cid, page, pageSize).then(res => {
        console.log(cid)
        this.actList = res.data.data
      })
    },
    //根据用户id获取活动总数
    getACtivityCidTotal(cid) {
      api.queryActivityCidTotal(cid).then(res => {
        let count = res.data.data[0].total
        this.total = Math.ceil(count)
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
      this.getActivityList(val, 10)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    //excel数据导出
    exportToExcel() {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require('../../assets/js/Export2Excel.js')
        const tHeader = ['昵称', '学校', '电话']
        const filterVal = ['join_uname', 'join_uschool', 'join_utel']
        const list = this.joinUser
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '参加用户表')
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 用户编辑活动
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          // console.log(this.ruleForm)
          api
            .editActivity({
              activity_title: this.ruleForm.title,
              activity_sort: this.value,
              act_address: this.ruleForm.address,
              act_time: this.ruleForm.time,
              act_num: this.ruleForm.num,
              act_content: this.ruleForm.con,
              id: this.ruleForm.id
            })
            .then(res => {
              // console.log(res)
              // window.location.reload()
              this.reload()
              alert('提交成功!')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //编辑活动弹窗
    openDetail(index, row) {
      console.log(index)
      if (JSON.stringify(this.dataIndex) != '{}') {
        if (this.ruleForm.time !== '') {
          this.clearValidate('ruleForm')
        }
      }
      this.dialogFormVisible = true
      this.ruleForm.title = index.activity_title
      this.value = index.activity_sort
      this.ruleForm.address = index.act_address
      this.ruleForm.time = index.act_time
      this.ruleForm.num = index.act_num
      this.ruleForm.con = index.act_content
      this.ruleForm.id = index.id
      // this.resetForm(formName);
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate()
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
    searchActivity() {
      if (this.cookieValue[2] < 0) {
        this.searchActivities()
      } else {
        this.searchActivityCid()
      }
    },
    searchActivities() {
      var select = this.select
      if (this.select === '') {
        alert('请选择搜索类别')
      } else if (this.optionList[select] == '名称') {
        api.searchActivityByTitle(this.searchword).then(res => {
          this.actList = res.data.data
        })
      } else if (this.optionList[select] == '类别') {
        api.searchActivityBySort(this.searchword).then(res => {
          this.actList = res.data.data
        })
      } else if (this.optionList[select] == '发布人') {
        api.searchActivityByUser(this.searchword).then(res => {
          this.actList = res.data.data
        })
      } else if (this.optionList[select] == '学校') {
        api.searchActivityByUschool(this.searchword).then(res => {
          this.actList = res.data.data
        })
      }
    },
    searchActivityCid() {
      var select = this.select
      if (this.select === '') {
        alert('请选择搜索类别')
      } else if (this.optionList[select] == '名称') {
        api
          .searchActivityCidByTitle(this.cookieValue[0], this.searchword)
          .then(res => {
            this.actList = res.data.data
          })
      } else if (this.optionList[select] == '类别') {
        api
          .searchActivityCidBySort(this.cookieValue[0], this.searchword)
          .then(res => {
            this.actList = res.data.data
          })
      } else if (this.searchword == '') {
        // window.location.reload();
        this.reload()
      }
    },
    handleInput() {
      if (this.searchword == '') {
        // window.location.reload();
        this.handleData()
      }
    },
    handleData() {
      if (this.cookieValue[2] < 0) {
        this.getActivityList(this.page, this.pageSize)
        this.getActivityTotal()
      } else if (this.cookieValue[2] > 0) {
        this.optionList = ['名称', '类别']
        this.getActivityCidList(this.cookieValue[0], this.page, this.pageSize)
        this.getACtivityCidTotal(this.cookieValue[0])
      }
    }
    // del(sNo) {
    //     let flag = confirm('确定删除么')
    //     if(flag) {
    //         this.delBySno(sNo)
    //     }

    // },
    // ...mapMutations(['setShowModel', 'setEditUser']),
    // ...mapActions(['delBySno'])
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 10px;
}
.export {
  margin-top: 10px;
  margin-left: 5px;
}
.input-with-select {
  width: 450px;
  padding-bottom: 10px;
}
</style>

<style>
@import '../../assets/css/index.css';
</style>