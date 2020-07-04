// pages/index/index.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
import {UserModel} from '../../model/userModel'
import {ActivityModel} from '../../model/activityModel'
import {SecondModel} from '../../model/secondModel'
import {ShareModel} from '../../model/shareModel'
import {random} from '../../utils/randomStr'
var userModel = new UserModel();
var activityModel = new ActivityModel();
var secondModel = new SecondModel();
var shareModel = new ShareModel();
var Moment = require('../../utils/moment.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    navList: [{
      name: "组团",
      index: 0
    }, {
      name: "跳蚤市场",
      index: 1
    }, {
      name: "生活圈",
      index: 2
    }],
    listLike: {
      0: true
    },
    like: "取消",
    dislike: "赞",
    pickerSort: ["活动", "二手商品", "生活圈"],
    sort: '',
    showInfo: [],
    secondInfo: [],
    shareInfo:[],
    imgList: [],
    imgList1:[],
    imgList2:[],
    shareImg:[],
    u_school:'',
    background: [],
    swiperText:[],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 4000,
    duration: 500,
    userId:'',
    getMore:'',
    getSecMore:'',
    getShaMore:'',
    searchword:'',
  },
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
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
  // 地址权限
  addrAuthorized() {
    var self = this;
    wx.getSetting({
      success(res) {
        // console.log(res);
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] !== 'undefined' && res.authSetting['scope.userLocation'] !== true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success(res) {
              console.log(res);
              // 用户点击了取消按钮
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  image: '../../images/icon/refuse.png',
                  duration: 1000
                })
              } else {
                wx.showToast({
                  title: '授权成功',
                  image: '../../images/icon/success.png',
                  duration: 1000
                })
                // 授权成功 调用wx.getLocation()
                self.getLocation();
              }
            }
          })
        } else {
          // 地理位置已授权
          self.getLocation();
        }
      }
    })
  },
  // 获取当前地理位置
  getLocation() {
    var self = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // console.log(res)
        const latitude = res.latitude; //纬度
        const longitude = res.longitude; //经度
        self.getLocal(latitude, longitude);
      }
    })
  },
  // 通过经纬度获取位置
  getLocal(latitude, longitude) {
    var self = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success(res) {
        // console.log(res);
        var province = res.result.ad_info.province; //省份
        var city = res.result.ad_info.city; //城市
        self.setData({
          city
        })
      },
      fail(res) {
        console.log(res, '经纬度获取失败')
      }
    })
  },
  changeSort: function (e) {
    var index = e.detail.value;
    var pickerSort = this.data.pickerSort;
    var sort = pickerSort[index]
    this.setData({
      index,
      sort
    })
  },
  getSchoolById(id) {
    var that = this;
      userModel.getSchoolById(id).then(res=>{
        console.log(res[0].u_school);
        this.setData({
          u_school:res[0].u_school
        })
        if(res[0].u_school !== '' && res[0].u_school !== null) {
          activityModel.getAiSuggest(that.data.userId).then(res=>{
            if(res.length !== 0) {
              that.getActivityBySort(res.slice(0,1)[0].activity_sort);
              that.getSecondBySchool(that.data.u_school);
              that.getShareBySchool(that.data.u_school);
            } else {
              that.getActivityBySchool(that.data.u_school);
              that.getSecondBySchool(that.data.u_school);
              that.getShareBySchool(that.data.u_school);
            }
          })
        } else {
          that.getActivities();
          that.getSecond();
          that.getShare();
        }
      })
  },
  getActivityBySchool(school){
    userModel.getActivityBySchool(school).then(res=>{
     var result = this.handleTime(res);
      var imgList = this.handleActImg(result);
      // console.log(res);
      this.setData({
        showInfo: result,
        imgList:imgList,
        aid:res.slice(-1)[0].id
      })
    })
  },
  handleActImg(res){
    var imgList = [];
    for (var i = 0; i < res.length; i++) {
      if(res[i].act_img.length !== 0 && res[i].act_img !== null && res[i].act_img !== '') {
        imgList[i] = res[i].act_img.split(',');
      }
    }
    return imgList
  },
  getSecondBySchool(school){
    secondModel.getSecondsBySchool(school).then(res=>{
      var imgList1 = this.handleSecImg(res);
      // console.log(res.slice(-1)[0].sc_id);
      // console.log("second");
      this.setData({
        secondInfo: res,
        imgList1:imgList1,
        bid:res.slice(-1)[0].sc_id
      })
    })
  },
  getShareBySchool(school) {
    // console.log(1);
    shareModel.getShareBySchool(school).then(res=>{
      // console.log('school',res);
      var shareImg = this.handleShaImg(res);
      // console.log(res.slice(-1)[0].share_id);
      this.setData({
        shareInfo: res,
        shareImg:shareImg,
        // cid:res.slice(-1)[0].share_id
      })
    })
  },
  handleSecImg(res) {
    var imgList1 = [];
    for (var i = 0; i < res.length; i++) {
      if (res[i].sc_img.length !== 0 && res[i].sc_img !== null && res[i].sc_img !== '') {
        imgList1[i] = res[i].sc_img.split(',');
      }
    }
    return imgList1;
  },
  getActivityDesc(){
    activityModel.getActivityByDesc().then(res=>{
      var result = this.handleTime(res);
      var background = this.data.background;
      var swiperText = this.data.swiperText;
      var arr = [];
      // console.log(res);
      for (var i = 0; i < result.length; i++) {
        if (result[i].act_img.result !== 0 && result[i].act_img !== null && result[i].act_img !== ''){
          var img = result[i].act_img.split(",")[0];
          var title = result[i].activity_title;
          var id = result[i].id;
          var act_cid = result[i].act_cid;
            arr.push({img:img,
                        text:title,
                        id:id,
                        act_cid:act_cid}) 
        }
      }
      for(var j = 0;j < 4; j++) {
        background[j] = arr[j];
      }
      this.setData({
        background:background,
        swiperText:swiperText
      })
    })
  },
  getActivityPage(id) {
    activityModel.getActivityTouchBottom(id).then(res=>{
      // console.log(res);
    })
  },
  getAiSuggest(uid){
    activityModel.getAiSuggest(uid).then(res=>{
      // console.log(res);
    })
  },
  getActivityBySort(sort) {
    activityModel.getActivityBySort(sort).then(res=>{
      var result = this.handleTime(res);
      console.log(result)
      var imgList = this.handleActImg(result);
      // console.log(res.slice(-1)[0].id);
      // console.log(res);
      this.setData({
        showInfo: result,
        imgList:imgList,
        // aid:res.slice(-1)[0].id
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: '3NYBZ-73TWW-OV6R4-OBSXO-LO32H-R7FUD'
    });
    this.addrAuthorized();
    // console.log(options);
    var showInfo = this.data.showInfo;
    if (options !== undefined && JSON.stringify(options) !== "{}") {
      showInfo.unshift(options)
    }
    this.setData({
      showInfo
    })
    wx.getStorage({
      key:'userId',
      success(res) {
        that.setData({
          userId:res.data
        })
        that.getSchoolById(res.data);
        that.getAiSuggest(res.data);
      },
      fail() {
        that.getActivities();
        that.getSecond();
        that.getShare();
      }
    })
    this.getActivityPage(10)
    // console.log(this.data.u_school);
    // this.getActivities();
    // this.getSecond();
    // this.getShare();
    this.getActivityDesc();  
  },
  // 获取activities
  getActivities() {
    activityModel.getActivities().then(res => {
      // console.log(res)
      var result = this.handleTime(res);
      var imgList = this.handleActImg(result);
      this.setData({
        showInfo: result,
        imgList:imgList,
        aid:res.slice(-1)[0].id
      })
    })
  },
  //获取二手商品
  getSecond() {
    secondModel.getSeconds().then(res => {
      // console.log(res);
      var imgList1 = this.handleSecImg(res);
      // console.log(imgList1);
      this.setData({
        secondInfo: res,
        imgList1:imgList1,
        bid:res.slice(-1)[0].sc_id
      })
    })
  },
  getShare() {
    shareModel.getShare().then(res => {
      // console.log(res);
      var shareImg = this.handleShaImg(res);
      // console.log(res.slice(-1)[0].share_id);
      this.setData({
        shareInfo: res,
        shareImg:shareImg,
        // cid:res.slice(-1)[0].share_id
      })
    })
  },
  handleShaImg(res) {
    var shareImg = [];
      for (var i = 0; i < res.length; i++) {
      if(res[i].share_img.length !== 0 && res[i].share_img !== null && res[i].share_img !== '') {
        shareImg[i] = res[i].share_img.split(',');
      }
    }
    return shareImg;
  },
  toDetail: function (e) {
    var act_id = e.currentTarget.dataset.index;
    var uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: `/pages/ActionDetail/ActionDetail?act_id=${act_id}&uid=${uid}`
    })
    // console.log(this.data.showInfo);
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.onLoad();
    this.setData({
      searchword: ''
    })
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
    if(this.data.userId == ''){
      that.getActivities();
      that.getSecond();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var currentIndex = this.data.currentIndex;
    if (currentIndex == 0) {
      this.setData({
        getMore: random(20)
      })
    } else if (currentIndex == 1) {
      this.setData({
        getSecMore: random(20)
      })
    } else if (currentIndex == 2) {
      this.setData({
        getShaMore: random(20)
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})