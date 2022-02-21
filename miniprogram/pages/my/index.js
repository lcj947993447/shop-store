// pages/my/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null,
    userInfo: null,
    orderType: [
      {
        name:'待付款',
        code: 'WAIT_PAY'
      },
      {
        name:'待发货',
        code: 'WAIT_DELIVERY'
      },
      {
        name:'待收货',
        code: 'PARTIAL_SHIPPED'
      },
      {
        name:'已完成',
        code: 'COMPLETED'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {openid, userInfo} = app.globalData
    if(!openid){
      this.getOpenId()
    }else{
      this.setData({
        openid
      })
    }
    if(userInfo){
      this.setData({
        userInfo
      })
    }
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
      console.log('resp', resp)
      const openid = resp.result.openid
      this.setData({
        openid
      })  
      app.globalData.openid = openid
      wx.setStorageSync('openid', openid)
      wx.hideLoading();
    }).catch((e) => {
      console.log('catch', e)
      wx.hideLoading();
    });
  },
  getUserInfo(){
    wx.getUserProfile({
      desc: '获取您的头像和昵称用以展示',
      success: ({ userInfo }) => {
        // console.log('user info', userInfo)
        if (userInfo) {
          this.setData({
            userInfo
          })
          app.globalData.userInfo = userInfo
          wx.setStorageSync('userInfo', userInfo)
        }
      }
    })
  }
})