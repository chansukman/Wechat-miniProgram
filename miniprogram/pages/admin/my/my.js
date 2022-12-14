var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    //付款内容循环
    payContact: [
      { 'id': 0, 'text': '积分兑换', 'img': '/images/my/2.png' },
      { 'id': 1, 'text': '待付款', 'img': '/images/my/1.png' },
      { 'id': 2, 'text': '已完成', 'img': '/images/my/4.png' },
      { 'id': 3, 'text': '打卡日历', 'img': '/images/my/3.png' }
    ],
    currentIdx: '',
    phoneNumber: '52342947',
    userImgUrl: false
  },
  onLoad: function (options) { 
    var that=this;
    //调用应用实例的方法获取全局数据  
    app.getUserInfo(function (userInfo) {
      //更新数据  
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function () {
    //判断用户是否登录
    var uid = wx.getStorageSync('uid');
    //获取用户头像
    var userInfo = wx.getStorageSync('user');
    this.setData({ uid, userInfo }); 
    if (uid) {
      //获取当前用户的展示信息
      var userUrl = app.globalData.shopUrl + '/home/user/index/ty/user/uid/' + uid;
      util.http(userUrl, this.userMsg);
      //获取当前用户的优惠券数量
      var cnumUrl = app.globalData.shopUrl + '/home/user/index/ty/cnum/uid/' + uid;
      util.http(cnumUrl, this.cnumCount);
      //判断用户头像是否显示
      let userImgUrl = this.data.userImgUrl;
      this.setData({ userImgUrl:true});
    }
  },
  // 待付款
  onPays(e) {
    if (!this.data.uid) {
      util.showToast('请登录后查看！', 'none');
    } else {
      var currentIdx = e.target.dataset.idx;
      this.setData({ currentIdx });
      wx.navigateTo({
        url: '../../pay/pays/pays?currentIdx=' + currentIdx,
      })
    }
  },

  // 地址
  onAddress() {
    if (!this.data.uid) {
      util.showToast('请登录后查看！', 'none');
    } else {
      wx.navigateTo({
        url: '../../admin/address/choose/choose'
      })
    }
  },
  
  // 积分
  onPoint() {
    wx.navigateTo({
      url: '../../find/shop/shop',
    })
  },
  // 发票
  onInvoice() {
    var url = app.globalData.shopUrl + '/home/zpzz/index/ty/zp/uid/' + this.data.uid;
    util.http(url, this.callback);
  },
  
  // 签到
  onSignIn() {
    if (!this.data.uid) {
      util.showToast('请登录后查看！', 'none');
    } else {
      wx.navigateTo({
        url: '../signin/signin',
      })
    }
  },
 
  //钱包余额及会员积分
  userMsg(res) {
    var userMsg = res.data.data.user[0];
    this.setData({ userMsg });
  },
  //我的发布
  onRelease(){
    if (!this.data.uid) {
      util.showToast('请登录后查看！', 'none');
    } else {
      wx.navigateTo({
        url: '../../find/bdPersonal/bdPersonal',
      })
    }
  },
  callback(res) {
    if (!this.data.uid) {
      util.showToast('请登录后查看！', 'none');
    } else {
      if (!res.data) {
        wx.navigateTo({
          url: '../../invoice/addingTicket/addingTicket'
        })
      } else {
        var invoiceMsg = res.data.data.zpzz[0];
        wx.setStorageSync('invoiceMsg', invoiceMsg)
        wx.navigateTo({
          url: '../../invoice/showTicket/showTicket'
        })
      }
    }
  }
})