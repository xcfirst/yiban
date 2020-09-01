// pages/footprint/footprint.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "userId":null,
    footprint:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var app = getApp();
    let userId = app.globalData.userId;
    this.setData({
      userId
    })
    this.getBrowsed();
  },

  getBrowsed(){
    const userId = this.data.userId
    request({
      url: '/getBrowsed',
      data:{userId}
    })
    .then(res =>{
      console.log(res.data.obj);
      this.setData({
        footprint:res.data.obj
      })
    })
      
  },

  goNext:function(e){
    let num = e.currentTarget.dataset.type
    let id  = e.currentTarget.dataset.id
    console.log(e.currentTarget.dataset.type);
    if(num == 1)wx.navigateTo({
      url: "../leaving_publish/leaving_publish?activityId="+id
    });
    else if(num == 2)
    wx.navigateTo({
      url: "../prove/prove?certificateId="+id
    });
  }
})