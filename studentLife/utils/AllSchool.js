var province = ["北京",
  "天津",
  "河北",
  "山西",
  "内蒙古",
  "辽宁",
  "吉林",
  "黑龙江",
  "上海",
  "江苏",
  "浙江",
  "安徽",
  "福建",
  "江西",
  "山东",
  "河南",
  "湖北",
  "湖南",
  "广东",
  "广西",
  "海南",
  "重庆",
  "四川",
  "贵州",
  "云南",
  "西藏",
  "陕西",
  "甘肃",
  "青海",
  "宁夏",
  "新疆",
  "香港",
  "澳门",
  "台湾"
]
var campus = {
  "北京": ["北京大学", "中国人民大学", "清华大学", "北京交通大学", "北京科技大学", "中国石油大学(北京)", "中国矿业大学(北京)", "中国地质大学(北京)", "北京邮电大学", "华北电力大学", "北京化工大学", "中国农业大学", "中国科学院大学", "北京林业大学", "北京中医药大学", "北京师范大学", "北京外国语大学", "北京语言大学", "对外经济贸易大学", "中央财经大学", "中国政法大学", "中央民族大学", "中国人民公安大学", "北京协和医学院", "北京体育大学", "北京理工大学", "北京航空航天大学", "北京信息科技大学", "北京工商大学", "北京联合大学", "北京工业大学", "北方工业大学", "首都医科大学", "首都师范大学", "首都经济贸易大学", "中国传媒大学", "国际关系学院", "中央美术学院", "中央戏剧学院", "中央音乐学院", "北京电子科技学院", "外交学院", "中国劳动关系学院", "中国青年政治学院", "中华女子学院", "北京建筑大学", "北京服装学院", "北京印刷学院", "北京石油化工学院", "首钢工学院", "北京农学院", "首都体育学院", "北京第二外国语学院", "北京物资学院", "北京警察学院", "中国音乐学院", "北京舞蹈学院", "中国戏曲学院", "北京电影学院", "北京城市学院", "北京吉利学院"],
  "天津": ["南开大学", "天津大学", "中国民航大学", "天津工业大学", "天津科技大学", "天津理工大学", "天津医科大学", "天津中医药大学", "天津师范大学", "天津财经大学", "天津商业大学", "天津外国语大学", "天津职业技术师范大学", "天津天狮学院", "天津城建大学", "天津农学院", "天津体育学院", "天津音乐学院", "天津美术学院"],
  "河北": ["河北大学", "河北工业大学", "燕山大学", "石家庄铁道大学", "华北理工大学", "河北科技大学", "河北工程大学", "河北农业大学", "河北医科大学", "河北师范大学", "河北经贸大学", "中国人民武装警察部队学院", "中央司法警官学院", "防灾科技学院", "华北科技学院", "河北建筑工程学院", "北华航天工业学院", "石家庄经济学院", "承德医学院", "河北科技师范学院", "廊坊师范学院", "唐山师范学院", "河北金融学院", "河北体育学院", "河北传媒学院", "河北美术学院", "石家庄学院", "保定学院", "衡水学院", "唐山学院", "邯郸学院", "邢台学院", "河北北方学院", "河北民族师范学院", "沧州师范学院", "河北科技学院", "河北外国语学院", "河北中医学院", "张家口学院", "燕京理工学院", "河北工程技术学院"],
  "山西": ["山西大学", "太原理工大学", "中北大学", "太原科技大学", "山西农业大学", "山西医科大学", "山西师范大学", "山西大同大学", "山西财经大学", "太原工业学院", "山西中医学院", "长治医学院", "运城学院", "忻州师范学院", "太原师范学院", "晋中学院", "长治学院", "吕梁学院", "太原学院", "山西传媒学院", "山西工商学院", "山西工程技术学院", "山西应用科技学院"],
  "内蒙古": ["内蒙古大学", "内蒙古科技大学", "内蒙古民族大学", "内蒙古工业大学", "内蒙古农业大学", "内蒙古师范大学", "内蒙古医科大学", "内蒙古财经大学", "呼伦贝尔学院", "呼和浩特民族学院", "集宁师范学院", "赤峰学院", "河套学院", "内蒙古艺术学院", "鄂尔多斯应用技术学院"],
  "辽宁": ["大连理工大学", "东北大学", "大连海事大学", "辽宁大学", "大连大学", "沈阳大学", "沈阳理工大学", "辽宁工程技术大学", "沈阳工业大学", "沈阳建筑大学", "辽宁石油化工大学", "大连交通大学", "辽宁科技大学", "辽宁工业大学", "大连工业大学", "沈阳农业大学", "中国医科大学", "大连医科大学", "辽宁中医药大学", "沈阳药科大学", "辽宁师范大学", "沈阳师范大学", "渤海大学", "东北财经大学", "沈阳化工大学", "沈阳航空航天大学", "大连海洋大学", "大连外国语大学", "大连民族大学", "中国刑事警察学院", "沈阳工程学院", "辽宁科技学院", "大连东软信息学院", "辽宁医学院", "沈阳医学院", "鞍山师范学院", "辽宁财贸学院", "沈阳体育学院", "鲁迅美术学院", "沈阳音乐学院", "大连艺术学院", "辽东学院", "辽宁对外经贸学院", "大连科技学院", "辽宁何氏医学院", "营口理工学院", "沈阳工学院", "大连财经学院", "沈阳城市学院", "沈阳城市建设学院", "辽宁警察学院", "辽宁传媒学院", "辽宁理工学院"],
  "吉林": ["吉林大学", "东北师范大学", "延边大学", "北华大学", "长春大学", "长春理工大学", "长春工业大学", "吉林农业大学", "长春中医药大学", "吉林师范大学", "东北电力大学", "吉林财经大学", "吉林建筑大学", "长春工程学院", "吉林化工学院", "吉林农业科技学院", "吉林医药学院", "吉林工程技术师范学院", "通化师范学院", "白城师范学院", "长春师范大学", "吉林华桥外国语学院", "吉林工商学院", "吉林体育学院", "吉林艺术学院", "吉林动画学院", "吉林警察学院", "长春建筑学院", "长春科技学院", "长春光华学院", "长春财经学院"],
  "黑龙江": ["东北林业大学", "哈尔滨工业大学", "哈尔滨工程大学", "黑龙江大学", "佳木斯大学", "齐齐哈尔大学", "哈尔滨理工大学", "东北农业大学", "黑龙江八一农垦大学", "哈尔滨医科大学", "黑龙江中医药大学", "哈尔滨师范大学", "哈尔滨商业大学", "东北石油大学", "黑龙江科技大学", "哈尔滨学院", "黑龙江工程学院", "牡丹江医学院", "齐齐哈尔医学院", "大庆师范学院", "牡丹江师范学院", "黑龙江财经学院", "哈尔滨体育学院", "绥化学院", "黑龙江东方学院", "黑河学院", "哈尔滨金融学院", "齐齐哈尔工程学院", "哈尔滨华德学院", "黑龙江外国语学院", "哈尔滨剑桥学院", "哈尔滨远东理工学院", "哈尔滨石油学院", "哈尔滨广厦学院", "黑龙江工业学院", "哈尔滨信息工程学院", "黑龙江工商学院"],
  "上海": ["复旦大学", "同济大学", "上海交通大学", "华东理工大学", "东华大学", "华东师范大学", "上海外国语大学", "上海财经大学", "上海大学", "上海理工大学", "上海海事大学", "上海工程技术大学", "上海海洋大学", "上海中医药大学", "上海师范大学", "华东政法大学", "上海海关学院", "上海建桥学院", "上海政法学院", "上海应用技术学院", "上海第二工业大学", "上海电机学院", "上海电力学院", "上海对外经贸大学", "上海金融学院", "上海立信会计学院", "上海体育学院", "上海音乐学院", "上海戏剧学院", "上海商学院", "上海杉达学院", "上海视觉艺术学院", "上海纽约大学", "上海科技大学", "上海兴伟学院", "上海健康医学院"],
  "江苏": ["南京大学", "东南大学", "中国矿业大学", "河海大学", "江南大学", "南京农业大学", "中国药科大学", "南京理工大学", "南京航空航天大学", "苏州大学", "扬州大学", "江苏大学", "南京邮电大学", "江苏科技大学", "南京工业大学", "南京林业大学", "南京医科大学", "南京中医药大学", "南京师范大学", "江苏师范大学", "南京财经大学", "南通大学", "常州大学", "西交利物浦大学", "南京信息工程大学", "淮阴工学院", "徐州工程学院", "淮海工学院", "常州工学院", "盐城工学院", "金陵科技学院", "南京工程学院", "徐州医学院", "江苏理工学院", "淮阴师范学院", "南京晓庄学院", "盐城师范学院", "苏州科技学院", "南京审计学院", "江苏警官学院", "南京体育学院", "南京艺术学院", "常熟理工学院", "三江学院", "南京森林警察学院", "无锡太湖学院", "泰州学院", "江苏第二师范学院", "南通理工学院", "昆山杜克大学", "宿迁学院", "南京特殊教育师范学院"],
  "浙江": ["浙江大学", "宁波大学", "浙江工业大学", "杭州电子科技大学", "浙江理工大学", "浙江中医药大学", "浙江师范大学", "杭州师范大学", "浙江工商大学", "宁波诺丁汉大学", "温州大学", "浙江农林大学", "温州医科大学", "浙江财经大学", "宁波大红鹰学院", "浙江越秀外国语学院", "嘉兴学院", "中国计量学院", "浙江科技学院", "宁波工程学院", "浙江海洋学院", "湖州师范学院", "绍兴文理学院", "台州学院", "浙江传媒学院", "浙江警察学院", "中国美术学院", "浙江树人学院", "浙江万里学院", "公安海警学院", "丽水学院", "衢州学院", "浙江外国语学院", "浙江水利水电学院", "温州肯恩大学", "浙江音乐学院(筹)"],
  "安徽": ["合肥工业大学", "中国科学技术大学", "安徽大学", "安徽理工大学", "安徽工业大学", "安徽农业大学", "安徽医科大学", "安徽师范大学", "安徽财经大学", "安徽工程大学", "淮北师范大学", "安徽建筑大学", "安徽中医药大学", "皖南医学院", "合肥师范学院", "蚌埠医学院", "阜阳师范学院", "安徽科技学院", "安庆师范学院", "淮南师范学院", "安徽新华学院", "巢湖学院", "宿州学院", "黄山学院", "皖西学院", "滁州学院", "铜陵学院", "合肥学院", "蚌埠学院", "池州学院", "安徽三联学院", "安徽外国语学院", "安徽文达信息工程学院"],
  "福建": ["厦门大学", "华侨大学", "福建农林大学", "集美大学", "福州大学", "仰恩大学", "福建医科大学", "福建师范大学", "福建中医药大学", "厦门理工学院", "福建工程学院", "泉州师范学院", "闽南师范大学", "龙岩学院", "莆田学院", "闽江学院", "三明学院", "武夷学院", "福建警察学院", "闽南理工学院", "福建江夏学院", "宁德师范学院", "福州外语外贸学院", "泉州信息工程学院", "厦门华厦学院", "福州理工学院", "阳光学院", "厦门工学院"],
  "江西": ["南昌大学", "江西理工大学", "华东交通大学", "江西农业大学", "江西师范大学", "江西财经大学", "东华理工大学", "南昌航空大学", "井冈山大学", "江西中医药大学", "景德镇陶瓷学院", "南昌工程学院", "南昌理工学院", "赣南医学院", "上饶师范学院", "赣南师范学院", "江西科技师范大学", "江西科技学院", "九江学院", "宜春学院", "新余学院", "江西警察学院", "江西服装学院", "南昌工学院", "景德镇学院", "萍乡学院", "南昌师范学院", "江西工程学院", "江西应用科技学院"],
  "山东": ["山东大学", "中国海洋大学", "中国石油大学(华东)", "青岛大学", "山东科技大学", "山东理工大学", "聊城大学", "烟台大学", "青岛科技大学", "青岛理工大学", "济南大学", "山东建筑大学", "山东农业大学", "山东中医药大学", "山东师范大学", "曲阜师范大学", "鲁东大学", "青岛农业大学", "山东财经大学", "齐鲁工业大学", "山东交通学院", "潍坊医学院", "泰山医学院", "滨州医学院", "济宁医学院", "临沂大学", "山东政法学院", "潍坊学院", "德州学院", "山东工商学院", "山东警察学院", "山东体育学院", "山东艺术学院", "山东工艺美术学院", "菏泽学院", "青岛滨海学院", "烟台南山学院", "滨州学院", "枣庄学院", "泰山学院", "济宁学院", "齐鲁医药学院", "潍坊科技学院", "山东英才学院", "齐鲁师范学院", "山东青年政治学院", "山东女子学院", "山东协和学院", "青岛黄海学院", "青岛工学院", "山东管理学院", "山东农业工程学院", "青岛恒星科技学院", "山东华宇工学院", "齐鲁理工学院", "山东现代学院"],
  "河南": ["郑州大学", "河南大学", "河南科技大学", "河南理工大学", "河南工业大学", "河南农业大学", "河南师范大学", "河南财经政法大学", "华北水利水电大学", "郑州轻工业学院", "中原工学院", "安阳工学院", "南阳理工学院", "黄河科技学院", "郑州航空工业管理学院", "河南城建学院", "河南中医学院", "新乡医学院", "信阳师范学院", "南阳师范学院", "商丘师范学院", "周口师范学院", "洛阳师范学院", "安阳师范学院", "河南科技学院", "黄淮学院", "平顶山学院", "河南工程学院", "洛阳理工学院", "许昌学院", "新乡学院", "郑州工业应用技术学院", "郑州科技学院", "郑州师范学院", "河南警察学院", "信阳农林学院", "商丘工学院", "郑州升达经贸管理学院", "商丘学院", "郑州成功财经学院", "铁道警察学院", "河南牧业经济学院", "黄河交通学院", "郑州财经学院"],
  "湖北": ["武汉大学", "华中科技大学", "中南财经政法大学", "武汉理工大学", "中国地质大学(武汉)", "华中农业大学", "华中师范大学", "中南民族大学", "湖北大学", "长江大学", "三峡大学", "江汉大学", "武汉科技大学", "湖北工业大学", "武汉工程大学", "武汉纺织大学", "湖北中医药大学", "武汉轻工大学", "湖北汽车工业学院", "湖北医药学院", "湖北工程学院", "黄冈师范学院", "湖北师范学院", "湖北经济学院", "湖北警官学院", "武汉体育学院", "湖北美术学院", "武汉音乐学院", "湖北民族学院", "湖北文理学院", "湖北理工学院", "湖北科技学院", "荆楚理工学院", "湖北第二师范学院", "武汉生物工程学院", "武汉东湖学院", "武汉工商学院", "汉口学院", "武昌理工学院", "武昌工学院", "武汉商学院", "武汉工程科技学院", "文华学院", "武汉设计工程学院", "湖北商贸学院", "武汉学院", "武昌首义学院"],
  "湖南": ["国防科学技术大学", "中南大学", "湖南大学", "长沙理工大学", "湖南师范大学", "湖南科技大学", "湘潭大学", "吉首大学", "南华大学", "湖南工业大学", "湖南农业大学", "湖南中医药大学", "中南林业科技大学", "长沙学院", "湖南城市学院", "湖南工程学院", "湖南理工学院", "长沙医学院", "衡阳师范学院", "湘南学院", "湖南涉外经济学院", "湖南商学院", "湖南文理学院", "怀化学院", "湖南科技学院", "邵阳学院", "湖南人文科技学院", "湖南工学院", "湖南第一师范学院", "湖南女子学院", "湖南财政经济学院", "湖南警察学院", "长沙师范学院", "湖南医药学院", "湖南信息学院", "湖南应用技术学院", "湖南交通工程学院"],
  "广东": ["中山大学", "华南理工大学", "暨南大学", "汕头大学", "深圳大学", "南方科技大学", "五邑大学", "广东工业大学", "华南农业大学", "广东海洋大学", "广州中医药大学", "南方医科大学", "华南师范大学", "广东外语外贸大学", "北京师范大学-香港浸会大学联合国际学院", "广州大学", "广东财经大学", "广东石油化工学院", "肇庆学院", "东莞理工学院", "仲恺农业工程学院", "广东医学院", "广州医科大学", "广东药学院", "惠州学院", "岭南师范学院", "韩山师范学院", "嘉应学院", "韶关学院", "广东金融学院", "广东警官学院", "广州体育学院", "广州美术学院", "星海音乐学院", "广东技术师范学院", "广东培正学院", "广东白云学院", "佛山科学技术学院", "广东第二师范学院", "广东科技学院", "广州航海学院", "广州商学院", "广州工商学院", "广东东软学院", "广东理工学院", "香港中文大学(深圳)"],
  "广西": ["广西大学", "桂林电子科技大学", "广西医科大学", "广西师范大学", "广西民族大学", "桂林理工大学", "广西中医药大学", "广西科技大学", "桂林医学院", "右江民族医学院", "广西师范学院", "桂林航天工业学院", "玉林师范学院", "广西财经学院", "广西艺术学院", "广西民族师范学院", "广西外国语学院", "百色学院", "河池学院", "钦州学院", "贺州学院", "梧州学院", "南宁学院", "北海艺术设计学院", "广西警察学院", "桂林旅游学院", "广西科技师范学院"],
  "海南": ["海南大学", "海南师范大学", "海南医学院", "海南热带海洋学院", "海口经济学院", "三亚学院"],
  "重庆": ["重庆大学", "西南大学", "重庆交通大学", "重庆邮电大学", "重庆医科大学", "重庆师范大学", "重庆理工大学", "重庆工商大学", "西南政法大学", "重庆科技学院", "长江师范学院", "重庆第二师范学院", "重庆警察学院", "四川外国语大学", "四川美术学院", "重庆三峡学院", "重庆文理学院", "重庆人文科技学院", "重庆工程学院"],
  "四川": ["四川大学", "西南交通大学", "电子科技大学", "西南财经大学", "西南民族大学", "成都理工大学", "西华大学", "西南科技大学", "四川农业大学", "成都中医药大学", "四川师范大学", "西华师范大学", "中国民用航空飞行学院", "西南石油大学", "四川理工学院", "成都信息工程大学", "四川医科大学", "川北医学院", "成都医学院", "成都工业学院", "成都师范学院", "乐山师范学院", "四川文理学院", "内江师范学院", "四川警察学院", "成都体育学院", "四川音乐学院", "四川民族学院", "绵阳师范学院", "成都东软学院", "宜宾学院", "攀枝花学院", "成都学院", "西昌学院", "四川传媒学院", "四川旅游学院", "成都文理学院", "四川文化艺术学院", "四川电影电视学院", "四川工业科技学院", "阿坝师范学院", "四川工商学院"],
  "贵州": ["贵州大学", "贵州师范大学", "贵州财经大学", "贵州民族大学", "贵州医科大学", "遵义医学院", "贵阳中医学院", "贵州师范学院", "黔南民族师范学院", "遵义师范学院", "兴义民族师范学院", "六盘水师范学院", "贵州工程应用技术学院", "铜仁学院", "凯里学院", "安顺学院", "贵阳学院", "贵州理工学院", "贵州商学院"],
  "云南": ["云南大学", "昆明理工大学", "云南农业大学", "云南师范大学", "云南财经大学", "云南民族大学", "西南林业大学", "昆明医科大学", "大理大学", "云南中医学院", "红河学院", "楚雄师范学院", "玉溪师范学院", "曲靖师范学院", "云南警官学院", "云南艺术学院", "云南工商学院", "昆明学院", "文山学院", "保山学院", "昭通学院", "普洱学院", "云南经济管理学院", "滇西科技师范学院"],
  "西藏": ["西藏大学", "西藏民族大学", "西藏藏医学院"],
  "陕西": ["西安交通大学", "长安大学", "西安电子科技大学", "西北农林科技大学", "陕西师范大学", "西北工业大学", "西北大学", "延安大学", "西安理工大学", "西安建筑科技大学", "西安科技大学", "西安石油大学", "西安工程大学", "西安工业大学", "西安外国语大学", "西北政法大学", "陕西科技大学", "西安邮电大学", "西安航空学院", "陕西中医药大学", "陕西学前师范学院", "西安医学院", "渭南师范学院", "榆林学院", "陕西理工学院", "咸阳师范学院", "宝鸡文理学院", "西安财经学院", "西安体育学院", "西安美术学院", "西安音乐学院", "西安培华学院", "西安翻译学院", "西安欧亚学院", "西安思源学院", "西京学院", "西安文理学院", "安康学院", "西安外事学院", "商洛学院", "陕西国际商贸学院", "陕西服装工程学院", "西安交通工程学院"],
  "甘肃": ["兰州大学", "西北民族大学", "兰州理工大学", "兰州交通大学", "甘肃农业大学", "西北师范大学", "兰州财经大学", "甘肃中医药大学", "陇东学院", "天水师范学院", "甘肃政法学院", "兰州城市学院", "河西学院", "甘肃民族师范学院", "兰州工业学院", "兰州文理学院", "甘肃医学院"],
  "青海": ["青海大学", "青海师范大学", "青海民族大学"],
  "宁夏": ["宁夏大学", "北方民族大学", "宁夏医科大学", "宁夏理工学院", "宁夏师范学院", "银川能源学院"],
  "新疆": ["新疆大学", "石河子大学", "新疆农业大学", "塔里木大学", "新疆医科大学", "新疆师范大学", "喀什大学", "伊犁师范学院", "新疆财经大学", "新疆艺术学院", "昌吉学院", "新疆工程学院", "新疆警察学院"],
  "香港": ["香港中文大学", "香港城市大学", "香港大学", "香港科技大学", "香港理工大学", "香港浸会大学", "香港岭南大学", "香港教育学院", "香港树仁大学", "香港公开大学", "香港演艺学院", "珠海学院", "香港高等科技教育学院", "明爱专上学院", "明德学院", "东华学院", "恒生管理学院"],
  "澳门": ["澳门大学", "澳门理工学院", "澳门科技大学", "澳门城市大学", "澳门镜湖护理学院", "澳门旅游学院"],
  "台湾": ["台湾中央大学", "台湾清华大学", "交通大学", "台湾大学", "嘉义大学", "元智大学"]
}

module.exports = {
    province,
    campus
}