Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "课程简介",
        ishaveChild1:true,
        children:
          [
          
            {
             child_id: 1,
            name: '',
              image: "/images/chineseintro.jpg",
            location: "chinesework1"
            },
          {
            child_id: 2,
            name: '',
            image: "/images/mathsintro.jpg",
            location: "mathswork1"
          },
          {
            child_id: 3,
            name: '',
            image: "/images/englishintro.jpg",
            location: "englishwork1"
          },
          
        ]
          
      },
      {
        cate_id: 2,
        cate_name: "课程目录",
        ishaveChild: true,
        children:
          [{
            child_id: 1,
            name: '语文笔画、部首汉字\n书写训练',
            image: "/images/chinese.png",
            location:"chinese"
          },
            {
              child_id: 2,
              name: '语文作业\n书写指导',
              image: "/images/chineseworkguide.gif",
              location: "chineseworkguide"
            },
            {
              child_id: 3,
              name: '数字及数学符号\n书写训练',
              image: "/images/maths.png",
              location: "maths"
            },
            {
              child_id: 4,
              name: '数学作业\n书写指导',
              image: "/images/mathsworkguide.gif",
              location:"mathsworkguide"
            },
            {
              child_id: 5,
              name: '英文字母、单词、短语\n书写训练',
              image: "/images/english.png",
              location:"english"
            },
            {
              child_id: 6,
              name: '英语作业\n书写指导',
              image: "/images/englishworkguide.gif",
              location:"englishworkguide"
            }
            
          ]
      },
      
      {
        cate_id: 4,
        cate_name: "优秀练字",
        ishaveChild2: true,
        children: [
          {
            child_id: 1,
            name: '',
            image: "/images/bestwrite.png",
            location: "bestwrite"
          }
        ]
      },
      {
        cate_id: 5,
        cate_name: "今日作业",
        ishaveChild: true,
        children: [
          {
            child_id: 1,
            name: '语文作业',
            image: "/images/chinesework.png",
            location: "chinesework"
          },
          {
            child_id: 2,
            name: '语文作业指导',
            image: "/images/chineseworkguide.gif",
            location: "chineseworkguide"
          },
          {
            child_id: 3,
            name: '数学作业',
            image: "/images/mathswork.png",
            location: "mathswork"
          },
          {
            child_id: 4,
            name: '数学作业指导',
            image: "/images/mathsworkguide.gif",
            location: "mathsworkguide"
          },
          {
            child_id: 5,
            name: '英文作业',
            image: "/images/englishwork.png",
            location: "englishwork"
          },
          {
            child_id: 6,
            name: '英语作业指导',
            image: "/images/englishworkguide.gif",
            location: "englishworkguide"
          }
        ]
      },
    ],
    curNav: 1,
    curIndex: 0
  },
  chinese:function(){
    wx.navigateTo({
      url: '/pages/vip/subject/chinese/chinese',
    })
  },
  chineseb: function () {
    wx.navigateTo({
      url: '/pages/vip/subject/chineseb/chineseb',
    })
  },
  maths: function () {
    wx.navigateTo({
      url: '/pages/vip/subject/maths/maths',
    })
  },
  mathsb: function () {
    wx.navigateTo({
      url: '/pages/vip/subject/mathsb/mathsb',
    })
  },
  english: function () {
    wx.navigateTo({
      url: '/pages/vip/subject/english/english',
    })
  },
  englishb: function () {
    wx.navigateTo({
      url: '/pages/vip/subject/englishb/englishb',
    })
  },



  chinesework: function () {
    wx.navigateTo({
      url: '/pages/vip/todaywork/chinesework/chinesework',
    })
  }, 
  chinesework1: function () {
    wx.navigateTo({
      url: '/pages/vip/intro/chineseintro',
    })
  },
  chineseworkguide: function () {
    wx.navigateTo({
      url: '/pages/vip/todaywork/chineseworkguide/chineseworkguide',
    })
  },
  mathswork: function () {
    wx.navigateTo({
      url: '/pages/vip/todaywork/mathswork/mathswork',
    })
  },
  mathswork1: function () {
    wx.navigateTo({
      url: '/pages/vip/intro/mathsintro',
    })
  },
  mathsworkguide: function () {
    wx.navigateTo({
      url: '/pages/vip/todaywork/mathsworkguide/mathsworkguide',
    })
  }, 
  englishwork: function () {
    wx.navigateTo({
      url: '/pages/vip/todaywork/englishwork/englishwork',
    })
  },
  englishwork1: function () {
    wx.navigateTo({
      url: '/pages/vip/intro/englishintro',
    })
  },
  englishworkguide: function () {
    wx.navigateTo({
      url: '/pages/vip/todaywork/englishworkguide/englishworkguide',
    })
  },
  bestwrite:function(){
    wx.navigateTo({
      url: '/pages/bestwrite/bestwrite',
    })
  },





  //事件处理函数 
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值 
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index 
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  

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