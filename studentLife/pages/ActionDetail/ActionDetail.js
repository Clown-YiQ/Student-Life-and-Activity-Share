// pages/ActionDetail/ActionDetail.js
import {
  ActivityModel
} from "../../model/activityModel";
import {
  UserModel
} from "../../model/userModel";
import {
  JoinModel
} from "../../model/joinModel";
import {
  CommentModel
} from "../../model/commentModel";
var activityModel = new ActivityModel();
var userModel = new UserModel();
var joinModel = new JoinModel();
var commentModel = new CommentModel();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailInfo: [],
    imgBox: [],
    nickName: '',
    avatarUrl: '',
    flag: true,
    uid: '',
    phoneNumber: '',
    u_tel: '',
    u_school: '',
    act_id: '',
    act_cid: '',
    isJoin: false,
    joinUserInfo: [],
    form: {
      comment: ''
    },
    answerForm: {
      answer: ''
    },
    commentInfo: [],
    answerInfo: [],
    con: '',
    parId: '',
    parName: ''
  },
  /**
   * 弹窗
   */
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  showDialogBtn1: function(e) {
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
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框  
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  hideModal1: function() {
    this.setData({
      showModal1: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  onCancel1: function() {
    this.hideModal1();
  },
  /**   
   * 对话框确认按钮点击事件  
   */
  onConfirm: function(e) {
    var detailInfo = this.data.detailInfo;
    var comment = e.detail.value.comment
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    wx.request({
      // url:'http://xxx/insertComment',
      url: 'http://xxx/insertComment',
      method: 'POST',
      data: {
        act_id: detailInfo.id,
        com_uid: this.data.uid,
        com_uname: this.data.nickName,
        com_userhead: this.data.avatarUrl,
        com_con: comment,
      }
    })
    this.hideModal();
    setTimeout(() => {
      this.getCommentById(this.data.act_id);
    }, 200);
  },
  onAnswer(e) {
    var answer = e.detail.value.answer;
    var detailInfo = this.data.detailInfo;
    // console.log(e);
    console.log(this.data.con);
    console.log(this.data.parId);
    console.log(this.data.parName);
    wx.request({
      // url:'http://xxx/insertAnswer',
      url: 'http://xxx/insertAnswer',
      method: 'POST',
      data: {
        act_id: detailInfo.id,
        com_uid: this.data.uid,
        com_uname: this.data.nickName,
        com_userhead: this.data.avatarUrl,
        com_con: answer,
        com_parId: this.data.parId,
        com_parName: this.data.parName,
        com_parCon: this.data.con
      }
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    this.hideModal1();
    setTimeout(() => {
      this.getAnswerByParId(this.data.act_id);
    }, 200);
  },
  getActivitiesById(id) {
    var detailInfo = this.data.detailInfo;
    var imgBox = this.data.imgBox;
    var flag = this.data.flag;
    activityModel.getActivitiesById(id).then(res => {
      // console.log(res);
      // console.log(res[0].act_img.split(','))
      if (res[0].act_img !== "") {
        flag = true;
      } else {
        flag = false;
      }
      // console.log(imgBox);
      // console.log(res);
      this.setData({
        detailInfo: res[0],
        imgBox: res[0].act_img.split(','),
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
  getPhoneById(id) {
    userModel.getUserById(id).then(res => {
      // console.log(res[0].u_tel);
      this.setData({
        phoneNumber: res[0].u_tel
      })
    })
  },
  getJoinInfoById(id) {
    var that = this;
    joinModel.getJoinInfoById(id).then(res => {
      // console.log(res);
      this.setData({
        joinUserInfo: res
      })
      for (var i = 0; i < res.length; i++) {
        if (res[i].join_act_cid == this.data.detailInfo.act_cid && res[i].join_uid == this.data.uid) {
          that.setData({
            isJoin: true
          })
          this.getPhoneById(this.data.act_cid);
        } else {
          // console.log(22);
          that.setData({
            isJoin: false
          })
          // this.getPhoneById(this.data.act_cid);
        }
      }
    })
  },
  getCommentById(act_id) {
    commentModel.getCommentById(act_id).then(res => {
      // console.log(res);
      this.setData({
        commentInfo: res
      })
    })
  },
  getAnswerByParId(act_id) {
    commentModel.queryAnswerByParId(act_id).then(res => {
      // console.log(res);
      this.setData({
        answerInfo: res
      })
    })
  },
  /* 活动参加 */
  onJoin: function() {
    if (this.data.detailInfo.u_school == '') {//判断是否通过认证
      wx.showToast({
        title: '请先完成学校认证',
        icon: 'none'
      })
    } else if (this.data.uid == this.data.detailInfo.act_cid) {//判断是否是自己发布的活动
      wx.showToast({
        title: '您是活动发起人',
        icon: 'none'
      })
    } else if (this.data.isJoin == true) {//判断活动是否已经参加
      wx.showToast({
        title: '您已参加该活动',
        icon: 'none'
      })
    } else if (this.data.joinUserInfo.length >= this.data.detailInfo.act_num) {//判断活动参加人数是否已满
      wx.showToast({
        title: '活动人数已满',
        icon: 'none'
      })
    } else {
      var that = this;
      var detailInfo = this.data.detailInfo;
      var act_cid = this.data.act_cid;
      wx.request({
        // url: 'http://xxx/insertJoinInfo',
        url: 'http://xxx/insertJoinInfo',
        method: "POST",
        data: {
          join_act_id: that.data.act_id,
          join_act_sort: detailInfo.activity_sort,
          join_act_title: detailInfo.activity_title,
          join_uid: that.data.uid,
          join_uname: that.data.nickName,
          join_userhead: that.data.avatarUrl,
          join_utel: that.data.u_tel,
          join_uschool: this.data.u_school,
          join_act_ctime: detailInfo.act_ctime
        },
        header: {
          'content-type': 'application/json'
        },
        success() {
          that.getPhoneById(act_cid);//获取电话
          that.setData({
            isJoin: true
          })
        }
      })
    }
  },
  onQuit: function() {
    var that = this;
    wx.request({
      // url: 'http://xxx/deleteJoinInfo',
      url: 'http://xxx/deleteJoinInfo',
      method: "POST",
      data: {
        join_uid: this.data.uid
      },
      header: {
        'content-type': 'application/json'
      },
      success() {
        // console.log(1);
        that.setData({
          phoneNumber: '',
          isJoin: false
        })
      }
    })
  },
  toMore: function(e) {
    var act_id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/JoinUser/JoinUser?act_id=${act_id}`
    })
  },
  deleteCom(e) {
    // console.log(e)
    var that = this;
    var id = e.currentTarget.dataset.index;
    var cid = e.currentTarget.dataset.cid;
    // console.log(cid);
    // console.log(this.data.uid);
    if(this.data.uid == cid || this.data.uid == this.data.act_cid){
    wx.showModal({
      title: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            // url: 'http://xxx/deleteCommentById',
            url: 'http://xxx/deleteCommentById',
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
                that.getCommentById(that.data.act_id);
                that.getAnswerByParId(that.data.act_id);
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
    if(this.data.uid == cid || this.data.uid == this.data.act_cid){
    wx.showModal({
      title: '是否删除？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            // url: 'http://xxx/deleteCommentById',
            url: 'http://xxx/deleteCommentById',
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
                that.getCommentById(that.data.act_id);
                that.getAnswerByParId(that.data.act_id);
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
  onLoad: function(options) {
    var that = this;
    this.setData({
      act_id: options.act_id,
      act_cid: options.uid
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
    this.getJoinInfoById(options.act_id);
    this.getActivitiesById(options.act_id);
    this.getCommentById(options.act_id);
    this.getAnswerByParId(options.act_id);
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
  onShareAppMessage: function() {}
})