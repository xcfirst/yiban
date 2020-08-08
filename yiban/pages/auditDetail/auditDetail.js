// pages/auditDetail/auditDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handSuccessSubmit(e) {
    // const that = this;
    wx.showModal({
      title: '确认通过审核吗？',
      cancelColor: "#17c3b2",
      confirmColor: "#ff5e5b",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          // that.submitGroup();
          // wx.navigateBack(2);
          wx.navigateTo({
            url: '../auditSuccess/auditSuccess',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})