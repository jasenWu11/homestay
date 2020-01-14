// pages/add_guest/add_guest.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    id_card: '',
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  data_Input: function(e) {
    var code = e.currentTarget.dataset.code;
    if (code == 'name') {
      this.setData({
        name: e.detail.value
      })
    } else if (code == 'id_card') {
      this.setData({
        id_card: e.detail.value
      })
    } else if (code == 'phone') {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  save_guest: function() {
    console.log('调用');
    var that = this;
    var name = that.data.name;
    var id_card = that.data.id_card;
    var phone = that.data.phone;
    var is_card = that.isCardNo(id_card);
    var isphone = that.checkPhone(phone);
    if (name == '' || id_card == '' || phone == '') {
      wx.showToast({
        title: '所有信息不能为空',
        image: '/images/icons/wrong.png',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if (is_card == false) {
      wx.showToast({
        title: '身份证号码错误',
        image: '/images/icons/wrong.png',
        duration: 1000,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if (isphone == false) {
      wx.showToast({
        title: '请输入正确的手机号码',
        image: '/images/icons/wrong.png',
        duration: 1000,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }else{
      wx.request({
        url: app.globalData.URL + '/guest/create.do?guestname=' + name + '&guestcard=' + is_card + '&guestphone=' + phone,
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
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            });
          }else{
            wx.showToast({
              title: res.data.msg,
              image: '/images/icons/wrong.png',
              duration: 1000,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
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
    }
  },
  isCardNo: function(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
      return false;
    } else {
      return true;
    }
  },
  checkPhone: function (phone) {
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      return false;
    }else{
      return true;
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