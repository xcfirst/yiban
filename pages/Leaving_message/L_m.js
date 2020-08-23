// pages/Message_center/M_c.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  "userId":null,
  data: {
    messages:[],
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
    this.getMessages()
  },

  getMessages(){
    const userId = this.data.userId
    request({url:"/getMessages",data:{userId}})
    .then(result=>{
      this.setData({
        messages:result.data.obj
      })
      console.log(result.data.obj)
    })
  }
})