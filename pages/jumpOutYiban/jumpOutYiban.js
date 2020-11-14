// pages/jumpOutPage/jumpOutPage.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    // "access_token": null,
    "yibanInfo": null,
    "stuName":null,
    "studentId": null,
    // "username": null,
    // "password": null,

    "client_id": "a1397db859458285",
    "client_secret": "eb2c65221a15c0b88f1f6b16c4926458",
    "redirect_uri": "https://liveforjokes.icu/index.html",
    "code": null,
    "access_token": null,

    "chooseSize": false,
    "animationData": {}
  },
  onLoad: function (options) {
    // console.log(options); 
  },
  handClick(e) {
    console.log("click");
    this.hideModal(e);
  },
  handleInputName(e) {
    console.log(e.detail.value);
    let stuName = e.detail.value;
    this.setData({
      stuName
    })
  },
  handleInputId(e) {
    console.log(e.detail.value);
    let studentId = e.detail.value;
    this.setData({
      studentId
    })
  },
  // handleInputCode(e) {
  //   console.log(e.detail.value);
  //   let password = e.detail.value;
  //   this.setData({
  //     password
  //   })
  // },
  handYibanLogin(e) {
    this.hideModal(e);
    let stuName = this.data.stuName;
    let studentId = this.data.studentId;
    request_1({
      url: "https://liveforjokes.icu/getStudentInformation",
      data: { studentId }
    })
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.info.yb_username != stuName || res.data.info.yb_usernick != stuName) {
            console.log("姓名或学号错误");
            wx.showToast({
              title: "姓名或学号错误",
              icon: 'none',
              duration: 2000,
            });
          } else {
            this.setData({
              yibanInfo: res.data.info
            })
            this.saveInformation();
          }
        }
      })
  },


  // getInformation() {
  //   let access_token;
  //   request_1({
  //     url: "https://liveforjokes.icu/getAccessToken",
  //   })
  //     .then(res => {
  //       console.log(res);
  //       access_token = res.data;
  //       request_1({
  //         url: "https://openapi.yiban.cn/user/me",
  //         data: { access_token },
  //       })
  //         .then(res => {
  //           console.log(res);
  //           if (res.statusCode == 200) {
  //             this.setData({
  //               yibanInfo: res.data.info
  //             })
  //             this.saveInformation();
  //           }
  //         })
  //     })
  // },
  saveInformation() {
    let studentNumber = this.data.studentId;
    const yibanInfo = this.data.yibanInfo;
    const yb_userid = yibanInfo.yb_userid;
    const yb_realname = yibanInfo.yb_username;
    const yb_sex = yibanInfo.yb_sex;
    const yb_userhead = yibanInfo.yb_userhead;
    const yb_username = yibanInfo.yb_usernick;
    request_1({
      url: "https://liveforjokes.icu/saveUser",
      data: { yb_userid, yb_realname, yb_sex, yb_userhead, yb_username, studentNumber },
      method: "POST",
    })
      .then(res => {
        if (res.statusCode == 200) {
          console.log(res);
          let app = getApp();
          app.globalData.userId = res.data.obj.id;
          app.globalData.yibanHasLogin = true;
          console.log("userId = " + app.globalData.userId);
          wx.redirectTo({
            url: '../wechatLogin/wechatLogin',
          })
        }
      });
  },


  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 250,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  },
  onShareAppMessage: function () {
    return {
      title: '转发',
      path: '/pages/jumpOutYiban/jumpOutYiban',
      success: function (res) { }
    }
  }


})