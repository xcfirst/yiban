// pages/Message_center/M_c.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  userId:4,
  data: {
    information:[],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInformations()
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  getInformations(){
    const userId = this.userId
    request({url:"/getInformations",data:{userId}})
    .then(result=>{
      this.setData({
        information:result.data.obj
      })
      console.log(result)
    })
  }
})