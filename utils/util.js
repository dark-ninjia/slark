if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        if (this) {
            for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        }
        return this;
    }
}

const formatTime = function(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = function(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
};

const getLikedVideoIdList = function(callback) {
    wx.getStorage({
        key: `likedVideoIdList`,
        success: function(res) {
            callback(res.data || []);
        },
        fail: function() {
            callback([]);
        }
    });
};

/**
 * @param videoId {Number}
 * @param force {Boolean} 喜欢／不喜欢
 * @param callback {Function}
 */
const toggleVideoLike = function(videoId, force, callback) {
    getLikedVideoIdList(function(likedVideoIdList) {
        const hasLiked = likedVideoIdList.includes(videoId);
        let resultLiked = force;
        if (resultLiked === undefined) {
            resultLiked = !hasLiked;
        }

        let result = false;
        let resultList = likedVideoIdList;

        if (hasLiked && !resultLiked) {
            // remove
            resultList = likedVideoIdList.filter(function(id) {
                return id !== videoId;
            });
            result = true;
        }
        if (!hasLiked && resultLiked) {
            // add
            resultList = likedVideoIdList.concat(videoId);
            result = true;
        }
        if (result) {
            wx.setStorage({
                key: `likedVideoIdList`,
                data: resultList,
                success: function() {
                    callback(resultList);
                },
                fail: function() {
                    callback(resultList);
                }
            });
        } else {
            callback(resultList);
        }
    })
};

module.exports = {
    formatTime,
    toggleVideoLike,
    getLikedVideoIdList,
};
