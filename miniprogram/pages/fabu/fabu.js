// miniprogram/pages/fabu/fabu.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['启蒙', '科普', '历史', '卡通'],
    name:"",
    money:"",
    leibie:"",
    src:"",
    img:"",
    fileid:"",
  },
  chooseImage:function(){
    var that = this
    wx.chooseImage({
      count:1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        // 返回选定照片的路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({img: tempFilePaths})
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {

  },
fabu:function(){
  db.collection('xytz').add({
    data:{
      name:this.data.name,
      money:this.data.money,
      leibie:this.data.leibie,
      src:this.data.src,
    },
    success:function(res){
      console.log(res)
    }
  })
},
getNumber: function (e) {
  var that=this
  var value = e.detail.value
  this.setData({
    name: value
  })
  console.log(that.data.name)
},
getNumberr: function (e) {
  var that=this
  var value = e.detail.value
  this.setData({
    money: value
  })
  console.log(that.data.money)
},

bindPickerChange: function(e) {
  var that=this
  console.log('picker发送选择改变，携带值为', e.detail.value)
  that.setData({
    leibie: e.detail.value
  })
},
sc:function(){
  var that=this
    // 将图片上传至云存储空间
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: 'test/'+that.data.name,
      // 指定要上传的文件的小程序临时文件路径
      filePath: that.data.img[0],
      // 成功回调
      success: res => {
        console.log('上传成功', res.fileID)
        that.setData({fileid:res.fileID})   
      },
      
    })
    var l=that.data.leibie
    setTimeout(function(){
    
   wx.cloud.callFunction({
     name:"fabu",
     data:{    
      name:that.data.name,
      price:that.data.money,
      fileid:that.data.fileid,
    }
   })
  },1000) 
  setTimeout(function(){
  db.collection('book').add({
    data:{ 
      fileid:that.data.fileid,
      name:that.data.name,
      price:that.data.money,
      type:that.data.array[l]
    }
  })
},1000)
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