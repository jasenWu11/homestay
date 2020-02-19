const app = getApp();
var username = '';
var picurl = '';
var latitude = '';
var longitude = '';
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },

  onLoad: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        latitude = res.latitude;
        longitude = res.longitude;
      }
    })
    console.log('经纬度' + latitude, longitude);
    username = wx.getStorageSync("username");
    picurl = wx.getStorageSync("picurl");
    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              var token = wx.getStorageSync("cookieKey");
              console.log('token是' + token);
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  var code = res.code;
                  console.log("用户的code:" + res.code);
                  var code = res.code;
                  console.log('username是' + username + '和picurl是' + picurl)
                  if (token != '哈哈') {
                    wx.getUserInfo({
                      success: res => {
                        console.log('得到' + JSON.stringify(res.userInfo));
                        var userInfo = res.userInfo;
                        username = userInfo.nickName;
                        picurl = userInfo.avatarUrl;
                        wx.setStorageSync("username", username);
                        wx.setStorageSync("picurl", picurl);
                        console.log('更新username是' + username + '和picurl是' + app.globalData.URL)
                        console.log('更新username是' + username + '和picurl是' + picurl)
                        console.log('重新授权');
                        that.binguser(code, username, picurl);
                      }
                    })
                  } else {
                    console.log('自动登录');
                    wx.redirectTo({
                      url: '../home/home',
                    })
                  }
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      var userInfo = e.detail.userInfo;
      username = userInfo.nickName;
      picurl = userInfo.avatarUrl;
      wx.setStorageSync("username", username);
      wx.setStorageSync("picurl", picurl);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  binguser: function (code, username, picurl) {
    wx.request({
      url: app.globalData.URL + '/user/login.do?openid=' + code + '&head=' + picurl + '&latitude=' + latitude + '&longitude=' + longitude,
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log("返回结果" + JSON.stringify(res));
        var status = res.data.status;
        if (status == 0) {
          var uname = res.data.data.username;
          var ispass = res.data.data.ispass;
          wx.setStorageSync('uname', uname);
          wx.setStorageSync('ispass', ispass);
          wx.setStorageSync('latitude', latitude);
          wx.setStorageSync('longitude', longitude);
          if (res && res.header && res.header['Set-Cookie']) {
            wx.setStorageSync('cookieKey', res.header['Set-Cookie']); //保存Cookie到Storage
          }
          var openid = res.data.openid;
          wx.setStorageSync("openid", openid);
          wx.switchTab({
            url: '../home/home',
          })
        }
      },
      fail: function (res) {
        console.log("返回错误" + res);
      },
      complete: function (res) {
        console.log("启动请求" + res);
      },
    })
  },
  binguser: function (code, username, picurl) {
    wx.request({
      url: app.globalData.URL + '/user/login.do?openid=' + code + '&nickname=' + username + '&head=' + picurl,
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log("返回结果" + JSON.stringify(res));
        var status = res.data.status;
        if (status == 0) {
          var uname = res.data.data.username;
          var ispass = res.data.data.ispass;
          var my_id = res.data.data.id;
          wx.setStorageSync('uname', uname);
          wx.setStorageSync('my_id', my_id);
          wx.setStorageSync('ispass', ispass);
          if (res && res.header && res.header['Set-Cookie']) {
            wx.setStorageSync('cookieKey', res.header['Set-Cookie']); //保存Cookie到Storage
          }
          var openid = res.data.openid;
          wx.setStorageSync("openid", openid);
          wx.switchTab({
            url: '../home/home',
          })
        } else {
          var msg = res.data.msg
          wx.showToast({
            title: msg,
            image: '/images/icons/wrong.png',
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '请求异常',
          image: '/images/icons/wrong.png',
        })
      },
      complete: function (res) {
        console.log("启动请求" + res);
      },
    })
  }
})