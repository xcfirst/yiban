// pages/teamEditors/teamEditors.js
import { request } from "../../request/index.js";
Page({
  data: {
    "inputtext": "",
    "userId": 1,
    "activityId": null
  },
  onLoad: function (options) {
    let activityId = options.activityId;
    this.setData({
      activityId
    })

  },
  submitGroup() {
    const userId = this.data.userId;
    const activityId = this.data.activityId;
    const text = this.data.inputtext;
    request({
      // url: "http://liveforjokes.icu:8864/insertGroups",
      url: "http://localhost:8864/insertGroups",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      data: { activityId, userId, text },
      method: "POST",
    })
      .then(res => {
        wx.showToast({
          title: "发布成功",
          icon: 'success',
          duration: 1500,
        });
        console.log(res);
      })
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
    if (publish==true) {
      wx.showModal({
        title: '确认发布吗？',
        cancelColor: "#17c3b2",
        confirmColor: "#ff5e5b",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            that.submitGroup();
            wx.navigateBack(2);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})