// pages/index/index.js
const { $Message } = require('../../components/iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open: false,
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',
    scrollTop: 0,
    visible2: false,
        //小程序没有refs，所以只能用动态布尔值控制关闭
        toggle : false,
        toggle2 : false,
        actions2: [
            {
                name: '删除',
                color: '#ed3f14'
            }
        ],
        actions : [
            {
                name : '喜欢',
                color : '#fff',
                fontsize : '20',
                width : 100,
                icon : 'like',
                background : '#ed3f14'
            },
            {
                name : '返回',
                width : 100,
                color : '#80848f',
                fontsize : '20',
                icon : 'undo'
            }
        ],
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }},
  handleCancel2 () {
    this.setData({
        visible2: false,
        toggle : this.data.toggle ? false : true
    });
    console.log( this.data.toggle,111111111 )
},
handleClickItem2 () {
    const action = [...this.data.actions2];
    action[0].loading = true;

    this.setData({
        actions2: action
    });

    setTimeout(() => {
        action[0].loading = false;
        this.setData({
            visible2: false,
            actions2: action,
            toggle: this.data.toggle ? false : true
        });
        
    }, 2000);
},
handlerCloseButton(){
    this.setData({
        toggle2: this.data.toggle2 ? false : true
    });
},
actionsTap(){
    this.setData({
        visible2: true
    });
},
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  },
  imageLoad: function () {
    //bindload 图片加载的时候自动设定宽度  
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth,
      imageHeight: wx.getSystemInfoSync().windowHeight,
    })
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
  tap_start: function (e) {
    this.data.mark = this.data.newmark = e.touches[0].pageX;
    console.log(e.touches[0].pageX)
    console.log(this.data.newmark)
    console.log(this.data.ma)
    if (this.data.staus == 1) {
      // staus = 1指默认状态
      this.data.startmark = e.touches[0].pageX;
    } else {
      // staus = 2指屏幕滑动到右边的状态
      this.data.startmark = e.touches[0].pageX;
    }
  },
  tap_drag: function (e) {
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      if (this.data.staus == 1) {
        if (this.data.windowWidth * 0.75 > Math.abs(this.data.newmark - this.data.startmark)) {
          this.setData({
            translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
          })
        }
      }
    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      if (this.data.staus == 1 && (this.data.newmark - this.data.startmark) > 0) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
        })
      } else if (this.data.staus == 2 && this.data.startmark - this.data.newmark < this.data.windowWidth * 0.75) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark + this.data.windowWidth * 0.75 - this.data.startmark) + 'px)'
        })
      }
    }
    this.data.mark = this.data.newmark;
  },
  tap_end: function (e) {
    if (this.data.staus == 1 && this.data.startmark < this.data.newmark) {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.2)) {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      } else {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.75 + 'px)'
        })
        this.data.staus = 2;
      }
    } else {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.2)) {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.75 + 'px)'
        })
        this.data.staus = 2;
      } else {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      }
    }
    this.data.mark = 0;
    this.data.newmark = 0;
  },
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        translate: 'transform: translateX(0px)'
      })
      this.data.open = false;
    } else {
      this.setData({
        translate: 'transform: translateX(' + this.data.windowWidth * 0.75 + 'px)'
      })
      this.data.open = true;
    }
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