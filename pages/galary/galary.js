//galary.js
//获取应用实例

const util = require('../../utils/util');

var app = getApp()
Page({
  data: {
    videoList: [],
    videoListWithLike: [],
  },
  onLoad: function (e) {
    console.log('galary loaded')
  },
  onShow: function() {
    this.getVideoListAll(() => {});
  },
  onPullDownRefresh: function () {
    this.getVideoListAll(() => {
      wx.stopPullDownRefresh();
    });
  },
  onShareAppMessage: function () {
    return {
      title: '微信小程序',
      desc: '热门视频推荐',
      path: 'pages/galary/galary'
    }
  },
  videoLike: function(event) {
    const id = event.currentTarget.dataset.videoId;
    util.toggleLike(id, undefined, (result) => {
      const videoListWithLike = this.mapLikeIntoVideoList(this.data.videoList, result);
      this.setData({
        videoListWithLike,
      });
    });
  },
  videoShare: function(event) {
    console.log(event)
    console.log('video ' + event.currentTarget.dataset.videoId + ' shared')
  },
  getVideoList: function(callback) {
    const vList = app.globalData.videoList.shuffle();
    callback(vList);
  },
  getLikedList: function(callback) {
    util.getLikedVideoIdList((likedList) => {
      callback(likedList);
    });
  },
  mapLikeIntoVideoList: function(videoList, likedList) {
    const videoListWithLike = videoList.map((video) => {
      return Object.assign({}, video, {
        liked: likedList.includes(video.id),
      });
    });
    return videoListWithLike;
  },
  getVideoListAll: function(callback) {
    const _this = this;
    _this.getVideoList((videoList) => {
      _this.getLikedList((likedList) => {
        const videoListWithLike = _this.mapLikeIntoVideoList(videoList, likedList);
        _this.setData({
          videoList,
          videoListWithLike,
        });
        callback();
      });
    });
  }
})