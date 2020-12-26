// pages/qm/qm1.js
const db  = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileid:'',
    goods:[],
    faved:false,
    money:"",
    x:0,
    y:0,
    good:"jgv",
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fileid:options.fileid
    })
    var that = this
    console.log(this.data.fileid)

    wx.cloud.callFunction({
      name: 'openapi',
      success: function (res) {
        console.log('openid', res.result)
        var openid = res.result.openid
        that.setData({
          openid:res.result.openid
        })
      },
      fail: function (res) {
        console.log("失败:" + res)
      }
    })

    db.collection("user").where({
        _openid:"off9p5H3dGHTLwC3DNqa87dxsCxc"
    }).get({
      success:function(res){
        for(var i=0;i<res.data[0].shouchan.length;i++){
        if(res.data[0].shouchan[i].fileid==that.data.fileid){
          that.setData({
            x:1
          })
          that.setData({faved:true})
          that.setData({isAdd:true})
        }
        }
        },
    })   
    db.collection("user").where({
      _openid:"off9p5H3dGHTLwC3DNqa87dxsCxc"
  }).get({
    success:function(res){
      for(var i=0;i<res.data[0].goumai.length;i++){
      if(res.data[0].goumai[i].fileid==that.data.fileid){
        that.setData({ 
          y:1
        })
        that.setData({isA:true})
      }
      }
      },
  })   
    db.collection("book").where({
      fileid:this.data.fileid
    }).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          goods:res.data[0]
        })
      }
    })
   


  },
  shouchan:function(){
    var that=this
    var a=that.data.x
    if(a%2==0){
      this.setData({faved:true})
      this.setData({isAdd:true})
     wx.cloud.callFunction({
     name:"shouchan",
     data:{    
     name:that.data.goods.name,
     price:that.data.goods.price,
     fileid:that.data.fileid,
   }
  })
    }
    else{
      this.setData({faved:false})
      this.setData({isAdd:false}) 
      wx.cloud.callFunction({
        name:"qxsc",
        data:{    
        name:that.data.goods.name,
        price:that.data.goods.price,
        fileid:that.data.fileid,
      }
     })  
    }
    that.data.x=that.data.x+1
    console.log(that.data.x)

 
},
jieru:function(){
  var that=this
  var a=that.data.y
  if(a%2==0){
    this.setData({isA:true})
     wx.cloud.callFunction({
     name:"goumai",
     data:{    
     name:that.data.goods.name,
     price:that.data.goods.price,
     fileid:that.data.fileid,
   }
  }) 
  }
  else{
    this.setData({isA:false})   
    wx.cloud.callFunction({
      name:"qxjr",
      data:{    
      name:that.data.goods.name,
      price:that.data.goods.price,
      fileid:that.data.fileid,
    }
   })
  }
  that.data.y=that.data.y+1
  console.log(that.data.y)
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