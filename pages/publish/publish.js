// pages/publish/publish.js
import { request } from "../../request/gongneng.js";
Page({
  /**
   * 页面的初始数据
   */

  data: {
    i:0,
    cmpimages: [],
    cmptempFilePaths: [],
    label_test: 0,
    text_test: 0,
    title_test: 0,
    address_test: 0,
    images: [],
    tempFilePaths: [],
    temp: 0,
    mes: {},
    date: "2020-01-01 13:37",
    disabled: false, //设置是否能点击 false可以 true不能点击
    startDate: "2020-01-01 00:00",
    endDate: "2555-05-12 12:38",
    placeholder1: "请选择活动开始时间",
    placeholder2: "请选择活动结束时间",
    startTime: "",
    endTime: "",
    title: "", //标题
    address: "", //地点
    time: "", //时间
    text: "", //正文
    hidden2: "", //活动时间
    maxTextLen: 500,
    userId: null,
    auto_height: true, //高度自适应
    Label: [],
    input1: "",
    input2: "",
    //分类导航
    list_1: [
      {
        id: 1,
        src: "change0 iconfont icon-xuanze-copy",
        name: "活动",
        ischeck: true,
      },
      {
        id: 2,
        src: "image_6 iconfont icon-xuanze2",
        name: "活动证明",
        ischeck: false,
      },
    ],

    //活动标签
    div_active: [
      {
        id: 1,
        name: "宣讲会",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "宣讲会",
      },
      {
        id: 2,
        name: "比赛",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "比赛",
      },
      {
        id: 3,
        name: "志愿活动",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "志愿活动",
      },
      {
        id: 4,
        name: "讲座",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "讲座",
      },
      {
        id: 5,
        name: "电影节",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "电影节",
      },
      {
        id: 6,
        name: "娱乐活动",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "娱乐活动",
      },
      {
        id: 7,
        name: "校级",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "校级",
      },
      {
        id: 8,
        name: "院级",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "院级",
      },
      {
        id: 9,
        name: "综测加分",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "综测加分",
      },
      {
        id: 10,
        name: "志愿时",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "志愿时",
      },
      {
        id: 11,
        name: "其他",
        bg_color: "#ffffff",
        selected: false,
        name_eng: "其他",
      },
    ],
  },

  areablur: function () {
    this.setData({
      auto_height: false,
    });
  },
  areafocus: function () {
    this.setData({
      auto_height: true,
    });
  },

  //活动标签
  hocol: function (res) {
    //console.log(res)
    let index = res.currentTarget.dataset.index;
    //背景颜色获取
    let bg_temp = "div_active[" + index + "].bg_color";
    // 更改
    if (this.data.div_active[index].bg_color == "#ffffff") {
      this.setData({
        [bg_temp]: "#fce19c",
      });
    } else {
      this.setData({
        [bg_temp]: "#ffffff",
      });
    }
    let string = "div_active[" + res.currentTarget.dataset.index + "].selected";
    // const checkedicon = "div_active[" + e.target.dataset.index + "].selected";
    console.log(
      !this.data.div_active[res.currentTarget.dataset.index].selected
    );
    this.setData({
      [string]: !this.data.div_active[res.currentTarget.dataset.index].selected,
    });
    let detailValue = this.data.div_active
      .filter((item) => {
        return item.selected == true;
      })
      .map((item) => {
        return item.name_eng;
      });
    console.log("所有选中的值为：", detailValue);
    this.setData({
      Label: detailValue,
    });
  },

  change: function (res) {
    console.log(res);
    let idx = res.currentTarget.dataset.index;
    let idx1;
    if (idx == 0) {
      this.setData({
        hidden2: "",
      });
      idx1 = idx + 1;
    } else {
      this.setData({
        hidden2: "hidden",
      });
      idx1 = idx - 1;
    }
    // [string0]: !this.data.list_1[idx].ischeck,
    let check0 = "list_1[" + idx + "].ischeck";
    let check1 = "list_1[" + idx1 + "].ischeck";
    let src0 = "list_1[" + idx + "].src";
    let src1 = "list_1[" + idx1 + "].src";
    var check_0 = res.currentTarget.dataset.check0;
    var check_1 = res.currentTarget.dataset.check1;

    if (check_0 == false && check_1 == false) {
      this.setData({
        [check0]: !this.data.list_1[idx].ischeck,
        [src0]: "change0 iconfont icon-xuanze-copy",
      });
    } else if (check_0 == true && check_1 == false) {
      if (idx == 0)
        this.setData({
          [check0]: !this.data.list_1[idx].ischeck,
          [src0]: "image_6 iconfont icon-xuanze2",
        });
      else if (idx == 1)
        this.setData({
          [check0]: !this.data.list_1[idx].ischeck,
          [src0]: "change0 iconfont icon-xuanze-copy",
          [check1]: !this.data.list_1[idx1].ischeck,
          [src1]: "image_6 iconfont icon-xuanze2",
        });
    } else if (check_0 == false && check_1 == true) {
      if (idx == 0)
        this.setData({
          [check0]: !this.data.list_1[idx].ischeck,
          [src0]: "change0 iconfont icon-xuanze-copy",
          [check1]: !this.data.list_1[idx1].ischeck,
          [src1]: "image_6 iconfont icon-xuanze2",
        });
      else
        this.setData({
          [check0]: !this.data.list_1[idx].ischeck,
          [src0]: "image_6 iconfont icon-xuanze2",
        });
    }
  },

  compress:function(e){
    var that = this;
    wx.compressImage({
      src: e[that.data.i],
      quality: 20,
      success:res => {
        var cmpimages = this.data.cmpimages.concat(res.tempFilePath);
    this.setData({ cmpimages:cmpimages, i:that.data.i+1 ,cmptempFilePaths:cmpimages});
      },
      complete:res=>{
        if(that.data.i<e.length){
          this.compress(e);
        }
      }
    })
  },

  //图片处理
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
  compress:function(e){
    var that = this;
    wx.compressImage({
      src: e[that.data.i],
      quality: 20,
      success:res => {
        var cmpimages = this.data.cmpimages.concat(res.tempFilePath);
        this.setData({cmpimages:cmpimages, i:that.data.i+1});
      },
      complete:res=>{
        if(that.data.i<e.length){
          this.compress(e);
        }
      }
    })
  },

  chooseImage:function(e){
    var that = this;
    wx.chooseImage({
      sizeType:['compressed','original'],
      sourceType:['album','camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths);
        this.setData({
          images:images
        })
        new Promise((resolve,reject)=>{
          var time = 0;
          that.setData({i:0})
          that.compress(res.tempFilePaths);
          var interval = setInterval(function(){
            if(res.tempFilePaths.length==0||that.data.i == res.tempFilePaths.length){
              clearInterval(interval);
              resolve("success");
            }
            if(time > res.tempFilePaths.length*3000){
              clearInterval(interval);
              reject("err")
            }
            time+=500;
          },500)
        }).then (res=>{
          this.setData({idx:0})
          this.checkImages();
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
    var cmpimages = this.data.cmpimages;
    var idx = e.currentTarget.dataset.idx;
    console.log(idx);
    images.splice(idx,1);
    cmpimages.splice(idx,1);
    this.setData({images: images, cmpimages:cmpimages})
  },
  
  checkImages:function(e){
    var images = this.data.cmpimages;
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
  bianji() {
    this.setData({
      hidden1: "",
    });
  },

  sure() {
    if (this.data.title != "") {
      wx.showModal({
        title: "确认发布吗？",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#18c3b3",
        confirmText: "确认",
        confirmColor: "#ff5e5b",
        success: (result) => {
          if (result.confirm) {
            const userId = this.data.userId;
            // console.log(userId);
            request({
              url: "/saveActivityAuthentication",
              data: { userId },
            }).then((res) => {
              console.log(res);
              const result = res.data.msg;
              if (result === "success") {
                const image = this.data.images.toString();
                const title = this.data.title;
                const text = this.data.text;
                const startTime = this.data.startTime;
                const endTime = this.data.endTime;
                const address = this.data.address;
                const label = this.data.Label.toString();
                const userId = this.data.userId;
                const checked1 = this.data.list_1[0].ischeck;
                const checked2 = this.data.list_1[1].ischeck;
                let content = title + text + label + address;

                request({
                  url: "/msgSecCheck",
                  data: { content },
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  method: "POST",
                }).then((res) => {
                  let event = res.data.event;
                  if (event === 0) {
                    if (
                      title &&
                      text &&
                      startTime &&
                      endTime &&
                      address &&
                      label &&
                      userId &&
                      checked1
                    ) {
                      this.publish();
                      wx.showToast({
                        title: "发布成功",
                        duration: 3000,
                        mask: true,
                      });
                      setTimeout(function () {
                        wx.navigateBack(2);
                      }, 2000);
                    } else if (
                      title &&
                      text &&
                      label &&
                      userId &&
                      checked2 &&
                      image
                    ) {
                      this.publish();
                      wx.showToast({
                        title: "发布成功",
                        duration: 1500,
                        mask: true,
                      });
                      setTimeout(function () {
                        wx.navigateBack(2);
                      }, 2000);
                    } else {
                      wx.showModal({
                        content: "请将信息填写完整",
                        showCancel: false,
                        confirmText: "确定",
                        confirmColor: "#18c3b3",
                      });
                    }
                  } else {
                    wx.showModal({
                      content: "含有违规内容，请重新填写",
                      showCancel: false,
                      confirmText: "确定",
                      confirmColor: "#18c3b3",
                    });
                  }
                });
              } else {
                wx.showModal({
                  content: "没有权限，请先认证",
                  showCancel: false,
                  confirmText: "确定",
                  confirmColor: "#18c3b3",
                });
              }
            });
          } else {
            console.log("用户点击取消");
          }
        },
      });
    }
  },

  publish() {
    const picture = this.data.images.toString();
    const title = this.data.title;
    const text = this.data.text;
    const startTime = this.data.startTime;
    const endTime = this.data.endTime;
    const address = this.data.address;
    const label = this.data.Label.toString();
    const userId = this.data.userId;

    if (this.data.list_1[0].ischeck) {
      request({
        url: "/activity/saveActivity",
        method: "POST",
        header: { "content-type": "application/x-www-form-urlencoded" },
        data: {
          title,
          label,
          text,
          startTime,
          endTime,
          address,
          userId,
          picture,
        },
      }).then((res) => {
        // console.log(res)
      });
    } else {
      const activityTitle = title;
      const activityContent = text;
      const fileUrl = picture;
      request({
        url: "/certificate/saveActivityCertificate",
        method: "POST",
        header: { "content-type": "application/x-www-form-urlencoded" },
        data: { activityTitle, activityContent, label, fileUrl, userId },
      }).then((res) => {
        console.log(res.data.obj);
      });
    }
  },

  textInput(e) {
    this.setData({ text: e.detail.value });
  },

  titleInput(e) {
    this.setData({ title: e.detail.value });
  },

  timeInput(e) {
    this.setData({ time: e.detail.value });
  },

  addressInput(e) {
    this.setData({ address: e.detail.value });
  },

  onPickerChange1: function (e) {
    console.log(e.detail);
    this.setData({
      startTime: e.detail.dateString,
      input1: "input",
    });
  },

  onPickerChange2: function (e) {
    console.log(e.detail);
    this.setData({
      endTime: e.detail.dateString,
      input2: "input",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    let userId = app.globalData.userId;
    this.setData({
      userId,
    });
    request({
      url: "/saveActivityAuthentication",
      data: { userId },
    }).then((res) => {
      console.log(res);
      const result = res.data.msg;
      if (result === "success") {
      } else {
        wx.showModal({
          content: "你还没有发布权限，请先认证，可到 我的->身份认证 进行确认",
          showCancel: false,
          confirmText: "确定",
          confirmColor: "#18c3b3",
          success: (result) => {
            if (result.confirm) {
              setTimeout(function () {
                wx.navigateBack(2);
              }, 1000);
            }
          },
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
