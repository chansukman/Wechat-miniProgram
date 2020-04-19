// pages/register/index.js
let app = getApp();
//获取云数据库引用
const db = wx.cloud.database();
let name = null;
let password = null;
var point = 0;

Page({
  data: {
    radios: [
      { name: '普通用户', value: '普通用户' },
      { name: '管理员', value: '管理员' },
    ],
    identity: 0
  },
  //输入用户名
  inputName: function (e) {
    /*name = e.detail.value*/
    this.setData({
      name: e.detail.value
    })
    console.log(e.detail.value)
  },
  //输入密码
  inputPassword(e) {
    /*password = e.detail.value*/
    this.setData({
      password: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    wx.setStorage({
      key: 'residentity',
      data: e.detail.value,
    })

  },
  //检查
  checkValue: function (e) {
    var that = this
    var name = that.data.name
    var password = that.data.password
    if (that.data.name == null || that.data.password == null) {
      wx.showToast({
        title: '请填写账号密码!',
        icon: 'none',
        duration: 2000,
      })
    }
    else return true
  },


  // .where({
  //      _openid: app.globalData.openid  // 填入当前用户 openid
  //   })

  // wx.showModal({
  //   title: '提示',
  //   content: '您已注册，确定要更新账号密码吗？',
  //   success: function (res) {
  //     if (res.confirm) {
  //       console.log('用户点击确定')
  //       that.saveuserinfo();
  //     }
  //   }
  // })

  //注册
  register() {
    let that = this;
    let flag = false  //是否存在 true为存在
    name = that.data.name
    password = that.data.password
    if(this.checkValue()){
   
    var arr = wx.getStorageSync('residentity') || [];
    if (arr == '') {
      wx.showToast({
        title: '请选择登陆身份',
      })
    }
    else if (arr == '普通用户') {
      db.collection('user').get({
        success: (res) => {
          let admins = res.data;  //获取到的对象数组数据
          //  console.log(admins);
          for (let i = 0; i < admins.length; i++) {  //遍历数据库对象集合
            if (name === admins[i].name) { //用户名存在
              flag = true;
              //   break;
            }
          }
          if (flag === true) {    //已注册
            wx.showToast({
              title: '账号已注册！',
              icon: 'success',
              duration: 2500
            })
          } else {  //未注册
            that.saveuserinfo()
          }
        }
      })
    } if (arr == '管理员') {
      db.collection('admin').get({
        success: (res) => {
          let admins = res.data;  //获取到的对象数组数据
          //  console.log(admins);
          for (let i = 0; i < admins.length; i++) {  //遍历数据库对象集合
            if (name === admins[i].name) { //用户名存在
              flag = true;
              //   break;
            }
          }
          if (flag === true) {    //已注册
            wx.showToast({
              title: '账号已注册！',
              icon: 'success',
              duration: 2500
            })
          } else {  //未注册
            that.saveuserinfo()
          }
        }
      })
    }
    }
  },


  //注册用户信息
  saveuserinfo() {
    var arr = wx.getStorageSync('residentity') || [];
    console.log(arr)
    // let that = this;
    if (arr == '普通用户') {
      db.collection('user').add({  //添加数据
        data: {
          name: name,
          password: password,
          point: point,
          identity: arr
        }
      }).then(res => {
        console.log('注册成功！')
        wx.showToast({
          title: '注册成功！',
          icon: 'success',
          duration: 3000
        })
        wx.clearStorage()
        wx.redirectTo({
          url: '/pages/admin/log/log',
        })
      })
    }
    else {
      db.collection('admin').add({
        data: {
          name: name,
          password: password,
          point: point,
          identity: arr
        }
      }).then(res => {
        console.log('注册成功！')
        wx.showToast({
          title: '注册成功！',
          icon: 'success',
          duration: 3000
        })
        wx.clearStorage()
        wx.redirectTo({
          url: '/pages/admin/log/log',
        })
      })
    }
  },
})
