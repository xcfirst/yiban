// pages/footprint/footprint.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:1,
    footprint:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBrowsed();
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

  getBrowsed(){
    const userId = this.data.userId
    request({
      url: '/getBrowsed',
      data:{userId}
    })
    .then(res =>{
      console.log(res);
      this.setData({
        footprint:res.data.obj
      })
    })
      
  }
})