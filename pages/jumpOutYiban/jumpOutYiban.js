// pages/jumpOutPage/jumpOutPage.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "client_id": "a1397db859458285",
    "client_secret": "eb2c65221a15c0b88f1f6b16c4926458",
    "redirect_uri": "https://liveforjokes.icu",
    "code": null,
    "access_token": null,
    "yibanInfo": null
  },
  onLoad: function (options) {
    // console.log(options);
  },
  handJump(e) {
    console.log(e);
    let str = e.detail.src;
    let code;
    if (str.indexOf("https://liveforjokes.icu/?code=") >= 0) {
      console.log('包含此字符串');
      console.log(str.substring(31));
      code = str.substring(31);
      this.setData({
        code
      })
      this.getAccess_token();
    }
  },
  getAccess_token() {
    const client_id = this.data.client_id;
    const client_secret = this.data.client_secret;
    const code = this.data.code;
    const redirect_uri = this.data.redirect_uri;
    request_1({
      url: "https://openapi.yiban.cn/oauth/access_token",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { client_id, client_secret, code, redirect_uri },
      method: "POST",
    })
      .then(res => {
        if (res.statusCode == 200) {
          console.log(res);
          this.setData({
            access_token: res.data.access_token
          })
          this.getInformation();
        }
      });
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
      url: "http://liveforjokes.icu:8800/saveUser",
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
          wx.switchTab({
            url: '../home/home',
          })
        }
      });
  },
  handerror(e) {
    console.log(1);
    var pages = getCurrentPages();
    console.log(pages);
    var currentPage = pages[pages.length - 1];
    console.log(currentPage);
    var url = currentPage.route;
    console.log(url);
    var options = currentPage.options;
    console.log(options);
  }
})