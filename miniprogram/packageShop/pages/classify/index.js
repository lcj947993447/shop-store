// packageShop/pages/classify/index.js
import {trim, showToast, showLoading} from '../../../util/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify: null
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
      name: 'classifyFunctions',
      data: {
        type: 'getClassify'
      }
    }).then((resp) => {
      const classify = resp.result.data
      this.setData({
        classify
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log('catch', e);
      wx.hideLoading();
    });
  },
  delClassify(e){
    const delId = e.currentTarget.dataset.id
    const that = this
    wx.showModal({
      title: '删除分类？',
      content: '该分类删除之后，该分类下商品仅在全部商品分类下可见！',
      showCancel: true,
      success(res){
        if (res.confirm) {
          that.confirmDel(delId)
        }
      }
    })
  },
  confirmDel(id){
    showLoading()
    wx.cloud.callFunction({
      name: 'classifyFunctions',
      data: {
        type: 'delClassify',
        id
      }
    }).then((resp) => {
      wx.hideLoading();
      this.init()
    }).catch((e) => {
      wx.hideLoading();
    });
  },
  addClassify(){
    const that = this
    wx.showModal({
      title: '新增分类',
      showCancel: true,
      editable: true,
      placeholderText: '请输入分类',
      success(res){
        if (res.confirm) {
          const content = trim(res.content)
          if(content.length <= 0) {
            showToast('请输入正确的分类名')
            return false
          }
          showLoading()
          wx.cloud.callFunction({
            name: 'classifyFunctions',
            data: {
              type: 'addClassify',
              content
            }
          }).then((resp) => {
            wx.hideLoading();
            that.init()
          }).catch((e) => {
            wx.hideLoading();
          });
        }
      }
    })
  }
})