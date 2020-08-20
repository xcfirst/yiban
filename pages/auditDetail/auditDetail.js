// pages/auditDetail/auditDetail.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "userId":null,
    "auditId": null,
    "auditArray": {},
    "isPictureNull":true,
    "userInformation":{}
  },
  onLoad: function (options) {
    var app = getApp();
    let userId = app.globalData.userId;
    // console.log(options.auditId);
    let auditId = options.auditId;
    this.setData({
      auditId,
      userId
    })
    this.getAudit();
    this.getInformation();
  },
  getAudit() {
    const id = this.data.auditId;
    request_1({
      url: "http://liveforjokes.icu:8800/getAuthenticationMessageById",
      // url: "http://localhost:8800/getAuthenticationMessageById",
      data: { id },
    })
      .then(res => {
        console.log(res.data.obj);
        if (res.statusCode == 200) {
          let auditArray = res.data.obj;
          let isPictureNull = this.data.isPictureNull;
          if(auditArray.pictureUrl.length != 0 && auditArray.pictureUrl != null){
            isPictureNull = false
          }
          this.setData({
            auditArray,
            isPictureNull
          })
        }

      })
  },
  getInformation(){
    const id = this.data.userId;
    request_1({
      url: "http://liveforjokes.icu:8800/getStudentDetail",
      // url: "http://localhost:8800/getStudentDetail",
      data: { id },
    })
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          let userInformation = res.data.obj;
          this.setData({
            userInformation
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
    request_1({
      url: "http://liveforjokes.icu:8800/success",
      // url: "http://localhost:8800/success",
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