// pages/teamcontent/teamcontent.js
import { request } from "../../request/index.js";
Page({
  data: {
    "groupArray": {},
    "id": "",
    "nowActivityId": "",
    "nowTeamText": {}
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      nowActivityId: options.activityId,
      id: options.id
    })
    this.groupArray();
  },
  groupArray() {
    const id = this.data.id;
    request({
      // url: "http://liveforjokes.icu:8864/getGroup",
      url: "http://localhost:8864/getGroup",
      data: { id },
    })
      .then(res => {
        console.log(res.data.obj);
        if (res.statusCode == 200) {
          let nowTeamText = res.data.obj;
          this.setData({
            nowTeamText
          })
        }
      })
  },

})