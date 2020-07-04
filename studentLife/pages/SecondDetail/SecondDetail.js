// pages/SecondDetail/SecondDetail.js
import { SecondModel } from '../../model/secondModel'
import { CollecModel } from '../../model/collecModel'
import { ScCommentModel } from "../../model/scCommentModel";
var secondModel = new SecondModel();
var collecModel = new CollecModel();
var scCommentModel = new ScCommentModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    secondDetail: [],
    imgBox: [],
    flag: true,
    isJoin: false,
    uid: '',
    nickName: '',
    avatarUrl:'',
    form:{
      comment:''
    },
    answerForm:{
      answer:''
    },
    commentInfo:[],
    answerInfo:[],
    sc_id:'',
    sc_cid:'',
    con: '',
    parId: '',
    parName: ''
  },
  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  showDialogBtn1: function (e) {
    var con = e.currentTarget.dataset.con;
    var parId = e.currentTarget.dataset.index;
    var parName = e.currentTarget.dataset.name;
    var detailInfo = this.data.detailInfo;
    console.log(con);
    console.log(parId);
    console.log(parName);
    this.setData({
      showModal1: true,
      con: con,
      parId: parId,
      parName: parName
    })
  },
  /** 
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {},
  /**
   * 隐藏模态对话框  
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  hideModal1: function () {
    this.setData({
      showModal1: false
    });
  },
  /**
  * 对话框取消按钮点击事件
  */
  onCancel: function () {
    this.hideModal();
  },
  onCancel1: function () {
    this.hideModal1();
  },
  /**   
   * 对话框确认按钮点击事件  
   */
  onConfirm: function (e) {
    var secondDetail = this.data.secondDetail;
    var comment = e.detail.value.comment
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    wx.request({
      // url:'http://xxx/insertScComment',
      url:'http://xxx/insertScComment',
      method:'POST',
      data:{
        sc_id:secondDetail.sc_id,
        com_uid:this.data.uid,
        com_uname:this.data.nickName,
        com_userhead:this.data.avatarUrl,
        com_con:comment,
      }
    })
    this.hideModal();
    setTimeout(() => {
      this.getScCommentById(this.data.sc_id);
    }, 200);
  },
  onAnswer(e) {
    var answer = e.detail.value.answer;
    var con = e.currentTarget.dataset.con;
    var parId = e.currentTarget.dataset.index;
    var secondDetail = this.data.secondDetail;
    // console.log(parId);
    wx.request({
      // url:'http://xxx/insertScAnswer',
      url:'http://xxx/insertScAnswer',
      method:'POST',
      data:{
        sc_id:secondDetail.sc_id,
        com_uid:this.data.uid,
        com_uname:this.data.nickName,
        com_userhead:this.data.avatarUrl,
        com_con:answer,
        com_parId:this.data.parId,
        com_parName:this.data.parName,
        com_parCon:this.data.con
      }
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    this.hideModal1();
    setTimeout(() => {
      this.getScAnswerByParId(this.data.sc_id);
    }, 200);
  },
  getScCommentById(sc_id) {
    scCommentModel.getScCommentById(sc_id).then(res=>{
      // console.log(res);
      this.setData({
        commentInfo:res
      })
    })
  },
  getScAnswerByParId(sc_id) {
    scCommentModel.queryScAnswerByParId(sc_id).then(res=>{
      // console.log(res);
      this.setData({
        answerInfo:res
      })
    })
  },
  getSecondById: function (id) {
    var that = this;
    var secondDetail = this.data.secondDetail;
    var imgBox = this.data.imgBox;
    var flag = this.data.flag;
    secondModel.getSecondsById(id).then(res => {
      console.log(res);
      if (res[0].sc_img !== "") {
        flag = true;
      } else {
        flag = false;
      }
      that.setData({
        secondDetail: res[0],
        imgBox: res[0].sc_img.split(','),
        flag
      })
    })
  },
  onCollec: function () {
    if (this.data.secondDetail.sc_cid == this.data.uid) {
      wx.showToast({
        title: '不能收藏自己发布的商品',
        icon: 'none'
      })
    } else if (this.data.isJoin == true) {
      wx.showToast({
        title: '您已收藏过该商品',
        icon: 'none'
      })
    } else {
      var that = this;
      var secondDetail = this.data.secondDetail;
      var uid = this.data.uid;
      wx.request({
        // url: 'http://xxx/insertCollecInfo',
        url: 'http://xxx/insertCollecInfo',
        method: "POST",
        data: {
          sc_id: secondDetail.sc_id,
          sc_cname: secondDetail.sc_cname,
          sc_title: secondDetail.sc_title,
          sc_price: secondDetail.sc_price,
          sc_con: secondDetail.sc_con,
          sc_uid: uid,
          sc_uname: that.data.nickName
        },
        success() {
          that.setData({
            isJoin: true
          })
        }
      })
    }
  },
  onCancelled: function () {
    var that = this;
    wx.request({
      // url: 'http://xxx/deleteCollecInfoByUid',
      url: 'http://xxx/deleteCollecInfoByUid',
      method: "POST",
      data: {
        sc_id:this.data.sc_id,
        sc_uid: this.data.uid
      },
      header: {
        'content-type': 'application/json'
      },
      success() {
        console.log(1);
        that.setData({
          isJoin: false
        })
      }
    })
  },
  getCollecInfoById(id) {
    var that = this;
    collecModel.getCollecInfoById(id).then(res => {
      console.log(res);
      for(var i = 0;i < res.length; i++) {
        if(res[i].sc_id == this.data.sc_id && res[i].sc_uid == this.data.uid) {
          that.setData({
            isJoin: true
          })
        } else {
          that.setData({
            isJoin:false
          })
        }
      }
    })
  },
  deleteCom(e) {
    // console.log(e)
    var that = this;
    var id = e.currentTarget.dataset.index;
    var cid = e.currentTarget.dataset.cid;
    console.log(id);
    // console.log(this.data.uid);
    if(this.data.uid == cid || this.data.uid == this.data.sc_cid){
    wx.showModal({
      title: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          // console.log(that.data.uid);
          wx.request({
            // url: 'http://xxx/deleteScCommentById',
            url: 'http://xxx/deleteScCommentById',
            method: "POST",
            data: {
              id: id,
              parId: id
            },
            header: {
              'content-type':'application/json'
            },
            success() {
              setTimeout(function() {
                that.getScCommentById(that.data.sc_id);
                that.getScAnswerByParId(that.data.sc_id);
              }, 200)
            }
          })
        }
      }
    })
  }else{
    wx.showToast({
      title:'你没有权限删除',
      icon:'none'
    })
  }
  },
  deleteAnswer(e) {
    var that = this
    // console.log(e);
    var id = e.currentTarget.dataset.index;
    var cid = e.currentTarget.dataset.cid;
    // console.log(cid);
    // console.log(this.data.uid);
    // console.log(id);
    if(this.data.uid == cid || this.data.uid == this.data.sc_cid){
    wx.showModal({
      title: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            // url: 'http://xxx/deleteScCommentById',
            url: 'http://xxx/deleteScCommentById',
            method: "POST",
            data: {
              id: id,
              parId: id
            },
            header: {
              'content-type': 'application/json'
            },
            success() {
              setTimeout(function() {
                that.getScCommentById(that.data.sc_id);
                that.getScAnswerByParId(that.data.sc_id);
              }, 200)
            }
          })
        }
      }
    })
  }else{
    wx.showToast({
      title:'你没有权限删除',
      icon:'none'
    })
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      sc_id:options.id
    })
    wx.getStorage({
      key: 'userId',
      success(res) {
        that.setData({
          uid: res.data
        })
        // that.getCollecInfoByUid(res.data);
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          nickName: res.data.nickName,
          avatarUrl:res.data.avatarUrl
        })
      }
    })
    console.log(options.id);
    this.getSecondById(options.id);
    this.getCollecInfoById(options.id);
    this.getScCommentById(options.id);
    this.getScAnswerByParId(options.id);
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