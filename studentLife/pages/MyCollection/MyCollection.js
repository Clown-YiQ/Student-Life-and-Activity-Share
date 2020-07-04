// pages/MyConnection/MyConnection.js
import { CollecModel } from '../../model/collecModel'
var collecModel = new CollecModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collecInfo:[],
    id:'',
  },
  getCollecInfo(uid) {
    collecModel.getCollecInfoByUid(uid).then(res=>{
      console.log(res);
      this.setData({
        collecInfo:res
      })
    })
  },
  deleteCollec:function(e) {
    var that = this;
    var id = e.currentTarget.dataset.index;
    var uid = this.data.uid;
    wx.showModal({
      title: '是否取消收藏？',
      success:function(res) {
        if(res.confirm) {
          wx.request({
            // url: 'http://xxx/deleteCollecInfoById',
            url: 'http://xxx/deleteCollecInfoById',
            method: "POST",
            data: {
              id: id,
              uid:uid
            },
            header: {
              'content-type': 'application/json'
            },
            success() {
              console.log(1);
              setTimeout(function(){
                that.getCollecInfo(uid)
              },200)     
            }
          })
        }
      }
    })
  },
  toDetail: function (e) {
    console.log(e.currentTarget.dataset.index);
    wx.navigateTo({
      url:`/pages/SecondDetail/SecondDetail?id=` + e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.uid);
    this.setData({
      uid:options.uid
    })
    this.getCollecInfo(options.uid);
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