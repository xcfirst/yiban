// pages/auditDetail/auditDetail.js
import { request_1 } from "../../../request/index_1.js";
Page({
  data: {
    "userId": null,
    "auditId": null,
    "auditArray": {},
    "isPictureNull": true,
    "userInformation": {},
    "userName": null,
    "userNumber": null
  },
  onLoad: function (options) {
    var app = getApp();
    let userId = app.globalData.userId;
    let auditId = options.auditId;
    this.setData({
      auditId,
      userId
    })
    this.getDetail();
    //this.getAudit();
    // this.getInfo();
  },
  // getInfo(){
  //   // const id = this.data.userId;
  //   const id = this.data.auditArray.userId;
  //   request_1({
  //     url: "https://liveforjokes.icu/getStudentDetail",
  //     data: { id },
  //   })
  //     .then(res => {
  //       console.log(res);
  //       if (res.statusCode == 200) {
  //         let userName = res.data.obj.yb_realname;
  //         let userNumber = res.data.obj.studentNumber;
  //         this.setData({
  //           userName,
  //           userNumber
  //         })
  //       }

  //     })
  // },
  // getAudit() {
  //   const id = this.data.auditId;
  //   request_1({
  //     url: "https://liveforjokes.icu/getAuthenticationMessageById",
  //     data: { id },
  //   })
  //     .then(res => {
  //       console.log(res);
  //       if (res.statusCode == 200) {
  //         let auditArray = res.data.obj;
  //         let isPictureNull = this.data.isPictureNull;
  //         if(auditArray.pictureUrl.length != 0 && auditArray.pictureUrl != null){
  //           isPictureNull = false
  //         }
  //         this.setData({
  //           auditArray,
  //           isPictureNull
  //         })
  //         this.getInfo();
  //       }

  //     })
  // },

  getDetail() {
    const id = this.data.auditId;
    request_1({
      url: "https://liveforjokes.icu/getAuthenticationMessageById",
      data: { id },
    })
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          let auditArray = res.data.obj.authenticationMessage;
          let isPictureNull = this.data.isPictureNull;
          if (auditArray.pictureUrl.length != 0 && auditArray.pictureUrl != null) {
            isPictureNull = false
          }
          let userName = res.data.obj.user.name;
          let userNumber = res.data.obj.user.studentNumber;
          this.setData({
            auditArray,
            isPictureNull,
            userName,
            userNumber
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
      url: "https://liveforjokes.icu/success",
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
  },
  previewImage: function (e) {
    var images = this.data.auditArray.pictureUrl;
    var idx = e.currentTarget.dataset.idx;
    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  }
})