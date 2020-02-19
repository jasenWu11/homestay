// pages/mine/mine.js
const app = getApp();
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
  },
  change_phone: function () {
    var that = this;
    wx.showModal({
      title: '修改手机号码',
      content: '修改手机号码，请确保联系',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          that.openbangDialog()
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  openbangDialog: function (event) {
    this.setData({
      bangtrue: true
    })
  },
  closebangDialog: function () {
    this.setData({
      bangtrue: false
    })
  },
  phone_Input: function (e) {
    this.setData({
      my_phone: e.detail.value
    })
  },
  update: function () {
    var my_id = wx.getStorageSync('my_id')
    var my_phone = this.data.my_phone;
    wx.request({
      url: app.globalData.URL + '/user/update.do',
      data:{
        id:my_id,
        phone: 15625527280
      },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      header: {
        'Cookie': wx.getStorageSync('cookieKey'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("返回结果" + JSON.stringify(res));
        var status = res.data.status;
        if (status == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          });
        } else {
          var msg = res.data.msg
          wx.showToast({
            title: msg,
            image: '/images/icons/wrong.png',
            duration: 2000
          });
        }
      },
      fail: function (res) {
        console.log("返回错误" + res);
      },
      complete: function (res) {
        console.log("启动请求" + res);
      },
    })
    this.setData({
      bangtrue: false
    })
  }
})