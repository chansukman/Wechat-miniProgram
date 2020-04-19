var app = getApp();
const db = wx.cloud.database();
var util = require('../../utils/util.js');
Page({
  data: {
    navbar: ['已完成'],
    currentTab: 0,
    hiddenLoading: false,
    noContent: true,
    array:[],
  },
  
  onLoad: function (options) {
    let that = this;
    //判断用户是否登录及获取所需缓存信息
    var uid = wx.getStorageSync('name');
    db.collection('Cart')
    .where({
      creator:uid
    })
    .get({
      success: res => {
        console.log("Cart",res)
        var array = []
        for(var i=0;i<res.data.length;i++){
          for (var j = 0; j < res.data[i].cartItem.length;j++){
            array.push(res.data[i].cartItem[j])
          }
        }
        this.setData({
          array: array
        })
        // this.setData({
        //   array: res.data[0].cartItem
        // })
        console.log("数组",that.data.array)
       
      }
    })
    
  },
  navbarTap: function (e) {
    //点击切换更新当前显示标题
    let idx;
    var currentIdx = Number(e.currentTarget.dataset.idx) + 1;
    var noPayUrl = app.globalData.shopUrl + '/home/fklx/index/ty/' + currentIdx + '/uid/' + this.data.uid;
    util.http(noPayUrl, this.noPaycallback);
    this.setData({ idx: e.currentTarget.dataset.idx });
  },
  onShow: function () {
    this.setData({
      currentTab: this.data.currentTab
    });
    //进入页面更新当前显示标题
   /* app.setTitle(this.data.navbar, this.data.currentTab);*/
  },
  //去付款
  onPayGo(e) {
    let oid = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: '../payno/paygo/paygo?oid=' + oid,
    })
  },
  sureGoods(e) {
    var oid = e.currentTarget.dataset.idx;
    var url = app.globalData.shopUrl + '/home/dfk/index/ty/ysh/uid/' + this.data.uid + '/oid/' + oid;
    util.http(url, this.sureGoodscallback);
  },
  noPaycallbackInit(res) {
    if (res.data) {
      var stayPayment = res.data.data;
      let noContent = this.data.noContent;
      if (stayPayment.dfk.length == 0) {
        this.setData({ noContent: false });
      } else {
        this.setData({ noContent: true });
      }
      this.setData({
        hiddenLoading: true,
        stayPayment
      })
    }
  },
  noPaycallback(res) {
    if (res.data) {
      var stayPayment = res.data.data;
      let noContent = this.data.noContent;
      app.setTitle(this.data.navbar, this.data.idx);
      if (stayPayment.dfk.length == 0) {
        this.setData({ noContent: false });
      }else{
        this.setData({ noContent: true });
      }
      this.setData({
        hiddenLoading: true,
        currentTab: this.data.idx,
        stayPayment
      })
    } else {
      app.showToast('网络错误，请重试！', 'error');
    }
  },
  sureGoodscallback(res) {
    if (res.data) {
      app.showToast('确认收货完成', 'success');
      wx.navigateTo({
        url: '../../pay/pays/pays?currentIdx=3',
      })
    } else {
      app.showToast('网络错误，请重试！', 'error');
    }
  }
})
