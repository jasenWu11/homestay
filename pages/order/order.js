// pages/order/order.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var order_data = require("../../js/place.js").order_data;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部订单", "有效订单", "待支付订单"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    order_data: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.getorder_list();
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
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  getorder_list: function() {
    var that = this;
    var order_list = order_data;
    for (var i = 0; i < order_list.length; i++) {
      var status = order_list[i].status;
      var status_text = '';
      if (status == 1){
        status_text = '订单完成'
      }else{
        status_text = '订单待支付'
      }
      order_list[i].status_text = status_text;
    }
    that.setData({
      order_data: order_list
    })
  }
})