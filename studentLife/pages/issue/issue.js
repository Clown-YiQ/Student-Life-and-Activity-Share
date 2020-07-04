// pages/Issue/issue.js
var myDate = new Date();
var app = getApp()

function formate_data(myDate) {
  let month_add = myDate.getMonth() + 1;
  let month,day;
  if(month_add >= 10 ) {
    month = '-' + month_add;
  }else{
    month = '-0' + month_add;
  }
  if(myDate.getDate() >= 10) {
    day = '-' + myDate.getDate()
  }else{
    day = '-0' + myDate.getDate()
  }
  var formate_result = myDate.getFullYear() + month + day
  return formate_result;
}
import {  UserModel } from '../../model/userModel'
var userModel = new UserModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    arraySort: ["运动", "游戏", "交友", "旅行", "读书", "竞赛", "电影", "音乐", "其他"],
    date: formate_data(myDate),
    releaseTime: formate_data(myDate), //发布时间
    address: '点击选择位置',
    personNum: '', //活动人数
    activityName: '', //活动名称 
    activitySort: '', //活动类别
    activityContent: '', //活动内容
    countPic: 9, //上传图片最大数量
    showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
    uploadImgUrl: '', //图片的上传的路径
    imgbox: '',
    avatarUrl: '',
    nickName: '',
    form: {
      activityTitle: '',
      activityNum: '',
      activityCon: ''
    },
    form1:{
      secTitle:'',
      secPrice:'',
      secCon:''
    },
    form2: {
      shareCon:''
    },
    userInfo:[],
    scImgBox:'',
    shareImg:'',
    uid:'',
    max: 300,//textarea最多可以输入的字
    currentWordNumber: 0,//textarea当前字数
    max1: 300,//textarea最多可以输入的字
    currentWordNumber1: 0,//textarea当前字数
    max2: 300,//textarea最多可以输入的字
    currentWordNumber2: 0,//textarea当前字数
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
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  bindPickerChange: function (e) {
    var index = e.detail.value;
    var arraySort = this.data.arraySort;
    var activitySort = arraySort[index]
    // console.log(activitySort);
    this.setData({
      index,
      activitySort
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  addressChange: function (e) {
    this.openMap(e);
  },
  myEventListener: function (e) {
    console.log("上传的图片结果集合")
    console.log(e.detail.picsList)
  },
  openMap: function (e) {
    var that = this
    wx.getSetting({
      success(res) {
        //这里判断是否有地位权限
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '提示',
            content: '请求获取位置权限',
            success: function (res) {
              if (res.confirm == false) {
                return false;
              }
              wx.openSetting({
                success(res) {
                  //如果再次拒绝则返回页面并提示
                  if (!res.authSetting['scope.userLocation']) {
                    wx.showToast({
                      title: '此功能需获取位置信息，请重新设置',
                      duration: 3000,
                      icon: 'none'
                    })
                  } else {
                    //允许授权，调用地图
                    // that.chooseMap()
                  }
                }
              })
            }
          })
        } else {
          //如果有定位权限，调用地图
          that.chooseMap()
        }

      }

    })
  },
  chooseMap() {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.name,
          longitude: res.longitude, //经度
          latitude: res.latitude, //纬度
          upadnew: true, //更新了地址
        })
        if (res.detail && res.detail.value) {
          this.data.address = res.detail.value;
        }
      },
      fail: function (res) {},
      complete: function (res) {}
    })
  },
  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 上传图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    // console.log(imgbox)
    var picid = e.currentTarget.dataset.pic;
    // console.log(picid)
    var that = this;
    this.uploadImg(imgbox,picid,function(imgbox) {
      that.setData({
        imgbox:imgbox
      })
    })
  },
  addPic2: function (e) {
    var scImgBox = this.data.scImgBox;
    // console.log(imgbox)
    var picid = e.currentTarget.dataset.pic;
    // console.log(picid)
    var that = this;
    this.uploadImg(scImgBox,picid,function(scImgBox){
      that.setData({
        scImgBox:scImgBox
      })
    })
  },
  uploadImg(imgList,picid,callback){
    var n = 6;
    if (6 > imgList.length > 0) {
      n = 6 - imgList.length;
    } else if (imgList.length == 6) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认6
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        for(var i = 0; i < tempFilePaths.length; i++) {
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[i], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              // console.log('data:image/png;base64,' + res.data)
            }
          })
        }
        if (imgList.length == 0) {
          imgList = tempFilePaths
        } else if (6 > imgList.length) {
          imgList = imgList.concat(tempFilePaths);

        } else {
          imgList[picid] = tempFilePaths[0];
        }
        callback(imgList);
      }
    })
  },
  imgDelete2: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let scImgBox = this.data.scImgBox;
    scImgBox.splice(index, 1)
    that.setData({
      scImgBox: scImgBox
    });
  },
  addPic3: function (e) {
    var shareImg = this.data.shareImg;
    // console.log(imgbox)
    var picid = e.currentTarget.dataset.pic;
    // console.log(picid)
    var that = this;
    this.uploadImg(shareImg, picid, function (shareImg) {
      that.setData({
        shareImg:shareImg
      })
    })
  },
  imgDelete3: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let shareImg = this.data.shareImg;
    shareImg.splice(index, 1)
    that.setData({
      shareImg: shareImg
    });
  },
  /* 
  活动发布模块
   */
  actSubmit(e) {
    var activityTitle = e.detail.value.activityTitle;//活动标题
    var activityNum = e.detail.value.activityNum;//活动人数
    var activityCon = e.detail.value.activityCon;//活动内容
    var userInfo = this.data.userInfo[0];
    var imgBox = this.data.imgbox;
    var that = this;
    if(userInfo.u_type == 1){
      if(activityTitle == '' && this.data.activity_sort == undefined && this.data.address == '点击选择位置' && activityNum == '' && activityCon == ''){
        this.infoError();
      }else{
      wx.request({
        url:'http://xxx/insertActivity',
        // url:'http://xxx/insertActivity',
        // http://xxx
        method:"POST",
        data:{
          activity_title:activityTitle,
          activity_sort:that.data.activitySort,
          activity_address:that.data.address,
          act_time:that.data.date,
          act_num:activityNum,
          act_content:activityCon,
          act_img:imgBox,
          act_cid:userInfo.id,
          act_name:userInfo.u_name,
          act_school:userInfo.u_school,
          act_userhead:userInfo.u_userhead,
          act_ctel:userInfo.u_tel
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success() {
          wx.reLaunch({
            url:'/pages/index/index'
          })
        }
      })
      }
    }else{
      this.failSubmit();
    }
  },
  secSubmit(e) {
    var userInfo = this.data.userInfo[0];
    var secTitle = e.detail.value.secTitle;
    var secPrice = e.detail.value.secPrice;
    var secCon = e.detail.value.secCon;
    var scImgBox = this.data.scImgBox;
    var that = this;
    if(userInfo.u_type == 1) {
      if(secTitle == '' && secPrice == '' && secCon == '') {
        this.infoError();
      }else{
        wx.request({
          // url:'http://xxx/insertSecond',
          url: 'http://xxx/insertSecond',
          method: "POST",
          data: {
            sc_title: secTitle,
            sc_price: secPrice,
            sc_con: secCon,
            sc_img: scImgBox,
            sc_cid: userInfo.id,
            sc_cname: userInfo.u_name,
            sc_school: userInfo.u_school,
            sc_userhead: userInfo.u_userhead
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success() {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        })
      }
    }else{
      this.failSubmit();
    }
  },
  shareSubmit(e) {
    var shareCon = e.detail.value.shareCon;
    var shareImg = this.data.shareImg;
    var userInfo = this.data.userInfo[0];
    var that = this;
    if(userInfo.u_type == 1) {
      if(shareCon == '') {
        this.infoError();
      }else{
        wx.request({
          // url:'http://xxx/insertShare',
          url: 'http://xxx/insertShare',
          method: "POST",
          data: {
            share_con: shareCon,
            share_img: shareImg,
            share_uid: userInfo.id,
            share_uname: userInfo.u_name,
            share_userhead: userInfo.u_userhead,
            share_school: userInfo.u_school
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success() {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        })
      }
    }else {
      this.failSubmit();
    }
  },
  failSubmit(){
    wx.showToast({
      title: '请认证您的学校',
      icon: 'none',
      duration: 2000
    })
  },
  getUserById(id) {
    userModel.getUserById(id).then(res=>{
      this.setData({
        userInfo:res
      })
    })
  },
  infoError() {
    wx.showToast({
      title: '请将内容填写完整',
      icon: 'none',
      duration: 2000
    })
  },
  onContentInput(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  onContentInput1(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最多字数限制
    if (len > this.data.max1) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber1: len //当前字数  
    });
  },
  onContentInput2(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最多字数限制
    if (len > this.data.max2) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber2: len //当前字数  
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })
    var that = this
    wx.getStorage({
      key: 'userId',
      success (res) {
        that.getUserById(res.data);
        that.setData({
          uid:res.data
        })
      }
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
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {

      },
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