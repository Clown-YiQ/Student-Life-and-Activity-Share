// pages/MyFans/MyFans.js
import {FollowModel}  from '../../model/followModel';
var followModel = new FollowModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    uid:'',
    navList: [{
      name: "粉丝",
      index: 0
    }, {
      name: "权限设置",
      index: 1
    }],
    switch1Checked: true,
    fansInfo:[],
    isFollow:false,
    curIndex:0
  },

  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  onTapTitle: function (e) {
    console.log(e);
    var currentIndex = this.data.currentIndex
    this.setData({
      currentIndex: e.detail.index
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
  onFansLikeTap: function (e) {
    console.log(e);
    let listLike = this.data.listLike[1]
    this.setData({
      listLike: {
        1: !listLike
      }
    })
    console.log(listLike)
  },
  getFansById(id) {
    followModel.getFansById(id).then(res=>{
      console.log(res);
      this.setData({
        fansInfo:res
      })
    })
  },
  getFollowUser(id) {
    followModel.getFollowUser(id).then(res=>{
      var fansInfo = this.data.fansInfo;
      console.log(fansInfo);
      console.log(res);
      for(var i = 0;i < fansInfo.length; i ++) {
        for(var j = 0;j < res.length; j ++) {
          if(fansInfo[i].fans_id == res[j].follow_id) {
            this.setData({
              isFollow:true
            })
          }
        }
        
      }
    })
  },
  switch1Change(e) {
    var value = e.detail.value;
    var id = e.currentTarget.dataset.index;
    var uid = this.data.uid;
    console.log(value);
    console.log(id);
    if(value !== false) {
      wx.request({
        url:'http://xxx/updateFansAuth',
        // url:'http://xxx/updateFansAuth',
        method:'POST',
        data:{
          id:id,
          uid:uid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(111);
          value = true
        },
        fail: function () {
          console.log("fail")
        }
      })
    }else if(value !== true) {
      wx.request({
        // url:'http://xxx/updateFansAuth2',
        url:'http://xxx/updateFansAuth2',
        method:'POST',
        data:{
          id:id,
          uid:uid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res)
          value = false
        },
        fail: function () {
          console.log("fail")
        }
      })
    }
  },
  toPerson: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/Personal/Personal?id=' + e.currentTarget.dataset.index
    })
  },
  deleteFans(e) {
    var that = this;
    var id = e.currentTarget.dataset.index;
    var uid = this.data.uid;
    wx.showModal({
      title: '是否移除粉丝？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            // url: 'http://xxx/deleteFansById',
            url: 'http://xxx/deleteFansById',
            method: "POST",
            data: {
              id: id,
              uid: uid
            },
            header: {
              'content-type': 'application/json'
            },
            success() {
              console.log(1);
              setTimeout(function () {
                that.getFansById(uid);
              }, 200)
            }
          })
        }
      }
    })
  },
  onBlur(e) {
    var value = e.detail.value;
    var uid = this.data.uid
    this.setData({
      value
    })
    if(uid){
      if(value) {
        followModel.searchFans(uid, value).then(res=>{
          this.setData({
            fansInfo:res
          })
        })
      } else{
        this.getFansById(uid);
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      uid:options.id
    })
    this.getFansById(options.id);
    this.getFollowUser(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})