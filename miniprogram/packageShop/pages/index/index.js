// packageShop/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ability:[
      {
        text: '首页banner配置',
        path: '/packageShop/pages/indexEdit/index'
      },
      {
        text: '用户管理',
        path: '/packageShop/pages/user/index'
      },
      {
        text: '订单管理',
        path: '/packageShop/pages/order/index'
      },
      {
        text: '商品管理',
        path: '/packageShop/pages/goods/index'
      },
      {
        text: '图片管理',
        path: '/packageShop/pages/images/index'
      }
    ]
  },
  goList(e){
    const data = e.currentTarget.dataset
    const url = data.path
    console.log('url', data)
    wx.navigateTo({url})
  }
})