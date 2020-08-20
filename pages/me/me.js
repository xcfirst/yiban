import { request } from "index.js";

Page({
  data: {
    userid:getApp().globalData.userId,
    name: '',
    id:"",
  },

  onLoad:function(e){
    var that = this;
    var data = this.data;
    request({
      url: "http://liveforjokes.icu:8800/getStudentDetail",
      data:{id:data.userid},
    }).then(res=>{
      this.setData({name:res.data.obj.name})
    })
  },
  onShow: function(){
    this.setData({
      avatar: wx.getStorageSync('avatar') || 'https://yunlaiwu0.cn-bj.ufileos.com/teacher_avatar.png',
    })
  },

  navToIdentity:function(e){
    var path = '';
    if(this.data.userid==1){
      path = "auditList";
    }
    else{
      path = "identity";
    }
    wx.navigateTo({
      url: '/pages/me/'+path+'/'+path,
    })
  },

  navTo: function(e){
   wx.navigateTo({
     url: '/pages/me/'+e.currentTarget.dataset.target+'/'+e.currentTarget.dataset.target,
   })
  }
})