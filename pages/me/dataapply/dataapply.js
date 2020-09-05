const app = getApp()
import { request } from "../index.js";
Page({

  data:{
    userId: app.globalData.userId,
    id:null,
    name:'',
    introduce:'',
    href:'',
    type:'',
    images:[],
    cmpimages:[],
    path:[],
    isNew:'',
    associationList:null,
    idx:null
  },
  onLoad: function(e){
    var that = this;
    this.setData({userId:getApp().globalData.userId})
    var url = '';
    wx.showModal({
      content: '您要进行资料更新修改还是添加新的社团组织？',
      cancelColor: '#17c3b2',
      cancelText: '更新资料',
      confirmText: '添加资料',
      confirmColor: '#ff5e5b',
      success(res){
        if(res.cancel){
          that.setData({isNew:false});
          url = 'https://liveforjokes.icu/updateAssociationAuthentication';
        }
        else if(res.confirm){
          that.setData({isNew:true});
          url ='https://liveforjokes.icu/insertAssociationAuthentication';
        }
      },
      complete(res){
        request({
          url: url,
          data:{ userId:app.globalData.userId },
        })
        .then(res =>{
          console.log(res)
          if(res.data.msg != "success"){
            wx.showToast({
              icon:"none",
              title: "没有权限，请先认证",
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
            that.setData({associationList:res.data.obj})
            wx.navigateTo({
              url: '../association/association?type=更新&list='+JSON.stringify(that.data.associationList)+'&isNew='+JSON.stringify(that.data.isNew),
            })
          }
        })
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

  chooseType:function(){
    wx.navigateTo({
      url: '../dataapply/type/type',
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
        for(var i=0; i<res.tempFilePaths.length; i++){
          wx.compressImage({
            src: res.tempFilePaths[i],
            quality: 25,
            success:res => {
              var cmpimages = this.data.cmpimages.concat(res.tempFilePath);
              this.setData({cmpimages:cmpimages});
            }
          })
        }
        this.setData({idx:0})
        this.checkImages();
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

  tagRemove:function(e){
    var that = this;
    wx.showModal({
      content: '确认移除重新选择吗？',
      cancelText: '取消',
      cancelColor: '#17c3b2',
      confirmColor: '#ff5e5b',
      confirmText: '确认',
      success(res){
        if(res.confirm){
          that.navTo();
        }
      }
    })
  },

  typeRemove:function(){
    wx.showModal({
      content: '确认移除重新选择吗？',
      cancelText: '取消',
      cancelColor: '#17c3b2',
      confirmColor: '#ff5e5b',
      confirmText: '确认',
      success(res){
        if(res.confirm){
          wx.navigateTo({
            url: './type/type',
          })
        }
      }
    })
  },

  inputName:function(e){
    this.setData({name: e.detail.value});
  },
  inputIntro:function(e){
    this.setData({introduce:e.detail.value});
  },
  inputHref:function(e){
    this.setData({href: e.detail.value});
  },

  checkImages:function(e){
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
      url: 'https://liveforjokes.icu/imgSecCheck',
      filePath: images[idx],
      name: 'media',
      formData: {
        method: 'POST',
        index:idx
      },
      success(res){
        console.log(res)
        var event = JSON.parse(res.data).event
        if(event==87014){
          console.log("???")
          wx.hideLoading()
          wx.showModal({
            title: "图片含有违规内容，请重新选择",
            comfirmText:'知道了',
            confirmColor:'#ff5e5b',
            showCancel:false,
            success(res){
              if(res.confirm){
                that.setData({images:[],cmpimages:[]})
              }
            }
          })
        }
        else{
          if(event!=0){
            wx.showModal({
              title: "图片过大，请选择1m以内的图片",
              comfirmText:'知道了',
              confirmColor:'#ff5e5b',
              showCancel:false,
          })
        }
        }
      },
      complete(res){
        that.setData({idx:that.data.idx+1})
          if(that.data.idx < images.length){
            that.checkImages();
          }
          else{
            wx.hideLoading()
          }
        },
      })
  },

  updata:function(){
    var that = this;
    var url;
    var images = that.data.images;
    const id = this.data.id;
    const name = this.data.name;
    const introduce = this.data.introduce;
    const href = this.data.href;
    const type = this.data.type;
    var content = name+href+introduce;
    request({
      url: 'https://liveforjokes.icu/msgSecCheck',
      method:"POST",
      data:{ content:content },
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
    .then(res =>{
      console.log(res)
      if(res.statusCode==200){
        if(res.data.msg != "ok"){
          wx.showModal({
            title: "含有违规内容，请重新填写",
            comfirmText:'知道了',
            confirmColor:'#ff5e5b',
            showCancel:false,
            })
          }
          else{
            wx.showModal({
              content: '确认提交申请吗？',
              cancelText: '取消',
              cancelColor: '#17c3b2',
              confirmColor: '#ff5e5b',
              confirmText: '确认',
              success(res){
                if(res.confirm){
                  if(that.data.isNew){
                    url = 'https://liveforjokes.icu/insertAssociation'
                  }
                  else{
                    url = 'https://liveforjokes.icu/updateAssociation'
                  }
                  that.setData({idx: 0});
                  var promise = new Promise((resolve,reject)=>{
                    //上传图片
                    if(that.data.images.length!=0){
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
                    console.log(that.data.path)
                    request({
                      url: url,
                      method:"POST",
                      data:{ id:id, name:name, introduce:introduce, picture:that.data.path, href:href, type:type },
                      header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                    })
                    .then(res =>{
                      if(res.data.msg == "success"){
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
            });
          }
      }
    })
  },
  navTo: function(e){
    wx.navigateTo({
      url: '../association/association?type=更新&list='+JSON.stringify(this.data.associationList)+'&isNew='+JSON.stringify(this.data.isNew)
    })
  },

})