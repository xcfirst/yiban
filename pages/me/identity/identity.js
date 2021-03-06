import { request } from "../index.js";
Page({
  data:{
    userId: getApp().globalData.userId,
    name:null,
    studentNum:null,
    type:'',
    association:null,
    worker:[],
    principal:[],
  },

  onLoad:function(e){
    var that = this;
    var worker = that.data.worker;
    var principal = that.data.principal;
    this.setData({userId:getApp().globalData.userId})
    var association = null;
    request({
      url: "https://liveforjokes.icu/getAuthentication",
      data:{ userId:that.data.userId },
    })//获取数据然后分类
    .then(res =>{
      console.log(res)
      association = res.data.obj;
      for(var i=0; association&&i<association.length; i++){
        if(association[i].level==1){
          worker.push(association[i])
        }
        else{
          principal.push(association[i])
        }
      }
      that.setData({association:association ,worker:worker,principal:principal})
    })

    request({
      url: "https://liveforjokes.icu/getUser",
      data:{userId:that.data.userId},
    }).then(res=>{
      if(res.data.msg=="success"){
        console.log(res);
        var obj = res.data.obj;
        if(obj != null){
          that.setData({
            studentNum:obj.studentNumber,
            name:obj.name,
          })
        }
      }
    })
  },

  navTo:function(){
    var that = this;
    var type = '';
    console.log(this.data.name);
    if(that.data.name != null){
      wx.showModal({
        content:'请选择要申请的类型',
        cancelText: '工作人员',
        cancelColor: '#17c3b2',
        confirmColor: '#ff5e5b',
        confirmText: '负责人',
        success(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../identity/principal/principal?type='+type,
            })
          }
          else if(res.cancel){
            wx.navigateTo({
              url: '../identity/worker/worker?type='+type,
            })
          }
        }
      })
    }
    else{
      wx.showToast({
        title: '未填写真实信息，请先前往个人信息完善信息后再提交身份认证',
        icon:'none',
        duration: 2500
      })

    }
  },
  removeIdentity:function(e){
    var idx = e.currentTarget.dataset.idx;
    var level = e.currentTarget.dataset.level;
    var that = this;
    var worker = that.data.worker;
    var principal = that.data.principal;
    var name;
    if(level == 1){
      name = that.data.worker[idx].associationName;
      worker.splice(idx,1);
    }
    else{
      name = that.data.principal[idx].associationName;
      principal.splice(idx,1);
    }
    wx.showModal({
      content: '确认删除身份吗？',
      cancelColor: '#17c3b2',
      cancelText: '取消',
      confirmText: '确认',
      confirmColor: '#ff5e5b',
      success(res){
        if(res.confirm){
          request({
            url: "https://liveforjokes.icu/deleteAuthentication",
            data:{ userId:that.data.userId, level:level, associationName:name},
          })
          .then(res =>{
            if(res.data.msg=="success"){
              wx.showToast({
                icon:"success",
                title: '删除成功',
                duration:2000
              })
              that.setData({worker:worker, principal: principal});
            }
            else{
              wx.showToast({
                title: '删除失败，请稍后重试',
                icon:"none",
                duration:2000
              })
            }
          })
        }
      }
    })
  }
})