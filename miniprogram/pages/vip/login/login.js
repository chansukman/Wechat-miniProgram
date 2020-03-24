// miniprogram/pages/vip/login/login.js
let user;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[]

  },
  username: function (e) {
    
  username: e.detail.value
  
  },
  password: function (e) {
    
    password: e.detail.value

  },
  login:function(){
    var _this = this;
    const db = wx.cloud.database({
    })
    db.collection('user').get({
      success: res => {
        console.log(res.data)
        this.setData({
          user: res.data
        })
      }
    })
    for(let i=0 ;i<user[i].length;i++){
      if(username==user[i].username)
      {
        if(password==user[i].password)
        {
          console.log('登陆成功')
        }
      }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  toRes:function(){
    wx.navigateTo({
      url: '/pages/vip/register/register',
    })
    
  },
  onLoad: function (options) {

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