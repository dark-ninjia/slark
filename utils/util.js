function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
      if (this) {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    };
    return this;
    }
}

const getLikedVideoIdList = (callback) => {
  wx.getStorage({
    key: `likedVideoIdList`,
    success: (res) => {
      callback(res.data || []);
    },
    fail: () => {
      callback([]);
    }
  });
};

/**
 * @param videoId {Number}
 * @param force {Boolean} 喜欢／不喜欢
 * @param callback {Function}
 */
const toggleLike = (videoId, force, callback) => {
    getLikedVideoIdList((likedVideoIdList) => {
        const hasLiked = likedVideoIdList.includes(videoId);
        let resultLiked = force;
        if (resultLiked === undefined) {
            resultLiked = !hasLiked;
        }

        let result = false;
        let resultList = likedVideoIdList;

        if (hasLiked && !resultLiked) {
            // remove
            resultList = likedVideoIdList.filter((id) => {
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
                success: () => {
                    callback(resultList);
                },
                fail: () => {
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
  toggleLike,
  getLikedVideoIdList,
}
