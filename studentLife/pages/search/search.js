// pages/search/search.js
import {
  ActivityModel
} from '../../model/activityModel';
import {
  SecondModel
} from '../../model/secondModel';
import {
  ShareModel
} from '../../model/shareModel';
var activityModel = new ActivityModel();
var secondModel = new SecondModel();
var shareModel = new ShareModel();
var Moment = require('../../utils/moment.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sort: '',
    value: '',
    showInfo: [],
    secondInfo: [],
    shareInfo: [],
    imgList: [],
    imgList1: [],
    imgList2: [],
    shareImg: [],
    u_school: '',
    errorInfo: false
  },
  searchActivity(value) {
    activityModel.searchActivity(value).then(res => {
      var result = this.handleTime(res);
      var imgList = this.handleActImg(result);
      this.setData({
        showInfo: result,
        imgList: imgList,
      })
      if (res.length == 0) {
        activityModel.searchActivitySort(value).then(res => {
          var result = this.handleTime(res);
          if (res.length == 0) {
            this.setData({
              errorInfo: true
            })
          } else {
            var imgList = this.handleActImg(result);
            this.setData({
              showInfo: result,
              imgList: imgList,
              errorInfo: false
            })
          }
        })
      }
    })
  },
  searchSecond(value) {
    secondModel.searchSecond(value).then(res => {
      if (res.length == 0) {
        this.setData({
          errorInfo: true
        })
      } else {
        var imgList1 = this.handleSecImg(res);
        this.setData({
          secondInfo: res,
          imgList1: imgList1,
          errorInfo: false
        })
      }
    })
  },
  searchShare(value) {
    shareModel.searchShare(value).then(res => {
      if (res.length == 0) {
        this.setData({
          errorInfo: true
        })
      } else {
        var shareImg = this.handleShaImg(res);
        this.setData({
          shareInfo: res,
          shareImg: shareImg,
          errorInfo: false
        })
      }
    })
  },
  searchActivityBySchool(value, school) {
    activityModel.searchActivityBySchool(value, school).then(res => {
      var result = this.handleTime(res);
      var imgList = this.handleActImg(result);
      this.setData({
        showInfo: result,
        imgList: imgList,
      })
      if (res.length == 0) {
        activityModel.searchActivitySortBySchool(value, school).then(res => {
          var result = this.handleTime(res);
          if (res.length == 0) {
            this.setData({
              errorInfo: true
            })
          } else {
            var imgList = this.handleActImg(result);
            this.setData({
              showInfo: result,
              imgList: imgList,
              errorInfo: false
            })
          }
        })
      }
    })
  },
  searchSecondBySchool(value, school) {
    secondModel.searchSecondBySchool(value, school).then(res => {
      if (res.length == 0) {
        this.setData({
          errorInfo: true
        })
      } else {
        var imgList1 = this.handleSecImg(res);
        this.setData({
          secondInfo: res,
          imgList1: imgList1,
          errorInfo: false
        })
      }
    })
  },
  searchShareBySchool(value, school) {
    shareModel.searchShareBySchool(value, school).then(res => {
      if (res.length == 0) {
        this.setData({
          errorInfo: true
        })
      } else {
        var shareImg = this.handleShaImg(res);
        this.setData({
          shareInfo: res,
          shareImg: shareImg,
          errorInfo: false
        })
      }
    })
  },
  // 处理活动图片
  handleActImg(res) {
    var imgList = [];
    for (var i = 0; i < res.length; i++) {
      if (res[i].act_img.length !== 0 && res[i].act_img !== null && res[i].act_img !== '') {
        imgList[i] = res[i].act_img.split(',');
      }
    }
    return imgList;
  },
  //处理二手商品图片
  handleSecImg(res) {
    var imgList1 = [];
    for (var i = 0; i < res.length; i++) {
      if (res[i].sc_img.length !== 0 && res[i].sc_img !== null && res[i].sc_img !== '') {
        imgList1[i] = res[i].sc_img.split(',');
      }
    }
    return imgList1;
  },
  handleShaImg(res) {
    var shareImg = [];
    for (var i = 0; i < res.length; i++) {
      if (res[i].share_img.length !== 0 && res[i].share_img !== null && res[i].share_img !== '') {
        shareImg[i] = res[i].share_img.split(',');
      }
    }
    return shareImg;
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.school);
    this.setData({
      u_school: options.school
    })
    if (options.sort) {
      this.setData({
        sort: options.sort,
      })
    } else {
      this.setData({
        sort: '活动'
      })
    }
  },
  // 失焦事件
  onBlur(e) {
    var sort = this.data.sort;
    var value = e.detail.value || this.data.value;
    var school = this.data.u_school
    this.setData({
      value
    })
    // console.log(value)
    if (school == '') {
      if (sort == '活动') {
        this.searchActivity(value);
      } else if (sort == '二手商品') {
        this.searchSecond(value)
      } else if (sort == '生活圈') {
        this.searchShare(value);
      }
    } else {
      if (sort == '活动') {
        this.searchActivityBySchool(value, school);
      } else if (sort == '二手商品') {
        this.searchSecondBySchool(value, school);
      } else if (sort == '生活圈') {
        this.searchShareBySchool(value, school);
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})