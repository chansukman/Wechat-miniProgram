let Timer

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    trynewWrapperWidth: '',
    trynewItemWidth: '',
    collectItemHeight: '',
    limitedData: [],
    collections: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this

    let collections = [
      {
       
        src: "./img/01.jpg",
        description: "  最新打卡学生榜",
        location:"new"
      },
      {
        
        src: "./img/02.jpg",
        description: "  最快打卡学生榜",
        location:'fast'
      },
      {
        
        src: "./img/03.jpg",
        description: "  我的关注",
        location:'myfollow'
      },
      {
       
        src: "./img/04.jpg",
        description: "  我的打卡",
        location:'myclock'

      }
    ]

    this.setData({
      collections: collections
    })

    wx.getSystemInfo({
      success: function (res) {
        page.setData({
          trynewWrapperWidth: res.windowWidth * 0.3 * page.data.limitedData.length + 'px',
          trynewItemWidth: res.windowWidth * 0.3 + 'px',
          collectItemHeight: res.windowWidth * 0.493 + 'px'
        })
      }
    })
  },
new:function(){
  wx.navigateTo({
    url: '../clock/new/new',
  })

},
    fast: function () {
    wx.navigateTo({
      url: '../clock/fast/fast',
    })

  },
  myfollow: function () {
    wx.navigateTo({
      url: '../clock/myfollow/myfollow',
    })

  },
  myclock: function () {
    wx.navigateTo({
      url: '../clock/myclock/myclock',
    })

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
    clearTimeout(Timer)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {


  }
}
)