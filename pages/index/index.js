//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
     background: [
      'images/image.png', 
      '/images/image.png',
      '/images/image.png'],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList:[
      {
        logo:"/images/chinese.png",
        title:"语文",
        desc:"xxx",
        detail:"/images/btn-detail.png",
        buy: "/images/btn-buy.png",
      },
      {
        logo: "/images/maths.png",
        title: "数学",
        desc: "xxx",
        detail: "/images/btn-detail.png",
        buy: "/images/btn-buy.png",
      },
      {
        logo: "/images/english.png",
        title: "英语",
        desc: "xxx",
        detail: "/images/btn-detail.png",
        buy: "/images/btn-buy.png",
      },
      
    ],
  },
  //事件处理函数
  onLoad: function () {
  },
  /*跳转页面：查看详情 */
  toDetail:function(){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  toBuy:function(){
    wx.navigateTo({
      url: '/pages/buy/buy',
    })
  }
})
