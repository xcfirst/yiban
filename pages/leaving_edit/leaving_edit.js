// pages/teamEditors/teamEditors.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "inputtext": "",
    "userId": null,
    "activityId": null
  },
  onLoad: function (options) {
    var app = getApp();
    let userId = app.globalData.userId;
    let activityId = options.activityId;
    this.setData({
      activityId,
      userId
    })
  },
  submitGroup() {
    const activityId = this.data.activityId;
    const message	 = this.data.inputtext;
    request_1({
      url: "http://liveforjokes.icu:8800/insertMessage",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { activityId, message },
      method: "POST",
    })
      .then(res => {
        if (res.statusCode == 200) {
          wx.showToast({
            title: "发布成功",
            icon: 'success',
            duration: 1500,
          });
          setTimeout(function () {
            wx.navigateBack(2);
          }, 1500)
          // console.log(res);
        } 
      });

  },
  handleInput(e) {
    const inputtext = e.detail.value;
    this.setData({
      inputtext
    })
  },
  handsubmit(e) {
    const that = this;
    const activityId = this.data.activityId;
    let publish;
    if (this.data.inputtext != "") {
      publish = true;
    }
    if (publish == true) {
      wx.showModal({
        title: '确认发布吗？',
        cancelColor: "#17c3b2",
        confirmColor: "#ff5e5b",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            that.submitGroup();
            // wx.navigateBack(2);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})