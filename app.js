//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function (options) {},
  onShow: function (options) {
    // let userId = this.globalData.userId;
    // if (userId == null) {
    //   console.log("userId = null");
    //   wx.redirectTo({
    //     url: "./pages/wechatLogin/wechatLogin",
    //   });
      // wx.redirectTo({
      //   url: "./pages/jumpOutYiban/jumpOutYiban",
      // });
    // }
  },
  onHide: function () {},
  onError: function (msg) {},
  //options(path,query,isEntryPage)
  onPageNotFound: function (options) {},
  globalData: {
    hasLogin: false,
    yibanHasLogin: true,
    userId: null,
  },
});
