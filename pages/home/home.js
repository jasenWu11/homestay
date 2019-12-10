// pages/home/home.js
var hot_city_list = require("../../js/place.js").hot_city_list;
var house_data = require("../../js/place.js").house_data;
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
    cname:'北京'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.gethot_city_list();
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
  gethot_city_list: function() {
    var that = this;
    var hot_city = hot_city_list;
    var code = hot_city[0].code;
    var cname = hot_city[0].name;
    that.setData({
      button_list: hot_city,
      cname: cname
    })
    that.getrecommended(code);
  },
  charge_city: function(event) {
    var ccode = event.currentTarget.dataset.code;
    var cname = event.currentTarget.dataset.name;
    var city_list = this.data.button_list;
    for (var i = 0; i < city_list.length; i++) {
      city_list[i].font_color = "#000000"
      city_list[i].back_color = "#ffffff"
      var code = city_list[i].code;
      if (code == ccode) {
        city_list[i].font_color = "#ffffff"
        city_list[i].back_color = "#32858b"
      }
    }
    this.setData({
      button_list: city_list,
      cname: cname
    })
    this.getrecommended(ccode);
  },
  getrecommended: function(code) {
    console.log('获取城市code为' + code + '的推荐房源');
    var that = this;
    var house_list = house_data;
    var half_url = "/images/icons/star_half.png";
    var all_url = "/images/icons/star_all.png";
    for (var i = 0; i < house_list.length; i++) {
      var star_list = [];
      var evaluation = house_list[i].evaluation;
      var count = parseInt(evaluation / 1);
      var remainder = evaluation % 1;
      console.log('除数是' + count + '，而余数是' + remainder)
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
      house_list[i].star = star_list;
      console.log('star_list是' + JSON.stringify(star_list));
    }
    that.setData({
      house_data: house_list
    })
  }
})