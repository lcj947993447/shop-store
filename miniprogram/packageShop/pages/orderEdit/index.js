// packageShop/pages/orderDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    orderDetail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id} = options
    this.setData({
      id
    })
    this.init()
  },
  init(){
    const {id} = this.data
    wx.cloud.callFunction({
      name: 'orderFunctions',
      data: {
        type: 'getOrderDetail',
        id
      }
    }).then((resp) => {
      const orderDetail = resp.result.data
      this.setData({
        orderDetail
      })
      wx.hideLoading();
    }).catch((e) => {
      console.log('catch', e);
      wx.hideLoading();
    });
  }
})