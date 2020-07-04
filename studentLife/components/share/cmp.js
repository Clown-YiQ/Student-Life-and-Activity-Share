// components/share/cmp.js
import { ShareModel } from '../../model/shareModel';
var shareModel = new ShareModel();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shareInfo: {
      type: Array,
      value: [],
      observer() {}
    },
    shareImg: Array,
    cid: Number,
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
    isLike:false,
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
    onLikeTap: function (e) {
      // console.log(e);
      let listLike = this.data.listLike[0]
      this.setData({
        listLike: {
          0: !listLike
        }
      })
      console.log(listLike)
    },
    onTap(e) {
      var index = e.currentTarget.dataset.index;
      var src = e.currentTarget.dataset.src;
      var array = this.data.shareImg;
      // console.log(index)
      // console.log(array[index]);
      // console.log(this.data.shareInfo);
      wx.previewImage({
        current: src,
        urls: array[index] 
      })
    },
    toDetail:function(e) {
      var id = e.currentTarget.dataset.index;
      var uid = e.currentTarget.dataset.id
      wx.navigateTo({
        url:`/pages/ShareDetail/ShareDetail?id=${id}&uid=${uid}`
      })
    },

    loadmore() {
      if (this._isLock()) {
        return
      }
      this._loadLock();
      const cid = this.data.cid;
      if(this.data.uSchool == '') {
        shareModel.getShareTouchBottom(cid).then(res => {
        // console.log(res);
        this._setMoreData(res);
      })
      }else{
        shareModel.getShareBySchoolTouchBottom(cid,this.data.uSchool).then(res => {
          // console.log(res);
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
        const combineList = this.data.shareInfo.concat(list);
        var shareImg = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].share_img.length !== 0 && list[i].share_img !== null && list[i].share_img !== '') {
            shareImg[i] = list[i].share_img.split(',');
          }
        }
        const combineImgList = this.data.shareImg.concat(shareImg);
        this.setData({
          shareInfo: combineList,
          shareImg:combineImgList,
          cid: list.slice(-1)[0].id
        })
        this._unloadLock();
      } else {
        this.setData({
          cid: 0
        })
      }
    }
  }
})
