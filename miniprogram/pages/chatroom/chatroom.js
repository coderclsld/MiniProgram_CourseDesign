const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth; //屏幕的高度和宽度
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
var socketOpen = false;
var frameBuffer_Data, session, SocketTask;
var url = 'ws://172.16.168.175:8000/imserver/';
var upload_url ='http://localhost:8000/file/upload'

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  msgList = [
    {
      speaker: 'others',
      contentType: 'text',
      content: '你好'
    }
  ]
  that.setData({
    msgList,
    inputVal
  })
  console.log(that.data.msgList)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: windowHeight-20+'px',
    otherName:"",
    inputVal: '',
    imgUrl: '',
    otherUserOpenid: '',
    thisUserOpenid: '',
  },

  changeOtherName:function(){
    wx.setNavigationBarTitle({
      title:this.data.otherName
    })
  },
  getUserInput: function(e) {
    this.data.inputVal = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that =this
    initData(this);
    this.setData({
      otherUserOpenid:options.openid
    });
    wx.cloud.callFunction({
      name: 'openapi',
      success: function (res) {
        console.log('openid', res.result)
        var openid = res.result.openid
        that.setData({
          thisUserOpenid:res.result.openid
        })
      },
      fail: function (res) {
        console.log("失败:" + res)
      } 
    })
     if (!socketOpen) {  //首次进入页面socket没有打开 启动socket
      setTimeout(function(){
         that.webSocket(that)  
         SocketTask.onOpen(res => {
          socketOpen = true;
          console.log('监听 WebSocket 连接打开事件。', res)
        })
        SocketTask.onClose(onClose => {   //如果websocket关闭了  就重新连接
          console.log('监听 WebSocket 连接关闭事件。', onClose)
          socketOpen = false;
          that.webSocket(that)
        })
        SocketTask.onError(onError => {
          console.log('监听 WebSocket 错误。错误信息', onError)
          socketOpen = false
        })
        SocketTask.onMessage(onMessage => {   //监听WebSocket接受到服务器的消息事件
          console.log("接受到消息")
          console.log(JSON.parse(onMessage.data));
          console.log(onMessage.data[1]);
          console.log(onMessage.message);
          msgList.push({
            speaker: 'others',
            contentType: 'text',
            content: JSON.parse(onMessage.data).message
          })
          that.setData({
            msgList,
          });
          console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', onMessage.data)
          console.log(msgList)
        })
      },1000)
    } 
  },
  /**
   * 生命周期函数--监听页面显示  启动socket
   */
  onShow: function() {
    var that = this
    /* let i = 0;
    request.get('/loadMessageByUser',{addressee: this.data.otherUserOpenid}).then(res => {  //切换到前台时 发一次request请求，聊天记录
      res.data.forEach((item) => {
        if (this.data.thisUserOpenid == item.sender) {
          this.setData({
            ['msgList['+i+']'] : {
              speaker: 'our',
              contentType: 'text',
              content: item.content
            }
          })
        } else {
          this.setData({
            ['msgList['+i+']'] : {
              speaker: 'others',
              contentType: 'text',
              content: item.content
            }
          })
        }
        i++;
      })
    })*/

  },
  onReady: function () {  //监听页面初次渲染完成 (一个页面只有一次)打开webSocket监听
    var that = this;
    
  },
  webSocket: function (tha) {
    var that = tha
    console.log('@@@@@@@@@@@'+that.data.thisUserOpenid)
    // 创建Socket
    SocketTask = wx.connectSocket({
      url: url + that.data.thisUserOpenid ,
      data: 'data',
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
      success: function (res) {
        socketOpen = true;
        console.log('WebSocket连接创建', res)
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 获取聚焦
   */
  focus: function(e) {
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
    })
    console.log("获取焦点被执行了")
  },
  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })
    console.log("失去焦点被执行了。。。")
  },
  submitTo: function () {
    if (socketOpen) {
      sendSocketMessage(this.data.inputVal,this)
    }
    msgList.push({  //在本地保留数据
      speaker: 'our',
      contentType: 'text',
      content: this.data.inputVal
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal,
      toView: 'msg-' + (msgList.length -1)  ////发送完数据后应该还是停留在最后一行
    });
  },
  upImg: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res);
        
        that.data.imgUrl = res.tempFilePaths[0]
        if (socketOpen) {
          console.log('test');
          // 如果打开了socket就发送数据给服务器
          sendSocketMessage(this.data.imgUrl)
        }
        console.log('uploadFile');
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'file',
          url: "http://localhost:8000/upload",
          formData: {
            'user': '落花人独立'
          },
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json'},
          complete: (res) => {
            console.log(res);
          }
        })
        console.log('uploadFile完成');
      }
    })
  },
  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    if (socketOpen) {
      console.log('test');
      // 如果打开了socket就发送数据给服务器
      sendSocketMessage(this.data.inputVal,this)
    }
    msgList.push({
      speaker: 'our',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal,
      toView: 'msg-' + (msgList.length - 1)   ////发送完数据后应该 还是停留在最后一行
    });
  },

  //返回上一月
  toBackClick: function() {
    wx.navigateBack({})
  }

})
//通过 WebSocketTask连接发送数据，在创建Socket时wx.connectSocket返回WebSocketTask，并在 wx.onSocketOpen 回调之后才能发送。
function sendSocketMessage(msg,tha) {
  var that = tha;
  var tmp = {
    message:msg,
    toUserId: "1"}
  console.log('通过 WebSocket 连接发送数据', JSON.stringify(tmp))
  SocketTask.send({
    data:  JSON.stringify(tmp)
  }, function (res) {
    console.log('已发送', res)
  })
}

