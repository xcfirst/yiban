// pages/teamcontent/teamcontent.js
import { request_1 } from "../../request/index_1.js";
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
    request_1({
      url: "http://liveforjokes.icu:8800/getGroup",
      // url: "http://localhost:8800/getGroup",
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