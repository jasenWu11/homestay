// pages/home/home.js
const app = getApp();
var hot_city_list = require("../../js/place.js").hot_city_list;
var house_data = require("../../js/place.js").house_data;
var Moment = require("../../utils/moment.js");
var iscollect = '/images/icons/iscollect.png'
var nocollect = '/images/icons/nocollect.png'
let QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js'); 
let qqmapsdk = new QQMapWX({
  key: 'IBZBZ-TR4KP-T4OD6-L2UNE-VCELF-A4FPZ'
});
var key = 'IBZBZ-TR4KP-T4OD6-L2UNE-VCELF-A4FPZ'
var mylatitude = ''
var mylongitude = ''
var address = '';
var hot_city='';
var code = '';
var cname = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carouselList: [{
        "id": 4,
        "name": "靓仔",
        "link": "https://tortoisegit.org/download/",
        "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575955699699&di=e4d202fa9054ab652eb905f144c5a194&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
        "position": 1,
        "content": "对我的期望",
        "enabled": 1,
        "addTime": "2019-12-03 20:10:32",
        "updateTime": "2019-12-04 09:28:29",
        "deleted": 0
      },
      {
        "id": 5,
        "name": "标题2",
        "link": "http://127.0.0.1:8091/#/generator-appad",
        "url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575955731592&di=e5170f367d92cdd86b4442a973598862&imgtype=0&src=http%3A%2F%2Fimg.yzt-tools.com%2F20190505%2F267d043db171128c3ba96dd07df7b183.jpg%3Fx-oss-process%3Dimage%2Fresize%2Cw_600%2Fauto-orient%2C1%2Fquality%2Cq_90%2Fformat%2Cjpg",
        "position": 2,
        "content": "我都后悔 ",
        "enabled": 1,
        "addTime": "2019-12-03 20:24:42",
        "updateTime": "2019-12-03 21:30:35",
        "deleted": 0
      }
    ],
    main_image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575969454980&di=2dbb40c918341b303c7505464bb46e75&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ba6a5b55ab84a80121ade020129f.jpg%402o.jpg',
    button_list: [],
    house_data: [],
    history_data: [],
    cname: '北京',
    day_count: 1,
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //设缓存缓存起来的日期
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
      }
    });
    hot_city = hot_city_list;
    code = hot_city[0].code;
    cname = hot_city[0].name;
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
    this.get_location();
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
  gethot_city_list: function() {
    var that = this;
    that.setData({
      button_list: hot_city,
      cname: cname
    })
    that.getrecommended(code);
  },
  charge_city: function(event) {
    code = event.currentTarget.dataset.code;
    var codes = JSON.stringify(event.currentTarget.dataset.code);
    console.log('地址编码'+code)
    cname = event.currentTarget.dataset.name;
    var city_list = this.data.button_list;
    for (var i = 0; i < city_list.length; i++) {
      city_list[i].font_color = "#000000"
      city_list[i].back_color = "#ffffff"
      var getcode = JSON.stringify(city_list[i].code);
      console.log('地址编码2' + codes)
      if (getcode == codes) {
        city_list[i].font_color = "#ffffff"
        city_list[i].back_color = "#32858b"
      }
    }
    this.setData({
      button_list: city_list,
      cname: cname
    })
    this.getrecommended(code);
  },
  getrecommended: function(code) {
    console.log('获取城市code为' + code + '的推荐房源');
    var that = this;
    var datas={}
    datas['userLat'] = mylatitude;
    datas['userLng'] = mylongitude;
    datas['areacode'] = code;
    wx.request({
      url: app.globalData.URL + '/house/home/list.do',
      header: {
        "Cookie": wx.getStorageSync("cookieKey"),
        'content-type': 'application/json'
      },
      data: datas,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
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
      fail: function(res) {
        console.log("返回错误" + res);
      },
      complete: function(res) {
        console.log("启动请求列表" + res);
      },
    });
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
  gethistory: function() {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/common/history/list.do',
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
          var house_list = res.data.data;
          var half_url = "/images/icons/star_half.png";
          var all_url = "/images/icons/star_all.png";
          for (var i = 0; i < house_list.length; i++) {
            var star_list = [];
            var evaluation = house_list[i].housescore;
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
            history_data: house_list
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
  changecollect: function(event) {
    var that = this;
    var hid = event.currentTarget.dataset.hid;
    var history_data = this.data.history_data;
    for (var i = 0; i < history_data.length; i++) {
      var id = history_data[i].id;
      if (id == hid) {
        if (history_data[i].isCollect == true) {
          history_data[i].isCollect = false;
          history_data[i].collect_img = nocollect;
        } else {
          history_data[i].isCollect = true;
          history_data[i].collect_img = iscollect;
        }
        break;
      }
    }
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
      history_data: history_data,
      house_data: house_data
    })
  },
  deleted_collect: function(hid) {
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
      success: function(res) {
        console.log("返回的结果" + JSON.stringify(res));
        var status = res.data.status;
        if (status == 21000) {
          that.login_timeout();
        } else if (status == 0) {

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
  add_collect: function(hid) {
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
      success: function(res) {
        console.log("返回的结果" + JSON.stringify(res));
        var status = res.data.status;
        if (status == 21000) {
          that.login_timeout();
        } else if (status == 0) {
          wx.showToast({
            title: '已加入收藏',
            icon: 'success',
            duration: 500,
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
  to_room_list: function() {
    wx.navigateTo({
      url: '../room_list/room_list',
    })
  },
  change_date: function() {
    wx.navigateTo({
      url: '../calendar/calendar?price=' + '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  setdate_text: function() {
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    var startdate = getDate.checkInDate;
    var enddate = getDate.checkOutDate;
    var startdate_text = this.formatDate(startdate);
    var enddate_text = this.formatDate(enddate);
    var start_week = this.get_week(startdate);
    var enddate_week = this.get_week(enddate);
    this.isDuringDate(getDate.checkInDate, getDate.checkOutDate);
    this.setData({
      startdate_text: startdate_text,
      enddate_text: enddate_text,
      start_week: start_week,
      enddate_week: enddate_week
    })
  },
  isDuringDate: function(firstDate, secondDate) {
    var firstDate = new Date(firstDate);
    var secondDate = new Date(secondDate);
    var diff = Math.abs(firstDate.getTime() - secondDate.getTime())
    var day_count = parseInt(diff / (1000 * 60 * 60 * 24));
    this.setData({
      day_count: day_count
    })
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
  get_week: function (dates){
    var date = new Date(dates)
    var week = date.getDay();
    if (week == 0) {
      week = "周日";
    }
    else if (week == 1) {
      week = "周一";
    }
    else if (week == 2) {
      week = "周二";
    }
    else if (week == 3) {
      week = "周三";
    }
    else if (week == 4) {
      week = "周四";
    }
    else if (week == 5) {
      week = "周五";
    }
    else if (week == 6) {
      week = "周六";
    }
    return week;
  },
  get_advert:function(){
    var that = this;
    wx.request({
      url: app.globalData.URL + '/common/advert/list.do?disabled=' + 0 ,
      header: {
        "Cookie": wx.getStorageSync("cookieKey"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log("返回的结果" + JSON.stringify(res));
        var status = res.data.status;
        if (status == 21000) {
          that.login_timeout();
        } else if (status == 0) {
          var carouselList = res.data.data.data;
          that.setData({
            carouselList: carouselList
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
  get_location:function(){
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        mylatitude = res.latitude
        mylongitude = res.longitude
        this.gethot_city_list();
        this.gethistory();
        this.setdate_text();
        this.get_advert();
        this.getchoose_address();
        console.log('latitude' + mylatitude + ',和longitude' + mylongitude)
        var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + mylatitude + "," + mylongitude + "&key=" + key;
        wx.request({
          url: getAddressUrl,
          success: function (result) {
            console.log(JSON.stringify(result.data.result.address))
            address = result.data.result.address
            that.setData({
              address: address
            })
            wx.setStorageSync('mylatitude', mylatitude+'')
            wx.setStorageSync('mylongitude', mylongitude+'')
            wx.setStorageSync('myaddress', address)
          }
        })
      }
    })
  },
  to_change_city:function(){
    wx.navigateTo({
      url: '../switchcity/switchcity',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getchoose_address:function(){
    mylatitude = wx.getStorageSync('mylatitude')
    mylongitude = wx.getStorageSync('mylongitude')
    address = wx.getStorageSync('myaddress')
    this.setData({
      address: address
    })
  },
  tosearch_room:function(){
    wx.navigateTo({
      url: '../room_list/room_list',
    })
  }
})