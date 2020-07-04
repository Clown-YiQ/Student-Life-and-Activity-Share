// pages/MyConfirm/MyConfirm.js
const app = getApp()
var schoolData = require("../../utils/AllSchool.js")
var province = schoolData.province;
var school = schoolData.campus;
import { UserModel } from '../../model/userModel'
var userModel = new UserModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatarUrl: '',
    animationAddressMenu: {},
    addressMenuIsShow: false,
    province: province,
    school: school,
    multiArray: [
      [],
      []
    ],
    multiIndex: [0, 0],
    mySchool: '',
    form: {
      stuName: '',
      stuId: '',
      phone: '',
      password: ''
    },
    user: [],
    flag: false,
    uid: '',
  },
  /****值发生改变 */
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  /****列发生改变 */
  bindMultiPickerColumnChange: function (e) {
    var that = this
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        //第一列改变  设置第二列数据
        let arr = that.getArr(that.data.province[e.detail.value], that.data.school)
        data.multiArray[1] = arr
        that.setData({
          multiArray: data.multiArray
        })
    }
    var school = this.data.multiArray[1][this.data.multiIndex[1]]
    var mySchool = this.data.mySchool;
    this.setData({
      mySchool: school
    })
  },
  userSubmit: function (e) {
    if (this.data.mySchool == '') {
      wx.showToast({
        title: '请选择您的学校',
        icon: 'none',
        duration: 2000
      })
    }
    // console.log(e);
    // console.log(this.data.mySchool);  
    var nickName = this.data.nickName;
    this.getUser();
    var user = this.data.user;
    var flag = false;
    var stuName = e.detail.value.stuName;
    var stuId = e.detail.value.stuId;
    var phone = e.detail.value.phone;
    var password = e.detail.value.password;
    var id = this.data.uid;
    if (stuName == '' && stuId == '' && phone == '' && password == '') {
      wx.showToast({
        title: '请填写全部内容',
        icon: 'none',
        duration: 2000
      })
    } else {
      if (!this.judgeName(stuName)) {
        wx.showToast({
          title: '姓名不正确',
          icon: 'none',
          duration: 2000
        })
      } else if (!this.judgeTel(phone)) {
        wx.showToast({
          title: '手机号格式不正确',
          icon: 'none',
          duration: 2000
        })
      } else if (stuId.length < 3) {
        wx.showToast({
          title: '请输入不少于3位数的学号',
          icon: 'none',
          duration: 2000
        })
      }else if(parseInt(stuId) == NaN){
        wx.showToast({
          title: '请输入正确的学号',
          icon: 'none',
          duration: 2000
        })
      }else if(password < 3 || password > 16){
        wx.showToast({
          title: '请输入3-16位的密码',  
          icon: 'none',
          duration: 2000
        })
      }
      else {
        wx.request({
          url: 'http://xxx/updateUserInfo',
          // url:'http://xxx/updateUserInfo',
          method: 'POST',
          data: {
            u_school: this.data.mySchool,
            stu_name: stuName,
            stu_id: stuId,
            u_tel: phone,
            u_type: 1,
            password: password,
            id: id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            wx.reLaunch({
              url: '/pages/person/person'
            })
          },
          fail: function () {
            console.log("fail")
          }
        })
      }

    }
    // console.log(1);

    // }
    // console.log(this.data.user);
  },
  // 判断姓名格式是否正确
  judgeName(nameValue) {
    var newStr = this.delTrim(nameValue);
    var nameReg = /^([\u4e00-\u9fa5·s]{2,20}|[a-zA-Z.s]{2,20})$/g;
    return (nameReg.test(newStr));
  },
  //去掉空格  str 需要去掉空格的字符串
  delTrim(str) {
    var newStr = str.split(' ').filter(function (item) {
      return item;
    }).join('')
    return newStr;
  },
  // 判断手机号格式是否正确
  judgeTel(telValue) {
    var telReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/g;
    return (telReg.test(telValue));
  },
  getUser() {
    var user = this.data.user;
    var that = this
    userModel.getUserInfo().then(res => {
      for (var i = 0; i < res.length; i++) {
        user[i] = res[i];
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = this.data.uid;
    wx.getStorage({
      key: 'userId',
      success(res) {
        // that.getUserByName(res.data.nickName);
        console.log(res);
        that.setData({
          uid: res.data
        })
      }
    })
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
    }
    this.getCityUniversity();
  },
  getCityUniversity: function () {
    let that = this
    that.data.multiArray[0] = that.data.province
    that.data.multiArray[1] = this.getArr(that.data.province[0], that.data.school);
    that.setData({
      multiArray: that.data.multiArray
    })
  },
  getArr: function (value, arr) {
    for (let i in arr) {
      if (value == i) {
        return arr[i]
      }
    }
  },
  // getUserInfo: function (e) {
  //   // console.log(e.detail)
  //   app.globalData.userInfo = e.detail.userInfo
  //   var avatarUrl = e.detail.userInfo.avatarUrl
  //   var nickName = e.detail.userInfo.nickName
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        that.setData({
          nickName: nickName,
          avatarUrl: avatarUrl,
        })
      }
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