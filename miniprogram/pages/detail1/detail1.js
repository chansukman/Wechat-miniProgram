Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList:[
      {
        title:"静夜思",
        desc:"《静夜思》是唐代诗人李白所作的一首五言古诗。此诗描写了秋日夜晚，诗人于屋内抬头望月的所感。",
        works:"toWork1",
        logo:"/images/jing.png"
      },
      {
        title: "忆江南",
        desc: "忆江南，本为唐教坊曲名，后用作词牌。又名“望江南”、“梦江南”、“江南好”等。",
        works:"toWork2",
        logo: "/images/yi.png"
      },
      {
        title: "咏鹅",
        desc: "《咏鹅》是初唐诗人骆宾王于七岁时写的一首五言古诗。",
        works: "toWork3",
        logo: "/images/yong.png"
      },
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  toWork1: function () {
    wx.navigateTo({
      url: '/pages/work/work1/work1',
    })
  },
  toWork2: function () {
    wx.navigateTo({
      url: '/pages/work/work2/work2',
    })
  },
  toWork3: function () {
    wx.navigateTo({
      url: '/pages/work/work3/work3',
    })
  },

})