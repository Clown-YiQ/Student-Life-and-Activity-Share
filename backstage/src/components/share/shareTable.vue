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
        <el-button slot="append" icon="el-icon-search" @click="searchShare"></el-button>
      </el-input>
    </div>
    <!--  -->
    <el-table :data="shList" stripe style="width: 100%">
      <el-table-column prop="share_id" label="ID" width="120"></el-table-column>
      <el-table-column prop="share_con" label="内容" width="300"></el-table-column>
      <el-table-column prop="share_ctime" label="发布时间" width="150"></el-table-column>
      <el-table-column prop="share_uname" label="发布人" width="160"></el-table-column>
      <el-table-column prop="share_school" label="学校" width="150"></el-table-column>
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
      shList: [],
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
    this.handleData()
  },
  methods: {
    edit(item) {
      this.setShowModel(true)
      // this.setEditUser(item);
    },
    handleDelete(index, row) {
      // console.log(index.sc_id, row)
      this.$confirm('确定删除？')
        .then(_ => {
          api
            .deleteShareById({
              id: index.share_id
            })
            .then(res => {
              window.location.reload()
            })
        })
        .catch(_ => {})
    },
    getShareList(page, pageSize) {
      api.queryShareByPage(page, pageSize).then(res => {
        // console.log(res)
        this.shList = res.data.data
      })
    },
    getShareTotal() {
      api.getShareTotal().then(res => {
        let count = res.data.data[0].total
        this.total = Math.ceil(count)
        // console.log(this.total)
      })
    },
    getShareCidList(cid, page, pageSize) {
      api.queryShareCidByPage(cid, page, pageSize).then(res => {
        // console.log(res)
        this.shList = res.data.data
      })
    },
    getShareCidTotal(cid) {
      api.queryShareCidTotal(cid).then(res => {
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
    searchShare() {
      if (this.cookieValue[2] < 0) {
        this.searchShares()
      } else {
        this.searchShareCid()
      }
    },
    searchShares() {
      var select = this.select
      if (select === '') {
        alert('请选择搜索内容')
      } else if (this.optionList[select] == '内容') {
        // console.log(1)
        api.searchShareByCon(this.searchword).then(res => {
          this.shList = res.data.data
        })
      } else if (this.optionList[select] == '发布人') {
        api.searchShareByUser(this.searchword).then(res => {
          this.shList = res.data.data
        })
      } else if (this.optionList[select] == '学校') {
        api.searchShareByUschool(this.searchword).then(res => {
          this.shList = res.data.data
        })
      }
    },
    searchShareCid() {
      var select = this.select
      if (select === '') {
        alert('请选择搜索内容')
      } else if (this.optionList[select] == '内容') {
        // console.log(1)
        api
          .searchShareCidByCon(this.cookieValue[0], this.searchword)
          .then(res => {
            this.shList = res.data.data
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
        this.getShareList(this.page, this.pageSize)
        this.getShareTotal()
      } else {
        this.optionList = ['内容']
        this.getShareCidList(this.cookieValue[0], this.page, this.pageSize)
        this.getShareCidTotal(this.cookieValue[0])
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