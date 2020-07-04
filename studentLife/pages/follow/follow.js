// pages/followAndFans/followAndFans.js
import {FollowModel}  from '../../model/followModel';
var followModel = new FollowModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    navList: [{
      name: "关注",
      index: 0
    }],
    isFollow:false,
    followUser:[],
    like: "已关注",
    dislike: "关注",
    switch1Checked: true,
    uid:''
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
  getFollowUser(id) {
    var that = this;
    followModel.getFollowUser(id).then(res=>{
      that.setData({
        followUser:res,
        isFollow:true
      })
    })
  },
  onDeleteFollowTap(e){
    var follow_id = e.currentTarget.dataset.index;
    var that = this;
    var uid = this.data.uid;
    wx.request({
      // url: 'http://xxx/deleteFollowUser',
      url: 'http://xxx/deleteFollowUser',
      method: "POST",
      data: {
        follow_id:follow_id,
        follow_cid:uid
      },
      success() {
        that.setData({
          isFollow: false
        })
        setTimeout(() => {
          that.getFollowUser(uid);
        }, 200);
      }
    })
  },
  toPerson: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/Personal/Personal?id=' + e.currentTarget.dataset.index
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
        followModel.searchFollowUser(value, uid).then(res=>{
          this.setData({
            followUser:res,
            isFollow:true
          })
        })
      } else{
        this.getFollowUser(uid);
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFollowUser(options.id);
    this.setData({
      uid:options.id
    })
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