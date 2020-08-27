import { request } from "../index.js";

Page({
  data:{
    id:getApp().globalData.userId,
    username:'',
    name:'',
    studentNum:'',
    grade:'',
    major:'',
    phoneNum:'',
    wechatNum:'',
    isFinished: false
  },
  
  onLoad:function(e){
    var that = this;
    var data = this.data;
    this.setData({id:getApp().globalData.userId})
    request({
      url: "https://liveforjokes.icu/getStudentDetail",
      data:{id:data.id},
    }).then(res=>{
      if(res.data.msg=="success"){
        var obj = res.data.obj;
        that.setData({
          studentNum:obj.studentNumber,
          username:obj.yb_realname,
          name:obj.name,
          grade:obj.grade,
          major:obj.major,
          phoneNum:obj.phoneNumber,
          wechatNum:obj.wechatNumber
        })
      }
    })
  },



  inputName: function(e){
    this.setData({name:e.detail.value})
  },
  inputStudentNum: function(e){
    this.setData({studentNum:e.detail.value})
  },
  inputGrade: function(e){
    this.setData({grade:e.detail.value})
  },
  inputMajor: function(e){
    this.setData({major:e.detail.value})
  },
  inputPhone: function(e){
    this.setData({phoneNum:e.detail.value})
  },
  inputWx: function(e){
    this.setData({wechatNum:e.detail.value})
  },

  updata: function(){
    var data = this.data;
    var isFinished = this.data.isFinished;
      if(data.name&&data.wechatNum&&data.grade&&data.major&&data.phoneNum&&data.wechatNum){
        isFinished = true
      }
      if(isFinished){
        request({
          url: "https://liveforjokes.icu/submitIdentityInformation",
          method:"POST",
          data:{ id:data.id, studentNumber:data.studentNum, name:data.name, username:data.username, grade:data.grade, major:data.major, phoneNumber:data.phoneNum ,wechatNumber:data.wechatNum},

        }).then(res=>{
          console.log(res)
          if(res.statusCode==200){
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success:(res=>{
                setTimeout(function(){
                  wx.navigateBack({
                    delta:1
                  })
                },2000)
              })
            })
          }
          else{
            wx.showToast({
              title: '提交失败，请稍后重试',
              duration: 2000,
              success:(res=>{
                setTimeout(function(){
                  wx.navigateBack({
                    delta:1
                  })
                },2000)
              })
            })
          }
        })
      }
      else{
        wx.showToast({
          title: '未填写完成',
          icon: 'none',
          duration:2000
        })
      }
  }
})