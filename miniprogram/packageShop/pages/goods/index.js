// packageShop/pages/goods/index.js
import {showToast, showLoading} from '../../../util/util.js'
const PAGE_NUMBER = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    pageNext: true,
    goods: []
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
      name: 'goodsFunctions',
      data: {
        type: 'getGoods',
        page: this.data.page
      }
    }).then((resp) => {
      console.log(resp, 'resp')
      const list = resp.result.data
      if(list.length === PAGE_NUMBER){
        this.setData({
          pageNext: true,
          page: this.data.page + 1
        })
      }else{
        this.setData({pageNext: false})
      }
      const goods = [].concat(this.data.goods, list)
      this.setData({
        goods
      })
      wx.hideLoading();
    }).catch((e) => {
      console.log('catch', e);
      wx.hideLoading();
    });
  },
  onReachBottom(){
    // 没有下一页了
    if(!this.data.pageNext){
      console.log('pageNext: false')
      showToast('没有更多了')
      return
    }
    this.init()
  },
  editGoods(e){
    const {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/packageShop/pages/goodsEdit/index?id=${id}`
    })
  }
})