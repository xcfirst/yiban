// pages/FieldOrganization/FieldOrganization.js
import { request } from "../../request/index.js";
Page({
  data: {
    "nowAssociation":[],
    "type":""
  },
  onLoad: function (options) {
    console.log(options);
    let type = options.type;
    this.setData({
      type
    })
    this.getAssociation();
  },
  getAssociation() {
    const type = this.data.type;
    request({
      // url: "http://liveforjokes.icu:8864/getAssociationByType",
      url: "http://localhost:8864/getAssociationByType",
      data: {type},
    })
      .then(res => {
        console.log(res.data.obj);
        let nowAssociation = res.data.obj;
        this.setData({
          nowAssociation
        })
      })
  },
  
})