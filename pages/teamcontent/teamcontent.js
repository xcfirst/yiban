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
      url: "https://liveforjokes.icu/getGroup",
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
  onShareAppMessage: function () {
    if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/teamcontent/teamcontent?id='+id,
      success: function (res) { }
    }
  }
})