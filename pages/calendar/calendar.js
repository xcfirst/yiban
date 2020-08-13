// pages/calendar/calendar.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Richeng:[],
    userId:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchedule()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  getSchedule(){
    const userId = this.data.userId
    request({
      url: '/getSchedule',
      data: {userId},
    })
    .then(res=>{
      this.setData({
        Richeng:res.data.obj
      })
      console.log(this.data.Richeng);
    })
      
  }
})