// pages/informationDetail/informationDetail.js
import { request } from "../../request/index.js";
Page({
  data: {
    "nowAssociation": {},
    "imgArr": [
      'https://ae01.alicdn.com/kf/H068de38c4c7043e2a0e2df6b427d6d7bO.jpg',
      'https://ae01.alicdn.com/kf/H607fc964ae6845e08a84bafbcf16b747g.jpg',
      'https://ae01.alicdn.com/kf/H3b7d899a2e7745e68808a0ce4185f529b.jpg',
      'https://ae01.alicdn.com/kf/Haf7e28145ab64d3284f1d2f83b76fa7fE.jpg'
    ],
    "name": ""
  },
  onLoad: function (options) {
    console.log(options);
    let name = options.name;
    this.setData({
      name
    })
    this.getAssociation();
  },
  getAssociation() {
    const name = this.data.name;
    request({
      // url: "http://liveforjokes.icu:8864/getAssociationByType/getAssociationByName",
      url: "http://localhost:8864/getAssociationByType/getAssociationByName",
      data: { name },
    })
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          let nowAssociation = res.data.obj;
          this.setData({
            nowAssociation
          })
        }
      })
  },
  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      data: that.data.nowAssociation.href,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  handPreviewImg(e) {
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

})