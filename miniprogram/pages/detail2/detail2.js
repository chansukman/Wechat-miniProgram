Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [
      {
        title: "阿拉伯数字",
        desc: "阿拉伯数字由0，1，2，3，4，5，6，7，8，9共10个计数符号组成，人们称其为“阿拉伯数字”。",
        works: "toWork4",
        logo: "/images/a.jpg"
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toWork4: function () {
    wx.navigateTo({
      url: '/pages/work/work4/work4',
    })
  }
})