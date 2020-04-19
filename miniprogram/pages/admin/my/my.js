var app = getApp();
var util = require('../../../utils/util.js');
const db = wx.cloud.database();
Page({
  data: {
    //付款内容循环
    payContact: [
      { 'id': 0, 'text': '积分兑换', 'img': '/images/my/1.png' ,'bind':'shop'},
      { 'id': 1, 'text': '购物车', 'img': '/images/my/2.png', 'bind': 'onPays' },
      { 'id': 2, 'text': '已完成', 'img': '/images/my/4.png', 'bind': 'shopEnd'},
      { 'id': 3, 'text': '打卡日历', 'img': '/images/my/3.png', 'bind': 'signin'}
    ],
    currentIdx: '',
    name:'',
    collection:[]
  },
  onLoad: function () {
    
    
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
    //判断用户是否登录及获取所需缓存信息
    var uid = wx.getStorageSync('name');
    db.collection('user')
      .where({
        name: uid
      })
      .get({
        success: res => {
          console.log(res.data)

          this.setData({
            collection: res.data
          })
        }
      })

   
    
  },
  //退出登录
  onSignIn: function () {
    wx.navigateTo({
      url: '../log/log',
    })
    wx.clearStorage()
  },



//积分兑换
 shop: function () {
    wx.navigateTo({
      url: '../../extension/extension',
    })
  },
  // 购物车
  onPays(e) {
    wx.navigateTo({
      url: '../../cart/cart'})
    /*if (!this.data.uid) {
      util.showToast('请登录后查看！', 'none');
    } else {
      var currentIdx = e.target.dataset.idx;
      this.setData({ currentIdx });
      wx.navigateTo({
        url: '../../cart/cart?currentIdx=' + currentIdx,
      })
    }*/
  },
  //已完成
  shopEnd: function () {
    wx.navigateTo({
      url: '../../shopend/shopend',
    })
  },
  //打卡日历
  signin: function () {
    wx.navigateTo({
      url: '../signin/signin',
    })
  },
//学习报告
  myStudy: function () {
    wx.navigateTo({
      url: '../mystudy/mystudy',
    })
  },
  //我的班级
  myClass: function () {
    wx.navigateTo({
      url: '../myclass/myclass',
    })
  },
  //我的发布
  onRelease: function () {
    wx.navigateTo({
      url: '../onrelease/onrelease',
    })
  },
  // 地址
  onAddress() {

    wx.navigateTo({
      url: '../../admin/address/choose/choose'
    })

  },

  //积分计算规则
  mathPoint: function () {
    wx.navigateTo({
      url: '../mathpoint/mathpoint',
    })
  },
 
})