// pages/Message_center/M_c.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  userId:1,
  data: {
    messages:[],
  },

  userId:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessages()
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  getMessages(){
    const userId = this.userId
    request({url:"/getMessages",data:{userId}})
    .then(result=>{
      this.setData({
        messages:result.data.obj
      })
      console.log(result)
    })
  }
})