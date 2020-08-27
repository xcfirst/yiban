import {request} from "../index.js";
const app = getApp();
Page({
  data:{
    type:'',
    isNew:null,
    association:null,
  },
  //association=''时选择社团类型
  onLoad:function(e){
    if(e.type == '更新'){
      this.setData({association:JSON.parse(e.list), isNew:JSON.parse(e.isNew)});
    }
    else{
      this.setData({type:e.type, isNew:e.isNew});
      var type = this.data.type
      if(this.data.type){
        request({
          url: 'https://liveforjokes.icu/getAssociationByType',
          data:{ type },
        })
        .then(res =>{
          this.setData({type:type,association:res.data.obj})
        })
      }
    }
  },
  navTo:function(e){
    var type = e.currentTarget.dataset.type;
    request({
      url: 'https://liveforjokes.icu/getAssociationByType',
      data:{ type },
    })
    .then(res =>{
      this.setData({type:type, association:res.data.obj})
    })
  },
  navBack:function(e){
    var that = this;
    var name = e.currentTarget.dataset.target;
    var page = getCurrentPages();
    var prepage = page[page.length-2];
    if(!that.data.isNew){
      request({
        url: 'https://liveforjokes.icu/getAssociationByType/getAssociationByName',
        data:{ name },
      }).then(res =>{
        var data = res.data.obj;
        console.log(data)
        prepage.setData({
          id:data.id, path:data.picture, images:data.picture, name:data.name, introduce:data.introduce,href:data.href, type:data.type, associationList:that.data.association
        });
        wx.navigateBack({
          delta:1
        })
      })
    }
    else{
      prepage.setData({
        name:name,
      });
      wx.navigateBack({
        delta:1
      })
    }
  },
})