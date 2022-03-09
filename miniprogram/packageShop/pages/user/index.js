// packageShop/pages/user/index.js
import {trim, showLoading} from '../../../util/util.js'
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
    const {id} = e.currentTarget.dataset
  },
  editRemark(e){
    const that = this
    const {id} = e.currentTarget.dataset
    wx.showModal({
      title: '修改备注',
      showCancel: true,
      editable: true,
      placeholderText: '请输入备注',
      success(res){
        if (res.confirm) {
          const remark = res.content
          showLoading()
          wx.cloud.callFunction({
            name: 'userFunctions',
            data: {
              type: 'editUser',
              _id: id,
              remark
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