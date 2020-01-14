// pages/message/message.js
const app = getApp();
var message_data = require("../../js/place.js").message_data;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message_data: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getmessage_list();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getmessage_list:function(){
    var that = this;
    that.setData({
      message_data: []
    })
    wx.request({
      url: app.globalData.URL + '/chat/list.do',
      header: {
        "Cookie": wx.getStorageSync("cookieKey"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log("返回的结果" + JSON.stringify(res));
        var status = res.data.status;
        if (status == 21000) {
          that.login_timeout();
        } else if (status == 0) {
          var message_list = res.data.data;
          that.setData({
            message_data: message_list
          })
        }else{
          var msg = res.data.msg;
          wx.showToast({
            title: msg,
            image: '/images/icons/wrong.png'
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
  login_timeout: function () {
    wx.showModal({
      title: '登录超时',
      content: '请重新登录',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../index/index'
          });
          console.log('跳转回登录')
        } else {
          url: '../index/index'
          wx.navigateTo({
            url: '../index/index'
          });
          console.log('跳转回登录')
        }
      }
    })
  }, 
  to_chat: function (event) {
    var that = this;
    var channel = event.currentTarget.dataset.channel;
    wx.navigateTo({
      url: '../chat/chat?channel=' + channel,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})