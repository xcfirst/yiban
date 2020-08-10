// pages/team/team.js
import { request } from "../../request/index.js";
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
    request({
      // url: "http://liveforjokes.icu:8864/getGroups",
      url: "http://localhost:8864/getGroups",
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
          console.log(hasGroup);
          this.setData({
            groupArray,
            hasGroup
          })
        }
      })
  },
})