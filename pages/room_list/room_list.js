// pages/room_list/room_list.js
const app = getApp();
var iscollect = '/images/icons/iscollect.png'
var nocollect = '/images/icons/nocollect.png'
var count_type = 0;
var price_type = 0;
var score_type = 0;
var sort_type = 0;
var people_data = require("../../js/place.js").people_data;
var score_data = require("../../js/place.js").score_data;
var sort_data = require("../../js/place.js").sort_data;
var houseName = '';
var liveCount = 0;
var minPrice = 0;
var maxPrice = 2500;
var minScore = 0;
var maxScore = 100;
var isDistance = false;
var isScore = false;
var nowLat = wx.getStorageSync('mylatitude');
var nowLng = wx.getStorageSync('mylongitude');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count_text: '人数',
    price_text: '价格',
    score_text: '评分',
    sort_text: '排序方式',
    count_icon: '/images/icons/down.png',
    price_icon: '/images/icons/down.png',
    score_icon: '/images/icons/down.png',
    sort_icon: '/images/icons/down.png',
    count_color: '#000000',
    price_color: '#000000',
    score_color: '#000000',
    sort_color: '#000000',
    screen_main_panel: true,
    screen_main_1: true,
    screen_main_2: true,
    screen_main_3: true,
    screen_main_4: true,
    people_data: people_data,
    score_data: score_data,
    sort_data: sort_data,
    minValue:0,
    maxValue:2500,
    minPrice: 0,
    maxPrice: 2500,
    slider_min:0,
    slider_max:2500,
    house_data:[]
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
    this.gethouse_list();
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
  change_screen: function(event) {
    var c_type = event.currentTarget.dataset.c_type;
    this.setData({
      count_color: '#000000',
      price_color: '#000000',
      score_color: '#000000',
      sort_color: '#000000',
      count_icon: '/images/icons/down.png',
      price_icon: '/images/icons/down.png',
      score_icon: '/images/icons/down.png',
      sort_icon: '/images/icons/down.png',
      screen_main_1: true,
      screen_main_2: true,
      screen_main_3: true,
      screen_main_4: true
    })
    switch (c_type) {
      case '1':
        if (count_type == 0) {
          this.setData({
            count_color: '#19896f',
            count_icon: '/images/icons/up.png',
            screen_main_panel: false,
            screen_main_1: false
          })
          count_type = 1;
        } else {
          count_type = 0;
          this.setData({
            screen_main_panel: true
          })
        }
        price_type = 0;
        score_type = 0;
        sort_type = 0;
        break;
      case '2':
        if (price_type == 0) {
          this.setData({
            price_color: '#19896f',
            price_icon: '/images/icons/up.png',
            screen_main_panel: false,
            screen_main_2: false,
            minValue: minPrice,
            maxValue: maxPrice,
            minPrice: minPrice,
            maxPrice: maxPrice
          })
          this.selectComponent("#zy-slider")._propertyLeftValueChange()
          this.selectComponent("#zy-slider")._propertyRightValueChange()
          price_type = 1;
        } else {
          price_type = 0;
          this.setData({
            screen_main_panel: true
          })
        }
        count_type = 0;
        score_type = 0;
        sort_type = 0;
        break;
      case '3':
        if (score_type == 0) {
          this.setData({
            score_color: '#19896f',
            score_icon: '/images/icons/up.png',
            screen_main_panel: false,
            screen_main_3: false
          })
          score_type = 1;
        } else {
          score_type = 0;
          this.setData({
            screen_main_panel: true
          })
        }
        count_type = 0;
        price_type = 0;
        sort_type = 0;
        break;
      case '4':
        if (sort_type == 0) {
          this.setData({
            sort_color: '#19896f',
            sort_icon: '/images/icons/up.png',
            screen_main_panel: false,
            screen_main_4: false
          })
          sort_type = 1;
        } else {
          sort_type = 0;
          this.setData({
            screen_main_panel: true
          })
        }
        count_type = 0;
        price_type = 0;
        score_type = 0;
        break;
    }
  },
  hidden_screen_main_panel: function() {
    this.setData({
      screen_main_panel: true,
      count_color: '#000000',
      price_color: '#000000',
      score_color: '#000000',
      sort_color: '#000000',
      count_icon: '/images/icons/down.png',
      price_icon: '/images/icons/down.png',
      score_icon: '/images/icons/down.png',
      sort_icon: '/images/icons/down.png',
      screen_main_1: true,
      screen_main_2: true,
      screen_main_3: true,
      screen_main_4: true
    })
    count_type = 0;
    price_type = 0;
    score_type = 0;
    sort_type = 0;
  },
  change_count: function(event) {
    var count = event.currentTarget.dataset.count;
    var text = event.currentTarget.dataset.text;
    liveCount = count;
    var people_data = this.data.people_data;
    for (var i in people_data){
      people_data[i].back = '#ffffff'
      people_data[i].bcolor = '#bbbbbb'
      people_data[i].color = '#000000'
      if (count == people_data[i].id){
        people_data[i].back = '#19896f'
        people_data[i].bcolor = '#19896f'
        people_data[i].color = '#ffffff'
      }
    }
    if (count == 0) {
      this.setData({
        people_data: people_data,
        count_text: '人数'
      })
    } else {
      this.setData({
        people_data: people_data,
        count_text: text
      })
    }
    this.setData({
      screen_main_panel: true,
      count_color: '#000000',
      count_icon: '/images/icons/down.png',
      screen_main_1: true
    })
    count_type = 0;
    this.gethouse_list();
  },
  lowValueChangeAction: function (e) {
    this.setData({
      minPrice: e.detail.lowValue
    })
  },

  heighValueChangeAction: function (e) {
    this.setData({
      maxPrice: e.detail.heighValue
    })
  },
  resetSlider: function (e) {
    this.selectComponent("#zy-slider").reset()
    this.setData({
      minPrice: this.data.slider_min,
      maxPrice: this.data.slider_max,
      minValue: this.data.slider_min,
      maxValue: this.data.slider_min
    })
  },
  savePrice:function(){
    minPrice = this.data.minPrice;
    maxPrice = this.data.maxPrice;
    console.log(minPrice + '和' + maxPrice)
    if (minPrice == this.data.slider_min && maxPrice == this.data.slider_max){
      this.setData({
        price_text: '价格'
      })
    }else{
      this.setData({
        price_text: '￥'+minPrice + '-￥'+maxPrice
      })
    }
    this.setData({
      screen_main_panel: true,
      price_color: '#000000',
      price_icon: '/images/icons/down.png',
      screen_main_2: true
    })
    price_type = 0;
    this.gethouse_list();
  },
  change_score: function (event) {
    var id = event.currentTarget.dataset.id;
    var text = event.currentTarget.dataset.text;
    minScore = event.currentTarget.dataset.min;
    maxScore = event.currentTarget.dataset.max;
    var score_data = this.data.score_data;
    for (var i in score_data) {
      score_data[i].back = '#ffffff'
      score_data[i].bcolor = '#bbbbbb'
      score_data[i].color = '#000000'
      if (id == score_data[i].id) {
        score_data[i].back = '#19896f'
        score_data[i].bcolor = '#19896f'
        score_data[i].color = '#ffffff'
      }
    }
    if (id == 0) {
      this.setData({
        score_data: score_data,
        score_text: '分数'
      })
    } else {
      this.setData({
        score_data: score_data,
        score_text: text
      })
    }
    this.setData({
      screen_main_panel: true,
      score_color: '#000000',
      score_icon: '/images/icons/down.png',
      screen_main_3: true
    })
    score_type = 0;
    this.gethouse_list();
  },
  change_sort: function (event) {
    var id = event.currentTarget.dataset.id;
    var text = event.currentTarget.dataset.text;
    var sort_data = this.data.sort_data;
    for (var i in sort_data) {
      sort_data[i].back = '#ffffff'
      sort_data[i].bcolor = '#bbbbbb'
      sort_data[i].color = '#000000'
      if (id == sort_data[i].id) {
        sort_data[i].back = '#19896f'
        sort_data[i].bcolor = '#19896f'
        sort_data[i].color = '#ffffff'
      }
    }
    if (id == 0) {
      this.setData({
        sort_data: sort_data,
        sort_text: '排序方式'
      })
      isDistance = false;
      isScore = false;
    } else {
      if (id == 1){
        isDistance = true;
        isScore = false;
      } else if (id == 2){
        isDistance = false;
        isScore = true;
      }
      this.setData({
        sort_data: sort_data,
        sort_text: text
      })
    }
    this.setData({
      screen_main_panel: true,
      sort_color: '#000000',
      sort_icon: '/images/icons/down.png',
      screen_main_4: true
    })
    sort_type = 0;
    this.gethouse_list();
  },
  gethouse_list:function(){
    var that = this;
    wx.request({
      url: app.globalData.URL + '/house/search/list.do',
      header: {
        "Cookie": wx.getStorageSync("cookieKey"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        nowLng: nowLng,
        nowLat: nowLat,
        isDistance: isDistance,
        isScore: isScore,
        houseName: houseName,
        minPrice: minPrice,
        maxPrice: maxPrice,
        minScore: minScore,
        maxScore: maxScore,
        liveCount: liveCount
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
          var house_list = res.data.data;
          var half_url = "/images/icons/star_half.png";
          var all_url = "/images/icons/star_all.png";
          for (var i = 0; i < house_list.length; i++) {
            var star_list = [];
            var evaluation = house_list[i].housescore;
            var likecount = house_list[i].likecount;
            if (likecount == null){
              house_list[i].likecount = 0
            }
            if (evaluation>5){
              evaluation = evaluation/20
            }
            var iscollects = house_list[i].isCollect;
            var count = parseInt(evaluation / 1);
            var remainder = evaluation % 1;
            //console.log('除数是' + count + '，而余数是' + remainder)
            if (remainder != 0) {
              var star = {}
              star.url = half_url;
              star_list.push(star);
            }
            for (var j = 0; j < count; j++) {
              var star = {}
              star.url = all_url;
              star_list.push(star);
            }
            var collect_img = '';
            if (iscollects == true) {
              collect_img = iscollect
            } else {
              collect_img = nocollect
            }
            house_list[i].star = star_list;
            house_list[i].collect_img = collect_img
            house_list[i].first_image = JSON.parse(house_list[i].houseimage)[0]
          }
          that.setData({
            house_data: house_list
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
  tohouse_deatil: function (event) {
    var hid = event.currentTarget.dataset.hid;
    var hname = event.currentTarget.dataset.hname;
    var price = event.currentTarget.dataset.price;
    wx.navigateTo({
      url: '/pages/room/room?hid=' + hid + '&hname=' + hname + '&price=' + price,
      success: function (res) { },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  },
  changecollect: function (event) {
    var that = this;
    var hid = event.currentTarget.dataset.hid;
    var house_data = this.data.house_data;
    for (var i = 0; i < house_data.length; i++) {
      var id = house_data[i].id;
      if (id == hid) {
        if (house_data[i].isCollect == true) {
          house_data[i].isCollect = false;
          house_data[i].collect_img = nocollect;
          that.deleted_collect(hid);
        } else {
          house_data[i].isCollect = true;
          house_data[i].collect_img = iscollect;
          that.add_collect(hid);
        }
        break;
      }
    }
    that.setData({
      house_data: house_data
    })
  },
  deleted_collect: function (hid) {
    console.log('要取消的' + hid)
    wx.request({
      url: app.globalData.URL + '/house/collect/delete.do?Id=' + hid,
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
  add_collect: function (hid) {
    console.log('要收藏的' + hid)
    wx.request({
      url: app.globalData.URL + '/house/collect/add.do?Id=' + hid,
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