// pages/FieldOrganization/FieldOrganization.js
import { request_1 } from "../../request/index_1.js";
Page({
  data: {
    "nowAssociation": [],
    "type": ""
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
    request_1({
      url: "http://liveforjokes.icu:8800/getAssociationByType",
      // url: "http://localhost:8800/getAssociationByType",
      data: { type },
    })
      .then(res => {
        console.log(res.data.obj);
        if (res.statusCode == 200) {
          let nowAssociation = res.data.obj;
          this.setData({
            nowAssociation
          })
        }

      })
  },

})