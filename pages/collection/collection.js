// pages/collection/collection.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Collected:[],
    CollectedCertificate:[],
    "userId":null,
  },

  

  Leaving_Collected: function(e) {
    console.log(e),
    wx.showModal({
      title: '确认取消收藏吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#18c3b3',
      confirmText: '确认',
      confirmColor: '#ff5e5b',
      success: (result) => {
        if (result.confirm) {
            wx.showToast({
              title: '取消成功'
            });
          console.log('用户点击确定')
          console.log(e.currentTarget.dataset.index)
          var index = e.currentTarget.dataset.index;
          
          const userId = this.data.userId;
          let activityId = this.data.Collected[index].id
          console.log(activityId)
          request({
            url: "/getCollectedActivity/deleteCollectedActivity",
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            data: { userId, activityId },
          }).then(res=>{
            console.log(res);
            this.getCollectedActivity();
          })
	      } else if (e.cancel){
	      console.log('用户点击取消')
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },


  Leaving_CollectedCertificate: function(e) {
    console.log(e),
    wx.showModal({
      title: '确认取消收藏吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#18c3b3',
      confirmText: '确认',
      confirmColor: '#ff5e5b',
      success: (result) => {
        if (result.confirm) {
            wx.showToast({
              title: '取消成功'
            });
          console.log('用户点击确定')
          console.log(e.currentTarget.dataset.index)
          var index = e.currentTarget.dataset.index;
          
          const userId = this.data.userId;
          let certificateId = this.data.CollectedCertificate[index].id

          request({
            url: '/certificate/deleteCertificate',
            data: { userId ,certificateId },
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            }
            }).then(res=>{
              this.getCollectedCertificate();
            }) 
	      } else if (e.cancel){
	      console.log('用户点击取消')
        }
      },
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    let userId = app.globalData.userId;
    this.setData({
      userId
    })
    this.getCollectedActivity();
    this.getCollectedCertificate();
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

  getCollectedActivity(){
    const userId = this.data.userId;
    request({url:"/getCollectedActivity",data:{userId}})
    .then(result=>{
      this.setData({
        Collected:result.data.obj
      })
      console.log(result.data.obj)
    })
  },

  getCollectedCertificate(){
    const userId = this.data.userId;
    request({
      url:"/certificate/getCollectedCertificate",
      method: 'POST',   
      header: {'content-type':'application/x-www-form-urlencoded'},
      data:{ userId },
    })
    .then(result=>{
      this.setData({
        CollectedCertificate:result.data.obj
      })
      console.log(result.data.obj)
    })
  },
})