// miniprogram/pages/gouwuche/gouwuche.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listType: 1, // 1为1个商品一行，2为2个商品一行    
    openid: '', // 搜索关键词
    orderBy: '', // 排序规则
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.openid)
    this.setData({
      openid: options.openid,
    }) 
    var that = this
    db.collection("user").where({
      _openid:this.data.openid
    }).get({
      success: function (res) {
        console.log(res.data[0].goumai)
        that.setData({
          goods: res.data[0].goumai
        })
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