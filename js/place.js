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

var room_data = {
  "image": [{
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
  "room_id": 201535,
  "room_name": "民宿***（近东莞理工学院城市学院、香市动物园、市第六中学、华为南方工厂）民宿***（近东莞理工学院城市学院、香市动物园、市第六中学、华为南方工厂）民宿***",
  "introduce": "该房屋怎么怎么滴，房源很好，近地铁，有空调、WiFi等配置齐全，适合旅游，趴体，巴拉巴拉什么环境好之类的",
  "specification": "2间卧室-3张床-3个卫生间-最多住4人",
  "score": 4.8,
  "collection_count": 6,
  "address": "广东省东莞市寮步镇东莞理工学院城市学院3D302",
  "latitude": "22.978630",
  "longitude": "113.838140",
  "iscollection": false,
  "price": 60,
  "landlord": {
    "landload_id": "5",
    "landlord_head": "http://pic4.zhimg.com/50/v2-848b1a190d937e270e8d062d00865493_hd.jpg",
    "name": "方军帽",
    "room_count": 6
  },
  "evaluation": [{
      "user_head": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577255377903&di=de1146f2c563982db68f8a2f493a134c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180806%2F9425645d47cd4f8e9c11fc6a9959340a.jpeg",
      "name": "吴金诚",
      "content": "房源定位不准确，但是房东人很好，房子价格实惠、卫生。",
      "score": 4.8,
      "time": "2019年11月22日"
    },
    {
      "user_head": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577255377903&di=de1146f2c563982db68f8a2f493a134c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180806%2F9425645d47cd4f8e9c11fc6a9959340a.jpeg",
      "name": "吴银诚",
      "content": "房源定位不准确，但是房东人很好，房子价格实惠、卫生。",
      "score": 4.8,
      "time": "2019年11月22日"
    },
    {
      "user_head": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577255377903&di=de1146f2c563982db68f8a2f493a134c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180806%2F9425645d47cd4f8e9c11fc6a9959340a.jpeg",
      "name": "吴铜诚",
      "content": "房源定位不准确，但是房东人很好，房子价格实惠、卫生。",
      "score": 4.8,
      "time": "2019年11月22日"
    }
  ]
}
var people_data = [{
    id: 0,
    count: '不限',
    back: '#19896f',
    bcolor: '#19896f',
    color: '#ffffff'
  },
  {
    id: 1,
    count: '1位',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  },
  {
    id: 2,
    count: '2位',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  },
  {
    id: 3,
    count: '3位',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  },
  {
    id: 4,
    count: '4位',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  },
  {
    id: 5,
    count: '5位',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  },
  {
    id: 6,
    count: '6位',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  },
  {
    id: 7,
    count: '7位+',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  }
]

var sort_data = [{
    id: 0,
    text: '默认排序',
    back: '#19896f',
    bcolor: '#19896f',
    color: '#ffffff'
  },
  {
    id: 1,
    text: '距离排序',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  },
  {
    id: 2,
    text: '评分排序',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  }
]

var score_data = [
  {
    id: 0,
    min_score: 0,
    max_score: 5,
    score_text: '不限分数',
    back: '#19896f',
    bcolor: '#19896f',
    color: '#ffffff'
  },
  {
    id: 1,
    min_score: 0,
    max_score: 4,
    score_text: '4.0以下',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  },
  {
    id: 2,
    min_score: 4,
    max_score: 4.5,
    score_text: '4.0-4.5',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  },
  {
    id: 3,
    min_score: 4.5,
    max_score: 5,
    score_text: '4.5-5.0',
    back: '#ffffff',
    bcolor: '#bbbbbb',
    color: '#000000'
  }
]

var star_data = [{
  id: 1,
  src: "/images/icons/star_null.png"
},
{
  id: 2,
  src: "/images/icons/star_null.png"
},
{
  id: 3,
  src: "/images/icons/star_null.png"
},
{
  id: 4,
  src: "/images/icons/star_null.png"
},
{
  id: 5,
  src: "/images/icons/star_null.png"
}
]

module.exports = {
  hot_city_list: hot_city_list,
  house_data: house_data,
  message_data: message_data,
  order_data: order_data,
  room_data: room_data,
  people_data: people_data,
  score_data: score_data,
  sort_data: sort_data,
  star_data: star_data
}