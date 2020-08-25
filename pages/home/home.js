// pages/home/home.js  
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "isClick": false,
    "isActive": "one",
    "userId": null,
    "activityArray": [],
    "activityArrayLength": true,
    "activityProveArray": [],
    "activityProveArrayLength": true,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    "canIUse": wx.canIUse('button.open-type.getUserInfo'),
    "isHide": false
  },
  onLoad: function (options) {

  },
  //登录
  getUreInformation() {
    let that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面
              that.getCode();
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    })
  },
  getCode() {
    //调用微信的 wx.login 接口，从而获取code
    wx.login({
      success: res => {
        // 获取到用户的 code 之后：res.code
        console.log("用户的code:" + res.code);
        var app = getApp();
        app.globalData.hasLogin = true;
        this.saveCode(res.code);
      }
    });

  },
  saveCode(code) {
    const userId = this.data.userId;
    request_1({
      url: "http://liveforjokes.icu:8800/insertOpenId",
      // url: "http://localhost:8800/insertOpenId",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { userId, code },
      method: "POST",
    })
      .then(res => {
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
  //首页
  onShow: function () {
    let app = getApp();
    let hasLogin = app.globalData.hasLogin;
    let yibanHasLogin = app.globalData.yibanHasLogin;
    if (hasLogin == false && yibanHasLogin == true) {
      this.getUreInformation();
    }
    let userId = app.globalData.userId;
    this.setData({
      userId
    })
    if (userId != null) {
      this.getActivityArray();
      this.getActivityProve();
    }

  },
  getActivityArray() {
    const userId = this.data.userId;
    request_1({
      url: "http://www.liveforjokes.icu:8800/index/activity",
      // url: "http://localhost:8800/index/activity",
      data: { userId },
    })
      .then(res => {
        console.log(res.data.obj);
        if (res.statusCode == 200) {
          let activityArray = [];
          let activityArrayLength = this.data.activityArrayLength;
          let i, j;
          for (i = 0, j = 0; i < res.data.obj.length; i++, j++) {
            activityArray[j] = res.data.obj[i];
          }
          if(res.data.obj.length == 0){
            activityArrayLength = false;
          }
          this.setData({
            activityArray,
            activityArrayLength
          })
        }
      })
  },
  handlebar(e) {
    const isActive = e.currentTarget.dataset.judge
    this.setData({
      isActive
    })
  },

  getActivityProve() {
    const userId = this.data.userId;
    request_1({
      url: "http://liveforjokes.icu:8800/certificate/getIndexCertificate",
      // url: "http://localhost:8800/certificate/getIndexCertificate",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { userId },
      method: "POST",
    })
      .then(res => {
        if (res.statusCode == 200) {
          console.log(res.data.obj);
          let activityProveArray = res.data.obj;
          let activityProveArrayLength = this.data.activityProveArrayLength;
          if(res.data.obj.length == 0){
            activityProveArrayLength = false;
          }
          this.setData({
            activityProveArray,
            activityProveArrayLength
          })
        }
      });

  },
})