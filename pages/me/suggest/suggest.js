import { request } from "../index.js";

Page({
  data:{
    text:'',
    images:[],
    path:[],
    idx:null
  },

  inputText:function(e){
    this.setData({text:e.detail.value});
  },

  updata:function(){
    var that = this;
    var images = that.data.images;
    wx.showModal({
      content: '确认提交？',
      cancelColor: '#17c3b2',
      cancelText: '取消',
      confirmText: '确认',
      confirmColor: '#ff5e5b',
      success(res){
        if(res.confirm){
          that.setData({idx: 0});
          var promise = new Promise((resolve,reject)=>{
            //上传图片
            if(images.length!=0){
              that.upload();
            }
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
            console.log(res)
            request({
              url: 'https://liveforjokes.icu/sendMail',
              data:{ text:that.data.text,picture:that.data.path},
              method:"POST",
              header:{
                "Content-Type": "application/x-www-form-urlencoded"
              },
            })
            .then(res =>{
              if(res.data.msg == "success"){
                wx.showToast({
                  title: '反馈成功',
                  icon:'success',
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
      title: '正在上传反馈信息',
    })
    wx.uploadFile({
      header:{
        'content-type': 'multipart/form-data',
        'accept': 'application/json'
      },
      url: 'https://liveforjokes.icu/savePicture',
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
        });
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
  },
})