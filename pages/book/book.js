// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    checkboxItems: [
      { name: '方军帽', value: '0', checked: true },
      { name: '陈泳衣', value: '1' }
    ]
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
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  }, 
  to_add_guest:function(){
    wx.navigateTo({
      url: '../add_guest/add_guest',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})