// miniprogram/pages/clock/new/new.js
const db = wx.cloud.database();
const cont = db.collection('addtask');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection: [],
    jifen: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('name');
    this.setData({ uid });

    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'days30-jeacq'
    })
    db.collection('focus').get({
      success: res => {
        console.log(res.data)
        this.setData({
          collection: res.data
        })
      }
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})