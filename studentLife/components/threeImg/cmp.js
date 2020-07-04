// components/threeImg/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgBox:Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    // imgArr: ["http://file06.16sucai.com/2016/0303/567565d0e78a7e51b6c38f07e7be06ac.jpg",
    //   "http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/04/05/060c3478502051d641736670a69ddc68.jpg",
    //   "http://hbimg.b0.upaiyun.com/f38b9abb76c09c51156dff95952cbd81360010df39695-8Ukixu_fw658",
    //   "http://pic1.win4000.com/wallpaper/4/57844ad23eb63.jpg"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      const index = e.currentTarget.dataset.index
      const src = e.currentTarget.dataset.src
      const array = this.data.imgBox
      // console.log(array[index].img)
      wx.previewImage({
        current: src,
        urls: array
      })
    }
  }
})
