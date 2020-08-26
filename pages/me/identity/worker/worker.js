// pages/identity/worker/worker.js
import { request } from "../../index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    userId:getApp().globalData.userId,
    name:'',
    level:1,
    images:[],
    path:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({type:options.type,userId:getApp().globalData.userId})
  },
  onShow:function(){
    this.setData({images:[], path:[]})
    if(this.data.type!="组织"){
      this.setData({type:''})
    }
  },
  navTo:function(e){
    wx.navigateTo({
      url: '../../association/association?type='+this.data.type,
    })
  },

  updata:function(e){
    var that = this;
    var images = that.data.images;
    wx.showModal({
      content: '确认提交申请？',
      cancelColor: '#17c3b2',
      cancelText: '取消',
      confirmText: '确认',
      confirmColor: '#ff5e5b',
      success(res){
        if(res.confirm){
          that.setData({idx: 0});
          var promise = new Promise((resolve,reject)=>{
            //上传图片
            that.upload();
            var time = 0;
            var interval = setInterval(function(){
              if(images.length==0||that.data.idx == images.length){
                clearInterval(interval);
                resolve("success");
              }
              if(time > images.length*3000){
                clearInterval(interval);
                reject("err")
              }
              time+=500;
            },500)
          })      
          promise.then(res=>{
            console.log(that.data.path)
            request({
              url: 'http://liveforjokes.icu:8800/sendAuthenticationMessage',
              method:"POST",
              header:{
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data:{ userId:that.data.userId, level:that.data.level, associationName:that.data.name, picture:that.data.path},
            })
            .then(res =>{
              if(res.data.event == 1){
                wx.showToast({
                  title: '提交成功',
                  duration:2000,
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
                  icon:'none',
                  duration:2000
                })
              }
              console.log(res)
            })
          })
          
        }
      }
    })
  },
  upload:function(){
    var images = this.data.images;
    var that = this;
    var idx = that.data.idx
    wx.showLoading({
      title: '正在上传',
    })
    wx.uploadFile({
      header:{
        'content-type': 'multipart/form-data',
        'accept': 'application/json'
      },
      url: 'http://liveforjokes.icu:8800/savePicture',
      filePath: images[idx],
      name: 'file',
      formData: {
        method: 'POST'
      },
      success(res){
        var path = that.data.path.concat(JSON.parse(res.data).obj);
        that.setData({path:path})
        console.log(res)
      },
      complete(res){
        that.setData({idx:that.data.idx+1})
        if(that.data.idx < images.length){
          that.upload();
        }
        else{
          wx.hideLoading()
        }

      }
    })
  },
  chooseImage:function(e){
    wx.chooseImage({
      sizeType:['compressed','original'],
      sourceType:['album','camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths);
        this.setData({
          images:images
        })
      },
    })
  },

  previewImage:function(e){
    var images = this.data.images;
    var idx = e.currentTarget.dataset.idx;
    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },

  remove:function(e){
    var images = this.data.images;
    var idx = e.currentTarget.dataset.idx;
    console.log(idx);
    images.splice(idx,1);
    this.setData({images: images})
  }
})