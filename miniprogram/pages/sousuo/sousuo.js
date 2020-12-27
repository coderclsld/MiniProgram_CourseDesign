// miniprogram/pages/sousuo/sousuo.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listType: 1, // 1为1个商品一行，2为2个商品一行    
    name: '', // 搜索关键词
    orderBy: '', // 排序规则
    goods: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name)
    this.setData({
      name: options.name,
    }) 
    var that = this
    console.log(that.data.name+".*")
    db.collection("book").where({
      name: db.RegExp({
        regexp:".*"+that.data.name+".*"
      })
    }).get({
      success: function (res) {
        console.log(res.data)
        that.setData({
          goods: res.data
        })
      }
    })
    console.log(this.data.goods)
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