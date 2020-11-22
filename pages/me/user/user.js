import { request } from "../index.js";

Page({
  data:{
    id:getApp().globalData.userId,
    name:'',
    studentNum:'',
    /*grade:'',
    major:'',
    phoneNum:'',
    wechatNum:'',
    yb_userid:'',*/
    isFinished: false
  },
  
  onLoad:function(e){
    var that = this;
    var data = this.data;
    this.setData({id:getApp().globalData.userId})
    request({
      url: "https://liveforjokes.icu/getUser",
      data:{userId:data.id},
    }).then(res=>{
      if(res.data.msg=="success"){
        console.log(res);
        var obj = res.data.obj;
        that.setData({
          studentNum:obj.studentNumber,
          name:obj.name,
          /*name:obj.name,
          grade:obj.grade,
          major:obj.major,
          phoneNum:obj.phoneNumber,
          wechatNum:obj.wechatNumber,
          yb_userid:obj.yb_userid*/
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

  updata: function(){
    var data = this.data;
    var isFinished = this.data.isFinished;
      if(data.name&&data.studentNum){
        isFinished = true
      }
      if(isFinished){
        wx.showModal({
          content: '确认提交信息吗？若有已认证身份则认证将解绑',
          cancelColor: '#17c3b2',
          cancelText: '取消',
          confirmText: '确认',
          confirmColor: '#ff5e5b',
          success(res){
            if(res.confirm){
              request({
                url: "https://liveforjokes.icu/getUser",
                method:"POST",
                data:{ userId:data.id, studentNumber:data.studentNum, name:data.name},
      
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
                    icon: 'none',
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