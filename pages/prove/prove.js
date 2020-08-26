// pages/prove/prove.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "certificateId": null,
    "userId": null,
    "activityProveArray": {},
    "activityProveNull": {
      "titleIsNull":true,
      "contentIsNull":true,
      "pictureLength":false
    },
    "colle": false,
    "hascolle": false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    let userId = app.globalData.userId;
    this.setData({
      certificateId: options.certificateId,
      userId
    })
    this.getProveArray();
    this.hasBrowsed();
  },
  getProveArray() {
    const userId = this.data.userId;
    const certificateId = this.data.certificateId;
    request_1({
      url: "http://liveforjokes.icu:8800/certificate/getCertificateById",
      // url: "http://localhost:8800/certificate/getCertificateById",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { userId, certificateId },
      method: "POST",
    })
      .then(res => {
        if (res.statusCode == 200) {
          console.log(res.data.obj);
          let activityProveArray = res.data.obj;
          let colle = false;
          let activityProveNull = this.data.activityProveNull;
          if (activityProveArray.collected == true)
            colle = true;
          if (activityProveArray.activityCertificate.fileUrl.length == 0) {
            activityProveNull.pictureLength = false;
          } else {
            activityProveNull.pictureLength = true;
          }
          if (activityProveArray.activityCertificate.activityTitle == null || activityProveArray.activityCertificate.activityTitle == "") {
            activityProveNull.titleIsNull = true;
          } else {
            activityProveNull.titleIsNull = false;
          }
          if (activityProveArray.activityCertificate.activityContent == null || activityProveArray.activityCertificate.activityContent == "") {
            activityProveNull.contentIsNull = true;
          } else {
            activityProveNull.contentIsNull = false;
          }
          this.setData({
            activityProveArray,
            colle,
            activityProveNull
          })
        }
      });

  },
  hasBrowsed(){
    const userId = this.data.userId;
    const certificateId = this.data.certificateId;
    request_1({
      url: "http://liveforjokes.icu:8800/certificate/browsedCertificate",
      // url: "http://localhost:8800/certificate/browsedCertificate",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { userId, certificateId },
      method: "POST",
    })
      .then(res => {
        console.log(res);
      })
  },

  handcollection() {
    let colle = this.data.colle;
    colle = !colle;
    let tipTitle;
    const userId = this.data.userId;
    const certificateId = this.data.certificateId;
    if (colle) {
      tipTitle = "收藏成功"
      request_1({
        url: "http://liveforjokes.icu:8800/certificate/collectedCertificate",
        // url: "http://localhost:8800/certificate/collectedCertificate",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: { userId, certificateId },
        method: "POST",
      })
        .then(res => {
          if (res.statusCode == 200) {
            console.log(res);
            wx.showToast({
              title: tipTitle,
              icon: 'success',
              duration: 1500,
            });
          }
        });

    } else {
      tipTitle = "取消成功"
      request_1({
        url: "http://liveforjokes.icu:8800/certificate/deleteCertificate",
        // url: "http://localhost:8800/certificate/deleteCertificate",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: { userId, certificateId },
        method: "POST",
      })
        .then(res => {
          if (res.statusCode == 200) {
            console.log(res);
            wx.showToast({
              title: tipTitle,
              icon: 'success',
              duration: 1500,
            });
          }
        });
    }
    this.setData({
      colle
    });
  },
  handPreviewImg(e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var activityProveArray = this.data.activityProveArray;
    wx.previewImage({
      current: activityProveArray.activityCertificate.fileUrl[index],     //当前图片地址
      urls: activityProveArray.activityCertificate.fileUrl,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onShareAppMessage: function () {
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/prove/prove?certificateId='+certificateId,
      success: function (res) { }
    }
  }

})