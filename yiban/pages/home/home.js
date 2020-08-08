// pages/home/home.js
import { request } from "../../request/index.js";
Page({
  data: {
    "isClick": false,
    "isActive": "one",
    "userId":1,
    // "activityArray": [
    //   {
    //     "activity": {
    //       "id": 1,
    //       "address": "钉钉直播",
    //       "title": "易班轻应用开发大赛宣讲会易班轻应用开发大赛",
    //       "text": "或许你有着天马行空的想象力\n却没有一个展示的舞台；\n或许向往着大神的华丽操作\n却没有一个交流的平台\n又或许你希望和小伙伴们一同留下大学璀璨的一步\n却没有一个实现的机会\n别担心\n第十六届IT文化节——\n第四届易班轻应用开发大赛来啦！！！\n\n也许你对本次比赛有很多问号，这也别担心，我们将会在5月4号晚八点举行宣讲会，届时你不仅可以了解到更多的比赛资讯，还能够获得综测的活动加分哦，还可参加抽奖获得神秘礼品！5月4日晚八点，钉钉直播等你来约！", "activityStartTime": "5月4日晚",
    //       "userId": 1,
    //       "startTime": "2020-07-06 02:00:00",
    //       "endTime": "2020-07-09 00:00:00",
    //       "label": [
    //         "宣讲会",
    //         "综测加分",
    //         "校级",
    //         "综测加分",
    //         "综测加分"
    //       ],
    //       "picUrl": [
    //         'https://ae01.alicdn.com/kf/H068de38c4c7043e2a0e2df6b427d6d7bO.jpg',
    //         'https://ae01.alicdn.com/kf/H607fc964ae6845e08a84bafbcf16b747g.jpg',
    //         'https://ae01.alicdn.com/kf/H3b7d899a2e7745e68808a0ce4185f529b.jpg',
    //         'https://ae01.alicdn.com/kf/Haf7e28145ab64d3284f1d2f83b76fa7fE.jpg'
    //       ],
    //       "dayToNow": "3天前",
    //       "buildingTime": "2020-07-16T14:52:49.000+0000"
    //     },
    //     "browsed": null
    //   },
    //   {
    //     "activity": {
    //       "id": 2,
    //       "address": "钉钉直播",
    //       "title": "易班轻应用开发大赛",
    //       "text": "或许你有着天马行空的想象力\n却没有一个展示的舞台；\n或许向往着大神的华丽操作\n却没有一个交流的平台\n又或许你希望和小伙伴们一同留下大学璀璨的一步\n却没有一个实现的机会\n别担心\n第十六届IT文化节——\n第四届易班轻应用开发大赛来啦！！！\n\n也许你对本次比赛有很多问号，这也别担心，我们将会在5月4号晚八点举行宣讲会，届时你不仅可以了解到更多的比赛资讯，还能够获得综测的活动加分哦，还可参加抽奖获得神秘礼品！5月4日晚八点，钉钉直播等你来约！", "activityStartTime": "5月4日晚",
    //       "userId": 2,
    //       "startTime": "2020-07-06 02:00:00",
    //       "endTime": "2020-07-09 00:00:00",
    //       "label": [
    //         "比赛",
    //         "综测加分"
    //       ],
    //       "picUrl": [
    //         'https://ae01.alicdn.com/kf/H068de38c4c7043e2a0e2df6b427d6d7bO.jpg',
    //         'https://ae01.alicdn.com/kf/H607fc964ae6845e08a84bafbcf16b747g.jpg',
    //         'https://ae01.alicdn.com/kf/H3b7d899a2e7745e68808a0ce4185f529b.jpg',
    //         'https://ae01.alicdn.com/kf/Haf7e28145ab64d3284f1d2f83b76fa7fE.jpg'
    //       ],
    //       "dayToNow": "8天前",
    //       "buildingTime": "2020-07-16T14:52:49.000+0000"
    //     },
    //     "browsed": null
    //   },
    //   {
    //     "activity": {
    //       "id": 3,
    //       "address": "钉钉直播",
    //       "title": "英语技能大赛",
    //       "text": "英语技能大赛之——或许你有着天马行空的想象力\n却没有一个展示的舞台；\n或许向往着大神的华丽操作\n却没有一个交流的平台\n又或许你希望和小伙伴们一同留下大学璀璨的一步\n却没有一个实现的机会\n别担心\n第十六届IT文化节——\n第四届易班轻应用开发大赛来啦！！！\n\n也许你对本次比赛有很多问号，这也别担心，我们将会在5月4号晚八点举行宣讲会，届时你不仅可以了解到更多的比赛资讯，还能够获得综测的活动加分哦，还可参加抽奖获得神秘礼品！5月4日晚八点，钉钉直播等你来约！", "activityStartTime": "5月4日晚",
    //       "userId": 2,
    //       "startTime": "2020-07-06 02:00:00",
    //       "endTime": "2020-07-09 00:00:00",
    //       "label": [
    //         "比赛",
    //         "综测加分",
    //         "校级"
    //       ],
    //       "picUrl": [
    //         'https://ae01.alicdn.com/kf/H068de38c4c7043e2a0e2df6b427d6d7bO.jpg',
    //         'https://ae01.alicdn.com/kf/H607fc964ae6845e08a84bafbcf16b747g.jpg',
    //         'https://ae01.alicdn.com/kf/H3b7d899a2e7745e68808a0ce4185f529b.jpg',
    //         'https://ae01.alicdn.com/kf/Haf7e28145ab64d3284f1d2f83b76fa7fE.jpg'
    //       ],
    //       "dayToNow": "10天前",
    //       "buildingTime": "2020-07-16T14:52:49.000+0000"
    //     },
    //     "browsed": null
    //   },
    //   {
    //     "activity": {
    //       "id": 4,
    //       "address": "钉钉直播",
    //       "title": "三下乡宣讲会",
    //       "text": "三下乡之——或许你有着天马行空的想象力\n却没有一个展示的舞台；\n或许向往着大神的华丽操作\n却没有一个交流的平台\n又或许你希望和小伙伴们一同留下大学璀璨的一步\n却没有一个实现的机会\n别担心\n第十六届IT文化节——\n第四届易班轻应用开发大赛来啦！！！\n\n也许你对本次比赛有很多问号，这也别担心，我们将会在5月4号晚八点举行宣讲会，届时你不仅可以了解到更多的比赛资讯，还能够获得综测的活动加分哦，还可参加抽奖获得神秘礼品！5月4日晚八点，钉钉直播等你来约！", "activityStartTime": "5月4日晚",
    //       "userId": 3,
    //       "startTime": "2020-07-06 02:00:00",
    //       "endTime": "2020-07-09 00:00:00",
    //       "label": [
    //         "宣讲会",
    //         "综测加分",
    //         "校级"
    //       ],
    //       "picUrl": [
    //         'https://ae01.alicdn.com/kf/H068de38c4c7043e2a0e2df6b427d6d7bO.jpg',
    //         'https://ae01.alicdn.com/kf/H607fc964ae6845e08a84bafbcf16b747g.jpg',
    //         'https://ae01.alicdn.com/kf/H3b7d899a2e7745e68808a0ce4185f529b.jpg',
    //         'https://ae01.alicdn.com/kf/Haf7e28145ab64d3284f1d2f83b76fa7fE.jpg'
    //       ],
    //       "dayToNow": "15天前",
    //       "buildingTime": "2020-07-16T14:52:49.000+0000"
    //     },
    //     "browsed": true
    //   },
    // ]
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
      // header: {
      //         'content-type': 'application/json' // 默认值
      //       //   //这里修改json为text   json的话请求时会返回400(bad request)
      //         // 'content-type': 'application/text'
      //         // 'content-type': 'json'
      //         // "Content-Type":"json"
      //       //   'content-type': "text/plain"
      //       },
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