// pages/M_c_content/M_c_content.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var arr = [];
    for (let i in options){
      arr.push(options[i])
    }
    const id = arr[0];      
    this.getInformation(id); 

  },

  getInformation(id){
    request({url: '/getInformation',data: { id }})
    .then(result=>{
      this.setData({
        information:result.data.obj
      })
      console.log(result.data.obj)
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

  },
})