Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [
      {
        title: "英文字母",
        buy: "/images/icon/shop.png",
        buys: "toBuy1",
        desc: "英文字母，古罗马人所使用文字的字母。...>>点击查看详情",
        works: "toWork5",
        logo: "/images/word.png",
         price: "2.5"
      },
      
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toWork5: function () {
    wx.navigateTo({
      url: '/pages/work/work5/work5',
    })
  },
  toBuy: function () {
    wx.navigateTo({
      url: '/pages/buy/buy',
    })
  },
  toBuy1: function (event) {
    var title = '英文字母'
    //将购物车数据添加到缓存
    var that = this
    //获取缓存中的已添加购物车信息
    var cartItems = wx.getStorageSync('cartItems') || []
    console.log("cartItems,{}", cartItems)
    if (cartItems.length > 0) {
      // 遍历购物车数组  
      for (var j in cartItems) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
        if (cartItems[j].title == title) {
          // 相等的话，给count+1（即再次添加入购物车，数量+1）  
          cartItems[j].num = cartItems[j].num + 1;
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
          try {
            wx.setStorageSync('cartItems', cartItems)
          } catch (e) {
            console.log(e)
          }
          //关闭窗口
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          /* this.closeDialog();*/
          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
          return;
        }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
      cartItems.push({
        num: 1,
        price: 2.5,
        title: '英文字母',
      });
    } else {
      cartItems.push({
        num: 1,
        price: 2.5,
        title: '英文字母',
      });
    }
    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync('cartItems', cartItems)
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      this.closeDialog();
      return;
    } catch (e) {
      console.log(e)
    }
  },
})