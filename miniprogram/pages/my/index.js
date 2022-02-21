// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getOpenId() {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      this.setData({
        openId: resp.result.openid
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log('catch', e)
      wx.hideLoading();
    });
  },
})