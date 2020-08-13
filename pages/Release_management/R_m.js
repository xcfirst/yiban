// pages/Release_management/R_m.js
import { request } from "../../request/gongneng.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Publish:[],
    userId:1,
    hidden: 'hidden',
    icon_choose:'icon-zidingyikexuankuang',
    id:[],
    type:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPublish();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getPublish(){
    const userId = this.data.userId
    request({
      url: '/getPublish',
      data:{userId}
    })
    .then(res =>{
      console.log(res);
      this.setData({
        Publish:res.data.obj
      })
    })
  },

  sure:function(){
    this.setData({
      hidden:''
    })
  },

  cancel:function(){
    this.setData({
      hidden:'hidden'
    })
    let data = this.data.Publish
    for (var index in data) {
      let select = "Publish[" + index  + "].select"
      this.setData({
        [select]:false
      })
     } 
   },

  choose:function (e) {
    console.log(e);
    let idx = e.currentTarget.dataset.index
    let select = "Publish[" + idx  + "].select"
    console.log(idx);
    this.setData({
      [select]:!this.data.Publish[idx].select
    })
  },

  delete:function(e){
    console.log(e),
    wx.showModal({
      title: '确认删除吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#18c3b3',
      confirmText: '确认',
      confirmColor: '#ff5e5b',
      success: (result) => {
        if (result.confirm) {
            wx.showToast({
              title: '删除成功'
            });
          console.log('用户点击确定')
          console.log('删除')
          let data = this.data.Publish
          for (var index in data) {
              if(data[index].select){
                this.data.id.push(this.data.Publish[index].id);
                this.data.type.push(this.data.Publish[index].type)
            }
          }
          let id = this.data.id.toString()
          let type = this.data.type.toString()

          request({
            url: "/deletePublish",
            data: { id,type },
          }).then(res=>{
            console.log(res);
            this.getPublish();
            this.setData({
              id:[],
              type:[]
            })
          })
	      } else if (e.cancel){
	      console.log('用户点击取消')
        }
      },
      fail: () => {},
      complete: () => {}
    });
  }
})