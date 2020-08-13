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

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getInformations()
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
  },

  press(e){
    console.log(e);
    const id = e.currentTarget.dataset.index 
    // request({
    //   url: 'http://liveforjokes.icu:8864/getInformation',
    //   data: { id },
    // }).then(res=>{
    //   console.log(res);
    // })
  }
})