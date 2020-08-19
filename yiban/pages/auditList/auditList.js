// pages/auditList/auditList.js
import { request } from "../../request/index.js";
Page({
  data: {
    "auditArray": []
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getAudit();
  },
  getAudit() {
    request({
      url: "http://liveforjokes.icu:8800/getAuthenticationMessage",
      // url: "http://localhost:8800/getAuthenticationMessage",
    })
      .then(res => {
        console.log(res.data.obj);
        if (res.statusCode == 200) {
          let auditArray = res.data.obj;
          this.setData({
            auditArray
          })
        }
      })
  },

})