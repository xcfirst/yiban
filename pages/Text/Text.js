//index.js
//获取应用实例
const app = getApp()
import { request } from "../../request/gongneng.js";
import regeneratorRuntime, { async } from "../../lib/runtime/runtime"
Page({
  data: {
    images:[],
    tempFilePaths:[],
    temp:0,
    mes:{}
  },

  /**
 * 日历控件绑定函数 
 * 点击日期返回
 */
  onPickerChange: function (e) {
    console.log(e.detail);
    this.setData({
      date: e.detail.dateString
    })
  },

  popSuccessTest: function () {
    wx.showToast({
      title: '成功提示弹窗',
      icon: '',     //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
      duration: 2000,      //停留时间
    })
  },
  popMaskTest: function () {
    wx.showToast({
      title: '带蒙层的弹窗',     
      duration: 2000,    
      mask:true    //是否有透明蒙层，默认为false 
                   //如果有透明蒙层，弹窗的期间不能点击文档内容 
    })
  },
  popTest: function(){
    wx.showToast({
      title: '纯文字弹窗',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 2000     
    })  
  },
  popCustomIcon: function () {
    wx.showToast({
      title: '自定义图标弹窗',
      image: '../../static/image/icon.png',  //image的优先级会高于icon
      duration: 2000     
    })
  },
  popConfirm: function(){

    wx.showModal({
      content: '确定取消吗',
      showCancel: false,
      confirmText: '确定',
      confirmColor: '#3CC51F',
    });
      
  },
  popLoading: function(){
    wx.showLoading({
      title:'加载中...'
    });
  },
  popSelect: function(){
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        console.log(res);
      }
    })
  },

  //图片处理
  chooseImage(e) {
    var that = this
    // console.log(e)
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        // console.log(res);
        const images = that.data.tempFilePaths.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        const images1 = images.length <= 3 ? images : images.slice(0, 3)
        this.setData({
          tempFilePaths : images1
        }) 
        that.upload();
        that.setData({
          temp: that.data.tempFilePaths.length//用来解决 for 循环比 异步 快
        })

      }
    })
  },

  removeImage(e) {
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    tempFilePaths.splice(idx,1)
    this.setData({
      tempFilePaths: tempFilePaths
    })
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.tempFilePaths
    wx.previewImage({
      tempFilePaths: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },

  upload:function(){
    for (var i = this.data.temp; i < this.data.tempFilePaths.length; i++) {
      // console.log("000")
      this.upload_file(this.data.tempFilePaths[i])
    }
  },

  upload_file: function (filepath) {
    var that = this;
    wx.uploadFile({
      header: {
        'content-type': 'multipart/form-data',
        'accept': 'application/json',
      },
      url: 'http://liveforjokes.icu:8864/savePicture',
      filePath: filepath,
      name: 'file',
      formData: {
        method: 'POST'   //请求方式
      },
      success:function(res) {
        console.log(res)
        that.setData({
          mes:JSON.parse(res.data),
          images: that.data.images.concat(JSON.parse(res.data).obj)//把字符串解析成对象

        })
        console.log(res.data);
        console.log(that.data.images)
        // console.log(that.data.images.length + "**********")
        // wx.showToast({
        //   title: 'success',
        // })
      },
      fail: function (res) {
        wx.showToast({
          title: '图片加载失败',
        })
      }
    
    })
  }
})