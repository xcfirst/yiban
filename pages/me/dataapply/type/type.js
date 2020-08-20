// pages/dataapply/type/type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  navTo:function(e){
    var type = e.currentTarget.dataset.type;
    var page = getCurrentPages();
    var prepage = page[page.length-2];
    prepage.setData({
      type:type
    });
    wx.navigateBack({
      delta:1
    })
  }
})