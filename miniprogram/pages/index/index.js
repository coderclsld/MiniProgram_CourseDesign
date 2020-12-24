// pages/index/index.js
const {
  $Message
} = require('../../components/iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    scrollTop: 0,
    nickName: "",
    avatarUrl: "",
    canIUse:true
  },


  aa: function (e) {
    console.log("进入了tap_ch函数")
    if (this.data.open) {
      console.log(this.data.open)
      this.setData({
        open: false
      });
      console.log(this.data.open)
    } else {
      console.log(this.data.open)
      this.setData({
        open: true
      });
      console.log(this.data.open)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindGetUserInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var Name = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        that.setData({
          canIUse:false,
          nickName: Name,
          avatarUrl: avatarUrl
        })
      },
      fail: function (res) {
        console.log("失败")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})