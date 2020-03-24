//js
Page({
  data: {
    bigImg:"/images/common/2.png",
  },

  changeBigImg() {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        
        const tempFilePaths = res.tempFilePaths
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        //把图片存到users集合表
        const db = wx.cloud.database();
        db.collection("images").add({
          data: {
            image: tempFilePaths
          },
          success: function () {
            wx.showToast({
              title: '图片上传成功',
              'icon': 'none',
              duration: 3000
            })
          },
          fail: function () {
            wx.showToast({
              title: '图片上传失败',
              'icon': 'none',
              duration: 3000
            })
          }
        }); 
        
      }
    })
  },
  descption:function(e){
    this.setData({
      descption:e.detail.value
    })
  },

  toupload:function(e){
    const db = wx.cloud.database();//初始化数据库
    db.collection('imageDesc').add({
      data: {
        descption:this.data.descption
      },
      success: res => {//箭头函数
        console.log(res);
      },
      fail: err => {
        console.log(err);

      }
    })
    wx.showToast({
      title: '作品上传成功',
    })
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})