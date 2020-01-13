// pages/collect/collect.js
const app = getApp();
var collect_data = require("../../js/place.js").house_data;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect_data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getcollect_list();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getcollect_list: function() {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/house/collect/list.do',
      header: {
        "Cookie": wx.getStorageSync("cookieKey")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log("返回的结果" + JSON.stringify(res));
        var status = res.data.status;
        if (status == 21000) {
          that.login_timeout();
        } else if (status == 0) {
          var collectlist = res.data.data;
          for(var i in collectlist){
            var houseimage = collectlist[i].houseimage;
            collectlist[i].first_image = JSON.parse(houseimage)[0];
          }
          that.setData({
            collect_data: collectlist
          })
        }
      },
      fail: function (res) {
        console.log("返回错误" + res);
      },
      complete: function (res) {
        console.log("启动请求列表" + res);
      },
    });
  },
  tohouse_deatil: function (event) {
    var hid = event.currentTarget.dataset.hid;
    var hname = event.currentTarget.dataset.hname;
    var price = event.currentTarget.dataset.price;
    wx.navigateTo({
      url: '/pages/room/room?hid=' + hid + '&hname=' + hname + '&price=' + price,
      success: function (res) { },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  }
})