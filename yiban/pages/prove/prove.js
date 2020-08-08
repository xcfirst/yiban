// pages/prove/prove.js
Page({
  data: {
    "colle": false,
    "hascolle": false,
    "picUrl": [
      'https://ae01.alicdn.com/kf/H068de38c4c7043e2a0e2df6b427d6d7bO.jpg',
      'https://ae01.alicdn.com/kf/H607fc964ae6845e08a84bafbcf16b747g.jpg',
      'https://ae01.alicdn.com/kf/H3b7d899a2e7745e68808a0ce4185f529b.jpg',
      'https://ae01.alicdn.com/kf/Haf7e28145ab64d3284f1d2f83b76fa7fE.jpg'
    ],
    "label": [
      "宣讲会",
      "综测加分",
      "校级",
      "综测加分",
      "综测加分"
    ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handcollection() {
    let colle = this.data.colle;
    colle = !colle;
    let tipTitle;
    if (colle) {
      tipTitle = "收藏成功"
    } else {
      tipTitle = "取消成功"
    }
    wx.showToast({
      title: tipTitle,
      icon: 'success',
      duration: 1500,
    });
    this.setData({
      colle
    });
  },
  handPreviewImg(e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var picUrl = this.data.picUrl;
    wx.previewImage({
      current: picUrl[index],     //当前图片地址
      urls: picUrl,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

})