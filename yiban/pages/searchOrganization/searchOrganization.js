// pages/searchOrganization/searchOrganization.js
import { request } from "../../request/index.js";
Page({
  data: {
    "searchText":"",
    "hasText":false,
    "searchResult":[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleCancle(){
    wx.navigateBack({
      url:"../organization/organization"
    })
  },
  handleInput(e){
    // console.log(e.detail.value);
    let searchText = e.detail.value;
    let hasText;
    this.setData({
      searchText
    })
    if(searchText!=""){
      hasText = true;
    }
    clearTimeout(this.TimeId);
    const that = this;
    this.TimeId=setTimeout(() => {
        if(hasText==true){
          that.qsearch(searchText);
        }else{
          this.setData({
            searchResult:[]
          })
        }
    }, 300);
  },
  qsearch(searchText) {
    let search = searchText;
    request({
      // url: "http://liveforjokes.icu:8864/searchAssociation",
      url: "http://localhost:8864/searchAssociation",
      data: {search},
    })
      .then(res => {
        // console.log(res.data.obj);
        this.setData({
          searchResult:res.data.obj
        })
      })
  },
 
  

  
})