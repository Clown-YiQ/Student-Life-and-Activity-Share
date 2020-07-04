// pages/Personal/Personal.js
import {UserModel}  from '../../model/userModel'
import {ActivityModel}  from '../../model/activityModel'
import {SecondModel}  from '../../model/secondModel'
import {ShareModel}  from '../../model/shareModel'
import {FollowModel}  from '../../model/followModel'
var userModel = new UserModel();
var activityModel = new ActivityModel();
var secondModel = new SecondModel();
var shareModel = new ShareModel();
var followModel = new FollowModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    followNum:1,
    fansNum:10,
    currentIndex: 0,
    navList: [{ name: "活动", index: 0 }, { name: "二手商品", index: 1 }, { name: "生活圈", index: 2 }],
    listLike: {
      0: true
    },
    like: "取消",
    dislike: "赞",
    userInfo:[],
    curUser:[],
    curId:'',
    uid:'',
    isFollow:false,
    actInfo:[],
    actImg:[],
    secInfo:[],
    secImg:[],
    shInfo:[],
    shImg:[],
    followUser:[],
    fansInfo:[],
    u_school:'',
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
      currentIndex:e.detail.index
    })
  },
  //数据。
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
  toDetail: function () {
    wx.navigateTo({
      url: '/pages/ActionDetail/ActionDetail'
    })
  },
  getUserById (id) {
    userModel.getUserById(id).then(res=>{
      console.log(res);
      this.setData({
        userInfo:res[0]
      })
    })
  },
  getSchoolById(id) {
    userModel.getSchoolById(id).then(res=>{
      console.log(res);
      this.setData({
        u_school:res[0].u_school
      })
    })
  },
  getActivityByUid (uid) {
    activityModel.getActivitiesByUid(uid).then(res=>{
      // console.log(res);
      var imgList = [];
      for (var i = 0; i < res.length; i++) {
        if(res[i].act_img.length !== 0) {
          imgList[i] = res[i].act_img.split(',');
        }
      }
      this.setData({
        actInfo:res,
        actImg:imgList
      })
    })
  },
  getActivityLimit(act_cid) {
    activityModel.getActivityLimit(act_cid).then(res=>{
      var imgList = [];
      for (var i = 0; i < res.length; i++) {
        if(res[i].act_img.length !== 0) {
          imgList[i] = res[i].act_img.split(',');
        }
      }
      this.setData({
        actInfo:res,
        actImg:imgList
      })
    })
  },
  getSecondLimit(sc_cid){
    secondModel.getSecondsBylimit(sc_cid).then(res=>{
      var imgList = [];
      for (var i = 0; i < res.length; i++) {
        if(res[i].sc_img.length !== 0) {
          imgList[i] = res[i].sc_img.split(',');
        }
      }
      console.log(res);
      this.setData({
        secInfo:res,
        secImg:imgList
      })
    })
  },
  getSecondsByUid (uid) {
    secondModel.getSecondsByUid(uid).then(res=>{
      var imgList = [];
      for (var i = 0; i < res.length; i++) {
        if(res[i].sc_img.length !== 0) {
          imgList[i] = res[i].sc_img.split(',');
        }
      }
      // console.log(res);
      this.setData({
        secInfo:res,
        secImg:imgList
      })
    })
  },
  getShareByUid (uid) {
    shareModel.getShareByUid(uid).then(res=>{
      var imgList = [];
      for (var i = 0; i < res.length; i++) {
        if(res[i].share_img.length !== 0) {
          imgList[i] = res[i].share_img.split(',');
        }
      }
      // console.log(res);
      this.setData({
        shInfo:res,
        shImg:imgList
      })
    })
  },
  getShareLimit (id) {
    shareModel.getShareLimit(id).then(res=>{
      var imgList = [];
      for (var i = 0; i < res.length; i++) {
        if(res[i].share_img.length !== 0) {
          imgList[i] = res[i].share_img.split(',');
        }
      }
      // console.log(res);
      this.setData({
        shInfo:res,
        shImg:imgList
      })
    })
  },
  followUser: function() {
    var curUser = this.data.curUser;
    var userInfo = this.data.userInfo;
    var isFollow = this.data.isFollow;
    // console.log(curUser);
    // console.log(userInfo);
    this.setData({
      isFollow:true
    })
    if(this.data.u_school == '' || this.data.u_school == null) {
      wx.showToast({
        title:'请先认证学校',
        icon:'none'
      })
    }else{
      wx.request({
        // url: 'http://xxx/insertFollowUser',
        url: 'http://xxx/insertFollowUser',
        method: "POST",
        data: {
          follow_id:userInfo.id,
          follow_name:userInfo.u_name,
          follow_userhead:userInfo.u_userhead,
          follow_uschool:userInfo.u_school,
          follow_cid:this.data.uid,
          follow_cname:curUser.nickName,
          follow_cuserhead:curUser.avatarUrl,
          follow_school:this.data.u_school
        },
      })
    }
  },
  deleteFollowUser: function() {
    var userInfo = this.data.userInfo;
    var that = this;
    wx.request({
      // url: 'http://xxx/deleteFollowUser',
      url: 'http://xxx/deleteFollowUser',
      method: "POST",
      data: {
        follow_id:userInfo.id,
        follow_cid:this.data.uid
      },
      success() {
        that.setData({
          isFollow: false
        })
      }
    })
  },
  getFollowUser: function(id) {
    followModel.getFollowUser(id).then(res=>{
      console.log(res);
      this.setData({
        followUser:res
      }) 
    })
  },
  getFansUser: function(id) {
    followModel.getFansUser(id).then(res=>{
      // console.log(res);
      for(var i = 0;i < res.length; i++) {
        if(res[i].follow_cid == this.data.uid) {
          this.setData({
            isFollow: true
          })
        } else {
          this.setData({
            isFollow: false
          })
        }
      }
    })
  },
  getFansById: function(id) {
    var that = this;
    followModel.getFansById(id).then(res=>{
      console.log(res);
      if(res.length == 0) {
        that.getActivityLimit(that.data.curId);
          that.getSecondLimit(that.data.curId);
          that.getShareLimit(that.data.curId);
          that.setData({
            fansInfo:res
          })
      } else{
        for(var i = 0;i < res.length; i++) {
          if(res[i].fans_id == this.data.uid && res[i].fans_auth == 0) {
            that.getActivityByUid(that.data.curId);
            that.getSecondsByUid(that.data.curId);
            that.setData({
              fansInfo:res
            })
          } else if(res[i].fans_uid !== this.data.uid || res[i].fans_auth > 0) {
            that.getActivityLimit(that.data.curId);
            that.getSecondLimit(that.data.curId);
            that.getShareLimit(that.data.curId);
            that.setData({
              fansInfo:res
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var that = this;
    wx.getStorage({
      key: 'userId',
      success (res) {
        // that.getUserByName(res.data.nickName);
        that.getSchoolById(res.data);
        // console.log(res);
        that.setData({
          uid:res.data
        })
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        that.setData({
          curUser:res.data
        })
      }
    })
    this.setData({
      curId:options.id
    })
    console.log(options);
    this.getUserById(options.id);
    // this.getActivityByUid(options.id);
    // this.getSecondsByUid(options.id);
    this.getShareByUid(options.id);
    this.getFollowUser(options.id);
    this.getFansById(options.id);
    this.getFansUser(options.id);
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