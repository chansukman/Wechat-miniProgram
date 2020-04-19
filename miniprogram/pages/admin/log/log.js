// pages/login/login.js
let app = getApp();
// 获取云数据库引用
const db = wx.cloud.database();
let name = null;
let password = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    radios: [
      { name: '普通用户', value: '普通用户' },
      { name: '管理员', value: '管理员' },
    ],

  },
  //输入用户名
  inputName: function (event) {
    name = event.detail.value
  },
  //输入密码
  inputPassword(event) {
    password = event.detail.value
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    wx.setStorage({
      key: 'identity',
      data: e.detail.value,
    })

  },
  //登陆

  login(e) {
    let that = this;
    //登陆获取用户信息
    var arr = wx.getStorageSync('identity') || [];
    if (arr == '') {
      wx.showToast({
        title: '请选择登陆身份',
        icon: 'success',
        duration: 2500
      })
    }
    else if (arr == '普通用户') {
      db.collection('user').get({
        success: (res) => {
          let user = res.data;
          for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合

            if (name == user[i].name) { //用户名存在
              if (password !== user[i].password) {  //判断密码是否正确
                wx.showToast({
                  title: '密码错误！！',
                  icon: 'success',
                  duration: 2500
                })
              } else {
                console.log('登陆成功！')
                wx.showToast({
                  title: '登陆成功！!',
                })

                //将 name 存入本地缓存
                wx.setStorage({
                  key: 'user',
                  data: user[i]

                })
                wx.setStorage({
                  key: 'name',
                  data: name

                })
                this.setData({
                  user: res.data
                })

                wx.switchTab({   //跳转首页
                  url: '/pages/index/index',  //这里的URL是你登录完成后跳转的界面
                })
              }
            } else {   //不存在
              wx.showToast({
                title: '无此用户名！！',
              })
            }
          }
        }
      })
    } else {
      db.collection('admin').get({
        success: (res) => {
          let user = res.data;
          // console.log(res.data);
          for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合

            if (name === user[i].name) { //用户名存在
              if (password !== user[i].password) {  //判断密码是否正确
                wx.showToast({
                  title: '密码错误！！',
                  icon: 'success',
                  duration: 2500
                })
              } else {
                console.log('登陆成功！')
                wx.showToast({
                  title: '登陆成功！！',
                  icon: 'success',
                  duration: 2500
                })

                //将 name 存入本地缓存
                wx.setStorage({
                  key: 'user',
                  data: user[i]

                })
                wx.setStorage({
                  key: 'name',
                  data: name

                })
                this.setData({
                  user: res.data
                })

                wx.switchTab({   //跳转首页
                  url: '/pages/index/index',  //这里的URL是你登录完成后跳转的界面
                })
              }
            } else {   //不存在
              wx.showToast({
                title: '无此用户名！！',
                icon: 'success',
                duration: 2500
              })
            }
          }
        }
      })

    }
    var uid = wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.keys)
        that.setData({
          _id: res.data._id
        })
      },
    })
    //console.log(uid)
    wx.cloud.callFunction({
      name: 'updatepoint',
      data: {

        _id: e.target.dataset.id,

      },
      success(res) {
        console.log("成功", res);
      },
      fail(res) {
        console.log("失败", res);
      }

    })
  },


  register() {
    wx.navigateTo({
      url: '/pages/admin/register/register'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 页面显示/切入前台时触发
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
