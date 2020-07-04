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
        <el-button slot="append" icon="el-icon-search" @click="searchSecond"></el-button>
      </el-input>
    </div>
    <!-- 二手商品列表 -->
    <el-table :data="secList" stripe style="width: 100%">
      <el-table-column prop="sc_id" label="ID" width="120"></el-table-column>
      <el-table-column prop="sc_title" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="sc_price" label="商品价格" width="150"></el-table-column>
      <el-table-column prop="sc_con" label="商品内容" width="260"></el-table-column>
      <el-table-column prop="sc_cname" label="发布人" width="150"></el-table-column>
      <el-table-column prop="sc_school" label="学校" width="130"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="openDetail(scope.row)"
            v-if="cookieValue[2] > 0"
            size="small"
          >编辑</el-button>
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
    <!-- 弹窗 -->
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
        <el-form-item label="商品名称" prop="title">
          <el-input style="width: 350px;" type="text" v-model="ruleForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品内容" prop="con">
          <el-input style="width: 350px;" v-model="ruleForm.con"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input style="width: 350px;" v-model="ruleForm.price"></el-input>
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
    var a = /^(\d{1,4})(-)(\d{1,2})\2(\d{1,2})$/
    var validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入商品名称名称'))
      } else {
        if (value.length > 32) {
          callback(new Error('请输入少于32位的内容'))
        }
        callback()
      }
    }
    var checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('价格不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(parseInt(value))) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 600)
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
      secList: [],
      optionList: ['名称', '价格', '内容', '发布人'],
      searchword: '',
      select: '',
      dialogFormVisible: false,
      ruleForm: {
        id: 0,
        title: '',
        con: '',
        price: ''
      },
      rules: {
        title: [{ validator: validateTitle, trigger: 'blur' }],
        con: [{ validator: validateCon, trigger: 'blur' }],
        price: [{ validator: checkPrice, trigger: 'blur' }]
      },
      // "运动", "游戏", "交友", "旅行", "读书", "竞赛", "电影", "音乐", "其他
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
    handleDelete(index, row) {
      // console.log(index.sc_id, row)
      this.$confirm('确定删除？')
        .then(_ => {
          api
            .deleteSecondById({
              id: index.sc_id
            })
            .then(res => {
              // console.log(res);
              // window.location.reload()
              this.reload()
            })
        })
        .catch(_ => {})
    },
    getSecondList(page, pageSize) {
      api.querySecondByPage(page, pageSize).then(res => {
        // console.log(res)
        this.secList = res.data.data
      })
    },
    getSecondTotal() {
      api.getSecondTotal().then(res => {
        let count = res.data.data[0].total
        this.total = Math.ceil(count)
        // console.log(this.total)
      })
    },
    getSecondCidList(cid, page, pageSize) {
      api.querySecondCidByPage(cid, page, pageSize).then(res => {
        // console.log(res)
        this.secList = res.data.data
      })
    },
    getSecondCidTotal(cid) {
      api.querySecondCidTotal(cid).then(res => {
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
    /* 编辑二手商品信息 */
    openDetail(index, row) {
      console.log(index)
      if (JSON.stringify(this.dataIndex) != '{}') {
        if (this.ruleForm.price !== '') {
          this.clearValidate('ruleForm')
        }
      }
      this.dialogFormVisible = true
      this.ruleForm.id = index.sc_id
      this.ruleForm.title = index.sc_title
      this.ruleForm.con = index.sc_con
      this.ruleForm.price = index.sc_price
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          // console.log(this.ruleForm)
          api
            .editSecond({
              sc_title: this.ruleForm.title,
              sc_price: this.ruleForm.price,
              sc_con: this.ruleForm.con,
              id: this.ruleForm.id
            })
            .then(res => {
              // console.log(res)
              alert('提交成功!')
              // window.location.reload()
              this.reload()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    searchSecond() {
      if (this.cookieValue[2] < 0) {
        this.searchSeconds()
      } else {
        this.searchSecondCid()
      }
    },
    searchSeconds() {
      var select = this.select
      if (select === '') {
        alert('请选择搜索类别')
      } else if (this.optionList[select] == '名称') {
        // console.log(1)
        api.searchSecondByTitle(this.searchword).then(res => {
          this.secList = res.data.data
        })
      } else if (this.optionList[select] == '价格') {
        api.searchSecondByPrice(this.searchword).then(res => {
          this.secList = res.data.data
        })
      } else if (this.optionList[select] == '内容') {
        api.searchSecondByCon(this.searchword).then(res => {
          this.secList = res.data.data
        })
      } else if (this.optionList[select] == '发布人') {
        api.searchSecondByUser(this.searchword).then(res => {
          this.secList = res.data.data
        })
      } else if (this.searchword == '') {
        // window.location.reload();
        this.reload()
      }
    },
    searchSecondCid() {
      var select = this.select
      if (select === '') {
        alert('请选择搜索类别')
      } else if (this.optionList[select] == '名称') {
        api
          .searchSecondCidByTitle(this.cookieValue[0], this.searchword)
          .then(res => {
            this.secList = res.data.data
          })
      } else if (this.optionList[select] == '价格') {
        api
          .searchSecondCidByPrice(this.cookieValue[0], this.searchword)
          .then(res => {
            this.secList = res.data.data
          })
      } else if (this.optionList[select] == '内容') {
        api
          .searchSecondCidByCon(this.cookieValue[0], this.searchword)
          .then(res => {
            this.secList = res.data.data
          })
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
        this.getSecondList(this.page, this.pageSize)
        this.getSecondTotal()
      } else {
        this.optionList = ['名称', '价格', '内容']
        this.getSecondCidList(this.cookieValue[0], this.page, this.pageSize)
        this.getSecondCidTotal(this.cookieValue[0])
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 10px;
}
.input-with-select {
  width: 450px;
  padding-bottom: 10px;
}
</style>

<style>
@import '../../assets/css/index.css';
</style>