// pages/room/room.js
const app = getApp();
let QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var Moment = require("../../utils/moment.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()
var room_data = require("../../js/place.js").room_data;
var latitude = '';
var longitude = '';
var mylatitude = '';
var mylongitude = '';
let qqmapsdk = new QQMapWX({
  key: 'IBZBZ-TR4KP-T4OD6-L2UNE-VCELF-A4FPZ'
});
var hid = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carouselList: [],
    room_id:'',
    room_name: '',
    specification: '',
    score: '',
    collection_count: '',
    address: '',
    latitude: '',
    longitude: '',
    price: '',
    start_text: '',
    landlord_head: '',
    star_list: [],
    room_address: '',
    expression: '',
    recommend: '',
    iscollection: false,
    collection_img: '/images/icons/null_collect.png',
    introduce: '',
    evaluation_count: '',
    user_head: '',
    user_name: '',
    evaluation_score: '',
    evaluation_content: '',
    evaluation_time: '',
    landlord_id: '',
    landlord_head: '',
    landlord_name: '',
    room_count: '',
    distance: '',
    startdate: '',
    enddate: '',
    saedates: '2019-12-06~2019-12-08',
    prices: '',
    day_count:1,
    device:[],
    hidden_evaluate:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    hid = options.hid;
    this.setData({
      price: options.price
    })
    mylatitude = wx.getStorageSync('mylatitude')
    mylongitude = wx.getStorageSync('mylongitude')
    this.get_room_data();
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
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      startdate: getDate.checkInDate,
      enddate: getDate.checkOutDate,
      saedates: getDate.checkInDate + '~' + getDate.checkOutDate
    })
    this.isDuringDate(getDate.checkInDate, getDate.checkOutDate);
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
  setmap: function() {
    let _page = this;
    _page.setData({
      markers: [{
        id: 0,
        latitude: latitude,
        longitude: longitude,
        // 我的图标
        iconPath: '/images/icons/location.png'
      }]
    });
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        _page.setData({
          latitude: latitude,
          longitude: longitude,
          scale: 10
        });
        console.log('latitude' + latitude + ',和longitude' + longitude)
      }
    })
  },
  turn_to_map: function() {
    console.log("经度是" + longitude + "，纬度是" + latitude);
    var longitudes = parseFloat(longitude);
    var latitudes = parseFloat(latitude);
    wx.openLocation({ //​使用微信内置地图查看位置。
      latitude: latitudes, //要去的纬度-地址
      longitude: longitudes, //要去的经度-地址
      name: '房源位置',
      address: this.data.room_address
    })
  },
  get_room_data: function() {
    var that = this;
    wx.request({
      url: app.globalData.URL + '/house/info.do?Id='+hid,
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
          var room_datas = res.data.data;
          var images = room_datas.house.houseimage;
          var image_list = JSON.parse(images);
          latitude = room_datas.house.latitude;
          longitude = room_datas.house.longitude;
          var score = room_datas.house.housescore;
          var device = room_datas.device;
          var evaluate = room_datas.evaluate;
          if (evaluate.length == 0){
            that.setData({
              hidden_evaluate:true
            })
          }else{
            that.setData({
              hidden_evaluate: false,
              evaluate: evaluate
            })
          }
          that.set_star_list(score);
          that.set_star_text(score);

          var iscollection = room_datas.isCollect;

          that.setcollection_img(iscollection);

          // var evaluation = room_datas.evaluation;
          // var address = room_datas.address;
          // var evaluation_count = evaluation.length;
          // var user_head = evaluation[0].user_head;
          // var evaluation_score = evaluation[0].score;
          // var evaluation_content = evaluation[0].content;
          // var evaluation_time = evaluation[0].time;
          // var user_name = evaluation[0].name;

          var landlord = room_datas.landlord;
          var landlord_id = landlord.id;
          var landlord_head = landlord.head;
          var landlord_name = landlord.nickname;
          var room_count = 5;
          that.getdistance(latitude, longitude)
          that.setData({
            carouselList: image_list,
            room_id: room_datas.house.id,
            room_name: room_datas.house.housename,
            specification: room_datas.house.specification,
            score: score,
            collection_count: room_datas.collectCount,
            address: room_datas.house.address,
            latitude: room_datas.house.latitude,
            longitude: room_datas.house.longitude,
            price: room_datas.house.houseprice,
            iscollection: iscollection,
            introduce: room_datas.house.housedesc,
            // evaluation_count: evaluation_count,
            // user_head: user_head,
            // user_name: user_name,
            // evaluation_score: evaluation_score,
            // evaluation_content: evaluation_content,
            // evaluation_time: evaluation_time,
            landlord_id: landlord_id,
            landlord_head: landlord_head,
            landlord_name: landlord_name,
            room_count: room_count,
            device: device,
            evaluate: evaluate
          })
          that.setmap();
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
  set_star_list: function(score) {
    var half_url = "/images/icons/star_half.png";
    var all_url = "/images/icons/star_all.png";
    var star_list = [];
    var count = parseInt(score / 1);
    var remainder = score % 1;
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
    console.log('星星数组是' + star_list)
    this.setData({
      star_list: star_list
    })
  },
  set_star_text: function(score) {
    var start_text = '一般'
    var expression = '/images/room/general.png'
    var recommend = '房东经验丰富、评分很高，致力于为房客提供优质的住房体验。'
    if (score == 5.0) {
      start_text = '超赞'
      expression = '/images/room/laugh.png'
      recommend = '房东经验丰富、评分很高，致力于为房客提供优质的住房体验。'
    }
    if (score >= 4.5 && score < 5.0) {
      start_text = '赞'
      expression = '/images/room/smile.png'
      recommend = '房东经验较丰富、评分较高，住他们的民宿总体体验很舒适。'
    }
    if (score >= 3.5 && score < 4.5) {
      start_text = '一般'
      expression = '/images/room/general.png'
      recommend = '房东经验一般、评分一般，没准还能发现住房的小惊喜哟。'
    }
    if (score < 3.5) {
      start_text = '差'
      expression = '/images/room/sad.png'
      recommend = '房东经验较差、评分较低，除非没有其他选择，不是很建议入住。'
    }
    this.setData({
      start_text: start_text,
      expression: expression,
      recommend: recommend
    })
  },
  setcollection_img: function(iscollection) {
    console.log('是否收藏' + iscollection)
    var collection_img = '/images/icons/null_collect.png'
    if (iscollection == true) {
      collection_img = '/images/icons/iscollect.png'
    } else {
      collection_img = '/images/icons/null_collect.png'
    }
    this.setData({
      collection_img: collection_img
    })
  },
  change_collect: function() {
    var that = this;
    var iscollection = that.data.iscollection;
    console.log('是否收藏' + iscollection)
    var collection_count = that.data.collection_count;
    if (iscollection == true) {
      iscollection = false;
      that.deleted_collect(hid);
      collection_count--;
    } else if (iscollection == false) {
      iscollection = true
      that.add_collect(hid);
      collection_count++;
    }
    that.setcollection_img(iscollection);
    that.setData({
      iscollection: iscollection,
      collection_count: collection_count
    })
  },
  to_landlord: function(event) {
    var that = this;
    var lid = event.currentTarget.dataset.lid;
    console.log('跳转' + lid + '房东主页');
  },
  textPaste: function() {
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: this.data.order_id,
      success: function(res) {
        wx.getClipboardData({
          //这个api是把拿到的数据放到电脑系统中的
          success: function(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  getdistance: function(latitude, longitude) {
    var that = this;
    /**
     * 获取两点的距离
     */

    console.log('我的纬度' + mylatitude + '我的经度' + mylongitude);
    console.log('民宿纬度' + latitude + '民宿经度' + longitude);
    qqmapsdk.calculateDistance({
      //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      from: {
        latitude: mylatitude,
        longitude: mylongitude
      },
      to: [{
        latitude: latitude,
        longitude: longitude
      }],
      success: function(res) {
        console.log(res, '两点之间的距离：', res.result.elements[0].distance);
        var distance = res.result.elements[0].distance;
        that.setData({
          distance: (distance / 1000).toFixed(1)
        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },
  change_date: function() {
    wx.navigateTo({
      url: '../calendar/calendar?price=' + this.data.price,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  isDuringDate: function (firstDate, secondDate) {
    var price = this.data.price;
    console.log('price是' + price)
    var firstDate = new Date(firstDate);
    var secondDate = new Date(secondDate);
    var diff = Math.abs(firstDate.getTime() - secondDate.getTime())
    var day_count = parseInt(diff / (1000 * 60 * 60 * 24));
    var the_price = day_count * price;
    var date = [];
    date = ["01-01", "02-14", "05-01", "06-01", "10-01", "12-24", "12-25"];
    var price1 = [price * 1.5, price * 2, price * 2, price * 1.5, price * 2.5, price * 1.5, price * 1.5]
    var date_list = []
    var price_list = []
    for (var i = 2020; i < 2025; i++) {
      for (var j in date) {
        var date1 = i.toString() + '-' + date[j];
        date_list.push(date1)
        price_list.push(price1[j])
      }
    }
    for (var i in date_list) {
      var now = new Date(date_list[i]);
      if (now >= firstDate && now <= secondDate) {
        console.log(date_list[i] + '在里面')
        the_price -= price;
        the_price += price_list[i]
      }
    }
    this.setData({
      prices: the_price,
      day_count: day_count
    })
  },
  arrirm_room:function(){
    wx.setStorage({
      key: 'ROOM_INFO',
      data: {
        startdate: this.data.startdate,
        enddate: this.data.enddate,
        day_count:this.data.day_count,
        room_id: this.data.room_id,
        room_name: this.data.room_name,
        specification: this.data.specification,
        images: this.data.carouselList[0].url,
        price: this.data.prices
      }
    });
    wx.navigateTo({
      url: '../book/book',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    })
  },
  openDialog: function (e) {
    var tid = e.currentTarget.dataset.tid;
    console.log(tid);
    var title = '房屋介绍';
    var text = this.data.introduce;
    this.setData({
      istrue: true,
      dialog_title: title,
      dialog_text: text
    })
  },
  closeDialog: function () {
    this.setData({
      istrue: false
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
  to_evaluate:function(){
    console.log('to_evaluate')
    wx.navigateTo({
      url: '../evaluate/evaluate?evaluate=' + JSON.stringify(this.data.evaluate),
      success: function (res) { },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  }
})