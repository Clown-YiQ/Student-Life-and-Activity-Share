// components/personBtn/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnList: [
      { name: '我的发布', icon: 'icon-copy' },
      { name: '我的关注', icon: 'icon-guanzhu' },
      { name: '我的粉丝', icon: 'icon-fans' },
      { name: '我的收藏', icon: 'icon-shoucang' },
      { name: '我的认证', icon: 'icon-renzheng' },
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
