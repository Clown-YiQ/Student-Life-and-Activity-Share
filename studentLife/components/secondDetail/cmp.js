// components/secondDetail/cmp.js
import { SecondModel } from '../../model/secondModel';
var secondModel = new SecondModel();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bid:Number,
    secondInfo: {
      type: Array,
      value: [],
      observer() {}
    },
    imgList1: Array,
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
    loading:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toPerson: function (e) {
      // console.log(e);
      wx.navigateTo({
        url: '/pages/Personal/Personal?id=' + e.currentTarget.dataset.index
      })
    },
    onTap(e) {
      var index = e.currentTarget.dataset.index;
      var src = e.currentTarget.dataset.src;
      var array = this.data.imgList1;
      // console.log(array[index])
      // console.log(src);
      // console.log(this.data.bid)
      wx.previewImage({
        current: src,
        urls: array[index] 
      })
    },
    toDetail: function (e) {
      console.log(e.currentTarget.dataset.index);
      wx.navigateTo({
        url:`/pages/SecondDetail/SecondDetail?id=` + e.currentTarget.dataset.index
      })
    },
    // 触底加载时间
    loadmore() {
      if (this._isLock()) {
        return
      }
      this._loadLock();
      const bid = this.data.bid;
      if(this.data.uSchool == '') {
        secondModel.getSecondTouchBottom(bid).then(res => {
        // console.log(res);
        this._setMoreData(res);
      })
      }else{
        secondModel.getSecondBySchoolTouchBottom(bid,this.data.uSchool).then(res =>{
          this._setMoreData(res);
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
        const combineList = this.data.secondInfo.concat(list);
        var imgList1 = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].sc_img.length !== 0 && list[i].sc_img !== null && list[i].sc_img !== '') {
            imgList1[i] = list[i].sc_img.split(',');
          }
        }
        const combineImgList = this.data.imgList1.concat(imgList1);
        this.setData({
          secondInfo: combineList,
          imgList1:combineImgList,
          bid: list.slice(-1)[0].id
        })
        this._unloadLock();
      } else {
        this.setData({
          bid: 0
        })
      }
    }
  }
})
