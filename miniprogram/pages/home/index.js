// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    autoplay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  init(){
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'getPageConfig',
      data: {
        type: 'getBanner'
      }
    }).then((resp) => {
      const banner = resp.result.data[0].banner
      this.setData({
        banner,
        autoplay: banner.length > 1
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log('catch', e);
      wx.hideLoading();
    });
  },
  goDetail(e){
    console.log('goDetail', e)
  }
})