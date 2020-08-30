// pages/auditList/auditList.js
import { request_1 } from "../../../request/index_1.js";
Page({
  data: {
    "auditArray": [],
    "auditArrayLength":true
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getAudit();
  },
  getAudit() {
    request_1({
      url: "https://liveforjokes.icu/getAuthenticationMessage",
    })
      .then(res => {
        console.log(res.data.obj);
        if (res.statusCode == 200) {
          let auditArray = res.data.obj;
          let auditArrayLength;
          if(auditArray == null || auditArray.length == 0){
            auditArrayLength = false;
          }else{
            auditArrayLength = true;
          }
          this.setData({
            auditArray,
            auditArrayLength
          })
        }
      })
  },

})