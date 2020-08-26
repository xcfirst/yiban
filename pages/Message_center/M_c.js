// pages/Message_center/M_c.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  "userId":null,
  data: {
    information:[],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var app = getApp();
    let userId = app.globalData.userId;
    this.setData({
      userId
    })
    this.getInformations()
  },

  getInformations(){
    const userId = this.data.userId
    request({url:"/getInformations",data:{userId}})
    .then(result=>{
      this.setData({
        information:result.data.obj
      })
      console.log(result.data.obj)
    })
  },

  press(e){
    console.log(e);
    const id = e.currentTarget.dataset.index 
    // request({
    //   url: 'https://liveforjokes.icu/getInformation',
    //   data: { id },
    // }).then(res=>{
    //   console.log(res);
    // })
  }
})