// pages/order_detail/order_detail.js
const app = getApp();
var star_data = require("../../js/place.js").star_data;
var util = require("../../utils/util.js")
var star_num = 0;
var o_id = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    star_data: [],
    order_data: {},
    evaluate: {},
    evaluate_hidden: false,
    pay_hidden:false,
    canel_hidden:false,
    add_evaluate_hidden: false,
    showPayPwdInput: false, //是否展示密码输入层
    pwdVal: '', //输入的密码
    payFocus: true, //文本框焦点
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    o_id = options.o_id;
    console.log('订单id是' + o_id)
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
    this.getstardata();
    this.get_order_detail();
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
  getstardata: function() {
    var star_list = star_data;
    this.setData({
      star_data: star_data
    })
  },
  change_star: function(event) {
    var that = this;
    var sid = event.currentTarget.dataset.sid;
    star_num = sid;
    var star_list = this.data.star_data;
    var src1 = "/images/icons/star_null.png"
    var src2 = "/images/icons/star_all.png"
    for (var i in star_list) {
      star_list[i].src = src1;
      if (star_list[i].id <= sid) {
        star_list[i].src = src2;
      }
    }
    that.setData({
      star_data: star_list
    })
    that.openDialog();
  },
  openDialog: function() {
    console.log('显示');
    this.setData({
      istrue: true
    })
  },
  closeDialog: function() {
    this.setData({
      istrue: false
    })
  },
  data_Input: function(e) {
    this.setData({
      evaluation_text: e.detail.value
    })
  },
  affirm_evaluation: function() {
    var that = this;
    console.log('订单' + o_id + '星级' + star_num + '提交评价' + this.data.evaluation_text);

    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx64148b0d13e32750&secret=6923086ad2c81fe33397ca73d2c8d2cc',
      method: 'GET',
      success: res => {
        console.log("返回结果" + JSON.stringify(res));
        var access_token = res.data.access_token;
        wx.request({
          method: 'POST',
          url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' + access_token,
          data: {
            content: that.data.evaluation_text
          },
          success(res) {
            console.log("返回结果1" + JSON.stringify(res));
            if (res.data.errcode != 87014) {
              wx.request({
                url: app.globalData.URL + '/order/evaluate.do',
                method: 'get',
                dataType: 'json',
                header: {
                  'Cookie': wx.getStorageSync('cookieKey')
                },
                data: {
                  orderid: o_id,
                  score: star_num,
                  evaluatetext: that.data.evaluation_text
                },
                responseType: 'text',
                success: function(res) {
                  console.log("返回结果" + JSON.stringify(res));
                  var status = res.data.status;
                  if (status == 0) {
                    that.setData({
                      istrue: false
                    })
                    wx.showToast({
                      title: '评论发布成功',
                    })
                    var orderstate = 5
                    that.setData({
                      orderstate: orderstate
                    })
                    that.set_status(orderstate, that.data.evaluation_text);
                  } else {
                    var msg = res.data.msg
                    wx.showToast({
                      title: msg,
                      image: '/images/icons/wrong.png',
                    })
                  }
                },
                fail: function(res) {
                  wx.showToast({
                    title: '请求异常',
                    image: '/images/icons/wrong.png',
                  })
                },
                complete: function(res) {
                  console.log("启动请求" + res);
                },
              })
            } else {
              wx.showToast({
                title: '内含违规文字',
                image: '/images/icons/wrong.png'
              })
            }
          }
        })
      },
      fail() {
        console.log(res);
      }
    })
  },
  get_order_detail: function() {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/order/info.do?id=' + o_id,
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
          var order_data = res.data.data;
          var ostatus = order_data.order.orderstatus;
          var ostatus_text = ''
          console.log('订单状态' + ostatus)
          if (ostatus == 0) {
            ostatus_text = '未支付'
            var nowtime = util.formatTime(new Date());
            var endtimes = that.formatDate2(order_data.order.endtime)
            var state = new Date(endtimes) - new Date(nowtime);
            if (state <= 0) {
              ostatus_text = '已失效'
              that.setData({
                pay_hidden: true,
                canel_hidden: true,
                add_evaluate_hidden: true
              })
            }else{
              that.setData({
                pay_hidden: false,
                canel_hidden: false,
                add_evaluate_hidden: true
              })
            }
          } else if (ostatus == 1) {
            ostatus_text = '已完成'
            var nowtime = util.formatTime(new Date());
            var starttimes = that.formatDate2(order_data.order.starttime)
            var state = new Date(nowtime) - new Date(starttimes);
            if (state <= 0) {
              ostatus_text = '待入住'
              that.setData({
                pay_hidden: true,
                canel_hidden: false,
                add_evaluate_hidden: true
              })
            }else{
              that.setData({
                pay_hidden: true,
                canel_hidden: true,
                add_evaluate_hidden: false
              })
            }
          } else if (ostatus == 3) {
            ostatus_text = '已取消'
            that.setData({
              pay_hidden: true,
              canel_hidden: true,
              add_evaluate_hidden: true
            })
          }
          var startdate_text = that.formatDate(order_data.order.starttime);
          var enddate_text = that.formatDate(order_data.order.endtime);
          order_data.order['status_text'] = ostatus_text;
          order_data.order['startdate_text'] = startdate_text;
          order_data.order['enddate_text'] = enddate_text;
          order_data.hosue.first_image = JSON.parse(order_data.hosue.houseimage)[0]
          that.setData({
            order_data: order_data
          })
          var evaluate = order_data.evaluate;
          if (evaluate == null) {
            console.log('无评价信息')
            that.setData({
              evaluate_hidden: true
            })
          } else {
            that.setData({
              evaluate: evaluate,
              evaluate_hidden: false
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
  formatDate: function(dates) { //设置时间转换格式
    var date = new Date(dates)
    var y = date.getFullYear();  //获取年
    var m = date.getMonth() + 1;  //获取月
    m = m < 10 ? '0' + m : m;  //判断月是否大于10
    var d = date.getDate();  //获取日
    d = d < 10 ? ('0' + d) : d;  //判断日期是否大10
    return m + '月' + d + '日';  //返回时间格式
  },
  formatDate2: function(dates) { //设置时间转换格式
    var date = new Date(dates)
    var y = date.getFullYear();  //获取年
    var m = date.getMonth() + 1;  //获取月
    m = m < 10 ? '0' + m : m;  //判断月是否大于10
    var d = date.getDate();  //获取日
    d = d < 10 ? ('0' + d) : d;  //判断日期是否大10
    return y + '-' + m + '-' + d + ' 12:00:00';  //返回时间格式
  },
  tohouse_deatil: function(event) {
    var hid = event.currentTarget.dataset.hid;
    var hname = event.currentTarget.dataset.hname;
    var price = event.currentTarget.dataset.price;
    wx.navigateTo({
      url: '/pages/room/room?hid=' + hid + '&hname=' + hname + '&price=' + price,
      success: function(res) {},
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function () {
    console.log('输入密码')
    var that = this;
    this.setData({
      showPayPwdInput: true,
      payFocus: true
    });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function () {
    var that = this;
    /**获取输入的密码**/
    var val = this.data.pwdVal;
    /**在这调用支付接口**/
    this.setData({
      showPayPwdInput: false,
      payFocus: false,
      pwdVal: ''
    }, function () {
      /**弹框**/
      if (val == '') {
        wx.showToast({
          title: '取消付款'
        })
      } else {
        wx.request({
          url: app.globalData.URL + '/order/pay.do?id=' + o_id,
          method: 'get',
          dataType: 'json',
          header: {
            'Cookie': wx.getStorageSync('cookieKey')
          },
          responseType: 'text',
          success: function (res) {
            console.log("返回结果" + JSON.stringify(res));
            var status = res.data.status;
            if (status == 0) {
              wx.showToast({
                title: '支付成功',
                icon: 'success'
              })
              that.get_order_detail();
            } else {
              var msg = res.data.msg;
              wx.showToast({
                title: msg,
                image: '/images/icons/wrong.png',
              })
            }
          },
          fail: function (res) {
            console.log("返回错误" + res);
          },
          complete: function (res) {
            console.log("启动请求" + res);
          },
        })
      }
    });

  },
  /**
   * 获取焦点
   */
  getFocus: function () {
    this.setData({
      payFocus: true
    });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
    this.setData({
      pwdVal: e.detail.value
    });

    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
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
  }
})