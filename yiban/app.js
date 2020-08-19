//app.js
App({
    globalData: {
        "hasLogin": false,
        "yibanHasLogin": true,
        "userId": 28
    },
    //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
    onLaunch: function (options) {

    },
    onShow: function (options) {
        let userId = this.globalData.userId
        if (userId == null) {
            console.log(1);
            wx.redirectTo({
            // wx.navigateTo({
                url: './pages/jumpOutYiban/jumpOutYiban',
            })
        }
    },
    onHide: function () {

    },
    onError: function (msg) {

    },
    //options(path,query,isEntryPage)
    onPageNotFound: function (options) {

    },
});
