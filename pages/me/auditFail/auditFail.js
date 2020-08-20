// pages/auditFail/auditFail.js
import { request_1 } from "../../../request/index_1.js";
Page({
  data: {
    "inputtext": "",
    "auditId": null
  },
  onLoad: function (options) {
    console.log(options.auditId);
    let auditId = options.auditId;
    this.setData({
      auditId
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
    let publish;
    if (this.data.inputtext != "") {
      publish = true;
    }
    if (publish == true) {
      wx.showModal({
        title: '确认不通过审核并发送信息吗？',
        cancelColor: "#17c3b2",
        confirmColor: "#ff5e5b",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            that.getFail();
            // wx.navigateBack(2);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  getFail() {
    const id = this.data.auditId;
    const information = this.data.inputtext;
    request_1({
      url: "http://liveforjokes.icu:8800/fail",
      // url: "http://localhost:8800/fail",
      data: { id, information },
    })
      .then(res => {
        if (res.statusCode == 200) {
          wx.showToast({
            title: "提交成功",
            icon: 'success',
            duration: 1500,
          });
          setTimeout(function () {
            wx.redirectTo({
              url: "../auditList/auditList"
            })
          }, 1500)
        }
      })
  }
})