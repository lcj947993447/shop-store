// packageShop/pages/goodsDetail/index.js
import {showToast, showLoading} from '../../../util/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {
      classify: '',
      image: [],
      name: '',
      price: 0,
      inventory: 0,
      status: false
    },
    classify: [],
    classifyIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init(options.id)
    this.getClassify()
  },
  init(id){
    showLoading()
    wx.cloud.callFunction({
      name: 'goodsFunctions',
      data: {
        type: 'getGoodsDetail',
        id
      }
    }).then((resp) => {
      const goodsDetail = resp.result.data
      this.setData({
        goodsDetail
      })
      if(this.data.classify.length > 0){
        this.getClassifyIndex()
      }
      wx.hideLoading();
    }).catch((e) => {
      console.log('catch', e);
      wx.hideLoading();
    });
  },
  getClassify(){
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
      if(this.data.goodsDetail.classify){
        this.getClassifyIndex()
      }
    }).catch((e) => {
      console.log('catch', e);
    });
  },
  getClassifyIndex(){
    const classifyIndex = this.data.classify.findIndex(item => item._id == this.data.goodsDetail.classify)
    this.setData({
      classifyIndex: classifyIndex <= 0 ? 0 : classifyIndex
    })
  },
  uploadImage(){
    const that = this
    // 让用户选择一张图片
    wx.chooseImage({
      success: chooseResult => {
        const date = new Date().getTime()
        // 将图片上传至云存储空间
        showLoading()
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: `goodsImage/goods-${date}.png`,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            wx.hideLoading();
            const goodsDetail = that.data.goodsDetail
            goodsDetail.image.push(res.fileID)
            that.setData({
              goodsDetail
            })
          },
        })
      },
    })
  },
  removeImage(e){
    const {index} = e.currentTarget.dataset
    const goodsDetail = this.data.goodsDetail
    goodsDetail.image.splice(index, 1)
    this.setData({
      goodsDetail
    })
  },
  classifyChange(e){
    const classifyIndex = e.detail.value
    this.setData({
      classifyIndex
    })
    this.goodsDetailChange('classify', this.data.classify[classifyIndex]._id)
  },
  nameChange(e){
    const {value} = e.detail
    this.goodsDetailChange('name', value)
  },
  priceChange(e){
    const {value} = e.detail
    this.goodsDetailChange('price', value)
  },
  inventoryChange(e){
    const {value} = e.detail
    this.goodsDetailChange('inventory', value)
  },
  statusChange(e){
    const {value} = e.detail
    this.goodsDetailChange('status', value)
  },
  goodsDetailChange(key, value){
    const goodsDetail = this.data.goodsDetail
    goodsDetail[key] = value
    this.setData({
      goodsDetail
    })
  },
  submit(){
    const goodsDetail = this.data.goodsDetail
    let type = ''
    if(goodsDetail._id){
      type = 'editGoods'
    }else{
      type = 'addGoods'
    }
    wx.cloud.callFunction({
      name: 'goodsFunctions',
      data: {
        type,
        ...goodsDetail
      }
    }).then((resp) => {
      showToast('编辑成功')
    }).catch((e) => {
      console.log('catch', e);
    });
  },
  delGoods(e){
    const {id} = e.currentTarget.dataset
    wx.cloud.callFunction({
      name: 'goodsFunctions',
      data: {
        type: 'delGoods',
        id
      }
    }).then((resp) => {
      wx.navigateBack({})
    }).catch((e) => {
      console.log('catch', e);
    });
  }
})