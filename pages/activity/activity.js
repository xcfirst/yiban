// pages/activity/activity.js 
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "userId": null,
    "activityId": undefined,
    "nowactivityArray": {},
    "isActivityNull": {
      "isTitleNull": true,
      "isDateNull": true,
      "isAddressNull": true,
      "isTextNull": true,
      "isPictureNull": true,
      "isMessageNull": true,
      "isCollectedNull": true,
    },
    "subscribeInfo": {},
    "ACCESS_TOKEN": null,
    "hasMessage": true,
    "nowTime_1": null,
    "timer": null
  },
  onLoad: function (options) {
    var app = getApp();
    let userId = app.globalData.userId;
    this.setData({
      activityId: +options.activityId,
      userId
    })
    this.getActivityArray();
    this.hasBrowsed();
    // this.addMessageAllow();
  },
  getActivityArray() {
    const userId = this.data.userId;
    const activityId = this.data.activityId;
    request_1({
      url: "http://liveforjokes.icu:8800/activity/queryActivityById",
      // url: "http://localhost:8800/activity/queryActivityById",
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
          if (nowactivityArray.activity.title != null && nowactivityArray.activity.title != "")
            isActivityNull.isTitleNull = false;
          if (nowactivityArray.activity.date != null && nowactivityArray.activity.date != "")
            isActivityNull.isDateNull = false;
          if (nowactivityArray.activity.address != null && nowactivityArray.activity.address != "")
            isActivityNull.isAddressNull = false;
          if (nowactivityArray.activity.text != null && nowactivityArray.activity.text != "")
            isActivityNull.isTextNull = false;
          if (nowactivityArray.activity.picUrl.length != 0)
            isActivityNull.isPictureNull = false;
          if (nowactivityArray.message != null)
            isActivityNull.isMessageNull = false;
          if (nowactivityArray.activity.collected != null && nowactivityArray.activity.collected != "" && nowactivityArray.activity.collected != false)
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
  hasBrowsed() {
    const userId = this.data.userId;
    const activityId = this.data.activityId;
    request_1({
      url: "http://liveforjokes.icu:8800/certificate/browsedCertificate",
      // url: "http://localhost:8800/certificate/browsedCertificate",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { userId, activityId },
      method: "POST",
    })
      .then(res => {
        console.log(res);
      })
  },
  handcollection() {
    const that = this;
    let colle = this.data.isActivityNull.isCollectedNull;
    colle = !colle;
    let tipTitle;
    const userId = this.data.userId;
    const activityId = this.data.activityId;
    if (!colle) {
      tipTitle = "收藏成功";
      request_1({
        url: "http://liveforjokes.icu:8800/addActivity",
        // url: "http://localhost:8800/addActivity",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: { userId, activityId },
        method: "POST",
      })
        .then(res => {
          console.log(res);
          if (res.statusCode == 200) {
            let subscribeInfo = res.data.obj;
            that.setData({
              subscribeInfo
            })
            wx.showToast({
              title: tipTitle,
              icon: 'success',
              duration: 1500,
            });
            that.isAllowTip();
            that.setData({
              "isActivityNull.isCollectedNull": colle,
              "nowactivityArray.activity.collected": !colle
            });
          }

        })
    } else {
      tipTitle = "取消成功";
      request_1({
        url: "http://liveforjokes.icu:8800/getCollectedActivity/deleteCollectedActivity",
        // url: "http://localhost:8800/getCollectedActivity/deleteCollectedActivity",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: { userId, activityId },
        method: "POST",
      })
        .then(res => {
          console.log(res);
          if (res.statusCode == 200) {
            wx.showToast({
              title: tipTitle,
              icon: 'success',
              duration: 1500,
            });
            if (res.data.obj != null) {
              let timer = res.data.obj;
              console.log(timer);
              clearInterval(timer);
            }
            that.setData({
              "isActivityNull.isCollectedNull": colle,
              "nowactivityArray.activity.collected": !colle
            });
          }
        })
    }
  },
  //是否授权发送订阅信息
  isAllowTip() {
    const that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['8nR52iQ_h-NDdUMLv5R_w40aOXGQgi--uThwLQOF6Qg'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
      success(res) {
        console.log(res);
        console.log('已授权接收订阅消息');
        if(res["8nR52iQ_h-NDdUMLv5R_w40aOXGQgi--uThwLQOF6Qg"] == "accept"){
          that.addMessageAllow();
        }
      }
    })
  },
  addMessageAllow() {
    const userId = this.data.userId;
    const activityId = this.data.activityId;
    request_1({
      url: "http://liveforjokes.icu:8800/insertMessageSubscribeAllow",
      // url: "http://localhost:8800/insertMessageSubscribeAllow",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { userId, activityId },
      method: "POST",
    })
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {

        }

      })
  },
  handPreviewImg(e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var nowactivityArray = this.data.nowactivityArray;
    let picUrl = nowactivityArray.activity.picUrl;
    let picUrlArray = [];
    let i;
    for(i=0;i<picUrl.length;i++){
      picUrlArray[i]=picUrl[i].picUrl;
    }
    wx.previewImage({
      current: picUrlArray[index],     //当前图片地址
      urls: picUrlArray,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onShareAppMessage: function () {
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/activity/activity?activityId='+this.data.activityId,
      success: function (res) { }
    }
  }
})