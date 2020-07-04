// pages/ShareDetail/ShareDetail.js
import { ShareCommentModel } from "../../model/shareCommentModel";
import { ShareModel } from "../../model/shareModel";
import { UserModel } from "../../model/userModel";
import { ShareLikeModel } from "../../model/shareLikeModel";
var shareCommentModel = new ShareCommentModel();
var shareModel = new ShareModel();
var userModel = new UserModel();
var shareLikeModel = new ShareLikeModel();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    avatarUrl:'',
    uid:'',
    share_id:'',
    share_uid:'',
    isLike:false,
    commentInfo:[],
    answerInfo:[],
    likeUserInfo:[],
    form:{
      comment:''
    },
    answerForm:{
      answer:''
    },
    con: '',
    parId: '',
    parName: '',
    noLike:true
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
    var shareDetail = this.data.shareDetail;
    var comment = e.detail.value.comment
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    wx.request({
      // url:'http://xxx/insertShareComment',
      url:'http://xxx/insertShareComment',
      method:'POST',
      data:{
        share_id:shareDetail.share_id,
        com_uid:this.data.uid,
        com_uname:this.data.nickName,
        com_userhead:this.data.avatarUrl,
        com_con:comment,
      }
    })
    this.hideModal();
    setTimeout(() => {
      this.getShareCommentById(this.data.share_id);
    }, 200);
  },
  onAnswer(e) {
    var answer = e.detail.value.answer;
    var shareDetail = this.data.shareDetail;
    // console.log(parId);
    wx.request({
      // url:'http://xxx/insertShareAnswer',
      url:'http://xxx/insertShareAnswer',
      method:'POST',
      data:{
        share_id:shareDetail.share_id,
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
      this.getShareAnswerByParId(this.data.share_id);
    }, 200);
  },
  getShareCommentById(share_id) {
    shareCommentModel.getShareCommentById(share_id).then(res=>{
      // console.log(res);
      this.setData({
        commentInfo:res
      })
    })
  },
  getShareAnswerByParId(share_id) {
    shareCommentModel.queryShareAnswerByParId(share_id).then(res=>{
      // console.log(res);
      this.setData({
        answerInfo:res
      })
    })
  },
  getShareById: function (id) {
    var that = this;
    var shareDetail = this.data.shareDetail;
    var imgBox = this.data.imgBox;
    var flag = this.data.flag;
    shareModel.getShareById(id).then(res => {
      // console.log(res);
      if (res[0].share_img !== "") {
        flag = true;
      } else {
        flag = false;
      }
      that.setData({
        shareDetail: res[0],
        imgBox: res[0].share_img.split(','),
        flag
      })
    })
  },
  getUserById(id) {
    userModel.getUserById(id).then(res => {
      // console.log(res[0]);
      this.setData({
        u_tel: res[0].u_tel,
        u_school: res[0].u_school
      })
    })
  },
  onLike: function () {
      var that = this;
      var shareDetail = this.data.shareDetail;
      var uid = this.data.uid;
      console.log(that.data.avatarUrl);
      wx.request({
        // url: 'http://xxx/insertLikeInfo',
        url: 'http://xxx/insertLikeInfo',
        method: "POST",
        data: {
          share_id: shareDetail.share_id,
          share_cname: shareDetail.share_uname,
          share_con: shareDetail.share_con,
          share_uid: uid,
          share_uname: that.data.nickName,
          share_userhead:that.data.avatarUrl
        },
        success() {
          that.getLikeInfoById(that.data.share_id);//获取点赞用户
          that.setData({
            isLike: true
          })
        }
      })
  },
  onDislike: function () {
    var that = this;
    wx.request({
      // url: 'http://xxx/deleteLikeInfoByUid',
      url: 'http://xxx/deleteLikeInfoByUid',
      method: "POST",
      data: {
        share_uid: this.data.uid
      },
      header: {
        'content-type': 'application/json'
      },
      success() {
        // console.log(1);
        that.getLikeInfoById(that.data.share_id);
        that.setData({
          isLike: false
        })
      }
    })
  },
  getLikeInfoById(id) {
    var that = this;
    shareLikeModel.getLikeInfoById(id).then(res => {
      console.log(res);
      this.setData({
        likeUserInfo:res
      })
      if(res.length !== 0) {
        this.setData({
          noLike:false,
        })
      }else{
        this.setData({
          noLike:true
        })
      }
      for(var i = 0;i < res.length; i++) {
        if(res[i].share_id == this.data.shareDetail.share_id && res[i].share_uid == this.data.uid ) {
        that.setData({
          isLike: true
        })
      } else {
        // console.log(22);
        that.setData({
          isLike: false
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
    // console.log(cid);
    // console.log(this.data.uid);
    if(this.data.uid == cid || this.data.uid == this.data.share_uid){
    wx.showModal({
      title: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            // url: 'http://xxx/deleteCommentById',
            url: 'http://xxx/deleteShareCommentById',
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
                that.getShareCommentById(that.data.share_id);
                that.getShareAnswerByParId(that.data.share_id);
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
    if(this.data.uid == cid || this.data.uid == this.data.share_uid){
    wx.showModal({
      title: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            // url: 'http://xxx/deleteCommentById',
            url: 'http://xxx/deleteShareCommentById',
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
                that.getShareCommentById(that.data.share_id);
                that.getShareAnswerByParId(that.data.share_id);
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
      share_id: options.id,
      share_uid: options.uid
    })
    wx.getStorage({
      key: 'userId',
      success(res) {
        that.getUserById(res.data);
        // that.getJoinInfo(res.data);
        that.setData({
          uid: res.data
        })
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          nickName: res.data.nickName,
          avatarUrl: res.data.avatarUrl
        })
      }
    })
    console.log(options.id);
    this.getShareById(options.id);
    this.getShareCommentById(options.id);
    this.getShareAnswerByParId(options.id);
    this.getLikeInfoById(options.id);
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