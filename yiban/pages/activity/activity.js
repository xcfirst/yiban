// pages/activity/activity.js
import { request } from "../../request/index.js";
Page({
  data: {
    "userId": 1,
    "activityId": undefined,
    "nowactivityArray": {},
    "isActivityNull": {
      "isTitleNull": true,
      "isDateNull": true,
      "isAddressNull": true,
      "isTextNull": true,
      "isPictureNull": true,
      "isMessageNull": true,
      "isCollectedNull": true
    },
    "hasMessage": true,

  },
  onLoad: function (options) {
    this.setData({
      activityId: options.activityId
    })
    this.getActivityArray();
  },
  getActivityArray() {
    const userId = this.data.userId;
    const activityId = this.data.activityId;
    request({
      // url: "http://liveforjokes.icu:8864/activity/queryActivityById",
      url: "http://localhost:8864/activity/queryActivityById",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { userId, activityId },
      method: "POST",
    })
      .then(res => {
        console.log(res.data.obj);
        if (res.statusCode == 200) {
          let nowactivityArray = res.data.obj;
          let isActivityNull = this.data.isActivityNull;
          if (nowactivityArray.activity.title != null)
            isActivityNull.isTitleNull = false;
          if (nowactivityArray.activity.date != null)
            isActivityNull.isDateNull = false;
          if (nowactivityArray.activity.address != null)
            isActivityNull.isAddressNull = false;
          if (nowactivityArray.activity.text != null)
            isActivityNull.isTextNull = false;
          if (nowactivityArray.activity.picUrl.length != 0)
            isActivityNull.isPictureNull = false;
          if (nowactivityArray.message != null)
            isActivityNull.isMessageNull = false;
          if (nowactivityArray.activity.collected != null)
            isActivityNull.isCollectedNull = false;

          let hasMessage = this.data.hasMessage;
          if (nowactivityArray.message.length == 0) {
            hasMessage = false
          }
          this.setData({
            nowactivityArray,
            hasMessage,
            isActivityNull
          })
        }
      })
  },
  handcollection() {
    let colle = this.data.isActivityNull.isCollectedNull;
    colle = !colle;
    let tipTitle;
    const userId = this.data.userId;
    const activityId = this.data.activityId;
    if (!colle) {
      tipTitle = "收藏成功";
      request({
        // url: "http://liveforjokes.icu:8864/addActivity",
        url: "http://localhost:8864/addActivity",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: { userId, activityId },
        method: "POST",
      })
        .then(res => {
          console.log(res);
          if (res.statusCode == 200) {
            let timer = wx.showToast({
              title: tipTitle,
              icon: 'success',
              duration: 1500,
            });
            // wx.hideToast(timer);
          }

        })
    } else {
      tipTitle = "取消成功";
      request({
        // url: "http://liveforjokes.icu:8864/getCollectedActivity/deleteCollectedActivity",
        url: "http://localhost:8864/getCollectedActivity/deleteCollectedActivity",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: { userId, activityId },
        method: "POST",
      })
        .then(res => {
          console.log(res);
          if (res.statusCode == 200) {
            let timer = wx.showToast({
              title: tipTitle,
              icon: 'success',
              duration: 1500,
            });
            // wx.hideToast(timer);
          }
        })
    }
    this.setData({
      "isActivityNull.isCollectedNull": colle,
      "nowactivityArray.activity.collected": !colle
    });
  },
  handPreviewImg(e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var picUrl = this.data.nowactivityArray.activity.picUrl;
    wx.previewImage({
      current: picUrl[index],     //当前图片地址
      urls: picUrl,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onShareAppMessage: function () {
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/activity/activity',
      success: function (res) { }
    }
  }
})