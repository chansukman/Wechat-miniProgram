const app = getApp();

Page(

  //事件处理函数
  {
    data: {

     





      
      autoplay: true,
      userInfo: {},
      imgUrls: [
        {
          image:"../../images/toolbar/notice.png",
           url:"../notice/notice"
        }, 
        {
          image:"../../images/toolbar/experience.png",
          url:'../experience/experience'
        },
        {
          image: "../../images/toolbar/message.png", 
          url:"../message/message"
        },
        {
          image: "../../images/toolbar/extension.png",
          url:'../extension/extension'
        }
        ],

    },
    OnJump: function (e) { //点击图片触发的事件       
     console.log(e)    // 查看标签上的属性        
     var url = e.currentTarget.dataset.url // 取出标签上绑定的 url        
     wx.navigateTo({ // 不关闭当前页面，跳转到非tarber页面          
     url: url,        
     })    
     },
    notice: function () {
      wx.navigateTo({
        url: '../notice/notice',
      })
    },

    experience: function () {
      wx.navigateTo({
        url: '../experience/experience',
      })
    },
    message: function () {
      wx.navigateTo({
        url: '../message/message',
      })
    },
    extension: function () {
      wx.navigateTo({
        url: '../extension/extension',
      })
    },
    onShow: function () {
      //判断用户是否登录
      var that = this;
      wx.getStorage({
        key: 'user',
        success: function (res) {
          console.log(res.keys)
          that.setData({
            name: res.data.name
          })
        },
      })


    },
  })