// pages/publish/publish.js
import { request } from "../../request/gongneng.js";
Page({
  /**
   * 页面的初始数据
   */

  data: {
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

  //图片处理
  chooseImage(e) {
    var that = this;
    // console.log(e)
    wx.chooseImage({
      sizeType: ["original", "compressed"], //可选择原图或压缩后的图片
      sourceType: ["album", "camera"], //可选择性开放访问相册、相机
      success: (res) => {
        // console.log(res);
        const images = that.data.tempFilePaths.concat(res.tempFilePaths);
        // 限制最多只能留下3张照片
        // const images1 = images.length <= 1000 ? images : images.slice(0, 1000);
        this.setData({
          tempFilePaths: images,
        });
        that.upload();
        that.setData({
          temp: that.data.tempFilePaths.length, //用来解决 for 循环比 异步 快
        });
      },
    });
  },

  removeImage(e) {
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    var images = that.data.images;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx;
    // splice  第一个参数是下表值  第二个参数是删除的数量
    tempFilePaths.splice(idx, 1);
    images.splice(idx, 1);
    this.setData({
      tempFilePaths: tempFilePaths,
      images: images,
    });
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx;
    const images = this.data.tempFilePaths;
    wx.previewImage({
      tempFilePaths: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    });
  },

  upload: function () {
    for (var i = this.data.temp; i < this.data.tempFilePaths.length; i++) {
      // console.log("000")
      this.upload_file(this.data.tempFilePaths[i]);
    }
  },

  upload_file: function (filepath) {
    var that = this;
    wx.uploadFile({
      header: {
        "content-type": "multipart/form-data",
        accept: "application/json",
      },
      url: "https://liveforjokes.icu/savePicture",
      filePath: filepath,
      name: "file",
      formData: {
        method: "POST", //请求方式
      },
      success: function (res) {
        console.log(res);
        that.setData({
          mes: JSON.parse(res.data),
          images: that.data.images.concat(JSON.parse(res.data).obj), //把字符串解析成对象
        });
        console.log(res.data);
        console.log(that.data.images);
        // console.log(that.data.images.length + "**********")
        // wx.showToast({
        //   title: 'success',
        // })
      },
      fail: function (res) {
        wx.showToast({
          title: "图片加载失败",
        });
      },
    });
  },

  bianji() {
    this.setData({
      hidden1: "",
    });
  },

  sure() {
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
