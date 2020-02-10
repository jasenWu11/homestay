// pages/order/order.js
const app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var order_data = require("../../js/place.js").order_data;
var util = require("../../utils/util.js")
var ovder_type_data = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "未支付", "有效", "已取消"],
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
    var activeIndex = options.index;
    this.setData({
      activeIndex: activeIndex
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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
    this.getorder_list();
    this.setData({
      ovder_type_data: {}
    })
    ovder_type_data = {}
    for (var i = 0; i < 3; i++) {
      this.getorder_list_by_state(i);
    }
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
    wx.request({
      url: app.globalData.URL + '/order/list.do',
      header: {
        "Cookie": wx.getStorageSync("cookieKey")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log("返回的结果" + JSON.stringify(res));
        var status = res.data.status;
        if (status == 21000) {
          that.login_timeout();
        } else if (status == 0) {
          var order_list = res.data.data;
          if (order_list != null) {
            for (var i = 0; i < order_list.length; i++) {
              var status = order_list[i].orderstatus;
              var status_text = '';
              if (status == 0) {
                status_text = '订单待支付'
                var nowtime = util.formatTime(new Date());
                var endtimes = that.formatDate2(order_list[i].endtime)
                var state = new Date(endtimes) - new Date(nowtime);
                if (state <= 0) {
                  status_text = '订单已失效'
                }
              } else if (status == 1) {
                status_text = '订单已完成'
                var nowtime = util.formatTime(new Date());
                var starttimes = that.formatDate2(order_list[i].starttime)
                var state = new Date(nowtime) - new Date(starttimes);
                if (state <= 0) {
                  status_text = '订单待入住'
                }
              } else if (status == 2) {
                status_text = '订单已取消'
              }
              order_list[i].status_text = status_text;
              order_list[i].startdate = that.formatDate(order_list[i].starttime)
              order_list[i].enddate = that.formatDate(order_list[i].endtime)
              order_list[i].first_image = JSON.parse(order_list[i].houseimage)[0]
            }
            that.setData({
              order_data: order_list
            })
          }
        }
      },
      fail: function(res) {
        console.log("返回错误" + res);
      },
      complete: function(res) {
        console.log("启动请求列表" + res);
      },
    });
  },
  getorder_list_by_state: function(otype) {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/order/list.do?orderstate=' + otype,
      header: {
        "Cookie": wx.getStorageSync("cookieKey")
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log("type" + otype + "返回的结果" + JSON.stringify(res));
        var status = res.data.status;
        if (status == 21000) {
          that.login_timeout();
        } else if (status == 0) {
          var types = 'type' + otype;
          ovder_type_data[types] = res.data.data;
          if (ovder_type_data[types] != null) {
            for (var i = 0; i < ovder_type_data[types].length; i++) {
              var status = ovder_type_data[types][i].orderstatus;
              var status_text = '';
              if (status == 0) {
                status_text = '订单待支付'
                var nowtime = util.formatTime(new Date());
                var endtimes = that.formatDate2(ovder_type_data[types][i].endtime)
                var state = new Date(endtimes) - new Date(nowtime);
                if (state <= 0) {
                  status_text = '订单已失效'
                }
              } else if (status == 1) {
                status_text = '订单已完成'
                var nowtime = util.formatTime(new Date());
                var starttimes = that.formatDate2(ovder_type_data[types][i].starttime)
                var state = new Date(nowtime) - new Date(starttimes);
                if (state <= 0) {
                  status_text = '订单待入住'
                }
              } else if (status == 2) {
                status_text = '订单已取消'
              }
              ovder_type_data[types][i].status_text = status_text;
              ovder_type_data[types][i].startdate = that.formatDate(ovder_type_data[types][i].starttime)
              ovder_type_data[types][i].enddate = that.formatDate(ovder_type_data[types][i].endtime)
              ovder_type_data[types][i].first_image = JSON.parse(ovder_type_data[types][i].houseimage)[0]
            }
            that.setData({
              ovder_type_data: ovder_type_data
            })
          }
        }
      },
      fail: function(res) {
        console.log("返回错误" + res);
      },
      complete: function(res) {
        console.log("启动请求列表" + res);
      },
    });
  },
  login_timeout: function() {
    wx.showModal({
      title: '登录超时',
      content: '请重新登录',
      showCancel: false,
      success: function(res) {
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
  formatDate: function(dates) { //设置时间转换格式
    var date = new Date(dates)
    var y = date.getFullYear();  //获取年
    var m = date.getMonth() + 1;  //获取月
    m = m < 10 ? '0' + m : m;  //判断月是否大于10
    var d = date.getDate();  //获取日
    d = d < 10 ? ('0' + d) : d;  //判断日期是否大10
    return y + '年' + m + '月' + d + '日';  //返回时间格式
  },
  to_detail: function(event) {
    var that = this;
    var o_id = event.currentTarget.dataset.o_id;
    wx.navigateTo({
      url: '../order_detail/order_detail?o_id=' + o_id
    })
  },
  formatDate2: function(dates) { //设置时间转换格式
    var date = new Date(dates)
    var y = date.getFullYear();  //获取年
    var m = date.getMonth() + 1;  //获取月
    m = m < 10 ? '0' + m : m;  //判断月是否大于10
    var d = date.getDate();  //获取日
    d = d < 10 ? ('0' + d) : d;  //判断日期是否大10
    return y + '-' + m + '-' + d + ' 12:00:00';  //返回时间格式
  }
})