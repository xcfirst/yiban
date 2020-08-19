// pages/personalCenter/personalCenter.js
import { request } from "../../request/index.js";
Page({
  data: {
    "ACCESS_TOKEN": null,
    "urlSuccess_1": false
  },
  onLoad: function (options) {

  },
 

  handOpen(e) {
    const that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['OqGxqGokQdUy2LwHtI6zBOB0-IBxf6FRHUrAGoDDoXQ'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
      success(res) {
        console.log('已授权接收订阅消息');
        that.getAccessToken();
      }
    })
  },
  getAccessToken() {
    const that = this;
    request({
      url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3ba5b3cafbcbd958&secret=13c3597b68a04f2b65270413e38a5989",

    })
      .then(res => {
        console.log(res.data.access_token);
        this.setData({
          ACCESS_TOKEN: res.data.access_token
        })
        that.getMessage();
      })
  },
  getMessage() {
    var user = wx.getStorageSync('user');
    let openid = user.openid;
    let ACCESS_TOKEN = this.data.ACCESS_TOKEN;
    request({
      "url": "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" + ACCESS_TOKEN,
      "header": {
        "Content-Type": "application/json"
      },
      "method": "POST",
      "data": {
        "touser": openid,
        "template_id": "OqGxqGokQdUy2LwHtI6zBOB0-IBxf6FRHUrAGoDDoXQ",
        "page": "../activity/activity?activityId=19",
        "miniprogram_state": "developer",
        // "lang": "zh_CN",
        "data": {
          "thing1": {
            "value": "abc"
          },
          "time5": {
            "value": "15:01"
          },
          "thing6": {
            "value": "教四202"
          },
          "date13": {
            "value": "2020年8月11日"
          },
          "thing20": {
            "value": "易班轻应用开发大赛，等你来参加"
          }
        }
      }


    })
      .then(res => {
        console.log(res);

      })
  },









  handyiban(e) {
    this.getYiban();
  },
  getYiban() {
    const client_id = "a1397db859458285";
    const redirect_uri = "https://liveforjokes.icu";
    const code = "30251b3f5793724cd9d59d59fa48733684c313bf9de";
    const client_secret = "eb2c65221a15c0b88f1f6b16c4926458";
    request({
      url: "https://openapi.yiban.cn/oauth/authorize",
      data: { client_id, redirect_uri },
    })
      .then(res => {
        console.log(res);
        if (res.statusCode == 200) {
          wx.navigateTo({
            url: '../jumpOutPage/jumpOutPage',
            // url: '../../yiban.html',
            success: function(res){
              // success
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
          // request({
          //   url: "https://openapi.yiban.cn/oauth/authorize", 
          //   data: { client_id, redirect_uri },
          // }).then(res => {
          //   console.log(res);
          // })
          // request({
          //   url: "https://openapi.yiban.cn/oauth/access_token",
          //   header: {
          //     "Content-Type": "multipart/form-data"
          //   },
          //   method: "POST",
          //   data: { client_id, client_secret, code, redirect_uri },
          // }).then(res => {
          //   console.log(res);
          // })
        }
      })

  },
  handJump(e) {
    // const client_id = "a1397db859458285";
    // const redirect_uri = "https://liveforjokes.icu";
    // const code = "30251b3f5793724cd9d59d59fa48733684c313bf9de";
    // const client_secret = "eb2c65221a15c0b88f1f6b16c4926458";
    // request({
    //   url: "https://openapi.yiban.cn/oauth/access_token",
    //   header: {
    //     "Content-Type": "multipart/form-data"
    //   },
    //   method: "POST",
    //   data: { client_id,client_secret,code,redirect_uri },
    // })
    // .then(res => {
    //   console.log(res);
    // })
    console.log(1);
    wx.redirectTo({
      url: '../personalCenter/personalCenter',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})