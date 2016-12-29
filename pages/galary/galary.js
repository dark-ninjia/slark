//galary.js
//获取应用实例
var app = getApp()
Page({
  data: {
    videoList: [],
  },
  onLoad: function (e) {
    console.log('galary loaded')
  },
  onShow: function() {
    let videoList = this.getVideoList()
    this.setData({
      videoList: videoList
    })
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
    let videoList = this.getVideoList(true)
    let that = this
    wx.stopPullDownRefresh({
      complete: function(res) {
        that.setData({
          videoList: videoList
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '微信小程序',
      desc: '热门视频推荐',
      path: 'pages/galary/galary'
    }
  },
  videoLike: function(event) {
    console.log(event)
    console.log('video ' + event.currentTarget.dataset.videoId + ' liked')
  },
  videoShare: function(event) {
    console.log(event)
    console.log('video ' + event.currentTarget.dataset.videoId + ' shared')
  },
  getVideoList: function(flag) {
    return !flag ? [{
      id: 1,
      content: 'video content ...',
      src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
    }, {
      id: 2,
      content: 'another video content ...',
      src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
    }] : [{
      id: 3,
      content: 'refresh video content ...',
      src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
    }];
  }
})