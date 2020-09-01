// pages/jumpOutPage/jumpOutPage.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "access_token": null,
    "yibanInfo": null,
    "username": null,
    "password": null
  },
  onLoad: function (options) {
    // console.log(options);
  },
  handleInput(e) {
    console.log(e.detail.value);
    let username = e.detail.value;
    this.setData({
      username
    })
  },
  handleInputCode(e) {
    console.log(e.detail.value);
    let password = e.detail.value;
    this.setData({
      password
    })
  },
  handYibanLogin(e) {
    let username = this.data.username;
    let password = this.data.password;
    request_1({
      url: "https://liveforjokes.icu/getAccessTokenByLogin",
      data: { username, password }
    })
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data == "账号或密码错误") {
            console.log("密码错误");
            wx.showToast({
              title: "账号或密码错误",
              icon: 'none',
              duration: 2000,
            });
          } else {
            this.setData({
              access_token: res.data
            })
            this.getInformation();
          }
        }
      })
  },
  getInformation() {
    const access_token = this.data.access_token;
    request_1({
      url: "https://openapi.yiban.cn/user/me",
      data: { access_token },
    })
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          this.setData({
            yibanInfo: res.data.info
          })
          this.saveInformation();
        }
      })
  },
  saveInformation() {
    const yibanInfo = this.data.yibanInfo;
    const yb_userid = yibanInfo.yb_userid;
    const yb_realname = yibanInfo.yb_username;
    const yb_sex = yibanInfo.yb_sex;
    const yb_userhead = yibanInfo.yb_userhead;
    const yb_username = yibanInfo.yb_usernick;
    request_1({
      url: "https://liveforjokes.icu/saveUser",
      data: { yb_userid, yb_realname, yb_sex, yb_userhead, yb_username },
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
  }
})