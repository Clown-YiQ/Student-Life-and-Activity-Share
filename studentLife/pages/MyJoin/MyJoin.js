// pages/MyJoin/MyJoin.js
import {JoinModel}  from '../../model/joinModel'
var joinModel = new JoinModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinInfo:[],
    id:'',
  },
  getJoinInfo(uid) {
    joinModel.getJoinInfo(uid).then(res=>{
      console.log(res);
      this.setData({
        joinInfo:res
      })
    })
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: `/pages/ActionDetail/ActionDetail?act_id=${e.currentTarget.dataset.index}&uid=${e.currentTarget.dataset.id}`
    })
  },
  deleteJoinInfo(e) {
    var id = this.data.id;
    var that = this;
    wx.request({
      // url: 'http://xxx/deleteJoinInfoById',
      url: 'http://xxx/deleteJoinInfoById',
      method: "POST",
      data: {
        id: e.currentTarget.dataset.index
      },
      success() {
        setTimeout(function(){
          that.getJoinInfo(id);
        },200)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      id:options.id
    })
    this.getJoinInfo(options.id);
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