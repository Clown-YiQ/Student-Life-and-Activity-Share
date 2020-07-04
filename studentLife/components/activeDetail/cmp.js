// components/activeDetail/cmp.js
import {
  ActivityModel
} from '../../model/activityModel'
var activityModel = new ActivityModel();
var Moment = require('../../utils/moment.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showInfo: {
      type: Array,
      value: [],
      observer() {}
    },
    imgList: Array,
    userId: Number,
    aid: Number,
    uSchool:String,
    more: {
      type: String,
      value: '',
      observer: 'loadmore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail: function (e) {
      var showInfo = this.data.showInfo;
      var sort = e.currentTarget.dataset.sort;
      var act_id = e.currentTarget.dataset.index;
      var uid = e.currentTarget.dataset.uid;
      var userId = this.data.userId;
      wx.navigateTo({
        url: `/pages/ActionDetail/ActionDetail?act_id=${act_id}&uid=${uid}`
      })
      wx.request({
        // url: 'http://xxx/insertAiSuggest',
        url: 'http://xxx/insertAiSuggest',
        method: "POST",
        data: {
          activity_sort: sort,
          userId: userId
        }
      })
    },
    toPerson: function (e) {
      // console.log(e);
      var act_cid = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: `/pages/Personal/Personal?id=${act_cid}`
      })
    },
    onTap(e) {
      const index = e.currentTarget.dataset.index
      const src = e.currentTarget.dataset.src
      const array = this.data.imgList
      // console.log(array[index])
      wx.previewImage({
        current: src,
        urls: array[index]
      })
    },
    loadmore() {
      if (this._isLock()) {
        return
      }
      this._loadLock();
      const aid = this.data.aid;
      if(this.data.uSchool == ''){
        activityModel.getActivityTouchBottom(aid).then(res => {
        // console.log(res);
        var result = this.handleTime(res)
        this._setMoreData(result);
      })
      }
    },
    _isLock() {
      return this.data.loading
    },
    _loadLock() {
      this.setData({
        loading: true
      })
    },
    _unloadLock() {
      this.setData({
        loading: false
      })
    },
    _setMoreData(list) {
      if (list.length !== 0) {
        const combineList = this.data.showInfo.concat(list);
        var imgList = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].act_img.length !== 0 && list[i].act_img !== null && list[i].act_img !== '') {
            imgList[i] = list[i].act_img.split(',');
          }
        }
        const combineImgList = this.data.imgList.concat(imgList);
        this.setData({
          showInfo: combineList,
          imgList:combineImgList,
          aid: list.slice(-1)[0].id
        })
        this._unloadLock();
      } else {
        this.setData({
          aid: 0
        })
      }
    },
    handleTime(res) {
      var localDate = Moment(new Date()).format('YYYY-MM-DD');
      // console.log(localDate);
      var result = [];
      res.forEach(function (item, index) {
        // console.log(item.act_time);
        if (new Date(item.act_time) > new Date(localDate)) {
          result.push(item);
        }
      })
      return result;
    },
  }
})

