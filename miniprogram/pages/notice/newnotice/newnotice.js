var app = getApp();
const db = wx.cloud.database()
var util = require('../../../utils/util.js');
Page({
  data: {
    title: '',
    titleDetails: '',
    titleContent: '',
    startDate: "",
    startTime: "",

  },
  onLoad: function (options) {
    //判断用户是否登录
    var uid = wx.getStorageSync('name');
    this.setData({ uid });
  },
  title: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  titleDetails: function (e) {
    this.setData({
      titleDetails: e.detail.value
    })
  },
  titleContent: function (e) {
    this.setData({
      titleContent: e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  formSubmit: function (e) {
    var userMsg = e.detail.value;
    //验证非空
    if (userMsg.title == '' || userMsg.desc == '' || userMsg.content == '') {
      //提示用户内容不能为空
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000,
      })
      return false
    } else {
      db.collection("NewNotice").add({
        data: {
          creator: this.data.uid,
          title: this.data.title,
          desc: this.data.titleDetails,
          content: this.data.titleContent,
          startDate: this.data.startDate,
          startTime: this.data.startTime
        },
        success: res => {
          console.log(res);
          wx.navigateTo({
            url: '/pages/notice/notice',
          })
        },
        fail: err => {
          console.log(err);
        }
      })
    }
  },
  sumbitcallback(res) {
    if (res.data) {
      //提示用户上传留言成功
      wx.showToast({
        title: '公告发布成功',
        icon: 'none',
        duration: 2000,
      })

    } else {
      //提示用户上传留言失败
      wx.showToast({
        title: '网络错误，请稍后重试！',
        icon: 'none',
        duration: 2000,
      })
    }
  }
})