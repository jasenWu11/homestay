// pages/mine/mine.js
var username = '';
var head_url = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    head_url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    username = wx.getStorageSync("username");
    head_url = wx.getStorageSync("picurl");
    this.setData({
      username: username,
      head_url: head_url
    })
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
  toorder: function (event) {
    var that = this;
    var index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../order/order?index=' + index
    });
  },
  call_service: function () {
    console.log('拨打客服电话')
    wx.makePhoneCall({
      phoneNumber: '13509234754',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }
})