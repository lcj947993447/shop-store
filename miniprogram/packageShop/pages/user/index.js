// packageShop/pages/user/index.js
import {showLoading} from '../../../util/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },
  init(){
    showLoading()
    wx.cloud.callFunction({
      name: 'userFunctions',
      data: {
        type: 'getUser'
      }
    }).then((resp) => {
      const userList = resp.result.data
      this.setData({
        userList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log('catch', e);
      wx.hideLoading();
    });
  },
  userDetail(e){

  }
})