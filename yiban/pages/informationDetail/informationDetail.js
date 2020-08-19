// pages/informationDetail/informationDetail.js
import { request } from "../../request/index.js";
Page({
  data: {
    "nowAssociation": {},
    "pictureIsNull":true,
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
      url: "http://liveforjokes.icu:8800/getAssociationByType/getAssociationByName",
      // url: "http://localhost:8800/getAssociationByType/getAssociationByName",
      data: { name },
    })
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          let nowAssociation = res.data.obj;
          let pictureIsNull = this.data.pictureIsNull;
          if(nowAssociation.picture.length != 0 && nowAssociation.picture != null){
            pictureIsNull = false;
          }
          this.setData({
            nowAssociation,
            pictureIsNull
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
    var nowAssociation = this.data.nowAssociation;
    wx.previewImage({
      current: nowAssociation.picture[index],     //当前图片地址
      urls: nowAssociation.picture,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }

})
