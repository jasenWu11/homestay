var hot_city_list = [{
    "code": 1,
    "value": "北京",
    "font_color": "#ffffff",
    "back_color": "#32858b"
  },
  {
    "code": 2,
    "value": "上海",
    "font_color": "#000000",
    "back_color": "#ffffff"
  },
  {
    "code": 3,
    "value": "广州",
    "font_color": "#000000",
    "back_color": "#ffffff"
  },
  {
    "code": 4,
    "value": "深圳",
    "font_color": "#000000",
    "back_color": "#ffffff"
  },
  {
    "code": 5,
    "value": "杭州",
    "font_color": "#000000",
    "back_color": "#ffffff"
  },
  {
    "code": 6,
    "value": "重庆",
    "font_color": "#000000",
    "back_color": "#ffffff"
  },
  {
    "code": 7,
    "value": "成都",
    "font_color": "#000000",
    "back_color": "#ffffff"
  },
  {
    "code": 8,
    "value": "厦门",
    "font_color": "#000000",
    "back_color": "#ffffff"
  }
]
var house_data = [{
    id: 1,
    url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    specification: "1卧1床1.5卫",
    introduce: "北京三环北太平桥豪华客房_大床（靠近北师大/党校/牡丹园地铁/北邮）",
    price: "202",
    praise: 70,
    evaluation: 2.4,
    iscollect: 0
  },
  {
    id: 2,
    url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    specification: "1卧1床1.5卫",
    introduce: "北京三环北太平桥豪华客房_大床（靠近北师大/党校/牡丹园地铁/北邮）",
    price: "202",
    praise: 70,
    evaluation: 5,
    iscollect: 1
  },
  {
    id: 3,
    url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    specification: "1卧1床1.5卫",
    introduce: "北京三环北太平桥豪华客房_大床（靠近北师大/党校/牡丹园地铁/北邮）",
    price: "202",
    praise: 70,
    evaluation: 4,
    iscollect: 1
  },
  {
    id: 4,
    url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    specification: "1卧1床1.5卫",
    introduce: "北京三环北太平桥豪华客房_大床（靠近北师大/党校/牡丹园地铁/北邮）",
    price: "202",
    praise: 70,
    evaluation: 3.5,
    iscollect: 0
  }
]

var message_data = [{
    id: 1,
    head: "http://pic3.zhimg.com/50/v2-0bf82b048a8f186160f0fab27e6483d0_hd.jpg",
    image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    name: "方军帽",
    content: "不好意思，我们这个房间已经没有了额，你这边下单太慢啦，我还有其他的，你要不要再看一下其他的房间呢？",
    time: "2019年12月12日"
  },
  {
    id: 1,
    head: "http://pic3.zhimg.com/50/v2-0bf82b048a8f186160f0fab27e6483d0_hd.jpg",
    image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    name: "方军帽",
    content: "不好意思，我们这个房间已经没有了额，你这边下单太慢啦，我还有其他的，你要不要再看一下其他的房间呢？",
    time: "2019年12月12日"
  },
  {
    id: 1,
    head: "http://pic3.zhimg.com/50/v2-0bf82b048a8f186160f0fab27e6483d0_hd.jpg",
    image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    name: "方军帽",
    content: "不好意思，我们这个房间已经没有了额，你这边下单太慢啦，我还有其他的，你要不要再看一下其他的房间呢？",
    time: "2019年12月12日"
  },
  {
    id: 1,
    head: "http://pic3.zhimg.com/50/v2-0bf82b048a8f186160f0fab27e6483d0_hd.jpg",
    image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    name: "方军帽",
    content: "不好意思，我们这个房间已经没有了额，你这边下单太慢啦，我还有其他的，你要不要再看一下其他的房间呢？",
    time: "2019年12月12日"
  },
  {
    id: 1,
    head: "http://pic3.zhimg.com/50/v2-0bf82b048a8f186160f0fab27e6483d0_hd.jpg",
    image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    name: "方军帽",
    content: "不好意思，我们这个房间已经没有了额，你这边下单太慢啦，我还有其他的，你要不要再看一下其他的房间呢？",
    time: "2019年12月12日"
  },
  {
    id: 1,
    head: "http://pic3.zhimg.com/50/v2-0bf82b048a8f186160f0fab27e6483d0_hd.jpg",
    image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    name: "方军帽",
    content: "不好意思，我们这个房间已经没有了额，你这边下单太慢啦，我还有其他的，你要不要再看一下其他的房间呢？",
    time: "2019年12月12日"
  },
  {
    id: 1,
    head: "http://pic3.zhimg.com/50/v2-0bf82b048a8f186160f0fab27e6483d0_hd.jpg",
    image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    name: "方军帽",
    content: "不好意思，我们这个房间已经没有了额，你这边下单太慢啦，我还有其他的，你要不要再看一下其他的房间呢？",
    time: "2019年12月12日"
  },
  {
    id: 1,
    head: "http://pic3.zhimg.com/50/v2-0bf82b048a8f186160f0fab27e6483d0_hd.jpg",
    image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    name: "方军帽",
    content: "不好意思，我们这个房间已经没有了额，你这边下单太慢啦，我还有其他的，你要不要再看一下其他的房间呢？",
    time: "2019年12月12日"
  }
]

var order_data = [{
    "id": 1,
    "house_name": "终极攻略天堂民宿",
    "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    "startdate": "2019年12月12日",
    "enddate": "2019年12月13日",
    "people": [{
        "name": "方军帽",
        "idcard": "445236199703224584",
        "phone": "15625527280"
      },
      {
        "name": "陈泳衣",
        "idcard": "441235199611081377",
        "phone": "15625527280"
      }
    ],
    "status": 1,
    "price": "218",
    "time": "2019年12月12日"
  },
  {
    "id": 2,
    "house_name": "终极攻略天堂民宿",
    "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    "startdate": "2019年12月12日",
    "enddate": "2019年12月13日",
    "people": [{
        "name": "方军帽",
        "idcard": "445236199703224584",
        "phone": "15625527280"
      },
      {
        "name": "陈泳衣",
        "idcard": "441235199611081377",
        "phone": "15625527280"
      }
    ],
    "status": 2,
    "price": "218",
    "time": "2019年12月12日"
  },
  {
    "id": 3,
    "house_name": "终极攻略天堂民宿",
    "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    "startdate": "2019年12月12日",
    "enddate": "2019年12月13日",
    "people": [{
        "name": "方军帽",
        "idcard": "445236199703224584",
        "phone": "15625527280"
      },
      {
        "name": "陈泳衣",
        "idcard": "441235199611081377",
        "phone": "15625527280"
      }
    ],
    "status": 2,
    "price": "218",
    "time": "2019年12月12日"
  },
  {
    "id": 4,
    "house_name": "终极攻略天堂民宿",
    "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    "startdate": "2019年12月12日",
    "enddate": "2019年12月13日",
    "people": [{
        "name": "方军帽",
        "idcard": "445236199703224584",
        "phone": "15625527280"
      },
      {
        "name": "陈泳衣",
        "idcard": "441235199611081377",
        "phone": "15625527280"
      }
    ],
    "status": 1,
    "price": "218",
    "time": "2019年12月12日"
  },
  {
    "id": 5,
    "house_name": "终极攻略天堂民宿",
    "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575975903702&di=86b1dbe09214d08c19ffcd2c32f5da91&imgtype=0&src=http%3A%2F%2Fimg1.dzwww.com%3A8080%2Ftupian%2F20180724%2F13%2F15543713652899101397.jpg",
    "startdate": "2019年12月12日",
    "enddate": "2019年12月13日",
    "people": [{
        "name": "方军帽",
        "idcard": "445236199703224584",
        "phone": "15625527280"
      },
      {
        "name": "陈泳衣",
        "idcard": "441235199611081377",
        "phone": "15625527280"
      }
    ],
    "status": 2,
    "price": "218",
    "time": "2019年12月12日"
  }
]

module.exports = {
  hot_city_list: hot_city_list,
  house_data: house_data,
  message_data: message_data,
  order_data: order_data
}