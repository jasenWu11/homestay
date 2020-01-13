// pages/book/book.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [],
    room_id: '',
    room_name: '',
    specification: '',
    images: '',
    price: '',
    day_count: '',
    startdate: '',
    enddate: '',
    people_count: 0,
    guestIds:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getroom_info();
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
    this.getguest_list();
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
  getroom_info: function() {
    var info = wx.getStorageSync("ROOM_INFO");
    this.setData({
      room_id: info.room_id,
      room_name: info.room_name,
      specification: info.specification,
      images: info.images,
      price: info.price,
      day_count: info.day_count,
      startdate: info.startdate,
      enddate: info.enddate
    })
  },
  checkboxChange: function(e) {
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
      checkboxItems: checkboxItems,
      people_count: e.detail.value.length,
      guestIds: values
    });
  },
  to_add_guest: function() {
    wx.navigateTo({
      url: '../add_guest/add_guest',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getguest_list: function() {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/guest/list.do',
      header: {
        "Cookie": wx.getStorageSync("cookieKey"),
        'content-type': 'application/x-www-form-urlencoded'
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
          var guest_list = res.data.data;
          var checkboxItems = [];
          for (var i in guest_list) {
            var checkboxitem = {};
            var id = guest_list[i].id;
            var guestname = guest_list[i].guestname;
            checkboxitem['name'] = guestname;
            checkboxitem['value'] = id;
            checkboxItems.push(checkboxitem);
          }
          that.setData({
            checkboxItems: checkboxItems,
            people_count: 0,
            guestIds:[]
          })
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
  delete_guest: function(event) {
    var that = this;
    var gid = event.currentTarget.dataset.gid;
    var name = event.currentTarget.dataset.name;
    console.log('删除的id是' + gid)
    wx.showModal({
      title: '删除租客',
      content: '是否删除租客' + name,
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: app.globalData.URL + '/guest/delete.do?Id=' + gid,
            header: {
              "Cookie": wx.getStorageSync("cookieKey"),
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {
              console.log("返回的结果" + JSON.stringify(res));
              var status = res.data.status;
              if (status == 21000) {
                that.login_timeout();
              } else if (status == 0) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                })
                that.getguest_list();
              }
            },
            fail: function(res) {
              console.log("返回错误" + res);
            },
            complete: function(res) {
              console.log("启动请求列表" + res);
            },
          });
        } else {
          console.log('取消操作')
        }
      }
    });
  },
  create: function() {
    var that = this;
    var houseid = that.data.room_id;
    var ordertime = util.formatTime(new Date());
    var starttime = that.data.startdate +' '+'14:00:00';
    var endtime = that.data.enddate + ' ' + '12:00:00';
    var orderprice = that.data.price;
    var day = that.data.day_count;
    var guestIds = that.data.guestIds;
    wx.request({
      url: app.globalData.URL + '/order/create.do',
      data:{
        houseid: houseid,
        ordertime: ordertime,
        starttime: starttime,
        endtime: endtime,
        orderprice: orderprice,
        day: day,
        guestIds: guestIds
      },
      header: {
        "Cookie": wx.getStorageSync("cookieKey"),
        'Content-Type': 'application/json'
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
})