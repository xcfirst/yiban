import { request } from "index.js";

Page({
  data: {
    userid:getApp().globalData.userId,
    name: '',
    id:"",
    level:false,
    avatar:'',
  },

  onLoad:function(e){

    this.setData({userid:getApp().globalData.userId})
  },
  onShow:function(e){
    var data = this.data;
    this.setData({userid:getApp().globalData.userId})
    request({
      url: "https://liveforjokes.icu/getStudentDetail",
      data:{id:data.userid},
    }).then(res=>{
      this.setData({name:res.data.obj.nickName,avatar:res.data.obj.avatarUrl})
    })
  },
  
  navToIdentity:function(e){
    var that = this;
    var userid = this.data.userid;
    var path = '';
    request({
      url: "https://liveforjokes.icu/getLevel",
      data:{userId:userid},
    }).then(res=>{
      this.setData({level:res.data.obj})
      if(that.data.level){
        path = "auditList";
      }
      else{
        path = "identity";
      }
      wx.navigateTo({
        url: '/pages/me/'+path+'/'+path,
      })
    })
  },

  navTo: function(e){
   wx.navigateTo({
     url: '/pages/me/'+e.currentTarget.dataset.target+'/'+e.currentTarget.dataset.target,
   })
  },
  onShareAppMessage: function () {
    return {
      title: '转发',
      path: '/pages/me/me',
      success: function (res) { }
    }
  }
})