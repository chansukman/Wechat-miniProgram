Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList:[
      {
        title:"苏轼",
        desc:"《春中帖》虽有残损仍属上品。",
        works:"toWork1",
      },
      {
        title: "苏轼",
        desc: "《春中帖》虽有残损仍属上品。" + "\n" + "ddddd",
        works: "toWork2",
      },
      {
        title: "苏轼",
        desc: "《春中帖》虽有残损仍属上品。" + "\n" + "ddddd",
        works: "toWork3",
      },
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  toWork1: function () {
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },
  toWork2: function () {
    wx.navigateTo({
      url: '/pages/work2/work2',
    })
  },
  toWork3: function () {
    wx.navigateTo({
      url: '/pages/work3/work3',
    })
  },

})