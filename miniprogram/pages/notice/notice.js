// miniprogram/pages/notice/notice.js
const db = wx.cloud.database()
Page({

  data: {
    noticeList: [{
      url: "../tk/tk",
      context: "语文调课通知"
    },
    {
      url: "../tk/tk",
      context: "数学调课通知"
    },
    {
      url: "../tk/tk",
      context: "英语调课通知"
    }
    ],
    collection: []
  },
  onShareAppMessage: function () {

  },
  
  releaseNewNotice() {
    var arr = wx.getStorageSync('identity') || [];
    if (arr == '管理员') {
    wx.navigateTo({
      url: '../notice/newnotice/newnotice',
    })
    }else{
      wx.showToast({
        title: '你没有权限发布信息',
      })
      
    }
  },
  onLoad: function (options) {
    db.collection('NewNotice')
      .orderBy("startDate", "desc")
      .orderBy('startTime', 'desc')
    .get({
      success: res => {
        console.log(res.data)
        this.setData({
          collection: res.data
        })
      }
    })

  },
})