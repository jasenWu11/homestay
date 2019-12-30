// pages/add_guest/add_guest.js
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
      console.log('保存信息');
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
  }
})