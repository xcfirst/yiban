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
    var that = this;
    var data = this.data;
    request({
      url: "http://liveforjokes.icu:8800/getStudentDetail",
      data:{id:data.userid},
    }).then(res=>{
      this.setData({name:res.data.obj.name,avatar:res.data.obj.yb_userhead})
    })
  },


  navToIdentity:function(e){
    var that = this;
    var userid = this.data.userid;
    var path = '';
    request({
      url: "http://liveforjokes.icu:8800/getLevel",
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
  }
})