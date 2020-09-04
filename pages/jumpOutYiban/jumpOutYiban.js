// pages/jumpOutPage/jumpOutPage.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    // "access_token": null,
    "yibanInfo": null,
    "username": null,
    "password": null,

    "client_id":"a1397db859458285",
    "client_secret":"eb2c65221a15c0b88f1f6b16c4926458",
    "redirect_uri":"https://liveforjokes.icu/index.html",
    "code":null,
    "access_token":null
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
  },


  // handJump(e){
  //   console.log(e);
  //   if(e.detail.src.indexOf("https://liveforjokes.icu/index.html?code=") >= 0){
  //     let code = e.detail.src.slice(41);
  //     console.log(code);
  //     this.setData({
  //       code
  //     })
  //     this.getAccess_token(code);
  //   }
  // },
  // getAccess_token(code){
  //   let client_id = this.data.client_id;
  //   let client_secret = this.data.client_secret;
  //   let redirect_uri = this.data.redirect_uri;
  //   const that = this;
  //   request_1({
  //     url: "https://openapi.yiban.cn/oauth/access_token",
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     data: { client_id, client_secret,code,redirect_uri },
  //     method: "POST",
  //   })
  //     .then(res => {
  //       console.log(res);
  //       if (res.statusCode == 200) {
  //         let access_token = res.data.access_token;
  //         that.setData({
  //           access_token
  //         })
  //         that.getInformation();
  //       }
  //     })
  // }
})