// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    sort: String,
    school:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearch() {
      var sort = this.data.sort;
      var school = this.data.school;
      wx.hideKeyboard({
        complete: res => {
          console.log('hideKeyboard res', res)
        }
      })
      wx.navigateTo({
        url: `/pages/search/search?sort=${sort}&school=${school}` 
      })
    }
  }
})
