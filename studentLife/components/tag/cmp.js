// components/tag/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navList:Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    titleClick: function (e) {
      // console.log(e);
      var currentIndex = this.data.currentIndex
      var index = e.currentTarget.dataset.index;
    
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: index
      })
      // console.log(currentIndex)
      this.triggerEvent('title',{
        index
      },{})
    }
  }
})
