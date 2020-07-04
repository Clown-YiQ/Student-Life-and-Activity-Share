// pages/person/person.js
//获取应用实例
const app = getApp()

import {UserModel}  from '../../model/userModel'
var userModel = new UserModel();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mySchool:'',
    uid:'',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var mySchool = this.data.mySchool;
    this.setData({
      mySchool:options.mySchool
    })
    var that = this
    wx.getStorage({
      key: 'userId',
      success (res) {
        console.log(res);
        // that.getUserByName(res.data.nickName);
        that.getUserById(res.data);
      }
    })
  },
  getUserInfo: function (e) {
    // console.log(e.detail)
    app.globalData.userInfo = e.detail.userInfo
    var avatarUrl = e.detail.userInfo.avatarUrl
    var nickName = e.detail.userInfo.nickName
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorage({
      key:'userInfo',
      data:{
        avatarUrl,
        nickName
      },
    })
    wx.request({
      url:'http://xxx/insertUserInfo',
      // url:'http://xxx/insertUserInfo',
      method:"POST",
      data:{
        u_name:nickName,
        u_userhead:avatarUrl
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // console.log(res.data);
        var userId = res.data.data;
        wx.setStorage({
          key:'userId',
          data:userId,
        })
      },
      fail: function () {
          wx.showToast({
            title:'授权登陆失败',
            icon:'none'
          })
      }
    })
  },
  // getUserByName(name){
  //   var mySchool = this.data.mySchool
  //   userModel.getUserByName(name).then(res=>{
  //     console.log(res);
  //     this.setData({
  //       mySchool:res[0].u_school
  //     })
  //   })
  // },
  getUserById(id) {
    var mySchool = this.data.mySchool
    var uid = this.data.uid;
    userModel.getUserById(id).then(res=>{
      console.log(res);
      this.setData({
        mySchool:res[0].u_school,
        uid:res[0].id
      })
    })
  },
  onTapTo:function(){
    wx.navigateTo({
      url:'/pages/follow/follow?id=' + this.data.uid
    })
  },
  onTapMyJoin:function() {
    wx.navigateTo({
      url:'/pages/MyJoin/MyJoin?id=' + this.data.uid
    })
  },
  onTapToFans:function(){
    wx.navigateTo({
      url:'/pages/MyFans/MyFans?id=' + this.data.uid
    })
  },
  onTapToConcern:function(){
    wx.navigateTo({
      url:'/pages/MyConcern/MyConcern?uid=' + this.data.uid
    })
  },
  onTapToCollection:function(){
    wx.navigateTo({
      url:'/pages/MyCollection/MyCollection?uid=' + this.data.uid
    })
  },
  onTapToConfirm:function(){
    wx.navigateTo({
      url:'/pages/MyConfirm/MyConfirm?userInfo=' + this.data.userInfo
    })
  },
  confirmTo:function(){
    if(this.data.mySchool == undefined || this.data.mySchool == ''){
      this.onTapToConfirm();
    }else{
      return false;
    }
  }
})