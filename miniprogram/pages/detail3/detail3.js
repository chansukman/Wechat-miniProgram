Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [
      {
        title: "英文字母",
        desc: "英文字母，所谓“拉丁字母”，就是古罗马人所使用文字的字母。 [1]  相同的字母构成国际标准化组织基本拉丁字母。",
        works: "toWork5",
        logo: "/images/word.png"
      },
      
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toWork5: function () {
    wx.navigateTo({
      url: '/pages/work/work5/work5',
    })
  },
})