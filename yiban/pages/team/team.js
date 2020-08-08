// pages/team/team.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // "groupArray": [
    //   {
    //     "id": 1,
    //     "activityId": 1,
    //     "userId": 1,
    //     "text": "易班轻应用开发大赛，没组队的看看我！\n大一，公管，上学期绩点4+。参加过丁颖杯，创益，\n案例分析等学术比赛。会写稿，编辑，组织，写策\n划书，剪视频，office……兼职广告优化师。\n态度方面：能把普通的讨论题写成小论文……认真\n仔细，说到做到，不鸽不拖。\n记忆力上：我上学期有的科目只花了几个小时，\n考了90+……目前也在每天背单词。\n希望能找到志同道合的伙伴，一起冲冲冲！",
    //     "publishTime": "2020-07-18T14:22:27.000+0000",
    //     "date": "4天前"
    //   },
    //   {
    //     "id": 2,
    //     "activityId": 1,
    //     "userId": 2,
    //     "text": "组队2，易班轻应用开发大赛，没组队的看看我！\n大一，公管，上学期绩点4+。参加过丁颖杯，创益，\n案例分析等学术比赛。会写稿，编辑，组织，写策\n划书，剪视频，office……兼职广告优化师。\n态度方面：能把普通的讨论题写成小论文……认真\n仔细，说到做到，不鸽不拖。\n记忆力上：我上学期有的科目只花了几个小时，\n考了90+……目前也在每天背单词。\n希望能找到志同道合的伙伴，一起冲冲冲！",
    //     "publishTime": "2020-07-18T14:22:27.000+0000",
    //     "date": "6天前"
    //   },
    //   {
    //     "id": 3,
    //     "activityId": 3,
    //     "userId": 1,
    //     "text": "英语技能大赛，没组队的看看我！\n大一，公管，上学期绩点4+。参加过丁颖杯，创益，\n案例分析等学术比赛。会写稿，编辑，组织，写策\n划书，剪视频，office……兼职广告优化师。\n态度方面：能把普通的讨论题写成小论文……认真\n仔细，说到做到，不鸽不拖。\n记忆力上：我上学期有的科目只花了几个小时，\n考了90+……目前也在每天背单词。\n希望能找到志同道合的伙伴，一起冲冲冲！",
    //     "publishTime": "2020-07-18T14:22:27.000+0000",
    //     "date": "2天前"
    //   },
    //   {
    //     "id": 4,
    //     "activityId": 3,
    //     "userId": 2,
    //     "text": "英语技能大赛2，没组队的看看我！\n大一，公管，上学期绩点4+。参加过丁颖杯，创益，\n案例分析等学术比赛。会写稿，编辑，组织，写策\n划书，剪视频，office……兼职广告优化师。\n态度方面：能把普通的讨论题写成小论文……认真\n仔细，说到做到，不鸽不拖。\n记忆力上：我上学期有的科目只花了几个小时，\n考了90+……目前也在每天背单词。\n希望能找到志同道合的伙伴，一起冲冲冲！",
    //     "publishTime": "2020-07-18T14:22:27.000+0000",
    //     "date": "7天前"
    //   },
    // ],
    "groupArray":[],
    "hasGroup": true,
    "activityId":null
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
      // header: {
      //         'content-type': 'application/json' // 默认值
      //       //   //这里修改json为text   json的话请求时会返回400(bad request)
      //         // 'content-type': 'application/text'
      //         // 'content-type': 'json'
      //         // "Content-Type":"json"
      //       //   'content-type': "text/plain"
      //       },
      data: {activityId},
    })
      .then(res => {
        console.log(res.data.obj);
        let groupArray = res.data.obj;
        let hasGroup = this.data.hasGroup;
        if(groupArray == null){
          hasGroup=false
        }
        // let nowGroupLength = groupArray.length;
        this.setData({
          groupArray,
          // nowGroupLengh,
          hasGroup
        })
      })
  },
})