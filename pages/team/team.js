// pages/team/team.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "groupArray": [],
    "hasGroup": true,
    "activityId": null
  },
  onLoad: function (options) {
    let activityId = options.activityId;
    this.setData({
      activityId
    })
    // this.groupArray();

  },
  onShow: function () {
    this.groupArray();
  },
  groupArray() {
    const activityId = this.data.activityId;
    request_1({
      url: "http://liveforjokes.icu:8800/getGroups",
      // url: "http://localhost:8800/getGroups",
      data: { activityId },
    })
      .then(res => {
        console.log(res.data.obj);
        if (res.statusCode == 200) {
          let groupArray = res.data.obj;
          let hasGroup = true;
          if (groupArray == null) {
            hasGroup = false
          }
          this.setData({
            groupArray,
            hasGroup
          })
        }
      })
  },
})