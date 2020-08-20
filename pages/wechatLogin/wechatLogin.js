// pages/wechatLogin/wechatLogin.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "canIUse": wx.canIUse('button.open-type.getUserInfo'),
    "userId":null
  },
  onLoad: function (options) {
    var app = getApp();
    let userId = app.globalData.userId;
    this.setData({
      userId
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      this.getCode();
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  getCode() {
    //调用微信的 wx.login 接口，从而获取code
    wx.login({
      success: res => {
        // 获取到用户的 code 之后：res.code
        console.log("用户的code:" + res.code);
        // this.getOpenid(res.code);
        wx.switchTab({
          url: '../home/home',
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
        // 可以传给后台，再经过解析获取用户的 openid
        // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
        // wx.request({
        //     // 自行补上自己的 APPID 和 SECRET
        //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
        //     success: res => {
        //         // 获取到用户的 openid
        //         console.log("用户的openid:" + res.data.openid);
        //     }
        // });
      }
    });

  },
  getOpenid(code) {
    const userId = this.data.userId;
    request_1({
      // url: "http://liveforjokes.icu:8800/insertOpenId", 
      url: "http://localhost:8800/insertOpenId",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { userId, code },
      method: "POST",
    })
      .then(res => {
        console.log("openid");
        console.log(res);
      //   wx.switchTab({
      //   url: '../home/home',
      //   success: function (res) {
      //     // success
      //   },
      //   fail: function () {
      //     // fail
      //   },
      //   complete: function () {
      //     // complete
      //   }
      // })
      })
},
  
})