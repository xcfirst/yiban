// pages/searchOrganization/searchOrganization.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "searchText": "",
    "hasText": false,
    "searchResult": [],
    "hasSearchList":true
  },
  onLoad: function (options) {

  },

  handleCancle() {
    wx.navigateBack({
      url: "../organization/organization"
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
      url: "https://liveforjokes.icu/searchAssociation",
      data: { search },
    })
      .then(res => {
        // console.log(res.data.obj);
        if (res.statusCode == 200) {
          let hasSearchList;
          if(res.data.obj == null || res.data.obj.length == 0){
            hasSearchList = false;
          }else{
            hasSearchList = true;
          }
          this.setData({
            searchResult: res.data.obj,
            hasSearchList
          })
        }
      })
  },

  


})