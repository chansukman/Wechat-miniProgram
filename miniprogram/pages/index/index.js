//index.js
//获取应用实例
const app = getApp();


Page({
  data: {
    proList: [
      {
        logo: "/images/chinese.png",
        title: "语文",
        desc: "",
        detail: "/images/icon/kf.png",
        buy: "/images/icon/shop.png",
        todetail: "todetail1",
      },
      {
        logo: "/images/maths.png",
        title: "数学",
        desc: "",
        detail: "/images/icon/kf.png",
        buy: "/images/icon/shop.png",
        todetail: "todetail2",
      },
      {
        logo: "/images/english.png",
        title: "英语",
        desc: "",
        detail: "/images/icon/kf.png",
        buy: "/images/icon/shop.png",
        todetail: "todetail3",
      },
    ],
  },
  //事件处理函数
  onLoad: function () {
  },
  /*跳转页面：查看详情 */
  todetail1: function () {
    wx.navigateTo({
      url: '/pages/detail1/detail1',
    })
  },
  todetail2: function () {
    wx.navigateTo({
      url: '/pages/detail2/detail2',
    })
  },
  todetail3: function () {
    wx.navigateTo({
      url: '/pages/detail3/detail3',
    })
  },
  toBuy: function () {
    wx.navigateTo({
      url: '/pages/buy/buy',
    })
  }
})