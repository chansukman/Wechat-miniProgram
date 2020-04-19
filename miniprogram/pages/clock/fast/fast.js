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
    guanzhu: [],
    focus: [],
    focuscontent: '',
    arr: [0]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'days30-jeacq'
    })
    db.collection('addtask')
      .orderBy("startDate", "asc")
      .orderBy('startTime', 'asc')
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
    var that = this;
    wx.getStorage({
      key: 'focus',
      success: function (res) {
        for (let i in res.data) {
          that.data.focus.push(res.data[i])
        };
      }
    })

  },
  jifen(e) {


  },
  tolike: function (e) {
    let that = this
    console.log(e.target.dataset.id)
    wx.cloud.callFunction({
      name: 'update',
      //点赞需要的参数:
      // 点赞数 +1
      // 该条的id
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
    //积分
    var uid = wx.getStorageSync('user')._id
    console.log('uid' + uid)
    wx.cloud.callFunction({
      name: 'updatepoint',
      data: {

        _id: uid,

      },
      success(res) {
        console.log("成功", res);
      },
      fail(res) {
        console.log("失败", res);
      }

    })

    setTimeout(this.onLoad, 500)
  },


  toright: function (e) {
    console.log(e.target.dataset.id)
    var focusId = e.target.dataset.id
    db.collection("addtask").where({
      _id: focusId
    })
      .get(
        {
          success: res => {
            console.log(res.data)
            wx.showToast({
              title: '关注',
            });
            //这一步很重要，给focus赋值，没有这一步的话，前台就不会显示值      
            this.setData({
              guanzhu: res.data
            })
            this.data.focus.push(this.data.guanzhu)

            //把新的focus存储到缓存中
            wx.setStorageSync('focus', this.data.guanzhu);
            wx.getStorage({
              key: 'focus',
              success: function (res) {
                //输出缓存内容
                console.log(res)
              }
            })


          }
        }
      )
    var arr = wx.getStorageSync('focus') || [];
    console.log(arr)

    db.collection('focus').add({
      data: {
        creator: arr[0].creator,
        desc: arr[0].desc,
        image: arr[0].image,
        like: arr[0].like,
        name: arr[0].name,
        startDate: arr[0].startDate,
        startTime: arr[0].startTime,
        user: wx.getStorageSync('name')
      },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
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