import { ActivityModel } from "../../model/activityModel";
import { SecondModel } from "../../model/secondModel"; 
import { ShareModel } from "../../model/shareModel";
var activityModel = new ActivityModel();
var secondModel = new SecondModel();
var shareModel  = new ShareModel();
// pages/MyConcern/MyConcern.js
Page({
  data: {
    arr: [{
        sort: "运动",
        title: "打篮球",
        time: '2020-2-20',
        con: '按实第三方的是非得失际打开了时间啊分开了时代峻峰'
      },
      {
        sort: "游戏",
        title: "英雄联盟",
        time: '2020-2-29',
        con: '啊啊啊奥术大师多撒多撒大所大无撒所多哇所啊啊啊啊'
      }
    ],
    navList: [{
      name: "活动",
      index: 0
    }, {
      name: "二手商品",
      index: 1
    }, {
      name: "生活圈",
      index: 2
    }],
    currentIndex: 0,
    activitiesInfo:[],
    secondInfo:[],
    shareInfo:[],
    uid:'',
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '/pages/ActionDetail/ActionDetail?act_id=' + e.currentTarget.dataset.index
    })
  },
  deleteActivity: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.index;//获取文章id值
    // var url = 'http://xxx/deleteActivityById'
    var url = 'http://xxx/deleteActivityById'
    this.deleteHandle(url,id,that.getActivityByUid)
  },
  deleteSecond: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.index;
    // var url = 'http://xxx/deleteSecondById'
    var url = 'http://xxx/deleteSecondById'
    this.deleteHandle(url,id,that.getSecondsByUid)
  },
  deleteShare: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.index;
    // var url = 'http://xxx/deleteShareById'
    var url = 'http://xxx/deleteShareById'
    this.deleteHandle(url, id, that.getShareByUid)
  },
  //封装删除函数
  deleteHandle(url,value,func){
    var that = this;
    var uid = that.data.uid;
    wx.showModal({
      title: '是否确定删除内容？',
      success: function (res) {
        if (res.confirm) { //点击确定后
          wx.request({
            url:url,
            method:"POST",
            data:{
              id:value
            }
          })
          setTimeout(function(){
            func(uid)
          },200)
        }
      }
    })
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
    // console.log(e);
    var currentIndex = this.data.currentIndex
    this.setData({
      currentIndex: e.detail.index
    })
  },
  getActivityByUid(uid) {
    var activitiesInfo = this.data.activitiesInfo;
    activityModel.getActivitiesByUid(uid).then(res=>{
      // console.log(res);
      this.setData({
        activitiesInfo:res,
      })
    })
  },
  getSecondsByUid(uid) {
    var secondInfo = this.data.secondInfo;
    secondModel.getSecondsByUid(uid).then(res=>{
      // console.log(res);
      this.setData({
        secondInfo:res
      })
    })
  },
  getShareByUid(uid) {
    var secondInfo = this.data.shareInfo;
    shareModel.getShareByUid(uid).then(res=>{
      // console.log(res);
      this.setData({
        shareInfo:res
      })
    })
  },
  toSecondDetail: function (e) {
    // console.log(e.currentTarget.dataset.index);
    wx.navigateTo({
      url:`/pages/SecondDetail/SecondDetail?id=` + e.currentTarget.dataset.index
    })
  },
  toShareDetail:function(e) {
    var id = e.currentTarget.dataset.index;
    var uid = e.currentTarget.dataset.id
    wx.navigateTo({
      url:`/pages/ShareDetail/ShareDetail?id=${id}&uid=${uid}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      uid:options.uid
    })
    this.getSecondsByUid(options.uid);
    this.getActivityByUid(options.uid);
    this.getShareByUid(options.uid);
    // console.log(this.data.activitiesInfo)
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