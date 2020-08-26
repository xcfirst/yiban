// pages/searchActivity/searchActivity.js 
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "searchText": "",
    "hasText": false,
    "searchResult": [],
  },
  onLoad: function (options) {

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
    request_1({
      url: "https://liveforjokes.icu/searchActivity", 
      data: { search },
    })
      .then(res => {
        console.log(res.data.obj);
        if (res.statusCode == 200) {
          let searchResult = res.data.obj;
          let i;
          if (searchResult != null) {
            for (i = 0; i < searchResult.length; i++) {
              if (searchResult[i].label == null || searchResult[i].label == "")
                searchResult[i].hasLabel = false;
              else
                searchResult[i].hasLabel = true;
              if (searchResult[i].search == null || searchResult[i].search == "")
                searchResult[i].hasSearch = false;
              else
                searchResult[i].hasSearch = true;
              if (searchResult[i].searchBefore == "" && searchResult[i].searchAfter == "")
                searchResult[i].onlySearch = true;
              else
                searchResult[i].onlySearch = false;
              if(searchResult[i].type == 1){
                searchResult[i].urlType="../activity/activity?activityId="
              }
              else if(searchResult[i].type == 2){
                searchResult[i].urlType="../prove/prove?certificateId="
              }
            }
          }
          this.setData({
            searchResult
          })
        }
      })
  },
})