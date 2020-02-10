// pages/chat/chat.js
// pages/contact/contact.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var channel = ''
var my_id = wx.getStorageSync('my_id')
var uname = wx.getStorageSync('uname')
var picurl = wx.getStorageSync('picurl')
var other = ''
var other_name = ''
/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_id: my_id,
    scrollHeight: '100vh',
    inputBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    channel = options.channel;
    other_name = options.other_name;
    other = channel.split('@')[1];
    console.log('通道是' + channel + '对方id' + other)
    //initData(this);
    this.get_chat_list();
    this.setData({
      cusHeadIcon: wx.getStorageSync('picurl'),
    });
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: other_name
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    var msgList = this.data.msgList
    msgList.push({
      "channel": channel,
      "senderid": my_id,
      "recipientid": my_id,
      "content": e.detail.value,
      "sendtime": "",
      "receiptName": other_name,
      "receiptHead": "",
      "senderName": uname,
      "senderHead": picurl
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
    this.goToBottom();
    this.creat_chat(channel, my_id, other, e.detail.value)
  },

  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  },
  // 容器滚动到底部
  goToBottom:function() {
    const query = wx.createSelectorQuery().in(this);

    query.select('#chat_panel').boundingClientRect();
    query.select('.scrollMsg').boundingClientRect();
    query.exec(res => {
      const scorllHeight = res[0].height;
      const listHeight = res[1].height;

      this.setData({
        scrollTop: listHeight - scorllHeight + 80
      });
    });
  },
  get_chat_list:function(){
    var that = this;
    wx.request({
      url: app.globalData.URL + '/chat/info.do?channel=' + channel,
      header: {
        "Cookie": wx.getStorageSync("cookieKey")
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
          var msgList = res.data.data
          that.setData({
            msgList: msgList,
            inputVal:''
          })
          that.goToBottom();
        } else {
          var msg = res.data.msg;
          wx.showToast({
            title: msg,
            image: '/images/icons/wrong.png'
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
  creat_chat: function (channel, senderid, recipientid, content){
    wx.request({
      url: app.globalData.URL + '/chat/create.do',
      header: {
        "Cookie": wx.getStorageSync("cookieKey")
      },
      data:{
        channel: channel,
        senderid: senderid,
        recipientid: recipientid,
        content: content
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
          console.log('发送成功')
        }else{
          var msg = res.data.msg;
          wx.showToast({
            title: msg,
            image: '/images/icons/wrong.png'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '发送失败！',
          image: '/images/icons/wrong.png'
        })
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
  }
})
