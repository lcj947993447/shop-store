// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: Number
  },
  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/home/index',
        text: '首页',
        icon: 'icon-home'
      },
      {
        pagePath: '/pages/goods/index',
        text: '商品',
        icon: 'icon-fenlei'
      },
      {
        pagePath: '/pages/shopCart/index',
        text: '购物车',
        icon: 'icon-gouwudai'
      },
      {
        pagePath: '/pages/my/index',
        text: '我的',
        icon: 'icon-account'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e){
      console.log(e)
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})
