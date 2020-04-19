const db = wx.cloud.database()
var app = getApp();
var util = require('../../../../utils/util.js');
Page({
  data: {
    yzm: false,
    agree: false,
    region: ['北京市', '北京市', '东城区'],
    m: 0//是否设置为默认地址
  },
  onLoad: function (options) {
    //获取缓存uid
    var uid = wx.getStorageSync('name');
    this.setData({ uid });
  },
  onagree() {
    if (!this.data.agree) {
      this.setData({
        agree: true,
        m: 1
      })
    } else {
      this.setData({
        agree: false,
        m: 0
      })
    }
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    let userMsg = e.detail.value,
      n = userMsg.userName,
      t = userMsg.userTel,
      address = this.data.region,
      uid = this.data.uid,
      province = this.data.region[0],
      city = this.data.region[1],
      town = this.data.region[2],
      detailsAddr = userMsg.userDetailsAddress;
    //验证手机格式
    if (!(/^1[34578]\d{9}$/.test(userMsg.userTel))) {
      util.showToast('手机号格式不正确！', 'none');
       return false;
    } else if (userMsg.userName == '' || userMsg.userTel == '' || address == '' || detailsAddr == '') {
      //提示用户内容不能为空
      util.showToast('错误提示', '内容不能为空！');
      return false;
    } else {
      db.collection("address").add({
        data: {
          uid:this.data.uid,
          name:n,
          telephone: t,
          address: address,
          province:province,
          city: city,
          town: town,
          detailsAddr:detailsAddr
        },
        success: res => {
          console.log(res);
        },
        fail: err => {
          console.log(err);
        }
      })
      wx.showLoading({
        title: '正在创建',
        mask: true,
        success: function () {

        },
        header: {
          'content-type': 'multipart/form-data'
        },
        /*method: 'POST',
        dataType: 'json',
        responseType: 'text',*/
        success: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '创建成功！',
            duration: 5000,
            complete: function () {
              wx.navigateTo({
                url: '/pages/admin/address/choose/choose'
              })
            }
          })

        },
        fail: function (res) {
          wx.hideLoading()
        },
        complete: function (res) { },
      })



    }
  },
  callback(res) {
    if (res.data) {
      util.showModal('地址填写成功!', '');
    } else {
      util.showToast('网络错误,请重试!', 'error');
    }
  }
})