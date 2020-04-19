var app = getApp();
var util = require('../../../utils/util.js');
const db = wx.cloud.database();
const cont = db.collection('NewArticle');
Page({
  data: {
    startX: 0, //开始坐标
    startY: 0,
    bdArray: [],
    collection:[]
  },
  ////显示在这里onload！！！！！！！
  onLoad: function (options) {
    var that = this;
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'days30-jeacq'
    })
    //获取缓存的name
    var uid=wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.keys)
        that.setData({
          name: res.data.name
        })
      },
    })
    this.setData({ uid });
    db.collection('NewArticle').where({
      creator:uid
    })
    .get({
        //如果查询成功的话    
        success: res => {
          console.log(res.data) 
          this.setData({
            collection: res.data
          })
        }
      })

  },
  onShow: function () {
    //个人BD展示列表
    
  },
  // 修改新文章
  releaseNews() {
    wx.navigateTo({
      url: '../../find/newArticle/newArticle',
    })
  },
  /*
  //查看详情
  bdDetails(e) {
    let id = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: '../bdDetails/bdDetails?id=' + id,
    })
  },
  //编辑bd内容
  bdWrites(e) {
    let id = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: '../bdPersonalModify/bdPersonalModify?id=' + id,
    })
  },
  callback(res) {
    let bdArray = res.data.data.addr;
    this.setData({ bdArray });
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.bdArray.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      bdArray: this.data.bdArray
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.bdArray.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      bdArray: that.data.bdArray
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  /*
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del(e) {
    let currentIdx = e.currentTarget.dataset.index;
    let bid = e.currentTarget.dataset.idx;
    this.setData({ e });
    //个人BD展示列表
    var delUrl = app.globalData.shopUrl + '/home/bdnew/index/ty/d/uid/' + this.data.uid + '/bid/' + bid;
    util.http(delUrl, this.delcallback);
  },
  delcallback(res) {
    if (res.data) {
      let bdArray = this.data.bdArray;
      bdArray.splice(this.data.e.currentTarget.dataset.index, 1);
      this.setData({ bdArray });
    } else {
      util.showToast('网络错误，请重试！', 'none');
    }
  }*/
})