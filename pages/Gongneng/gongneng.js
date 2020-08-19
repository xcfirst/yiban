// pages/Gongneng/gongneng.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Leaving:"您有一条新的留言信息",
    publishManagements:[],
    functionObj:{},
    schedules:[],	             //近期活动
    information:[],                  //消息中心
    messages:[],		                 //留言
    Name:[
      { name:"发布"},
      { name:"日程表"},
      { name:"收藏"},
      { name:"足迹"},
    ]
  },
  
  userId:1,
  areablur:function(){
    this.setData({
      auto_height:false
    })
  },
  areafocus:function(){
    this.setData({
      auto_height: true
    })
  },

  content:function(e){
    // console.log(e)
    let data = JSON.stringify(this.data.M_c[e.currentTarget.dataset.index]);
    wx.navigateTo({
      url: '/pages/M_c_content/M_c_content?data='+data//跳转
    })
  },

  Leaving:function(e){
    // console.log(e)
    let data = JSON.stringify(this.data.L_m[e.currentTarget.dataset.index]);
    wx.navigateTo({
      url: '/pages/L_m_content/L_m_content?data='+data//跳转
    })
  },

  goNext1(){
    wx.navigateTo({
      url: "/pages/Message_center/M_c"//跳转
    })
  },

  goNext2(){
    wx.navigateTo({
      url: "/pages/Leaving_message/L_m"//跳转
    })
  },

  goNext3(){
    wx.navigateTo({
      url: "/pages/Release_management/R_m"//跳转
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCatas();
  },

  getCatas(){
    //promise请求
    request({url:"/returnImages"})
    .then(result=>{
      this.setData({
        cataList:result.data.message
      })
      console.log(result)
    })
  },

  
  getFunction(){
    const userId = this.userId
    request({url:"/getFunction",data:{userId}})
    .then(result=>{
      this.setData({
        schedules:result.data.obj.schedules, 
        information:result.data.obj.information,  
        messages:result.data.obj.messages,
      })
      console.log(result)
    })
  },
  
  getPublish(){
    const userId = this.userId
    request({
      url: '/getPublish',
      data:{userId}
    })
    .then(res =>{
      console.log(res);
      this.setData({
        publishManagements:res.data.obj
      })
    })
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
    this.getFunction();
    this.getPublish();
  },
})