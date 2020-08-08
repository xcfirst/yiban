// pages/searchActivity/searchActivity.js
import { request } from "../../request/index.js";
Page({
  data: {
    "searchText": "",
    "hasText": false,
    // "searchResult":[
    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"校级",
    //     "hasLabel":true,
    //     "text1":"",
    //     "text":"",
    //     "text2":"",
    //     "hasText":false
    //   },
    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"",
    //     "hasLabel":false,
    //     "text1":"华南农业大学数学与信息学院第12届易班轻应用",
    //     "text":"开发",
    //     "text2":"大赛宣讲会将在钉钉直播，届时会公布比赛赛程以及更多注意事项",
    //     "hasText":true
    //   },
    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"",
    //     "hasLabel":false,
    //     "text1":"易班轻应用",
    //     "text":"开发",
    //     "text2":"大赛宣讲会将在钉...",
    //     "hasText":true
    //   },
    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"",
    //     "hasLabel":false,
    //     "text1":"",
    //     "text":"",
    //     "text2":"",
    //     "hasText":false
    //   },
    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"校级",
    //     "hasLabel":true,
    //     "text1":"",
    //     "text":"",
    //     "text2":"",
    //     "hasText":false
    //   },
    //   {
    //     "title":"易班轻应用开发大赛宣讲会易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"",
    //     "hasLabel":false,
    //     "text1":"易班轻应用",
    //     "text":"开发",
    //     "text2":"大赛宣讲会将在钉...",
    //     "hasText":true
    //   },
    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"",
    //     "hasLabel":false,
    //     "text1":"",
    //     "text":"",
    //     "text2":"",
    //     "hasText":false
    //   }
    // ],
    "searchResult": [],
    // "searchResult":[
    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"",
    //     "hasLabel":false,
    //     "text1":"",
    //     "text":"华南农业大学数学与信息学院第12届易班轻应用开发",
    //     "text2":"",
    //     "hasText":true
    //   },

    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"",
    //     "hasLabel":false,
    //     "text1":"...aaaaa",
    //     "text":"bbb",
    //     "text2":"aaaaaaa...",
    //     "hasText":true
    //   },
    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"",
    //     "hasLabel":false,
    //     "text1":"...aaaaa",
    //     "text":"bbb",
    //     "text2":"aaaaaaaaaaaaa",
    //     "hasText":true
    //   },
    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"",
    //     "hasLabel":false,
    //     "text1":"...aaaaa",
    //     "text":"bbb",
    //     "text2":"aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    //     "hasText":true
    //   },
    //   {
    //     "title":"易班轻应用开发大赛宣讲会",
    //     "date":"2天前",
    //     "label":"",
    //     "hasLabel":false,
    //     "text1":"",
    //     "text":"",
    //     "text2":"",
    //     "hasText":true
    //   }
    // ]
  },
  onLoad: function (options) {
    // let searchResult = this.data.searchResult;
    // searchResult[0].hasnew = true;
    // this.setData({
    //   searchResult
    // })
  },
  handleCancle() {
    wx.navigateBack({
      url: "../home/home"
    })
  },
  handleInput(e) {
    // console.log(e.detail.value);
    let searchText = e.detail.value;

    let hasText;
    this.setData({
      searchText
    })
    if (searchText != "") {
      hasText = true;
    }
    clearTimeout(this.TimeId);
    const that = this;
    this.TimeId = setTimeout(() => {
      if (hasText == true) {
        that.qsearch(searchText);
      } else {
        this.setData({
          searchResult: []
        })
      }
    }, 300);
  },
  qsearch(searchText) {
    let search = searchText;
    request({
      // url: "http://liveforjokes.icu:8864/searchActivity", 
      url: "http://localhost:8864/searchActivity",
      data: { search },
    })
      .then(res => {
        console.log(res.data.obj);
        let searchResult = res.data.obj;
        let i;
        if (searchResult != null) {
          for (i = 0; i < searchResult.length; i++) {
            if (searchResult[i].label == null)
              searchResult[i].hasLabel = false;
            else
              searchResult[i].hasLabel = true;
            if (searchResult[i].search == null)
              searchResult[i].hasSearch = false;
            else
              searchResult[i].hasSearch = true;
            if(searchResult[i].searchBefore=="" && searchResult[i].searchAfter=="")
              searchResult[i].onlySearch=true;
            else
              searchResult[i].onlySearch=false; 
          }
        }




        this.setData({
          searchResult
        })
      })
  },

})