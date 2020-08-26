// pages/organization/organization.js
Page({
  data: {

  },
  onLoad: function (options) {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/organization/organization',
      success: function (res) { }
    }
  }
})