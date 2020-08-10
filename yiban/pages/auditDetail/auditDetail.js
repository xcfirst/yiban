// pages/auditDetail/auditDetail.js
import { request } from "../../request/index.js";
Page({
  data: {
    "auditId": null,
    "auditArray": {}
  },
  onLoad: function (options) {
    // console.log(options.auditId);
    let auditId = options.auditId;
    this.setData({
      auditId
    })
    this.getAudit();
  },
  getAudit() {
    const id = this.data.auditId;
    request({
      // url: "http://liveforjokes.icu:8864/getAuthenticationMessageById",
      url: "http://localhost:8864/getAuthenticationMessageById",
      data: { id },
    })
      .then(res => {
        console.log(res.data.obj);
        if (res.statusCode == 200) {
          let auditArray = res.data.obj;
          this.setData({
            auditArray
          })
        }

      })
  },
  handSuccessSubmit(e) {
    const that = this;
    wx.showModal({
      title: '确认通过审核吗？',
      cancelColor: "#17c3b2",
      confirmColor: "#ff5e5b",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.getSuccess();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  getSuccess() {
    const id = this.data.auditId;
    request({
      // url: "http://liveforjokes.icu:8864/success",
      url: "http://localhost:8864/success",
      data: { id },
    })
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          wx.navigateTo({
            url: '../auditSuccess/auditSuccess',
          })
        }

      })
  }
})