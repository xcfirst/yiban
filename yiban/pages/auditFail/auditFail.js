// pages/auditFail/auditFail.js
Page({
  data: {
    "inputtext":""
  },
  onLoad: function (options) {

  },

  handleInput(e) {
    const inputtext = e.detail.value;
    this.setData({
      inputtext
    })
  },
  handsubmit(e) {
    // const that = this;
    let publish;
    if (this.data.inputtext != "") {
      publish = true;
    }
    if (publish==true) {
      wx.showModal({
        title: '确认不通过审核并发送信息吗？',
        cancelColor: "#17c3b2",
        confirmColor: "#ff5e5b",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            // that.submitGroup();
            // wx.navigateBack(2);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})