//galary.js
//获取应用实例

const util = require('../../utils/util');

const app = getApp();

Page({
    data: {
        videoList: [],
        videoListWithLike: [],
    },
    onLoad: function() {
        console.log('galary loaded');
    },
    onShow: function() {
        this.getVideoListAll(function() {

        });
    },
    onPullDownRefresh: function() {
        this.getVideoListAll(function() {
            wx.stopPullDownRefresh();
        });
    },
    onShareAppMessage: function() {
        return {
            title: '微信小程序',
            desc: '热门视频推荐',
            path: 'pages/galary/galary'
        }
    },
    videoPlay: function(event) {
        const domId = event.currentTarget.id;
        this.data.videoList.forEach(function(video) {
            if (`video${video.id}` !== domId) {
                const cxt = wx.createVideoContext(`video${video.id}`);
                cxt.pause();
            }
        });
    },
    videoLike: function(event) {
        const id = event.currentTarget.dataset.videoId;
        const _this = this;
        util.toggleVideoLike(id, undefined, function(result) {
            const videoListWithLike = _this.mapLikeIntoVideoList(_this.data.videoList, result);
            _this.setData({
                videoListWithLike,
            });
        });
    },
    videoShare: function(event) {
        console.log(event);
        console.log('video ' + event.currentTarget.dataset.videoId + ' shared')
    },
    getVideoList: function(callback) {
        const vList = app.globalData.videoList.shuffle();
        callback(vList);
    },
    getLikedList: function(callback) {
        util.getLikedVideoIdList(function(likedList) {
            callback(likedList);
        });
    },
    mapLikeIntoVideoList: function(videoList, likedList) {
        return videoList.map(function(video) {
            return Object.assign({}, video, {
                liked: likedList.includes(video.id),
            });
        });
    },
    getVideoListAll: function(callback) {
        const _this = this;
        this.getVideoList(function(videoList) {
            _this.getLikedList(function(likedList) {
                const videoListWithLike = _this.mapLikeIntoVideoList(videoList, likedList);
                _this.setData({
                    videoList,
                    videoListWithLike,
                });
                callback();
            });
        });
    }
});
