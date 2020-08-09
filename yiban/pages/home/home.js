// pages/home/home.js
import { request } from "../../request/index.js";
Page({
  data: {
    "isClick": false,
    "isActive": "one",
    "userId":1,
    "activityArray":[]
  },

  onLoad: function (options) {
      // this.getActivityArray();
  },
  onShow: function () {
    this.getActivityArray();
  },
  getActivityArray() {
    const userId = this.data.userId;
    request({
      // url: "http://www.liveforjokes.icu:8864/index/activity",
      url: "http://localhost:8864/index/activity",
      data: {userId},
    })
      .then(res => {
        console.log(res.data.obj);
        let activityArray = [];
        let i,j;
        for(i=0,j=0; i<res.data.obj.length; i++,j++){
          activityArray[j] = res.data.obj[i];
        }
        this.setData({
          activityArray
        })
      })
  },

  handlebar(e) {
    const isActive = e.currentTarget.dataset.judge
    this.setData({
      isActive
    })
  },
})