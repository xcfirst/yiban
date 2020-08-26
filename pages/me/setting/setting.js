import { request } from "../index.js";

Page({
  data:{
    userId:getApp().globalData.userId,
    isSubcribed:true,
  },

  onLoad:function(e){
    this.setData({userId:getApp().globalData.userId})
    request({
      url:"https://liveforjokes.icu/getIsOpen",
      data:{userId:this.data.userId},
    }).then(res=>{
      if(res.data.msg=="success"){
        console.log(res)
        this.setData({isSubcribed:res.data.obj})
      }
    })
  },

  change:function(){
    request({
      url:"https://liveforjokes.icu/updateOpen",
      method:"POST",
      data:{userId:this.data.userId},
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).then(res=>{
      if(res.data.msg=="success"){
        this.setData({isSubcribed:!this.data.isSubcribed})
      }
    })
  }
})