// miniprogram/pages/bestwrite/bestwrite.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'days30-jeacq'
    })
    db.collection('addtask')
    .orderBy("like","desc")
    .limit(1)
    .get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        //这一步很重要，给collection赋值，没有这一步的话，前台就不会显示值      
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