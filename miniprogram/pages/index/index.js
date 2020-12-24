// pages/index/index.js
const { $Message } = require('../../components/iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    scrollTop: 0,
    list:[
      {
        src:"../../images/3.jpg",
        name:"猫咪不会写作"
      },
      {
        src:"../../images/2.jpg",
        name:"猫咪不会写1作"
      },
      {
        src:"../../images/1.jpg",
        name:"猫咪不会1写作"
      },
      {
        src:"../../images/1.jpg",
        name:"猫咪不会1写作"
      },
      {
        src:"../../images/2.jpg",
        name:"猫咪不会写1作"
      },
      {
        src:"../../images/1.jpg",
        name:"猫咪不会1写作"
      },
    ]
  },
  aa: function(e){
    console.log("进入了tap_ch函数")
    if(this.data.open){
      console.log(this.data.open)
      this.setData({
        open : false
      });
      console.log(this.data.open)
    }else{
      console.log(this.data.open)
      this.setData({
        open : true
      });
      console.log(this.data.open)
    }
  },
  jrym:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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