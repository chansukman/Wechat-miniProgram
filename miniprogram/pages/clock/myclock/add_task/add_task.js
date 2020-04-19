// pages/createMission/createMission.js
const db = wx.cloud.database()
Page({
  data: {
    like:'',
    name: '',
    desc: '',

    image: [],
    hasImage: false,

    startDate: "",
    endDate: "",

    startTime: "",
    endTime: "",

    addressName: "无限制",
    addressLatitude: "0.0",
    addressLongitude: "0.0",

    types: ["运动", "学习", "阅读", "朗读", "生活", "其他"],
    typeIndex: 0,

    isOpen: true,

  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, //最多可选择图片数量
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          image: that.data.image.concat(res.tempFilePaths),
          hasImage: true
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.image // 需要预览的图片http链接列表
    })
  },

  deleteImage: function (e) { //删除所选图片
    var that = this;
    that.setData({
      image: [],
      hasImage: false
    });
  },

  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },

  isOpenChange(e) {
    this.setData({
      isOpen: e.detail.value
    })
  },

  //创建任务
  createMission: function (e) {

    this.setData({
      name: e.detail.value.name,
      desc: e.detail.value.desc,
    })
   var creator=wx.getStorageSync('name')
    if (this.checkValue()) { //检查表单数据是否有误
      db.collection("addtask").add({
        data: {
          name: this.data.name,
          desc: this.data.desc,
          image: this.data.image,
          startTime: this.data.startTime,
          endTime: this.data.endTime,
          startDate: this.data.startDate,
          endDate: this.data.endDate,
          type: this.data.typeIndex,
          is_open: String(this.data.isOpen),
          creator: wx.getStorageSync('name'),
          addressName: this.data.addressName,
          addressLatitude: this.data.addressLatitude,
          addressLongitude: this.data.addressLongitude,
          like:0
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
              wx.switchTab({
                url: '/pages/clock/clock'
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

  //表单检查函数
  checkValue: function (e) {
    var that = this
    var image = that.data.image
    var startDate = new Date(that.data.startDate)
    var endDate = new Date(that.data.endDate)
    var startTime = new Date('2019-01-01 ' + that.data.startTime)
    var endTime = new Date('2019-01-01 ' + that.data.endTime)

    if (that.data.name == '') {
      wx.showToast({
        title: '请填写任务名称!',
        icon: 'none',
        duration: 2000,
      })
      return false
    }
    else if (that.data.desc == '') {
      wx.showToast({
        title: '请填写任务描述!',
        icon: 'none',
        duration: 2000,
      })
      return false
    }
    else if (image.length == 0) {
      wx.showToast({
        title: '请选择封面!',
        icon: 'none',
        duration: 2000,
      })
      return false
    }

    else if (that.data.startDate.length == 0 || that.data.endDate.length == 0) {
      wx.showToast({
        title: '请选择日期!',
        icon: 'none',
        duration: 2000,
      })
      return false
    }

    else if (that.data.startTime.length == 0 || that.data.endTime.length == 0) {
      wx.showToast({
        title: '请选择时间!',
        icon: 'none',
        duration: 2000,
      })
      return false
    }

    else if (startDate > endDate) {
      wx.showToast({
        title: '开始日期必须小于结束日期！',
        icon: 'none',
        duration: 2000,
      })
      return false
    }
    else if (startTime > endTime) {
      wx.showToast({
        title: '开始时间必须小于结束时间！',
        icon: 'none',
        duration: 2000,
      })
      return false
    }
    else return true
  },

  chooseLocation: function (e) {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          addressName: res.name,
          addressLatitude: res.latitude,
          addressLongitude: res.longitude,
        })

      },
    })
  },
  comfirm: function () {
    wx.redirectTo({
      url: '../../clock/clock'
    })
    db.collection('addtask').add({
      data: {
        image: this.data.image,
        T_con: this.data.T_con
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
      }
    })
  }


});