// packageShop/pages/order/index.js
import {showToast, showLoading} from '../../../util/util.js'
const ORDER_STATUS = [
  {
    code: 'WAIT_EXAMINE',
    name: '待审核'
  },
  {
    code: 'WAIT_PAY',
    name: '待付款'
  },
  {
    code: 'WAIT_DELIVERY',
    name: '待发货'
  },
  {
    code: 'WAIT_RECEIVE',
    name: '待收货'
  },
  {
    code: 'COMPLETED',
    name: '已完成'
  }
]
const PAGE_NUMBER = 10

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: ORDER_STATUS,
    code: 'WAIT_EXAMINE',
    orderList: [],
    pageNext: true,
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },
  init(){
    showLoading()
    const {code, page} = this.data
    wx.cloud.callFunction({
      name: 'orderFunctions',
      data: {
        type: 'getOrder',
        page,
        code 
      }
    }).then((resp) => {
      console.log(resp, 'resp')
      const list = resp.result.data
      if(list.length === PAGE_NUMBER){
        this.setData({
          pageNext: true,
          page: page + 1
        })
      }else{
        this.setData({pageNext: false})
      }
      const orderList = [].concat(this.data.orderList, list)
      this.setData({
        orderList
      })
      wx.hideLoading();
    }).catch((e) => {
      console.log('catch', e);
      wx.hideLoading();
    });
  },
  statusChange(e){
    const {code} = e.currentTarget.dataset
    this.setData({
      code,
      orderList: [],
      pageNext: true,
      page: 0
    })
    this.init()
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
  goOrderDetail(e){
    const {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/packageShop/pages/orderEdit/index?id=${id}`
    })
  }
})