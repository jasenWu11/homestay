const chooseLocation = requirePlugin('chooseLocation');
var city = require('../../utils/city.js');
let QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var app = getApp()
let qqmapsdk = new QQMapWX({
  key: 'IBZBZ-TR4KP-T4OD6-L2UNE-VCELF-A4FPZ'
});
let key = 'IBZBZ-TR4KP-T4OD6-L2UNE-VCELF-A4FPZ'
var mylatitude = ''
var mylongitude = ''
var status = 0;
Page({
  data: {
    address:'',
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "上海市",
    hotcityList: [{ cityCode: 110000, city: '北京市' }, { cityCode: 310000, city: '上海市' }, { cityCode: 440100, city: '广州市' }, { cityCode: 440300, city: '深圳市' }, { cityCode: 330100, city: '杭州市' }, { cityCode: 320100, city: '南京市' }, { cityCode: 420100, city: '武汉市' }, { cityCode: 410100, city: '郑州市' }, { cityCode: 120000, city: '天津市' }, { cityCode: 610100, city: '西安市' }, { cityCode: 510100, city: '成都市' }, { cityCode: 500000, city: '重庆市' }]
  },
  onLoad: function () {
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    if (status == 1) {
      if (location != undefined) {
        var address = location.name;
        mylongitude = location.longitude;
        mylatitude = location.latitude;
        this.setData({
          address: address
        })
        wx.setStorageSync('mylatitude', mylatitude + '')
        wx.setStorageSync('mylongitude', mylongitude + '')
        wx.setStorageSync('myaddress', address)
        status = 0;
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 200)
      }
    }
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    console.log("bindCity")
    this.get_location(e.currentTarget.dataset.city)
    this.setData({ city: e.currentTarget.dataset.city })
  },
  //选择热门城市
  bindHotCity: function (e) {
    console.log("bindHotCity")
    this.get_location(e.currentTarget.dataset.city)
    this.setData({
      city: e.currentTarget.dataset.city
    })
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  },
  get_location: function (city){
    qqmapsdk.geocoder({
      address: city, //要转化为经纬度的地址名称
      success: res => {
        //res里包含了该地址的信息
        let qqRes = res
        this.setData({
          location: {
            lat: qqRes.result.location.lat,
            lng: qqRes.result.location.lng
          }
        })
        console.log(qqRes.result.location.lat)
        console.log(qqRes.result.location.lng)
        mylatitude = qqRes.result.location.lat
        mylongitude = qqRes.result.location.lng
        wx.setStorageSync('mylatitude', qqRes.result.location.lat+'')
        wx.setStorageSync('mylongitude', qqRes.result.location.lng+'')
        wx.setStorageSync('myaddress', city)
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 100)
      },
      fail: res => {
        //如果查不到这个地址就显示当前地址
        wx.getLocation({
          type: 'wgs84',
          success: res => {
            var latitude = res.latitude
            var longitude = res.longitude
            this.setData({
              location: {
                lat: latitude,
                lng: longitude
              },
            })
          }
        })
      }
    });
  }, 
  turn_to_map:function(){

  },
  turn_to_map: function () {
    const referer = '选择城市、坐标地点'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: mylatitude,
      longitude: mylongitude
    });
    var url = 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
    if (mylatitude == '' || mylongitude == '') {
      url = 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
    }
    status = 1;
    wx.navigateTo({
      url: url
    });
  }
})