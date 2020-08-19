//app.js
import { request } from "./request/index.js";
App({
    globalData: {
        "hasLogin": false,
        "yibanHasLogin": false,
        "userId": null
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
